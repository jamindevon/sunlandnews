import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load env vars from .env.local manually since we might not have dotenv
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sampleEvents = [
    {
        title: "Fort Pierce Farmers Market",
        description: "Fresh local produce, artisanal goods, and live music. Come early for the best selection!",
        start_datetime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
        end_datetime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(), // +4 hours
        location_name: "Downtown Fort Pierce",
        location_address: "101 Melody Ln, Fort Pierce, FL 34950",
        categories: ["food", "music", "family"],
        price: "Free",
        is_published: true,
        is_recurring: true,
        recurrence_rule: "FREQ=WEEKLY;BYDAY=SA"
    },
    {
        title: "Sunset Concert Series",
        description: "Live music by local bands. Bring blankets and lawn chairs!",
        start_datetime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000).toISOString(), // 3 days from now, 6pm
        end_datetime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000).toISOString(), // +2 hours
        location_name: "Riverside Park",
        categories: ["music", "outdoors"],
        price: "Free",
        is_published: true
    },
    {
        title: "Downtown Art Walk",
        description: "Gallery openings, street performers, and local artists.",
        start_datetime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 17 * 60 * 60 * 1000).toISOString(), // 5 days from now, 5pm
        end_datetime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 21 * 60 * 60 * 1000).toISOString(), // +4 hours
        location_name: "Downtown Arts District",
        categories: ["arts", "culture"],
        price: "Free",
        is_published: true
    },
    {
        title: "Food Truck Friday",
        description: "Rotating selection of gourmet food trucks.",
        start_datetime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 17 * 60 * 60 * 1000).toISOString(), // 6 days from now, 5pm
        end_datetime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 21 * 60 * 60 * 1000).toISOString(), // +4 hours
        location_name: "City Hall Plaza",
        categories: ["food"],
        price: "Free",
        is_published: true,
        is_recurring: true,
        recurrence_rule: "FREQ=WEEKLY;BYDAY=FR"
    }
];

async function seedEvents() {
    console.log('Seeding events...');

    const { data, error } = await supabase
        .from('events')
        .insert(sampleEvents)
        .select();

    if (error) {
        console.error('Error seeding events:', error);
    } else {
        console.log(`Successfully added ${data.length} events!`);
    }
}

seedEvents();
