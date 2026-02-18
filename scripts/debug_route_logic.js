
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function debugRoute() {
    console.log('🤖 Simulating Route Logic...');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all published events (COPIED FROM ROUTE)
    const { data: allEvents, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .order('start_datetime', { ascending: true });

    if (error) {
        console.error('Error fetching events:', error);
        return;
    }

    console.log(`📥 Total Events Fetched: ${allEvents.length}`);

    // Filter events (COPIED FROM ROUTE)
    const events = allEvents.filter(event => {
        if (!event.categories) return false;
        const cats = Array.isArray(event.categories) ? event.categories : [event.categories];
        const match = cats.some(c => {
            const name = typeof c === 'string' ? c : c?.name;
            // console.log(`Checking ${name} against Big Events`);
            return name === 'Big Events';
        });
        if (match) console.log(`✅ MATCH: ${event.title} [${JSON.stringify(event.categories)}]`);
        return match;
    });

    console.log(`🎯 Final Count: ${events.length}`);
}

debugRoute();
