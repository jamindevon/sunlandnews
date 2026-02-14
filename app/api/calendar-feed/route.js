import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import ical from 'ical-generator';

// Initialize Supabase client
// Note: In Next.js App Router, it's safe to use process.env here for server-side logic
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(request) {
    if (!supabaseUrl || !supabaseServiceKey) {
        console.error('Missing Supabase Env Vars');
        return new NextResponse('Configuration Error: Missing API Keys', { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    try {
        // 1. Fetch Events from Database
        // Logic: Get all events that are Published AND have the 'Free Tier' category
        const { data: events, error } = await supabase
            .from('events')
            .select('*')
            .eq('is_published', true)
            .contains('categories', ['Free Tier']);

        if (error) {
            console.error('Error fetching events:', error);
            return new NextResponse('Database Error', { status: 500 });
        }

        // 2. Generate ICS
        const calendar = ical({
            name: 'Sunland Tailored Events',
            prodId: { company: 'Sunland News', product: 'Calendar Club', language: 'EN' },
            url: 'https://sunlandnews.com/api/calendar-feed',
            ttl: 60 * 60, // 1 hour
        });

        events.forEach(event => {
            try {
                // Ensure dates are valid Date objects
                const start = new Date(event.start_datetime);
                const end = new Date(event.end_datetime);

                calendar.createEvent({
                    start: start,
                    end: end,
                    summary: event.title,
                    description: event.description,
                    location: `${event.location_name}, ${event.location_city}`,
                    url: event.url || '',
                    categories: (Array.isArray(event.categories) ? event.categories : []).map(c => ({ name: String(c) })),
                });
            } catch (err) {
                console.error(`Skipping event ${event.title}:`, err);
            }
        });

        // 3. Return ICS File
        return new NextResponse(calendar.toString(), {
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': 'inline; filename="sunland-events.ics"',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });

    } catch (error) {
        console.error('Feed generation error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
