
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const events = [
    {
        title: "Groundhog Day Community Breakfast",
        start_datetime: "2026-02-02T08:00:00",
        end_datetime: "2026-02-02T10:00:00",
        location_name: "Community Center",
        location_city: "Port St. Lucie",
        description: "Will he see his shadow? Join us for pancakes and predictions.",
        categories: ['Family/Kids', 'Food & Drink', 'Free Tier'], // Added Free Tier directly
        is_published: true
    },
    {
        title: "Jazz in the Park Series",
        start_datetime: "2026-02-06T18:00:00",
        end_datetime: "2026-02-06T20:30:00",
        location_name: "Riverwalk Center",
        location_city: "Fort Pierce",
        description: "Live smooth jazz by the water. Bring a blanket!",
        categories: ['Live Music', 'Outdoors', 'Free Tier'],
        is_published: true
    },
    {
        title: "Valentine's Day Art Stroll",
        start_datetime: "2026-02-14T17:00:00",
        end_datetime: "2026-02-14T21:00:00",
        location_name: "Downtown Arts District",
        location_city: "Fort Pierce",
        description: "Romantic evening stroll featuring local artists and street performers.",
        categories: ['Arts & Culture', 'Holiday', 'Free Tier'],
        is_published: true
    },
    {
        title: "St. Lucie County Fair Opening Night",
        start_datetime: "2026-02-27T16:00:00",
        end_datetime: "2026-02-27T23:00:00",
        location_name: "Fairgrounds",
        location_city: "Fort Pierce",
        description: "Rides, games, and fried food! The fair is back in town.",
        categories: ['Family/Kids', 'Outdoors', 'Free Tier'],
        is_published: true
    },
    {
        title: "Tech Networking Mixer",
        start_datetime: "2026-02-19T18:00:00",
        end_datetime: "2026-02-19T20:00:00",
        location_name: "Innovation Hub",
        location_city: "Port St. Lucie",
        description: "Meet local developers, founders, and tech enthusiasts.",
        categories: ['Networking', 'Technology', 'Free Tier'],
        is_published: true
    }
];

async function migrateEvents() {
    console.log(`Migrating ${events.length} events to Supabase...`);

    for (const event of events) {
        // Prepare event for insertion (remove is_free_tier since it doesn't exist)
        const eventToInsert = { ...event };
        delete eventToInsert.is_free_tier;

        // Add 'Free Tier' category if it was marked as free
        if (event.is_free_tier && !eventToInsert.categories.includes('Free Tier')) {
            eventToInsert.categories.push('Free Tier');
        }

        // 1. Check if event exists
        const { data: existingEvents } = await supabase
            .from('events')
            .select('id')
            .eq('title', event.title)
            .eq('start_datetime', event.start_datetime)
            .limit(1);

        if (existingEvents && existingEvents.length > 0) {
            console.log(`Skipping "${event.title}" (Already exists)`);
            continue;
        }

        // 2. Insert if not exists
        const { data, error } = await supabase
            .from('events')
            .insert([eventToInsert])
            .select();

        if (error) {
            console.error(`Error inserting "${event.title}":`, error.message);
        } else {
            console.log(`Successfully inserted: "${event.title}"`);
        }
    }

    console.log('Migration complete.');
}

migrateEvents();
