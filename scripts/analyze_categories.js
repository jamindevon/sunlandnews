
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function analyze() {
    console.log('🔍 Analyzing Categories...');

    const { data: events, error } = await supabase
        .from('events')
        .select('id, title, categories, is_published');

    if (error) {
        console.error('Error fetching events:', error);
        return;
    }

    const categoryCounts = {};
    const publishedCounts = { true: 0, false: 0 };
    let missingCats = 0;

    events.forEach(e => {
        publishedCounts[e.is_published]++;

        if (!e.categories) {
            missingCats++;
            return;
        }

        const cats = Array.isArray(e.categories) ? e.categories : [e.categories];
        cats.forEach(c => {
            const name = typeof c === 'string' ? c : c?.name || JSON.stringify(c);
            categoryCounts[name] = (categoryCounts[name] || 0) + 1;
        });
    });

    console.log('\n--- Status ---');
    console.log(`Total Events: ${events.length}`);
    console.log(`Published: ${publishedCounts.true}`);
    console.log(`Unpublished: ${publishedCounts.false}`);
    console.log(`No Categories: ${missingCats}`);

    console.log('\n--- Categories Found ---');
    console.table(categoryCounts);
}

analyze();
