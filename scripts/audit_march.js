import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function audit() {
    const { data: events, error } = await supabase
        .from('events')
        .select('title, start_datetime, categories');

    let count = 0;
    events.forEach(e => {
        const date = new Date(e.start_datetime);
        if (date.getFullYear() === 2026 && date.getMonth() === 2) { // 2 = March
            const cats = Array.isArray(e.categories) ? e.categories : [e.categories];
            if (cats.includes('Big Events')) count++;
        }
    });
    console.log(`Total Big Events in March 2026: ${count}`);
}
audit();
