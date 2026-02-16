
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const events = [
    // === FREE TIER: PARENT CALENDAR ===
    {
        title: "School Board Meeting - February",
        start_datetime: "2026-02-18T18:00:00",
        end_datetime: "2026-02-18T20:00:00",
        location_name: "District Office",
        location_city: "Port St. Lucie",
        description: "Monthly school board meeting. Public comment period at 6:30 PM.",
        categories: ['Parent', 'Civic'],
        is_published: true
    },
    {
        title: "Early Release Day - Teacher Planning",
        start_datetime: "2026-02-20T11:30:00",
        end_datetime: "2026-02-20T11:30:00",
        location_name: "All Schools",
        location_city: "St. Lucie County",
        description: "Students dismissed at 11:30 AM for teacher planning.",
        categories: ['Parent'],
        is_published: true
    },
    {
        title: "Presidents Day - No School",
        start_datetime: "2026-02-16T00:00:00",
        end_datetime: "2026-02-16T23:59:00",
        location_name: "All Schools",
        location_city: "St. Lucie County",
        description: "Schools closed for Presidents Day holiday.",
        categories: ['Parent'],
        is_published: true
    },

    // === FREE TIER: CIVIC CALENDAR ===
    {
        title: "Port St. Lucie City Council Meeting",
        start_datetime: "2026-02-23T18:00:00",
        end_datetime: "2026-02-23T21:00:00",
        location_name: "City Hall",
        location_city: "Port St. Lucie",
        description: "Regular city council meeting. Public comments welcome.",
        categories: ['Civic'],
        is_published: true
    },
    {
        title: "St. Lucie County Commission Meeting",
        start_datetime: "2026-02-24T09:00:00",
        end_datetime: "2026-02-24T12:00:00",
        location_name: "County Administration Building",
        location_city: "Fort Pierce",
        description: "Regular commission meeting. Agenda available online.",
        categories: ['Civic'],
        is_published: true
    },
    {
        title: "Planning & Zoning Board",
        start_datetime: "2026-02-26T18:00:00",
        end_datetime: "2026-02-26T20:00:00",
        location_name: "City Hall",
        location_city: "Port St. Lucie",
        description: "Review of development applications and zoning changes.",
        categories: ['Civic'],
        is_published: true
    },

    // === FREE TIER: BIG EVENTS ===
    {
        title: "St. Lucie County Fair",
        start_datetime: "2026-02-27T16:00:00",
        end_datetime: "2026-03-08T23:00:00",
        location_name: "Fairgrounds",
        location_city: "Fort Pierce",
        description: "Annual county fair with rides, games, livestock shows, and concerts.",
        categories: ['Big Events', 'Family'],
        is_published: true
    },
    {
        title: "Mardi Gras Parade & Festival",
        start_datetime: "2026-02-17T18:00:00",
        end_datetime: "2026-02-17T22:00:00",
        location_name: "Downtown",
        location_city: "Fort Pierce",
        description: "Parade, live music, food vendors, and beads!",
        categories: ['Big Events'],
        is_published: true
    },

    // === PAID: LIVE MUSIC ===
    {
        title: "Jazz in the Park",
        start_datetime: "2026-02-06T18:00:00",
        end_datetime: "2026-02-06T20:30:00",
        location_name: "Riverwalk Center",
        location_city: "Fort Pierce",
        description: "Live smooth jazz by the water. Bring a blanket!",
        categories: ['Live Music', 'Outdoor'],
        is_published: true
    },
    {
        title: "Acoustic Night at The Vine",
        start_datetime: "2026-02-14T19:00:00",
        end_datetime: "2026-02-14T22:00:00",
        location_name: "The Vine Wine Bar",
        location_city: "Port St. Lucie",
        description: "Local singer-songwriter showcase. No cover.",
        categories: ['Live Music', 'Date Night'],
        is_published: true
    },

    // === PAID: DATE NIGHT ===
    {
        title: "Valentine's Art Stroll",
        start_datetime: "2026-02-14T17:00:00",
        end_datetime: "2026-02-14T21:00:00",
        location_name: "Downtown Arts District",
        location_city: "Fort Pierce",
        description: "Romantic evening stroll featuring local artists and street performers.",
        categories: ['Date Night'],
        is_published: true
    },
    {
        title: "Wine & Paint Night",
        start_datetime: "2026-02-21T19:00:00",
        end_datetime: "2026-02-21T21:30:00",
        location_name: "Canvas & Cocktails",
        location_city: "Port St. Lucie",
        description: "Couples painting class with wine. $65/couple.",
        categories: ['Date Night'],
        is_published: true
    },

    // === PAID: BUSINESS & NETWORKING ===
    {
        title: "Chamber Networking Breakfast",
        start_datetime: "2026-02-05T08:00:00",
        end_datetime: "2026-02-05T09:30:00",
        location_name: "Hilton Garden Inn",
        location_city: "Port St. Lucie",
        description: "Monthly chamber breakfast. Bring business cards!",
        categories: ['Business'],
        is_published: true
    },
    {
        title: "Tech Founders Meetup",
        start_datetime: "2026-02-19T18:00:00",
        end_datetime: "2026-02-19T20:00:00",
        location_name: "Innovation Hub",
        location_city: "Port St. Lucie",
        description: "Meet local developers, founders, and tech enthusiasts.",
        categories: ['Business'],
        is_published: true
    },

    // === PAID: FAMILY ACTIVITIES ===
    {
        title: "Kids Science Saturday",
        start_datetime: "2026-02-07T10:00:00",
        end_datetime: "2026-02-07T12:00:00",
        location_name: "Library",
        location_city: "Port St. Lucie",
        description: "Hands-on science experiments for ages 5-12. Free!",
        categories: ['Family'],
        is_published: true
    },
    {
        title: "Family Movie Night in the Park",
        start_datetime: "2026-02-28T18:30:00",
        end_datetime: "2026-02-28T21:00:00",
        location_name: "Veteran's Park",
        location_city: "Port St. Lucie",
        description: "Bring blankets and chairs. Popcorn provided!",
        categories: ['Family', 'Outdoor'],
        is_published: true
    },

    // === PAID: OUTDOOR & FITNESS ===
    {
        title: "Saturday Morning Yoga",
        start_datetime: "2026-02-07T08:00:00",
        end_datetime: "2026-02-07T09:00:00",
        location_name: "Botanical Gardens",
        location_city: "Fort Pierce",
        description: "Free outdoor yoga. All levels welcome. Bring a mat.",
        categories: ['Outdoor'],
        is_published: true
    },
    {
        title: "5K Fun Run for Charity",
        start_datetime: "2026-02-22T07:00:00",
        end_datetime: "2026-02-22T09:00:00",
        location_name: "Riverwalk",
        location_city: "Fort Pierce",
        description: "Chip-timed 5K benefiting local schools. $25 registration.",
        categories: ['Outdoor'],
        is_published: true
    }
];

async function migrateEvents() {
    console.log(`Migrating ${events.length} events to Supabase...`);

    for (const event of events) {
        // Prepare event for insertion (remove is_free_tier since it doesn't exist)
        const eventToInsert = { ...event };
        delete eventToInsert.is_free_tier;

        // Add 'Free Tier' category if it was marked as free
        if (event.is_free_tier && !eventToInsert.categories.includes('Free Tier')) {
            eventToInsert.categories.push('Free Tier');
        }

        // 1. Check if event exists
        const { data: existingEvents } = await supabase
            .from('events')
            .select('id')
            .eq('title', event.title)
            .eq('start_datetime', event.start_datetime)
            .limit(1);

        if (existingEvents && existingEvents.length > 0) {
            console.log(`Skipping "${event.title}" (Already exists)`);
            continue;
        }

        // 2. Insert if not exists
        const { data, error } = await supabase
            .from('events')
            .insert([eventToInsert])
            .select();

        if (error) {
            console.error(`Error inserting "${event.title}":`, error.message);
        } else {
            console.log(`Successfully inserted: "${event.title}"`);
        }
    }

    console.log('Migration complete.');
}

migrateEvents();
