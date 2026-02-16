import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import ical from 'ical-generator';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(request) {
    if (!supabaseUrl || !supabaseServiceKey) {
        console.error('Missing Supabase Env Vars');
        return new NextResponse('Configuration Error: Missing API Keys', { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    try {
        // Fetch all published events
        const { data: allEvents, error } = await supabase
            .from('events')
            .select('*')
            .eq('is_published', true)
            .order('start_datetime', { ascending: true });

        if (error) {
            console.error('Error fetching events:', error);
            return new NextResponse('Database Error', { status: 500 });
        }

        // Filter events that have 'Outdoor' in their categories array
        const events = allEvents.filter(event =>
            event.categories && event.categories.includes('Outdoor')
        );

        // Generate ICS
        const calendar = ical({
            name: 'Sunland Outdoor & Fitness',
            prodId: { company: 'Sunland News', product: 'Outdoor Calendar', language: 'EN' },
            url: 'https://sunlandnews.com/calendars/outdoor',
            timezone: 'America/New_York',
            ttl: 60 * 60,
        });

        events.forEach(event => {
            try {
                calendar.createEvent({
                    start: new Date(event.start_datetime),
                    end: new Date(event.end_datetime),
                    summary: event.title,
                    description: event.description,
                    location: `${event.location_name}, ${event.location_city}`,
                    url: event.url || '',
                    uid: `${event.id}@sunland.news`,
                });
            } catch (err) {
                console.error(`Skipping event ${event.title}:`, err);
            }
        });

        return new NextResponse(calendar.toString(), {
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': 'inline; filename="outdoor.ics"',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });

    } catch (error) {
        console.error('Feed generation error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
