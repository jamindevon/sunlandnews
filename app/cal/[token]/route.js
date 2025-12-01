import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import ical from 'ical-generator';

// Initialize Supabase client
// Initialize Supabase client inside handler to catch errors
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(req, { params }) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            console.error('Missing Supabase Env Vars:', { url: !!supabaseUrl, key: !!supabaseServiceKey });
            return new NextResponse(`Configuration Error: Missing Supabase Environment Variables. URL: ${!!supabaseUrl}, Key: ${!!supabaseServiceKey}`, { status: 500 });
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
            console.error('User Auth Error:', userError);
            return new NextResponse(`Invalid calendar token: ${userError?.message || 'User not found'}`, { status: 401 });
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

        // 3. Fetch All Published Events
        const { data: events, error: eventsError } = await supabase
            .from('events')
            .select('*')
            .eq('is_published', true);

        if (eventsError) {
            console.error('Error fetching events:', eventsError);
            return new NextResponse(`Error fetching events: ${eventsError.message}`, { status: 500 });
        }

        // 4. Filter Events
        const filteredEvents = events.filter(event => {
            // A. Interest Match
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

            if (!hasLocationMatch) return false;

            return true;
        });

        const finalEvents = filteredEvents.length > 0 ? filteredEvents : events;

        // 5. Generate ICS
        const calendar = ical({
            name: 'Sunland News Events',
            prodId: { company: 'Sunland News', product: 'Calendar', language: 'EN' },
            url: `https://sunlandnews.com/cal/${token}`,
            ttl: 60 * 60, // 1 hour
        });

        let errorCount = 0;
        let lastError = '';

        finalEvents.forEach(event => {
            try {
                calendar.createEvent({
                    start: new Date(event.start_datetime),
                    end: new Date(event.end_datetime),
                    summary: event.title,
                    description: event.description,
                    location: event.location_name + (event.location_address ? `, ${event.location_address}` : ''),
                    url: event.url ? event.url.replace('http://', 'https://') : '',
                    categories: event.categories || [],
                });
            } catch (err) {
                console.error('Skipping invalid event:', event.id, err);
                errorCount++;
                lastError = err.message;
            }
        });

        // 4. Return ICS File
        return new NextResponse(calendar.toString(), {
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
                'X-Debug-User-ID': user.id,
                'X-Debug-Events-Total': events.length.toString(),
                'X-Debug-Events-Filtered': filteredEvents.length.toString(),
                'X-Debug-Final-Count': finalEvents.length.toString(),
                'X-Debug-DB-Url': supabaseUrl.substring(0, 20) + '...',
                'X-Debug-Error-Count': errorCount.toString(),
                'X-Debug-Last-Error': lastError,
                'X-Debug-Calendar-Events-Count': calendar.events().length.toString(),
                'X-Debug-First-Date': finalEvents[0]?.start_datetime || 'N/A',
            },
        });
    } catch (error) {
        console.error('CRITICAL ICS GENERATION ERROR:', error);
        return new NextResponse(`Internal Server Error: ${error.message}\nStack: ${error.stack}`, { status: 500 });
    }
}

