import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import ical from 'ical-generator';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
    try {
        const { data: events, error } = await supabase
            .from('events')
            .select('*')
            .eq('is_published', true);

        if (error) {
            console.error('Error fetching ALL events:', error);
            return new NextResponse('Error fetching events', { status: 500 });
        }

        const calendar = ical({
            name: 'Sunland News - Master Calendar',
            prodId: { company: 'Sunland News', product: 'MasterCalendar', language: 'EN' },
            url: 'https://sunlandnews.com/calendars/all',
            method: 'PUBLISH',
            ttl: 60 * 60, // 1 hour
        });

        // Add ALL events
        events.forEach(event => {
            try {
                // Ensure date parsing is robust
                const startDate = new Date(event.start_datetime + 'Z');
                const endDate = new Date(event.end_datetime + 'Z');

                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                    console.warn(`Skipping event with invalid dates: ${event.title}`);
                    return;
                }

                // Process categories: ensure it's an array of objects
                const rawCategories = event.categories || [];
                const formattedCategories = (Array.isArray(rawCategories) ? rawCategories : []).map(c => {
                    if (typeof c === 'string') return { name: c };
                    if (typeof c === 'object' && c?.name) return c;
                    return { name: String(c) };
                });

                calendar.createEvent({
                    start: startDate,
                    end: endDate,
                    summary: event.title,
                    description: event.description,
                    location: event.location_name + (event.location_address ? `, ${event.location_address}` : ''),
                    url: event.url ? event.url.replace('http://', 'https://') : '',
                    categories: formattedCategories,
                    alarms: [{ type: 'display', trigger: 60 * 60 }]
                });
            } catch (err) {
                console.error(`Error adding event ${event.id}:`, err);
            }
        });

        // Return ICS
        return new NextResponse(calendar.toString(), {
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });

    } catch (error) {
        console.error('Critical Error in ALL calendar:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
