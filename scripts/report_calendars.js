
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const CALENDARS = [
    { id: 'parent', name: 'Parent', cats: ['Parent'] },
    { id: 'civic', name: 'Civic', cats: ['Civic'] },
    { id: 'big-events', name: 'Big Events', cats: ['Big Events'] },
    { id: 'live-music', name: 'Live Music', cats: ['Live Music'] },
    { id: 'date-night', name: 'Date Night', cats: ['Date Night'] },
    { id: 'business', name: 'Business', cats: ['Business'] },
    { id: 'family', name: 'Family', cats: ['Family'] },
    { id: 'outdoor', name: 'Outdoor', cats: ['Outdoor'] }
];

async function report() {
    console.log('\n--- Calendar Status Report ---\n');

    // Fetch all events once to save calls (or filter JS side for simplicity if dataset < 1000)
    const { data: allEvents, error } = await supabase
        .from('events')
        .select('categories')
        .gte('start_datetime', '2026-01-01');

    if (error) {
        console.error('Error fetching events:', error);
        return;
    }

    for (const cal of CALENDARS) {
        // In-memory filter handles the JSON array reliably
        const count = allEvents.filter(e =>
            Array.isArray(e.categories) &&
            e.categories.some(c => cal.cats.includes(c))
        ).length;

        console.log(`📅 ${cal.name.toUpperCase()}`);
        console.log(`   Events: ${count}`);
        console.log(`   Link:   https://sunlandnews.com/calendars/${cal.id}.ics`);
        console.log('');
    }
}

report();
