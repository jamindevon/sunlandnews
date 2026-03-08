import ical from 'ical-generator';

const dbString = '2026-03-01T19:00:00'; // Assume this is Trombone Shorty at 7 PM EST

const calendar = ical({
    name: 'Test Calendar',
    timezone: 'America/New_York'
});

calendar.createEvent({
    start: new Date(dbString),
    end: new Date(dbString),
    summary: 'Trombone Shorty',
});

console.log('Without TZ offset:');
console.log(calendar.toString());

const calendar2 = ical({
    name: 'Test Calendar',
    timezone: 'America/New_York'
});
calendar2.createEvent({
    start: new Date(dbString + '-05:00'),
    end: new Date(dbString + '-05:00'),
    summary: 'Trombone Shorty',
});
console.log('\nWith TZ offset (-05:00):');
console.log(calendar2.toString());
