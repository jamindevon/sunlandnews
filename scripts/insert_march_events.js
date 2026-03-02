import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const categoryMap = {
    'INTERESTING': ['Big Events', 'Live Music'],
    'DATE NIGHT': ['Date Night'],
    'MARKETS & MAKERS': ['Outdoor', 'Business'],
    'SOCIAL & COMMUNITY': ['Civic', 'Family']
};

async function insertEvents() {
    const rawData = fs.readFileSync(join(__dirname, 'parsed_march_events.json'), 'utf-8');
    const parsedEvents = JSON.parse(rawData);

    // Filter out items that failed date parsing
    const validEvents = parsedEvents.filter(e => e.parsed_time);

    console.log(`Starting insertion of ${validEvents.length} valid events...`);

    const dbEvents = validEvents.map(e => {
        const start = new Date(e.parsed_time);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours

        return {
            title: e.title,
            description: e.description + (e.price ? ` | Price: ${e.price}` : '') + (e.url ? ` | Link: ${e.url}` : ''),
            start_datetime: start.toISOString(),
            end_datetime: end.toISOString(),
            location_name: e.location || 'See Details',
            location_city: e.location ? e.location.split(',').pop().trim() : 'Treasure Coast',
            categories: categoryMap[e.category] || ['Big Events'],
            is_published: true
        };
    });

    // Chunk the inserts into chunks of 50 to avoid timeout/size limits
    const CHUNK_SIZE = 50;
    for (let i = 0; i < dbEvents.length; i += CHUNK_SIZE) {
        const chunk = dbEvents.slice(i, i + CHUNK_SIZE);
        const { data, error } = await supabase.from('events').insert(chunk).select('id');
        if (error) {
            console.error(`Error inserting chunk ${i / CHUNK_SIZE}:`, error);
        } else {
            console.log(`Successfully inserted chunk ${i / CHUNK_SIZE} (${chunk.length} events)`);
        }
    }

    console.log('Finished inserting events.');
}

insertEvents();
