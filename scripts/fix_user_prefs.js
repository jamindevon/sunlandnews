
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TOKEN = '1cc73dffe5604a31bd484856711d2939';

async function fixUser() {
    console.log(`🔧 Repairing User: ${TOKEN}`);

    // Get User
    const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('calendar_token', TOKEN)
        .single();

    if (!user) {
        console.error('User not found.');
        return;
    }

    // New Correct Preferences (based on what they seemingly wanted)
    // Mapping: Family Events -> Family, Community -> Civic, Nightlife -> Date Night
    const NEW_INTERESTS = [
        'Live Music',
        'Family',
        'Civic',
        'Date Night',
        'Outdoor',
        'Big Events'
    ];

    const { error } = await supabase
        .from('user_preferences')
        .update({ interests: NEW_INTERESTS })
        .eq('user_id', user.id);

    if (error) console.error('Error updating:', error);
    else console.log('✅ User preferences updated to valid categories:', NEW_INTERESTS);
}

fixUser();
