# Sunland Calendar - Developer Brief
## Product Overview for Implementation

---

## What We're Building

A **personalized local event calendar subscription service** for St. Lucie County, Florida residents.

**The Core Concept:**
Users pay $39/year, take a 2-minute preference survey, and receive a personalized calendar feed that automatically updates with only events matching their interests and availability.

---

## Product Features

### User-Facing Features:
1. **Preference Survey** - Users select interests, availability, and location preferences
2. **Personalized Calendar Feed** - Unique `.ics` file URL per user
3. **Auto-Sync** - Events automatically appear in their calendar app (Apple, Google, Outlook)
4. **Smart Filtering** - Only events matching their preferences are included
5. **Multi-Platform Support** - Works with all major calendar applications
6. **Preference Updates** - Users can change preferences via magic link (no password needed)

### Admin Features:
1. **Event Management Dashboard** - Easy interface to add/edit/delete events
2. **Event Categorization** - Tag events with categories, times, locations, prices
3. **Bulk Import** - CSV upload for adding multiple events at once
4. **User Management** - View subscribers, their preferences, analytics

---

## Technical Architecture

### Tech Stack Recommendation:
- **Frontend/Backend:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL + Auth)
- **Payments:** Stripe (one-time annual payments)
- **Email:** Resend or Postmark (magic links, receipts)
- **Hosting:** Vercel
- **Calendar Generation:** ical.js library

### Why This Stack:
- Next.js handles both frontend and API routes
- Supabase is fast to set up, has built-in auth
- Stripe has excellent docs and webhooks
- Vercel has generous free tier and auto-scaling
- All easily AI-assisted (cursor/copilot friendly)

---

## Database Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  stripe_customer_id VARCHAR(255),
  stripe_payment_id VARCHAR(255),
  calendar_token VARCHAR(50) UNIQUE NOT NULL,
  subscription_status VARCHAR(20) DEFAULT 'active', -- active, expired, cancelled
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User preferences table
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  interests JSONB, -- ["food", "music", "arts", "outdoors", "family", "nightlife", "sports", "civic"]
  availability JSONB, -- ["weekday_mornings", "weekday_evenings", "weekend_days", "weekend_nights"]
  location_preference VARCHAR(50), -- "fort_pierce", "psl_fp", "all_slc", "treasure_coast"
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_datetime TIMESTAMP NOT NULL,
  end_datetime TIMESTAMP NOT NULL,
  location_name VARCHAR(255),
  location_address VARCHAR(500),
  location_city VARCHAR(100),
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  categories JSONB, -- ["food", "music", etc.]
  price VARCHAR(50), -- "Free", "$5", "$20-30", etc.
  url VARCHAR(500),
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule VARCHAR(255), -- RRULE format if recurring
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Magic links table (for passwordless updates)
CREATE TABLE magic_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(100) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## User Flow

### 1. Purchase Flow

**Step 1:** User lands on offer page
- URL: `sunlandnews.com/calendar`
- Shows pricing, features, testimonials
- CTA: "Get my calendar — $39"

**Step 2:** Stripe Checkout
- Redirect to Stripe hosted checkout page
- Collect: Email, Name, Optional: Phone
- Payment: $39 one-time charge
- Success redirect: `sunlandnews.com/calendar/setup?token={unique_token}`

**Step 3:** Post-Purchase Setup
- Token in URL identifies the user
- Show preference survey (4 steps)
- User completes in ~2 minutes
- Generate unique calendar token on submission

**Step 4:** Calendar Delivery
- Show success screen with:
  - Their unique calendar URL: `sunlandnews.com/cal/{token}.ics`
  - Platform-specific "Add to Calendar" buttons
  - Email confirmation with setup instructions

### 2. Calendar Feed Generation

**How it works:**
- User's calendar app requests: `GET /cal/{token}.ics`
- Backend:
  1. Look up user by calendar_token
  2. Get user's preferences
  3. Query all active events
  4. Filter events matching preferences
  5. Generate .ics file with filtered events
  6. Return with proper headers

**Filtering Logic:**
```javascript
function filterEventsForUser(allEvents, userPreferences) {
  return allEvents.filter(event => {
    // 1. Check category match
    const categoryMatch = event.categories.some(cat => 
      userPreferences.interests.includes(cat)
    );
    
    // 2. Check availability match
    const timeMatch = checkTimeMatch(event.start_datetime, userPreferences.availability);
    
    // 3. Check location match
    const locationMatch = checkLocationMatch(event.location_city, userPreferences.location_preference);
    
    return categoryMatch && timeMatch && locationMatch;
  });
}
```

**ICS File Format:**
```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sunland News//Calendar//EN
CALSCALE:GREGORIAN
X-WR-CALNAME:Sunland VIP Events
X-WR-TIMEZONE:America/New_York

BEGIN:VEVENT
UID:event-{id}@sunlandnews.com
DTSTAMP:{current_timestamp}Z
DTSTART;TZID=America/New_York:{event_start}
DTEND;TZID=America/New_York:{event_end}
SUMMARY:{event_title}
LOCATION:{event_location}
DESCRIPTION:{event_description}
CATEGORIES:{comma_separated_categories}
BEGIN:VALARM
TRIGGER:-PT1D
DESCRIPTION:Tomorrow: {event_title}
ACTION:DISPLAY
END:VALARM
BEGIN:VALARM
TRIGGER:-PT1H
DESCRIPTION:{event_title} starts in 1 hour
ACTION:DISPLAY
END:VALARM
END:VEVENT

[... more events ...]

END:VCALENDAR
```

### 3. Update Preferences Flow

**Step 1:** User visits `sunlandnews.com/calendar/update`

**Step 2:** Enter email or phone
- Simple form: "Enter your email to update preferences"
- Submit → Generate magic link

**Step 3:** Send Magic Link
- Email: "Click here to update your calendar preferences"
- Link: `sunlandnews.com/calendar/edit?token={magic_token}`
- Token expires in 1 hour

**Step 4:** Edit Preferences
- Click link → show same preference survey
- Pre-fill with current selections
- Submit → update database
- Calendar feed auto-updates (no action needed from user)

---

## API Endpoints

### Public Endpoints:

```
GET /cal/{calendar_token}.ics
- Returns personalized calendar feed
- Headers: 
  - Content-Type: text/calendar
  - Content-Disposition: inline; filename="sunland-calendar.ics"
```

### Protected API Routes:

```
POST /api/checkout/create
- Creates Stripe checkout session
- Returns checkout URL

POST /api/webhook/stripe
- Handles Stripe webhook events
- Events: payment_intent.succeeded, customer.subscription.updated

POST /api/preferences/save
- Body: { user_id, interests, availability, location_preference }
- Saves user preferences

POST /api/magic-link/request
- Body: { email }
- Generates and sends magic link

GET /api/magic-link/validate
- Query: ?token={magic_token}
- Returns user_id if valid

POST /api/events/create (Admin only)
- Body: { event details }
- Creates new event

GET /api/events/list (Admin only)
- Returns all events with filters
```

---

## Admin Dashboard Requirements

### Event Management:
- **Add Event Form:**
  - Title, Description, Date/Time (start & end)
  - Location (name, address, city, optional lat/lng)
  - Categories (multi-select: food, music, arts, etc.)
  - Price, URL
  - Recurring? (if yes, RRULE pattern)
  - Publish status

- **Event List Table:**
  - Sortable by date, title, category
  - Filters: date range, category, city
  - Quick actions: Edit, Delete, Duplicate
  - Bulk actions: Delete multiple, Change status

- **CSV Import:**
  - Upload CSV with columns: title, date, time, location, categories, price, url
  - Preview before import
  - Validate data
  - Import all at once

### User Management:
- **Subscriber List:**
  - Email, signup date, subscription status, expires date
  - Filter by status (active/expired)
  - Search by email
  - View individual preferences

- **Analytics Dashboard:**
  - Total subscribers
  - New this month
  - Churn rate
  - Most popular categories
  - Most popular time slots
  - Geographic distribution

---

## Stripe Integration

### Setup:
1. Create Stripe product: "Sunland Calendar - Annual"
2. Price: $39 one-time payment
3. Success URL: `sunlandnews.com/calendar/setup?session_id={CHECKOUT_SESSION_ID}`
4. Cancel URL: `sunlandnews.com/calendar`

### Webhook Events to Handle:
- `checkout.session.completed` - User completed payment
  - Create user record
  - Send welcome email
  - Redirect to setup

- `charge.refunded` - User requested refund
  - Mark subscription as cancelled
  - Remove calendar access

### Custom Checkout Fields:
```javascript
// Add phone number as optional field
custom_fields: [
  {
    key: 'phone',
    label: { type: 'custom', custom: 'Phone (for event reminders - optional)' },
    type: 'text',
    optional: true
  }
]
```

---

## Email Templates Needed

### 1. Welcome Email (Post-Purchase)
**Subject:** Your Sunland Calendar is Ready! 🎉

**Body:**
- Thank you for subscribing
- Link to setup preferences
- Expected delivery timeline
- Support contact

### 2. Setup Complete Email
**Subject:** ✅ Your calendar is live!

**Body:**
- Your unique calendar link
- Instructions for Apple/Google/Outlook
- How to update preferences
- Next steps

### 3. Magic Link Email
**Subject:** Update Your Calendar Preferences

**Body:**
- Click here to update (link expires in 1 hour)
- What you can change
- Support contact

### 4. Renewal Reminder (11 months after purchase)
**Subject:** Your Sunland Calendar expires in 30 days

**Body:**
- Renew for another year
- Current pricing ($59/year - or grandfather at $39?)
- Renew link

---

## Mobile Optimization

### Key Considerations:
- Survey must work perfectly on phones (most users will be mobile)
- Calendar subscription works differently on iOS vs Android:
  - **iOS:** Tapping webcal:// link opens Settings → Calendars
  - **Android:** May download .ics file, user opens with Calendar app
  - **Solution:** Detect device, show appropriate instructions

### Platform Detection:
```javascript
function detectPlatform() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return 'desktop';
}

// Show platform-specific button
if (platform === 'ios') {
  // Show "Add to Apple Calendar" with webcal:// link
} else if (platform === 'android') {
  // Show "Add to Google Calendar" with instructions
}
```

---

## Security Considerations

### Calendar Token:
- Must be random, unpredictable (use crypto.randomBytes)
- At least 32 characters
- Should be URL-safe
- Never expires (unless user cancels)

### Magic Link Token:
- Random, unpredictable
- 1-hour expiration
- Single use only
- Delete after use

### Rate Limiting:
- Calendar feed endpoint: 60 requests/hour per token
- Magic link request: 3 requests/hour per email
- Prevents abuse

---

## Caching Strategy

### Calendar Feeds:
- Cache generated .ics files for 15 minutes
- Invalidate cache when:
  - User updates preferences
  - New events are published
  - Events are edited/deleted

### Why Cache:
- Reduces database queries
- Faster response times
- Most calendar apps poll every 30 min - 1 hour anyway

---

## Testing Checklist

### Payment Flow:
- [ ] Stripe checkout creates user record
- [ ] Webhook properly processes payment
- [ ] Redirect to setup page works
- [ ] Refunds mark subscription as cancelled

### Calendar Generation:
- [ ] .ics file is valid (test with validator)
- [ ] Events filter correctly by preferences
- [ ] Recurring events work
- [ ] Reminders are included
- [ ] Timezone handling is correct (America/New_York)

### Calendar Subscription:
- [ ] Works on iPhone (Safari)
- [ ] Works on Android (Chrome)
- [ ] Works on desktop (all browsers)
- [ ] Updates propagate (add event → shows in calendar within refresh window)

### Magic Links:
- [ ] Email sends successfully
- [ ] Link works within 1 hour
- [ ] Link expires after 1 hour
- [ ] Link is single-use
- [ ] Preferences update correctly

---

## Launch Plan

### Phase 1: MVP (Weeks 1-6)
- [ ] Stripe integration
- [ ] Preference survey
- [ ] Calendar generation logic
- [ ] Basic admin dashboard (manual event entry)
- [ ] Deploy to production

### Phase 2: Polish (Weeks 7-8)
- [ ] Magic link system
- [ ] Email templates
- [ ] Analytics dashboard
- [ ] CSV import for events
- [ ] Beta test with 10 users

### Phase 3: Launch (Week 9+)
- [ ] Soft launch to newsletter (500 people)
- [ ] Fix bugs
- [ ] Scale up ads
- [ ] Add features based on feedback

---

## Success Metrics

### Track:
- Conversion rate (survey takers → paid subscribers)
- Time to complete survey
- Platform distribution (iOS vs Android vs Desktop)
- Most popular categories
- Most popular time slots
- Renewal rate (after 12 months)
- Churn reasons

### Goals:
- 2-3% conversion on free → paid
- <3 minutes average survey completion
- >70% annual renewal rate
- <5% refund rate

---

## Pricing Tiers (Future)

### Current:
- **Calendar Only:** $39/year

### Future Options:
- **Monthly:** $12/month or $119/year (save $25)
- **People Pass (Bundle):** $119/year
  - Includes calendar + exclusive content + merch

---

## Support & Documentation

### User-Facing Docs Needed:
- How to add calendar to iPhone
- How to add calendar to Android
- How to add calendar to Outlook/desktop
- How to update preferences
- How to cancel subscription
- Troubleshooting (events not showing, etc.)

### FAQ:
- Will this spam my calendar? (No, you control what you see)
- Can I change preferences? (Yes, anytime via magic link)
- What if I don't love it? (7-day refund guarantee)
- How often does it update? (Events added weekly)

---

## Technical Constraints

### Calendar App Refresh Rates:
- Apple Calendar: Checks every 15 min - 1 hour (user can't control)
- Google Calendar: Checks every ~8 hours for subscriptions
- Outlook: Checks every 3 hours

**Implication:** Don't promise "instant" updates. Say "events appear automatically within a few hours"

### .ics File Size:
- Keep under 1MB (most apps handle this fine)
- With 50 events @ ~500 bytes each = 25KB (plenty of room)

### Timezone Handling:
- All events in America/New_York timezone
- Use TZID in DTSTART/DTEND
- Include timezone definition in .ics file

---

## File Structure

```
/app
  /api
    /checkout
      route.ts (create Stripe session)
    /webhook
      /stripe
        route.ts (handle Stripe webhooks)
    /preferences
      /save
        route.ts (save user prefs)
    /magic-link
      /request
        route.ts (send magic link)
      /validate
        route.ts (validate token)
    /events
      /create
        route.ts (admin: create event)
      /list
        route.ts (admin: list events)
  /calendar
    page.tsx (offer page)
    /setup
      page.tsx (preference survey)
    /update
      page.tsx (request magic link)
    /edit
      page.tsx (edit preferences via magic link)
  /cal
    /[token]
      route.ts (generate .ics file)
  /admin
    /events
      page.tsx (event management dashboard)
    /users
      page.tsx (user management)
    /analytics
      page.tsx (analytics dashboard)

/components
  PreferenceSurvey.tsx
  EventForm.tsx
  EventList.tsx
  ...

/lib
  stripe.ts (Stripe client)
  supabase.ts (Supabase client)
  calendar.ts (ICS generation logic)
  email.ts (email sending)
  utils.ts (helper functions)
```

---

## Environment Variables Needed

```
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Email (Resend)
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_APP_URL=https://sunlandnews.com
ADMIN_EMAIL=jay@sunlandnews.com
```

---

## Code Snippets

### Calendar Generation (lib/calendar.ts):

```typescript
import ical from 'ical-generator';

export function generateCalendar(events: Event[], userName: string) {
  const calendar = ical({
    name: 'Sunland VIP Events',
    timezone: 'America/New_York',
    prodId: '//Sunland News//Calendar//EN',
  });

  events.forEach(event => {
    const calEvent = calendar.createEvent({
      start: event.start_datetime,
      end: event.end_datetime,
      summary: event.title,
      description: event.description,
      location: `${event.location_name}, ${event.location_address}`,
      url: event.url,
      categories: event.categories,
    });

    // Add reminders
    calEvent.createAlarm({
      type: 'display',
      trigger: 60 * 60 * 24, // 1 day before
      description: `Tomorrow: ${event.title}`,
    });

    calEvent.createAlarm({
      type: 'display',
      trigger: 60 * 60, // 1 hour before
      description: `${event.title} starts in 1 hour`,
    });

    // Handle recurring events
    if (event.is_recurring && event.recurrence_rule) {
      calEvent.repeating(event.recurrence_rule);
    }
  });

  return calendar.toString();
}
```

### Event Filtering (lib/utils.ts):

```typescript
export function filterEventsForUser(
  events: Event[],
  preferences: UserPreferences
): Event[] {
  return events.filter(event => {
    // Category match
    const categoryMatch = event.categories.some(cat =>
      preferences.interests.includes(cat)
    );
    if (!categoryMatch) return false;

    // Time match
    const eventDay = getEventDayType(event.start_datetime);
    const eventTime = getEventTimeType(event.start_datetime);
    const availabilityKey = `${eventDay}_${eventTime}`;
    
    const timeMatch = preferences.availability.includes(availabilityKey);
    if (!timeMatch) return false;

    // Location match
    const locationMatch = checkLocationMatch(
      event.location_city,
      preferences.location_preference
    );
    if (!locationMatch) return false;

    return true;
  });
}

function getEventDayType(date: Date): 'weekday' | 'weekend' {
  const day = date.getDay();
  return (day === 0 || day === 6) ? 'weekend' : 'weekday';
}

function getEventTimeType(date: Date): 'mornings' | 'evenings' | 'days' | 'nights' {
  const hour = date.getHours();
  
  if (hour >= 6 && hour < 12) return 'mornings';
  if (hour >= 12 && hour < 17) return 'days';
  if (hour >= 17 && hour < 21) return 'evenings';
  return 'nights';
}

function checkLocationMatch(city: string, preference: string): boolean {
  const cityLower = city.toLowerCase();
  
  switch (preference) {
    case 'fort_pierce':
      return cityLower.includes('fort pierce');
    case 'psl_fp':
      return cityLower.includes('fort pierce') || 
             cityLower.includes('port st. lucie') ||
             cityLower.includes('port saint lucie');
    case 'all_slc':
      return true; // All St. Lucie County
    case 'treasure_coast':
      return true; // Everything
    default:
      return true;
  }
}
```

---

## Resources for Developer

### Documentation Links:
- iCalendar spec: https://icalendar.org/
- ical-generator library: https://github.com/sebbo2002/ical-generator
- Stripe checkout: https://stripe.com/docs/payments/checkout
- Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs

### Example .ics Files:
See attached: `sunland_vip_premium.ics`

### Design Files:
See attached HTML mockups:
- `sunland_calendar_offer_page.html`
- `calendar_survey_onboarding.html`
- `sunland_calendar_full_website.html`

---

## Questions to Clarify With Developer

1. **Hosting preference?** Vercel recommended, but open to alternatives
2. **Admin auth?** NextAuth with Google OAuth? Or simple password?
3. **Email provider?** Resend vs Postmark vs SendGrid
4. **Analytics?** Posthog? Google Analytics? Simple or advanced?
5. **Error monitoring?** Sentry? LogRocket?

---

## Budget Estimate

### One-Time Development:
- MVP build: $3,000 - $5,000 (if outsourced)
- OR: 40-60 hours if building with AI assistance yourself

### Monthly Operating Costs:
- Vercel hosting: $0 (free tier, then ~$20/mo at scale)
- Supabase: $0 (free tier, then ~$25/mo at scale)
- Stripe fees: 2.9% + $0.30 per transaction
- Email (Resend): $0 (free tier for 3K/month)
- Domain: ~$1/month

**Total monthly at 100 users: ~$50-75**
**Total monthly at 1,000 users: ~$100-150**

Gross margins: >90%

---

## Next Steps

1. Review this document with developer
2. Set up development environment
3. Create Stripe account + test mode
4. Set up Supabase project
5. Build MVP (6-8 weeks)
6. Beta test with 10-20 users
7. Launch!

---

**Questions? Contact:**
- Product Owner: Jay (Sunland News)
- Email: [your email]
- Slack/Discord: [if applicable]