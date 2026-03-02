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

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        global: { fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }) }
    });

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

        // Filter events that have the specific category in their array
        const events = allEvents.filter(event => {
            if (!event.categories) return false;
            
            let cats = [];
            try {
                if (typeof event.categories === 'string') {
                    cats = JSON.parse(event.categories);
                } else if (Array.isArray(event.categories)) {
                    cats = event.categories;
                } else {
                    cats = Object.values(event.categories);
                }
            } catch (e) {
                cats = [event.categories];
            }
            
            return cats.some(c => {
                const name = typeof c === 'string' ? c : c?.name;
                return name === 'Big Events';
            });
        });

        // Generate ICS
        const calendar = ical({
            name: 'Sunland Big Events',
            prodId: { company: 'Sunland News', product: 'Sunland Big Events', language: 'EN' },
            url: 'https://sunlandnews.com/calendars/big-events',
            timezone: 'America/New_York',
            ttl: 60 * 60,
        });

        events.forEach(event => {
            try {
                // Pass strings directly with Explicit Timezone to prevent Vercel UTC shifting
                calendar.createEvent({
                    start: event.start_datetime,
                    end: event.end_datetime,
                    timezone: 'America/New_York',
                    summary: event.title,
                    description: event.description,
                    location: `${event.location_name || ''}, ${event.location_city || ''}`,
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
