
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const OLD_TOKEN = '1cc73dffe5604a31bd484856711d2939';

async function rotateToken() {
    const newToken = crypto.randomBytes(16).toString('hex');
    console.log(`🔄 Rotating Token...`);
    console.log(`Old: ${OLD_TOKEN}`);
    console.log(`New: ${newToken}`);

    const { data, error } = await supabase
        .from('users')
        .update({ calendar_token: newToken })
        .eq('calendar_token', OLD_TOKEN)
        .select();

    if (error) {
        console.error('❌ Error rotating token:', error);
    } else {
        console.log('✅ Token Rotated Successfully.');
        console.log(`🔗 New Link: https://sunlandnews.com/cal/${newToken}`);
    }
}

rotateToken();
