
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Simulate a user who wants "Live Music" AND "Parent" stuff
const MOCK_USER_PREFS = {
    interests: ['Live Music', 'Parent'],
    location_preference: 'all_slc'
};

async function testSmartLink() {
    console.log(`\n🤖 Simulating Smart Link for user with interests: [${MOCK_USER_PREFS.interests.join(', ')}]\n`);

    const { data: events } = await supabase
        .from('events')
        .select('title, categories, location_city')
        .gte('start_datetime', '2026-02-17') // Future events
        .limit(50);

    const filtered = events.filter(event => {
        // EXACT LOGIC FROM route.js
        const userInterests = MOCK_USER_PREFS.interests || [];
        const eventCategories = event.categories || [];

        // Does event match ANY of user's interests?
        // e.g. User likes Music -> Event is Music -> Keep it.
        // e.g. User likes Parent -> Event is Parent -> Keep it.
        const hasInterestMatch = userInterests.length === 0 || eventCategories.some(cat => userInterests.includes(cat));

        if (!hasInterestMatch) return false;
        return true;
    });

    console.log(`✅ MATCHED ${filtered.length} events from database.`);
    console.log('--- Samples ---');
    filtered.slice(0, 10).forEach(e => {
        const cats = Array.isArray(e.categories) ? e.categories.join(', ') : e.categories;
        console.log(`[MATCH] ${e.title} (${cats})`);
    });
}

testSmartLink();
