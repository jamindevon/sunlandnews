
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function forceCreateUser() {
    const email = 'jamindevonbrown@gmail.com';
    console.log(`🚀 Force creating user: ${email}...`);

    const calendarToken = uuidv4().replace(/-/g, '');

    // 1. Upsert User
    const { data: user, error: userError } = await supabase
        .from('users')
        .upsert([
            {
                email,
                calendar_token: calendarToken,
                subscription_status: 'active',
                subscription_expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
            },
        ], { onConflict: 'email' })
        .select()
        .single();

    if (userError) {
        console.error('❌ Error creating user:', userError);
        return;
    }

    console.log(`✅ User created/updated!`);
    console.log(`   ID: ${user.id}`);
    console.log(`   Token: ${user.calendar_token}`);

    // 2. Create Preferences
    const { error: prefError } = await supabase
        .from('user_preferences')
        .insert([
            {
                user_id: user.id,
                interests: ["food", "music", "arts", "outdoors", "family"],
                location_preference: "all_slc",
            },
        ]);

    if (prefError && !prefError.message.includes('duplicate key')) {
        console.error('⚠️ Error creating preferences (might already exist):', prefError.message);
    } else {
        console.log('✅ Preferences created.');
    }

    console.log('\n🎉 DIRECT LINK:');
    console.log(`https://www.sunlandnews.com/calendar/setup?token=${user.calendar_token}&new=true`);
}

forceCreateUser();
