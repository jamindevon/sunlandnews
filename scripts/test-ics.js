const ical = require('ical-generator');

const events = [
    {
        title: 'Test Event',
        start_datetime: new Date().toISOString(),
        end_datetime: new Date(Date.now() + 3600000).toISOString(),
        description: 'Test Description',
        location_name: 'Test Location',
        url: 'https://example.com',
        categories: ['Test']
    }
];

const calendar = ical({
    name: 'Sunland News Events',
    url: 'https://sunlandnews.com/cal/test-token',
});

events.forEach(event => {
    calendar.createEvent({
        start: new Date(event.start_datetime),
        end: new Date(event.end_datetime),
        summary: event.title,
        description: event.description,
        location: event.location_name,
        url: event.url,
        categories: event.categories
    });
});

console.log(calendar.toString());
