import { NextResponse } from 'next/server';
import ical from 'ical-generator';
import { events } from '@/app/data/events';

const convertGcalToISO = (gcalStr) => {
    // "20260605T100000" -> "2026-06-05T10:00:00"
    const year = gcalStr.substring(0, 4);
    const month = gcalStr.substring(4, 6);
    const day = gcalStr.substring(6, 8);
    const time = gcalStr.substring(9);
    const hours = time.substring(0, 2);
    const minutes = time.substring(2, 4);
    const seconds = time.substring(4, 6);
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export async function GET(request) {
    try {
        // Generate ICS calendar using static events
        const calendar = ical({
            name: 'Sunland Calendar Club - Featured Events',
            prodId: { company: 'Sunland News', product: 'Calendar Club', language: 'EN' },
            url: 'https://sunlandnews.com/api/calendar-feed',
            timezone: 'America/New_York',
            ttl: 60 * 60, // 1 hour
        });

        events.forEach(event => {
            try {
                const [startGcal, endGcal] = event.gcalTime.split('/');
                const startISO = convertGcalToISO(startGcal);
                const endISO = convertGcalToISO(endGcal);

                calendar.createEvent({
                    start: startISO,
                    end: endISO,
                    timezone: 'America/New_York',
                    summary: event.title,
                    description: event.description,
                    location: event.location,
                    url: event.url || '',
                    uid: `featured-event-${event.id}@sunland.news`
                });
            } catch (err) {
                console.error(`Skipping event ${event.title}:`, err);
            }
        });

        return new NextResponse(calendar.toString(), {
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': 'inline; filename="sunland-featured-events.ics"',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });

    } catch (error) {
        console.error('Feed generation error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
