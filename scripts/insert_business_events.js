import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

const rawEvents = [
    { title: "Marketing with a Mission (1st Mondays)", start: "March 2 2026 11:45 AM EST" },
    { title: "PSL - TC Premier Women's Network", start: "March 3 2026 11:30 AM EST" },
    { title: "Shameless Promotion and Muffins", start: "March 4 2026 8:15 AM EST" },
    { title: "Power in the Fort: Women's Luncheon", start: "March 4 2026 11:30 AM EST" },
    { title: "Coffee with the Chair", start: "March 5 2026 8:15 AM EST" },
    { title: "Connectsphere Social Networking", start: "March 5 2026 6:00 PM EST" },
    { title: "Speed Networking (1st Friday)", start: "March 6 2026 8:15 AM EST" },
    { title: "NetWALKing in Tradition", start: "March 7 2026 7:00 AM EST" },
    { title: "Networking Breakfast (Fort Pierce)", start: "March 10 2026 8:15 AM EST" },
    { title: "Shameless Promotion and Muffins", start: "March 11 2026 8:15 AM EST" },
    { title: "Martini Network", start: "March 11 2026 6:00 PM EST" },
    { title: "Coffee with a Grant Writer", start: "March 13 2026 9:00 AM EST" },
    { title: "Vero - TC Premier Women's Network", start: "March 13 2026 11:30 AM EST" },
    { title: "NetWALKing in Tradition", start: "March 14 2026 7:00 AM EST" },
    { title: "Sweat & Connect", start: "March 14 2026 8:15 AM EST" },
    { title: "Marketing with a Mission (3rd Mondays)", start: "March 16 2026 11:45 AM EST" },
    { title: "Coffee with the Council", start: "March 17 2026 9:00 AM EST" },
    { title: "Fort Pierce Business Exchange Luncheon", start: "March 17 2026 12:00 PM EST" },
    { title: "Shameless Promotion and Muffins", start: "March 18 2026 8:15 AM EST" },
    { title: "Honoring a Life Saver - Networking Breakfast", start: "March 18 2026 8:30 AM EST" },
    { title: "Stuart - TC Premier Women's Network", start: "March 18 2026 11:30 AM EST" },
    { title: "Covering the Bases", start: "March 18 2026 12:00 PM EST" },
    { title: "Speed Networking (3rd Friday)", start: "March 20 2026 8:15 AM EST" },
    { title: "NetWALKing in Tradition", start: "March 21 2026 7:00 AM EST" },
    { title: "Networking Breakfast (Port St. Lucie)", start: "March 24 2026 8:15 AM EST" },
    { title: "Shameless Promotion and Muffins", start: "March 25 2026 8:15 AM EST" },
    { title: "NetWALKing in Tradition", start: "March 28 2026 7:00 AM EST" },
    { title: "PSLBC: Coffee & Connections Business...", start: "March 31 2026 7:45 AM EST" }
];

async function insertBusinessEvents() {
    const dbEvents = rawEvents.map(e => {
        const start = new Date(e.start);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours

        return {
            title: e.title,
            description: "Business & Networking Event",
            start_datetime: start.toISOString(),
            end_datetime: end.toISOString(),
            location_name: "See Details",
            location_city: "Treasure Coast",
            categories: ["Business"],
            is_published: true
        };
    });

    const { data, error } = await supabase.from('events').insert(dbEvents).select('id');
    if (error) {
        console.error("Error inserting:", error);
    } else {
        console.log(`Successfully inserted ${data.length} business events!`);
    }
}

insertBusinessEvents();
