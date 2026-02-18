
import { createClient } from '@supabase/supabase-js';
import ical from 'ical-generator';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const TOKEN = '1cc73dffe5604a31bd484856711d2939';

async function investigate() {
    console.log('🔍 INVESTIGATION START');

    // 1. Check for "Groundhog" and "Jazz"
    const { data: earlyEvents } = await supabase
        .from('events')
        .select('title, start_datetime, categories')
        .or('title.ilike.%Groundhog%,title.ilike.%Jazz in%');

    console.log('\n--- Why did user see these? ---');
    earlyEvents.forEach(e => console.log(`[${e.start_datetime}] ${e.title} (${e.categories})`));

    // 2. Check for Batch 2 events (Feb 19+)
    const { data: batch2 } = await supabase
        .from('events')
        .select('title, start_datetime, categories')
        .gte('start_datetime', '2026-02-19')
        .limit(5);

    console.log('\n--- Batch 2 Sample (Should be there) ---');
    if (batch2.length === 0) console.log('❌ NO BATCH 2 EVENTS FOUND!');
    else batch2.forEach(e => console.log(`[${e.start_datetime}] ${e.title}`));

    // 3. Generate ICS Output (Simulate Route)
    console.log('\n--- Simulating Full Route Logic ---');

    // Get User & Prefs
    const { data: user } = await supabase.from('users').select('id, email').eq('calendar_token', TOKEN).single();
    const { data: prefs } = await supabase.from('user_preferences').select('*').eq('user_id', user.id).single();

    // Fetch Events 
    const { data: allEvents } = await supabase.from('events').select('*').eq('is_published', true).gte('start_datetime', '2026-01-01');

    // Filter
    const filtered = allEvents.filter(event => {
        const userInterests = prefs?.interests || [];
        const eventCategories = event.categories || [];
        // Interest Match
        const hasInterestMatch = userInterests.length === 0 || eventCategories.some(cat => userInterests.includes(cat));

        // Location Match
        let hasLocationMatch = true; // Simplified for debug, assuming 'treasure_coast' matches all

        return hasInterestMatch && hasLocationMatch;
    });

    console.log(`✅ Filtered Count: ${filtered.length}`);

    // Generate ICS
    const calendar = ical({ name: 'Debug Cal', url: 'http://test.com' });
    let added = 0;

    filtered.forEach(event => {
        try {
            calendar.createEvent({
                start: new Date(event.start_datetime),
                end: new Date(event.end_datetime),
                summary: event.title,
                description: event.description,
                location: event.location_name,
                url: event.url
            });
            added++;
        } catch (e) {
            console.error(`❌ Failed to add event: ${event.title}`, e.message);
        }
    });

    console.log(`📅 ICS Events Created: ${added}`);

    // Check output size
    const icsString = calendar.toString();
    console.log(`📦 ICS Size: ${icsString.length} bytes`);
    console.log('--- First 500 chars of ICS ---');
    console.log(icsString.substring(0, 500));
}

investigate();
