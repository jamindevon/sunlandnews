
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkParentEvents() {
    const { data: events, error } = await supabase
        .from('events')
        .select('title, start_datetime, categories')
        .gte('start_datetime', '2026-01-01')
        .order('start_datetime', { ascending: true });

    if (error) {
        console.error('Error:', error);
        return;
    }

    const parentEvents = events.filter(e => Array.isArray(e.categories) && e.categories.includes('Parent'));

    console.log(`Total Parent Events (2026+): ${parentEvents.length}`);
    parentEvents.forEach(e => console.log(`- [${new Date(e.start_datetime).toLocaleDateString()}] ${e.title}`));
}

checkParentEvents();
