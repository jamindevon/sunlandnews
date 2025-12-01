import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import ical from 'ical-generator';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(req, { params }) {
    const { token } = params;

    if (!token) {
        return new NextResponse('Missing token', { status: 400 });
    }

    // 1. Validate Token
    const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, subscription_status')
        .eq('calendar_token', token)
        .single();

    if (userError || !user) {
        return new NextResponse('Invalid calendar token', { status: 401 });
    }

    if (user.subscription_status !== 'active') {
        return new NextResponse('Subscription expired', { status: 403 });
    }

    // 2. Fetch User Preferences
    const { data: prefs } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

    // 3. Fetch All Published Events (Filtering in memory for flexibility with JSON/Dates)
    // In a large scale app, we would move more of this to SQL
    const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true);

    if (eventsError) {
        console.error('Error fetching events:', eventsError);
        return new NextResponse('Error fetching events', { status: 500 });
    }

    // 4. Filter Events
    const filteredEvents = events.filter(event => {
        // A. Interest Match (OR logic - if any interest matches)
        // If user has no interests selected, maybe show all? Or show none? Let's assume show all for now to avoid empty cal.
        const userInterests = prefs?.interests || [];
        const eventCategories = event.categories || [];
        const hasInterestMatch = userInterests.length === 0 || eventCategories.some(cat => userInterests.includes(cat));

        if (!hasInterestMatch) return false;

        // B. Location Match
        const userLoc = prefs?.location_preference;
        const eventCity = event.location_city || '';
        let hasLocationMatch = true;

        if (userLoc === 'fort_pierce') {
            hasLocationMatch = eventCity.toLowerCase().includes('fort pierce');
        } else if (userLoc === 'psl_fp') {
            hasLocationMatch = eventCity.toLowerCase().includes('fort pierce') || eventCity.toLowerCase().includes('port st. lucie');
        }
        // 'all_slc' and 'treasure_coast' include everything for now

        if (!hasLocationMatch) return false;

        // C. Availability Match - DISABLED for now (User requested "loose" logic)
        // We collect this data for analytics/future use, but we don't hide events based on it yet.
        /*
        const userAvailability = prefs?.availability || [];
        if (userAvailability.length === 0) return true; 

        const date = new Date(event.start_datetime);
        const day = date.getDay(); 
        const hour = date.getHours();

        const isWeekend = day === 0 || day === 6;
        const isMorning = hour >= 5 && hour < 12;
        const isDay = hour >= 10 && hour < 17; 
        const isEvening = hour >= 17;

        const matchesSlot = userAvailability.some(slot => {
            if (slot === 'Weekday Mornings') return !isWeekend && (isMorning || isDay);
            if (slot === 'Weekday Evenings') return !isWeekend && isEvening;
            if (slot === 'Weekend Days') return isWeekend && (isMorning || isDay);
            if (slot === 'Weekend Nights') return isWeekend && isEvening;
            return false;
        });

        return matchesSlot;
        */
        return true;
    });

    // FALLBACK: If preferences are too strict and result in 0 events, 
    // show all upcoming events so the calendar isn't broken/empty.
    const finalEvents = filteredEvents.length > 0 ? filteredEvents : events;

    // 5. Generate ICS
    const calendar = ical({
        name: 'Sunland News Events',
        prodId: { company: 'Sunland News', product: 'Calendar', language: 'EN' },
        url: `https://sunlandnews.com/cal/${token}`,
        ttl: 60 * 60, // 1 hour
    });

    finalEvents.forEach(event => {
        calendar.createEvent({
            start: new Date(event.start_datetime),
            end: new Date(event.end_datetime),
            summary: event.title,
            description: event.description,
            location: event.location_name + (event.location_address ? `, ${event.location_address}` : ''),
            url: event.url,
            categories: event.categories || [],
        });
    });

    // 4. Return ICS File
    return new NextResponse(calendar.toString(), {
        headers: {
            'Content-Type': 'text/calendar; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
