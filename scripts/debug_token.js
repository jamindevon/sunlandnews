
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TOKEN = '1cc73dffe5604a31bd484856711d2939';

async function debug() {
    console.log(`🔍 Inspecting Token: ${TOKEN}`);

    // 1. Get User
    const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('calendar_token', TOKEN)
        .single();

    if (userError || !user) {
        console.error('❌ User not found or error:', userError);
        return;
    }
    console.log('✅ User Found:', user.email, `(Status: ${user.subscription_status})`);

    // 2. Get Preferences
    const { data: prefs } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

    console.log('📋 Stored Preferences:', prefs?.interests);

    // 3. Check Event Categories in DB
    const { data: categories } = await supabase
        .from('events')
        .select('categories')
        .limit(20);

    const distinctCats = new Set();
    categories.forEach(c => {
        if (Array.isArray(c.categories)) c.categories.forEach(cat => distinctCats.add(cat));
    });

    console.log('🗂  Actual Event Categories in DB:', [...distinctCats]);

    // 4. Compare
    console.log('\n--- Mismatch Check ---');
    if (prefs?.interests) {
        prefs.interests.forEach(interest => {
            const match = [...distinctCats].find(c => c === interest);
            if (match) console.log(`✅ '${interest}' matches DB category.`);
            else console.log(`❌ '${interest}' does NOT match any DB category!`);
        });
    }
}

debug();
