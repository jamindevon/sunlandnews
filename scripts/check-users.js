import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
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

async function checkUsers() {
    console.log('🔍 Checking users table...');

    const { data: users, error } = await supabase
        .from('users')
        .select('*');

    if (error) {
        console.error('❌ Error fetching users:', error);
        return;
    }

    console.log(`found ${users.length} users.`);
    users.forEach(u => {
        console.log(`- ${u.email} (Token: ${u.calendar_token}) [Sub: ${u.subscription_status}]`);
    });
}

checkUsers();
