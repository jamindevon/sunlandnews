import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fixTimes() {
    console.log('Fetching all events...');
    const { data: events, error } = await supabase.from('events').select('id, start_datetime, end_datetime');
    if (error) {
        console.error(error);
        return;
    }

    console.log(`Found ${events.length} events to correct.`);
    const updates = [];

    // We only want to fix events that were imported incorrectly.
    // If an event is at 5:00 PM UTC in the DB, it was actually 12:00 PM EST.
    // Subtract 5 hours from all events in the database.
    for (const evt of events) {
        // evt.start_datetime is like '2026-03-02T00:00:00'

        let startObj = new Date(evt.start_datetime + 'Z'); // parse as UTC explicitly
        let endObj = new Date(evt.end_datetime + 'Z');

        // Subtract 5 hours
        startObj = new Date(startObj.getTime() - (5 * 60 * 60 * 1000));
        endObj = new Date(endObj.getTime() - (5 * 60 * 60 * 1000));

        // Format back to ISO without Z
        const newStart = startObj.toISOString().replace('Z', '');
        const newEnd = endObj.toISOString().replace('Z', '');

        updates.push({
            id: evt.id,
            start_datetime: newStart,
            end_datetime: newEnd
        });
    }

    console.log(`Updating ${updates.length} events...`);
    const CHUNK_SIZE = 100;
    for (let i = 0; i < updates.length; i += CHUNK_SIZE) {
        const chunk = updates.slice(i, i + CHUNK_SIZE);
        const promises = chunk.map(u =>
            supabase.from('events').update({ start_datetime: u.start_datetime, end_datetime: u.end_datetime }).eq('id', u.id)
        );
        await Promise.all(promises);
        console.log(`Updated chunk ${i / CHUNK_SIZE}`);
    }
    console.log('Done!');
}

fixTimes();
