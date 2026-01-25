
import { events } from '@/app/data/events';

export async function GET(request) {
    // Always return all events for the "All Access" feed
    // We can add filtering back later if needed, but for now we want everything.

    let icsContent = `BEGIN:VCALENDAR\r
VERSION:2.0\r
PRODID:-//Sunland News//Calendar Club//EN\r
CALSCALE:GREGORIAN\r
METHOD:PUBLISH\r
X-WR-CALNAME:Sunland Tailored Events\r
`;

    events.forEach(event => {
        const start = event.gcalTime.split('/')[0];
        const end = event.gcalTime.split('/')[1];
        const now = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';

        icsContent += `BEGIN:VEVENT\r
DTSTART:${start}\r
DTEND:${end}\r
DTSTAMP:${now}\r
UID:${event.id}@sunland.news\r
SUMMARY:${event.title}\r
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}\r
LOCATION:${event.location.replace(/,/g, '\\,')}\r
END:VEVENT\r
`;
    });

    icsContent += "END:VCALENDAR";

    const encoder = new TextEncoder();
    const buffer = encoder.encode(icsContent);

    return new Response(buffer, {
        headers: {
            'Content-Type': 'text/calendar; charset=utf-8',
            'Content-Length': buffer.byteLength,
            'Content-Disposition': 'inline; filename="sunland-events.ics"',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        },
    });
}
