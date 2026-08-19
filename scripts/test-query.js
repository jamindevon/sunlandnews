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

async function run() {
    console.log('Testing .contains(\'categories\', [\'Free Tier\'])...');
    try {
        const { data: res1, error: err1 } = await supabase
            .from('events')
            .select('id, title, categories')
            .eq('is_published', true)
            .contains('categories', ['Free Tier'])
            .limit(5);

        if (err1) {
            console.error('Query 1 failed:', err1);
        } else {
            console.log('Query 1 success. Count:', res1.length);
        }
    } catch (e) {
        console.error('Query 1 crashed:', e);
    }

    console.log('Testing .contains(\'categories\', JSON.stringify([\'Free Tier\']))...');
    try {
        const { data: res2, error: err2 } = await supabase
            .from('events')
            .select('id, title, categories')
            .eq('is_published', true)
            .contains('categories', JSON.stringify(['Free Tier']))
            .limit(5);

        if (err2) {
            console.error('Query 2 failed:', err2);
        } else {
            console.log('Query 2 success. Count:', res2.length);
        }
    } catch (e) {
        console.error('Query 2 crashed:', e);
    }
}

run();
