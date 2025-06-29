# 🚀 Sunland News Lead Generation Funnel

## Complete 4-Step Funnel Overview

✅ **PAGE 1**: Homepage Squeeze Page (`/`)  
✅ **PAGE 2**: Thank You Page (`/thank-you`)  
✅ **PAGE 3**: Quiz Page (`/quiz`)  
✅ **PAGE 4**: Support Page (`/support`)  
✅ **BONUS**: Quiz Thank You Page (`/quiz/thank-you`)

---

## 🗄️ Database Setup (Supabase)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anon key

### 2. Add Environment Variables
Add to your `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Create Database Tables
Run these SQL commands in your Supabase SQL editor:

```sql
-- Create signups table
CREATE TABLE signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create quiz_responses table
CREATE TABLE quiz_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  signup_id UUID REFERENCES signups(id),
  email TEXT,
  q1_interest TEXT,
  q2_lived TEXT,
  q3_value TEXT,
  q4_timing TEXT,
  q5_support TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_signups_email ON signups(email);
CREATE INDEX idx_signups_created_at ON signups(created_at);
CREATE INDEX idx_quiz_responses_signup_id ON quiz_responses(signup_id);
CREATE INDEX idx_quiz_responses_created_at ON quiz_responses(created_at);
```

---

## 🎯 Funnel Flow

### **Step 1: Homepage (`/`)**
- **Headline**: "Stay in the loop with what's happening in St. Lucie County"
- **Subheadline**: Clean messaging about no politics/crime
- **Form**: Email capture with "Send Me the News" button
- **Action**: Stores email in `signups` table → Redirects to `/thank-you`

### **Step 2: Thank You (`/thank-you`)**
- **Message**: "You're in! Thanks for signing up."
- **Video**: Placeholder for welcome video (replace with actual embed)
- **CTA**: "Take the Quick Quiz" → `/quiz`

### **Step 3: Quiz (`/quiz`)**
- **Format**: 5-question multi-step form with progress bar
- **Questions**:
  1. What are you most interested in?
  2. How long have you lived in the area?
  3. What would make this newsletter truly valuable?
  4. When do you check email?
  5. Would you support local news? ⭐ **KEY QUESTION**
- **Action**: Stores responses in `quiz_responses` table
- **Routing Logic**:
  - If Q5 = "Yes, show me how" → `/support`
  - Else → `/quiz/thank-you`

### **Step 4A: Support (`/support`)**
- **Headline**: "Choose How You Support Sunland"
- **3 Options**:
  - 🍊 772 Eats Guide - $9 (one-time)
  - 👕 Sunland T-Shirt - $29
  - 🌱 People Pass Membership - $9/mo
- **Action**: CTA buttons ready for Stripe links

### **Step 4B: Quiz Thank You (`/quiz/thank-you`)**
- **Message**: "Thanks for sharing! Your first Sunland News issue is on its way."
- **Content**: Explains what happens next

---

## 🧪 Testing the Funnel

### **Without Supabase (Placeholder Mode)**
1. Start dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Enter email and submit → Should redirect to thank you page
4. Take quiz → Check browser console for logged data
5. Based on Q5 answer, should route to support or quiz thank you

### **With Supabase (Full Mode)**
1. Set up database tables (see above)
2. Add environment variables
3. Restart dev server
4. Test complete flow
5. Check Supabase dashboard for stored data

---

## 🔧 Customization

### **Replace Video Placeholder**
In `/app/thank-you/page.js`, uncomment and update the YouTube embed:
```jsx
<iframe 
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
  title="Welcome to Sunland News"
  // ... other props
></iframe>
```

### **Update Support Links**
In `/app/support/page.js`, replace placeholder URLs with actual Stripe links:
```javascript
href: 'https://buy.stripe.com/your-product-link'
```

### **Customize Colors**
The funnel uses your existing Tailwind theme with `primary` color (#f88600).

---

## 📊 Analytics & Tracking

### **Key Metrics to Track**
- **Conversion Rate**: Homepage → Thank You
- **Quiz Completion**: Thank You → Quiz Complete
- **Support Interest**: % who choose "Yes, show me how"
- **Support Conversion**: Quiz → Actual Purchase

### **Recommended Tracking**
Add Google Analytics or similar to track:
- Page views for each step
- Form submissions
- Button clicks
- Drop-off points

---

## 🚀 Go Live Checklist

- [ ] Database tables created and tested
- [ ] Environment variables configured
- [ ] Welcome video uploaded and embedded
- [ ] Stripe products created and links updated
- [ ] Email automation set up for new signups
- [ ] Analytics tracking implemented
- [ ] Mobile responsiveness tested
- [ ] Form validation working
- [ ] All redirect flows tested

---

## 💡 Future Enhancements

1. **Email Automation**: Connect to email service for welcome sequences
2. **A/B Testing**: Test different headlines, CTAs, or quiz questions
3. **Segmentation**: Use quiz responses for targeted email content
4. **Retargeting**: Track users who abandon the funnel
5. **Social Proof**: Add testimonials or subscriber counts

---

**Questions?** The funnel is designed to work immediately with placeholder functions, then seamlessly upgrade to full Supabase integration when ready. 