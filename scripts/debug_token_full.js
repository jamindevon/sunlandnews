
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TOKEN = '1cc73dffe5604a31bd484856711d2939';

async function debugFull() {
    console.log(`🔍 FULL DEBUG: ${TOKEN}`);

    // 1. Get User & Prefs
    const { data: user } = await supabase.from('users').select('id, email').eq('calendar_token', TOKEN).single();
    if (!user) return console.log('❌ User not found');

    const { data: prefs } = await supabase.from('user_preferences').select('*').eq('user_id', user.id).single();
    console.log('📋 PREFS:', JSON.stringify(prefs, null, 2));

    // 2. Fetch Events (Simulate Route)
    const { data: events } = await supabase.from('events').select('*').eq('is_published', true).gte('start_datetime', '2026-01-01');
    console.log(`📚 Total Published Events in DB: ${events.length}`);

    // 3. Filter Logic (Copy-Pasted from route.js)
    const filteredEvents = events.filter(event => {
        // A. Interest Match
        const userInterests = prefs?.interests || [];
        const eventCategories = event.categories || [];
        // Normalization: specific Check
        const hasInterestMatch = userInterests.length === 0 || eventCategories.some(cat => userInterests.includes(cat));

        // B. Location Match
        const userLoc = prefs?.location_preference;
        const eventCity = event.location_city || '';
        let hasLocationMatch = true;

        if (userLoc === 'fort_pierce') {
            hasLocationMatch = eventCity && eventCity.toLowerCase().includes('fort pierce');
        } else if (userLoc === 'psl_fp') {
            hasLocationMatch = (eventCity && eventCity.toLowerCase().includes('fort pierce')) || (eventCity && eventCity.toLowerCase().includes('port st. lucie'));
        }
        // 'all_slc' or 'treasure_coast' or empty usually implies ALL, so we don't return false.

        const result = hasInterestMatch && hasLocationMatch;
        return result;
    });

    console.log(`✅ MATCHED EVENTS: ${filteredEvents.length}`);
    if (filteredEvents.length > 0) {
        console.log('Top 5 Matches:');
        filteredEvents.slice(0, 5).forEach(e => console.log(`- ${e.title} (${e.location_city}) [${e.categories.join(', ')}]`));
    }
}

debugFull();
