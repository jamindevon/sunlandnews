require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

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
        .select('title, start_datetime, location_city, categories, is_published')
        .order('start_datetime', { ascending: true });

    if (error) {
        console.error('Error fetching events:', error);
        return;
    }

    if (events.length === 0) {
        console.log('❌ No events found in database.');
    } else {
        console.log(`✅ Found ${events.length} events:\n`);
        events.forEach(e => {
            console.log(`- [${new Date(e.start_datetime).toLocaleDateString()}] ${e.title}`);
            console.log(`  📍 ${e.location_city} | 🏷️  ${e.categories.join(', ')}`);
            console.log(`  Published: ${e.is_published ? 'Yes' : 'No'}\n`);
        });
    }
}

checkEvents();
