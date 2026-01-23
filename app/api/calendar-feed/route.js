
import { events } from '@/app/data/events';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const typesParam = searchParams.get('types'); // Comma separated tags
    const selectedTypes = typesParam ? typesParam.split(',') : [];

    const filteredEvents = events.filter(event =>
        selectedTypes.length === 0 ||
        event.tags.some(tag => selectedTypes.includes(tag))
    );

    let icsContent = `BEGIN:VCALENDAR\r
VERSION:2.0\r
PRODID:-//Sunland News//Calendar Club//EN\r
CALSCALE:GREGORIAN\r
METHOD:PUBLISH\r
X-WR-CALNAME:Sunland Tailored Events\r
`;

    filteredEvents.forEach(event => {
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

    return new Response(icsContent, {
        headers: {
            'Content-Type': 'text/calendar; charset=utf-8',
            'Content-Disposition': 'inline; filename="sunland-events.ics"',
        },
    });
}
