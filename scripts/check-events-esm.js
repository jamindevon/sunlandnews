import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

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

async function checkEvents() {
    console.log('🔍 Checking events in database...');

    const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .order('start_datetime', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error fetching events:', error);
        return;
    }

    if (events.length === 0) {
        console.log('❌ No events found in database.');
    } else {
        console.log(`✅ Found ${events.length} recent events:\n`);
        events.forEach(e => {
            console.log(`- Title: ${e.title}`);
            console.log(`  Start: ${e.start_datetime} (Type: ${typeof e.start_datetime})`);
            console.log(`  End:   ${e.end_datetime}`);
            console.log(`  City:  ${e.location_city}`);
            console.log(`  Cats:  ${JSON.stringify(e.categories)}`);
            console.log(`  Published: ${e.is_published}\n`);
        });
    }
}

checkEvents();
