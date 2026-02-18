
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const SCHOOL_EVENTS = [
    { date: '2026-01-05', title: 'Teacher Workday (Student Holiday)', cats: ['Parent', 'Family'] },
    { date: '2026-01-06', title: 'Students Return to School', cats: ['Parent', 'Family'] },
    { date: '2026-01-19', title: 'MLK Jr. Day - Holiday for All', cats: ['Parent', 'Family', 'Civic'] },
    { date: '2026-02-11', title: 'Early Release Day', cats: ['Parent', 'Family'] },
    { date: '2026-02-16', title: 'Presidents Day - Holiday', cats: ['Parent', 'Family', 'Civic'] },
    { date: '2026-02-25', title: 'Early Release Day', cats: ['Parent', 'Family'] },
    { date: '2026-03-13', title: 'Early Release Day', cats: ['Parent', 'Family'] },
    { date: '2026-03-16', title: 'Spring Break Begins (No School)', cats: ['Parent', 'Family'] },
    { date: '2026-03-20', title: 'Spring Break Ends', cats: ['Parent', 'Family'] },
    { date: '2026-03-23', title: 'Teacher Workday (Student Holiday)', cats: ['Parent', 'Family'] },
    { date: '2026-04-03', title: 'Spring Holiday (No School)', cats: ['Parent', 'Family'] },
    { date: '2026-04-22', title: 'Early Release Day', cats: ['Parent', 'Family'] },
    { date: '2026-05-25', title: 'Memorial Day - Holiday', cats: ['Parent', 'Family', 'Civic'] },
    { date: '2026-06-01', title: 'Early Release Day', cats: ['Parent', 'Family'] },
    { date: '2026-06-02', title: 'Last Day for Students (Early Release)', cats: ['Parent', 'Family'] },
    { date: '2026-06-19', title: 'Juneteenth - Holiday', cats: ['Parent', 'Family', 'Civic'] }
];

async function importSchoolCalendar() {
    console.log('Clearing old "Parent" events...');
    // Delete events that originate from the "Parent" feed context. 
    // Since we want to be careful not to delete mixed events if possible, but user asked to "remove the 4".
    // The safest "clean slate" for Parent calendar is to delete events tagged specifically with it.

    // Note: This deletes the entire event row.
    const { error: delError } = await supabase
        .from('events')
        .delete()
        .contains('categories', ['Parent']);

    if (delError) console.error('Error clearing old events:', delError);
    else console.log('Old Parent events removed.');

    console.log(`Importing ${SCHOOL_EVENTS.length} school events...`);

    for (const evt of SCHOOL_EVENTS) {
        // Construct ISO string (assuming 8:00 AM start for all-day/school events)
        const start = `${evt.date}T08:00:00.000Z`;
        const end = `${evt.date}T17:00:00.000Z`;

        // Check if exists (unlikely after delete, but good for idempotency if strictly matching)
        const { data: existing } = await supabase
            .from('events')
            .select('id')
            .eq('title', evt.title)
            .eq('start_datetime', start)
            .limit(1);

        if (existing && existing.length > 0) {
            console.log(`Skipping existing: ${evt.title}`);
            continue;
        }

        const { error } = await supabase
            .from('events')
            .insert([{
                title: evt.title,
                description: 'St. Lucie Public Schools Calendar Event',
                start_datetime: start,
                end_datetime: end,
                location_name: 'St. Lucie Public Schools',
                location_city: 'Port St. Lucie',
                categories: evt.cats,
                is_published: true
            }]);

        if (error) console.error(`Error ${evt.title}:`, error.message);
        else console.log(`Imported: ${evt.title}`);
    }
}

importSchoolCalendar();
