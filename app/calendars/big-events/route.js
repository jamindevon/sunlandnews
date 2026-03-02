import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import ical from 'ical-generator';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const dynamic = 'force-dynamic';

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

        // Filter events that have 'Big Events' in their categories array
        const events = allEvents.filter(event => {
            if (!event.categories) return false;
            const cats = Array.isArray(event.categories) ? event.categories : [event.categories];
            return cats.some(c => {
                const name = typeof c === 'string' ? c : c?.name;
                return name === 'Big Events';
            });
        });

        // Generate ICS
        const calendar = ical({
            name: 'Sunland Big Events',
            prodId: { company: 'Sunland News', product: 'Big Events Calendar', language: 'EN' },
            url: 'https://sunlandnews.com/calendars/big-events',
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
                'Content-Disposition': 'inline; filename="big-events.ics"',
                'Cache-Control': 'no-store, max-age=0',
            },
        });

    } catch (error) {
        console.error('Feed generation error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
