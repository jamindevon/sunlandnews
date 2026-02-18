
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function audit() {
    console.log('🔍 Auditing Future Events (From Today)...');
    const today = new Date().toISOString();

    const { data: events, error } = await supabase
        .from('events')
        .select('title, start_datetime, categories');

    if (error) {
        console.error('Error fetching events:', error);
        return;
    }

    const categories = [
        'Big Events',
        'Civic',
        'Parent',
        'Live Music',
        'Family',
        'Outdoor',
        'Business',
        'Date Night'
    ];

    const stats = {};
    categories.forEach(c => stats[c] = { count: 0, examples: [] });

    events.forEach(e => {
        // Check if future
        if (new Date(e.start_datetime) < new Date()) return;

        const eventCats = Array.isArray(e.categories) ? e.categories : [e.categories];

        eventCats.forEach(cat => {
            // Check meaningful categories
            const normalizedCat = typeof cat === 'string' ? cat : cat.name;
            if (stats[normalizedCat]) {
                stats[normalizedCat].count++;
                if (stats[normalizedCat].examples.length < 3) {
                    stats[normalizedCat].examples.push(`${e.title} (${e.start_datetime.split('T')[0]})`);
                }
            }
        });
    });

    console.table(stats);
}

audit();
