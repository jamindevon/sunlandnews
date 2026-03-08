import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function test() {
    const { data: allEvents, error } = await supabase
        .from('events')
        .select('title, categories, start_datetime')
        .eq('is_published', true);

    const marchEvents = allEvents.filter(e => {
        if (!e.start_datetime) return false;
        try {
            const d = new Date(e.start_datetime);
            return d.getFullYear() === 2026 && d.getMonth() === 2; // March is 2
        } catch(err) { return false; }
    });

    const events = marchEvents.filter(event => {
        if (!event.categories) return false;
        
        let cats = [];
        if (typeof event.categories === 'string') {
            try { cats = JSON.parse(event.categories); } catch(e) { cats = [event.categories]; }
        } else if (Array.isArray(event.categories)) {
            cats = event.categories;
        } else {
            cats = Object.values(event.categories);
        }
        
        return cats.some(c => {
            const name = typeof c === 'string' ? c : c?.name;
            return name === 'Big Events'; // Match specific category
        });
    });

    console.log(`Total active events in March: ${marchEvents.length}`);
    console.log(`Matched Big Events in March: ${events.length}`);
    if (events.length > 0) {
      console.log('Sample:', events[0].title);
    }
}
test();
