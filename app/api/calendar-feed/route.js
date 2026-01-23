
import { events } from '@/app/data/events';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const typesParam = searchParams.get('types'); // Comma separated tags
    const selectedTypes = typesParam ? typesParam.split(',') : [];

    // Filter events
    // If no types selected, show all? Or show none?
    // Logic from frontend was: if nothing selected, show all (or fallback).
    // But typically user selects something. Let's assume if empty, show all.

    const filteredEvents = events.filter(event =>
        selectedTypes.length === 0 ||
        event.tags.some(tag => selectedTypes.includes(tag))
    );

    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sunland News//Calendar Club//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Sunland Tailored Events
`;

    filteredEvents.forEach(event => {
        const start = event.gcalTime.split('/')[0];
        const end = event.gcalTime.split('/')[1];
        const now = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';

        icsContent += `BEGIN:VEVENT
DTSTART:${start}
DTEND:${end}
DTSTAMP:${now}
UID:${event.id}@sunland.news
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.location.replace(/,/g, '\\,')}
END:VEVENT
`;
    });

    icsContent += "END:VCALENDAR";

    return new Response(icsContent, {
        headers: {
            'Content-Type': 'text/calendar; charset=utf-8',
            'Content-Disposition': 'inline; filename="sunland-events.ics"', // inline to allow browser to open/subscribe
        },
    });
}
