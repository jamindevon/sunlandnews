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
        .select('*')
        .eq('is_published', true)
        .order('start_datetime', { ascending: true });

    if (error) {
        console.error(error);
        return;
    }

    const events = allEvents.filter(event => {
        if (!event.categories) return false;
        const cats = Array.isArray(event.categories) ? event.categories : Object.keys(event.categories).map(k => event.categories[k]);
        
        return cats.some(c => {
            const name = typeof c === 'string' ? c : c?.name;
            return name === 'Big Events';
        });
    });

    console.log(`Found ${events.length} Big Events`);
    const trombone = events.find(e => e.title.includes('Trombone'));
    console.log('Trombone:', trombone);
}
test();
