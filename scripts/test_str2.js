import ical from 'ical-generator';

const calendar = ical({
    name: 'Test',
    timezone: 'America/New_York'
});
calendar.createEvent({
    start: '2026-03-01T19:00:00',
    end: '2026-03-01T21:00:00',
    summary: 'Trombone Shorty'
});
console.log(calendar.toString());
