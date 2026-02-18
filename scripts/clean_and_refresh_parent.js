
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

async function cleanAndRefresh() {
    // 1. Fetch ALL events to safely identify Parent ones
    const { data: allEvents, error: fetchError } = await supabase
        .from('events')
        .select('id, title, categories');

    if (fetchError) {
        console.error('Fetch error:', fetchError);
        return;
    }

    // Filter in JS
    const parentEventIds = allEvents
        .filter(e => Array.isArray(e.categories) && e.categories.includes('Parent'))
        .map(e => e.id);

    console.log(`Found ${parentEventIds.length} existing Parent events to delete.`);

    if (parentEventIds.length > 0) {
        const { error: delError } = await supabase
            .from('events')
            .delete()
            .in('id', parentEventIds);

        if (delError) console.error('Delete error:', delError);
        else console.log('✅ Successfully deleted old Parent events.');
    }

    // 2. Import New
    console.log(`Importing ${SCHOOL_EVENTS.length} school events...`);
    let imported = 0;

    for (const evt of SCHOOL_EVENTS) {
        const start = `${evt.date}T08:00:00.000Z`;
        const end = `${evt.date}T17:00:00.000Z`;

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
        else imported++;
    }
    console.log(`✅ Imported ${imported} new events.`);
}

cleanAndRefresh();
