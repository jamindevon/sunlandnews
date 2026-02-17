
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

// Helper to convert "7:30 PM" to ISO string with date
function combineDateTime(dateStr, timeStr) {
    // dateStr example: "February 19" (assume 2026)
    // timeStr example: "7:30 PM"

    // Normalize time
    let hours = 0;
    let minutes = 0;

    if (timeStr && timeStr.toLowerCase().includes('pm')) {
        const parts = timeStr.replace(/pm/i, '').trim().split(':');
        hours = parseInt(parts[0]);
        if (hours !== 12) hours += 12;
        minutes = parts[1] ? parseInt(parts[1]) : 0;
    } else if (timeStr && timeStr.toLowerCase().includes('am')) {
        const parts = timeStr.replace(/am/i, '').trim().split(':');
        hours = parseInt(parts[0]);
        if (hours === 12) hours = 0;
        minutes = parts[1] ? parseInt(parts[1]) : 0;
    } else {
        // Default to 12:00 PM if time is vague like "Evening" or "All Day"
        hours = 12;
    }

    const date = new Date(`${dateStr}, 2026`);
    date.setHours(hours, minutes, 0, 0);
    return date.toISOString();
}

// Category Mapping
const CATEGORY_MAP = {
    'INTERESTING': ['Big Events'], // Default fallback
    'MUSIC & NIGHTLIFE': ['Live Music', 'Date Night'],
    'WELLNESS': ['Outdoor', 'Family'],
    'ARTS & WORKSHOPS': ['Family', 'Big Events'], // Arts isn't a feed, map to Family/Big Events
    'Social & Community': ['Civic', 'Family']
};

// Raw Events Data
const rawEvents = [
    // INTERESTING
    { category: 'INTERESTING', date: 'February 19', title: 'Chris Botti', desc: 'Grammy-winning jazz trumpeter live at Sunrise Theatre, Fort Pierce.', time: '7:30 PM', location: 'Sunrise Theatre, Fort Pierce' },
    { category: 'INTERESTING', date: 'February 19', title: 'Paper Bead Making: 101', desc: 'Learn to transform paper into unique handmade beads in this guided art class.', time: '6:00 PM', location: 'TBD' },
    { category: 'INTERESTING', date: 'February 19', title: 'Frida Paint & Plant Workshop', desc: 'Paint a Frida-inspired planter and create your own planted masterpiece.', time: 'Evening', location: 'TBD' },
    { category: 'INTERESTING', date: 'February 19', title: 'ESE Parent Workshop', desc: 'Informative session on student engagement in secondary IEP meetings.', time: '2:30 PM', location: 'TBD', extra_cats: ['Parent'] },

    { category: 'INTERESTING', date: 'February 20', title: 'Jim Breuer – Find the Funny', desc: 'High-energy stand-up comedy at Sunrise Theatre.', time: '8:00 PM', location: 'Sunrise Theatre' },
    { category: 'INTERESTING', date: 'February 20', title: 'Sixtiesmania: A Journey Through the ’60s', desc: 'A nostalgic tribute concert celebrating iconic ’60s hits.', time: '7:00 PM', location: 'TBD' },
    { category: 'INTERESTING', date: 'February 20', title: 'Love at The Lynmoore', desc: 'Community evening with live music and nonprofit spotlight.', time: '5:30 PM', location: 'The Lynmoore' },

    { category: 'INTERESTING', date: 'February 21', title: 'Rhythm of The Dance', desc: 'International Irish dance and music spectacular.', time: '7:00 PM', location: 'TBD' },
    { category: 'INTERESTING', date: 'February 21', title: 'Florida AAU Karate District Championship', desc: 'Competitive martial arts championship event.', time: '6:00 PM', location: 'TBD' },
    { category: 'INTERESTING', date: 'February 21', title: '11th Annual Chimpathon 5K & 10K', desc: 'Charity run/walk benefiting Save the Chimps sanctuary.', time: 'Morning Event', location: 'TBD', extra_cats: ['Outdoor'] },
    { category: 'INTERESTING', date: 'February 21', title: 'Highwaymen Museum Soft Opening', desc: 'Celebration honoring Florida’s legendary Highwaymen artists.', time: 'Evening', location: 'Highwaymen Museum' },
    { category: 'INTERESTING', date: 'February 21', title: '36th Annual Downtown Stuart Art Festival', desc: '120+ artists showcasing fine art in historic downtown Stuart.', time: 'All Day', location: 'Downtown Stuart' },
    { category: 'INTERESTING', date: 'February 21', title: 'Kids Anti-Bullying Jiu-Jitsu Seminar', desc: 'Confidence-building martial arts workshop for youth.', time: 'Evening', location: 'TBD', extra_cats: ['Family'] },

    { category: 'INTERESTING', date: 'February 22', title: 'PROUD Tina – The Ultimate Tribute to Tina Turner', desc: 'Electrifying tribute concert experience.', time: '8:00 PM', location: 'TBD' },
    { category: 'INTERESTING', date: 'February 22', title: 'Ana Popovic – Dance To The Rhythm Tour', desc: 'Blues-rock powerhouse live in concert.', time: '7:00 PM', location: 'TBD' },
    { category: 'INTERESTING', date: 'February 22', title: 'A Celebration Under the Stars', desc: 'GraceWay Village gala fundraiser event.', time: 'Evening', location: 'TBD' },

    { category: 'INTERESTING', date: 'February 23', title: 'The Outlaws', desc: 'Legendary Southern rock band live in Stuart.', time: '7:00 PM', location: 'Stuart' },
    { category: 'INTERESTING', date: 'February 23', title: 'Power in the Fort – Coffee Hour', desc: 'Community coffee meetup and connection hour.', time: '5:00 PM', location: 'First Pierce', extra_cats: ['Business'] },

    { category: 'INTERESTING', date: 'February 24', title: 'Light and Lacy – Valerie Goodwin', desc: 'Textile art exhibition and mixed media showcase.', time: 'Multi-Day', location: 'TBD' },

    { category: 'INTERESTING', date: 'February 26', title: 'Brock Butler Band Debut @ Terra Fermata', desc: 'Live band debut performance.', time: '8:00 PM', location: 'Terra Fermata', extra_cats: ['Live Music'] },

    { category: 'INTERESTING', date: 'February 27', title: 'Garrison Keillor & Erica Rhodes (VIP Access)', desc: 'Premium theatre comedy experience.', time: '8:00 PM', location: 'Sunrise Theatre' },

    { category: 'INTERESTING', date: 'February 28', title: 'Stayin’ Alive – One Night of The Bee Gees', desc: 'Tribute concert featuring Bee Gees classics.', time: '7:00 PM', location: 'TBD' },
    { category: 'INTERESTING', date: 'February 28', title: 'Rise Of A Warrior – Live MMA Cage Fighting', desc: 'Action-packed amateur MMA and boxing event.', time: '4:00 PM', location: 'TBD' },
    { category: 'INTERESTING', date: 'February 28', title: 'One Act Play Festival', desc: 'Four short plays showcased at Pineapple Playhouse.', time: '12:00 PM', location: 'Pineapple Playhouse' },

    { category: 'INTERESTING', date: 'March 1', title: 'Trombone Shorty', desc: 'High-energy jazz and funk performance.', time: '7:00 PM', location: 'TBD' },
    { category: 'INTERESTING', date: 'March 1', title: 'Spyro Gyra', desc: 'Celebrating 50 years of jazz fusion excellence.', time: '7:00 PM', location: 'TBD' },
    { category: 'INTERESTING', date: 'March 1', title: 'Highwaymen Auction', desc: 'Art auction celebrating Florida Highwaymen legacy.', time: 'Evening', location: 'TBD' },

    // MUSIC & NIGHTLIFE
    { category: 'MUSIC & NIGHTLIFE', date: 'February 19', title: 'Abby Owens Live at Tipsy Tiki', desc: 'Live waterfront performance.', time: '7:00 PM', location: 'Tipsy Tiki' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 19', title: 'Ukulele Russ Live', desc: 'High-energy looping and funky ukulele mashups.', time: '9:00 PM', location: 'TBD' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 19', title: 'North Mississippi Allstars', desc: 'Southern rock and blues collective live in Stuart.', time: '7:00 PM', location: 'Stuart' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 19', title: 'Grateful Dawg Tribute', desc: 'Acoustic tribute to Garcia & Grisman collaborations.', time: '6:30 PM', location: 'TBD' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 19', title: 'Carl Owens Solo @ Riverside Cafe', desc: 'Country favorites live on the waterfront.', time: 'Evening', location: 'Riverside Cafe' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 19', title: 'Love at The Lynmoore', desc: 'Community evening with live music.', time: '6:00 PM', location: 'The Lynmoore' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 19', title: 'The Shakers – Live at Crawdaddy’s', desc: 'Soulful mix of blues, rock, and oldies.', time: '7:00 PM', location: 'Crawdaddy’s (Jensen Beach)' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 19', title: 'Open Mic – Priscilla’s Oasis', desc: 'Acoustic and variety open mic night.', time: '7:00 PM', location: 'Priscilla’s Oasis (Fort Pierce)' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 19', title: 'Brenna Bavis Duo', desc: 'Smooth jazz, blues, and soul performance.', time: '7:00 PM', location: 'Sweet Desires Dessert Lounge' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 19', title: 'Candlelight Concert: Coldplay vs. Imagine Dragons', desc: 'Multi-sensory candlelit concert.', time: '6:00 PM', location: 'Port St. Lucie' },

    { category: 'MUSIC & NIGHTLIFE', date: 'February 20', title: 'Pippin Live at The Funky Cuda', desc: 'Rock-infused live waterfront show.', time: 'Evening', location: 'The Funky Cuda' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 20', title: 'Saint Nicholas Greek Festival', desc: 'Greek food, music & cultural celebration.', time: 'Evening', location: 'TBD', extra_cats: ['Family', 'Big Events'] },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 20', title: 'Vern Daysel Solo @ Post & Vine', desc: 'Live acoustic performance in Vero Beach.', time: 'Evening', location: 'Post & Vine' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 20', title: 'Blood In Blood Out Meet & Greet', desc: 'Celebrity appearance event.', time: 'Evening', location: 'Port St. Lucie' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 20', title: 'Back In Business – Live at Tipsy Tiki', desc: 'High-energy rock and dance hits.', time: '7:00 PM', location: 'Tipsy Tiki' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 20', title: 'Mike Menexis', desc: 'Classic rock, blues, and country favorites.', time: '5:00 PM', location: 'Chuck’s Seafood Restaurant' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 20', title: 'Live Wire', desc: 'High-energy funk, Motown, and R&B party.', time: '7:00 PM', location: 'Crawdaddy’s (Jensen Beach)' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 20', title: 'Cover to Cover', desc: 'Classic rock covers performed live.', time: '8:00 PM', location: 'Charlie’s Neighborhood Bar' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 20', title: 'Glen Roth', desc: 'Live pop and rock set.', time: '7:30 PM', location: 'Priscilla’s Oasis' },

    { category: 'MUSIC & NIGHTLIFE', date: 'February 21', title: 'Back In Business – Live at Tipsy Tiki', desc: 'High-energy rock & pop hits.', time: '8:00 PM', location: 'Tipsy Tiki' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 21', title: 'Old Hippies Live at Pierced Cider', desc: 'Acoustic classics from the ’50s–’70s.', time: 'Evening', location: 'Pierced Cider' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 21', title: 'Velvet Vibes Jazz After Dark', desc: 'Live jazz performance in Vero Beach.', time: 'Evening', location: 'Vero Beach' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 21', title: 'Ghost Town Blues Band', desc: 'Mardi Gras-inspired blues night.', time: '7:00 PM', location: 'TBD' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 21', title: 'Proud Tina – Tina Turner Tribute', desc: 'Acclaimed tribute concert.', time: '8:00 PM', location: 'TBD' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 21', title: 'Hurricane – Music with Laz', desc: 'Patio party featuring live music.', time: '7:00 PM', location: 'TBD' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 21', title: 'Mike Menexis', desc: 'Solo set featuring classic rock and blues.', time: '5:00 PM', location: 'The Outpost Bar & Grille' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 21', title: 'Vinyl Redux', desc: 'British rock and R&B favorites.', time: '7:00 PM', location: 'Crawdaddy’s' },

    { category: 'MUSIC & NIGHTLIFE', date: 'February 22', title: 'Burnt Biscuit at Rock’n Riverwalk', desc: 'Free live music in downtown Stuart.', time: 'Evening', location: 'Riverwalk Stuart', extra_cats: ['Family', 'Outdoor'] },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 22', title: 'Ghost Town Blues Band', desc: 'Blues performance in Fort Pierce.', time: 'Evening', location: 'Fort Pierce' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 22', title: 'Don’t Tell Comedy Show', desc: 'Secret-location comedy night.', time: 'Evening', location: 'Vero Beach', extra_cats: ['Date Night'] },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 22', title: 'Injoy', desc: 'Live reggae performance with island vibes.', time: '1:00 PM', location: 'Crawdaddy’s' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 22', title: 'The V Connection Band', desc: 'Disco, Motown, pop, and reggae dance night.', time: '6:00 PM', location: 'Crawdaddy’s' },

    { category: 'MUSIC & NIGHTLIFE', date: 'February 25', title: 'T-Bone Live at Tipsy Tiki', desc: 'Acoustic rock performance.', time: '6:00 PM', location: 'Tipsy Tiki' },

    { category: 'MUSIC & NIGHTLIFE', date: 'February 26', title: 'The Shakers – Live at Crawdaddy’s', desc: 'Blues, soul, and classic rock favorites.', time: '7:00 PM', location: 'Crawdaddy’s' },

    { category: 'MUSIC & NIGHTLIFE', date: 'February 27', title: 'Manatee Island – Music with Laz & Bailin', desc: 'Dynamic duo live on the waterfront.', time: '6:00 PM', location: 'Manatee Island' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 27', title: 'Murphy’s Law – Live at Tipsy Tiki', desc: 'Rock cover band performing 80s, 90s hits.', time: '7:00 PM', location: 'Tipsy Tiki' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 27', title: 'Bob Walker – Live Acoustic', desc: 'Island-style acoustic performance.', time: '5:00 PM', location: 'TBD' },
    { category: 'MUSIC & NIGHTLIFE', date: 'February 27', title: 'Garrison Keillor & Erica Rhodes', desc: 'Storytelling and comedy at Sunrise Theatre.', time: '8:00 PM', location: 'Sunrise Theatre' },

    // WELLNESS
    { category: 'WELLNESS', date: 'February 22', title: 'Yoga Wheel Workshop', desc: 'Learn foundational techniques using the yoga wheel.', time: 'Evening', location: 'TBD' },
    { category: 'WELLNESS', date: 'February 22', title: 'Sound Bath & Stress Relief Session', desc: 'Calming immersive sound experience.', time: '1:00 PM', location: 'TBD' },
    { category: 'WELLNESS', date: 'February 23', title: 'Yin Yoga with Sound Bath', desc: 'Restorative 60-minute yoga session.', time: 'Evening', location: 'TBD' },

    // SOCIAL & COMMUNITY
    { category: 'Social & Community', date: 'February 19', title: 'Fiesta Bowl – Chili & Dessert Cook-Off', desc: 'Homemade chili and dessert competition.', time: 'Evening', location: 'TBD' },
    { category: 'Social & Community', date: 'February 20', title: 'Cousins Maine Lobster – Food Truck Event', desc: 'Fresh Maine lobster dishes served all day.', time: '11:00 AM', location: 'TBD' },
    { category: 'Social & Community', date: 'February 21', title: 'Farmers Market Oceanside Vero Beach', desc: 'Local vendors, fresh produce, and artisan goods.', time: 'Morning', location: 'Vero Beach', extra_cats: ['Family', 'Consumer'] },
    { category: 'Social & Community', date: 'February 21', title: 'Skyborne Open House', desc: 'Free airline academy open house event.', time: 'Evening', location: 'Skyborne Academy' },
    { category: 'Social & Community', date: 'February 22', title: 'Port St. Lucie Green Market', desc: 'Open-air farmers market with local vendors.', time: '9:00 AM', location: 'Port St. Lucie' },
    { category: 'Social & Community', date: 'February 28', title: 'Family Day 2026', desc: 'Free family-friendly aviation event.', time: '9:00 AM', location: 'Airport?', extra_cats: ['Family'] },
    { category: 'Social & Community', date: 'February 28', title: 'NatureFest', desc: 'Coastal ecosystem celebration with exhibits.', time: '10:00 AM', location: 'TBD', extra_cats: ['Family', 'Outdoor'] }
];

async function importEvents() {
    console.log(`Processing ${rawEvents.length} events...`);

    for (const raw of rawEvents) {
        // Map Categories
        let categories = [...(CATEGORY_MAP[raw.category] || [])];
        if (raw.extra_cats) {
            categories.push(...raw.extra_cats);
        }

        // Ensure unique
        categories = [...new Set(categories)];

        // Generate Dates
        const start = combineDateTime(raw.date, raw.time);
        const end = new Date(new Date(start).getTime() + 2 * 60 * 60 * 1000).toISOString(); // Default 2 hours

        // Check Duplicates
        const { data: existing } = await supabase
            .from('events')
            .select('id')
            .eq('title', raw.title)
            .eq('start_datetime', start)
            .limit(1);

        if (existing && existing.length > 0) {
            console.log(`Exists: ${raw.title}`);
            continue;
        }

        // Insert
        const { error } = await supabase
            .from('events')
            .insert([{
                title: raw.title,
                description: raw.desc,
                start_datetime: start,
                end_datetime: end,
                location_name: raw.location,
                location_city: raw.location.includes('Stuart') ? 'Stuart' :
                    raw.location.includes('Vero') ? 'Vero Beach' :
                        raw.location.includes('Pierce') ? 'Fort Pierce' : 'Port St. Lucie',
                categories: categories,
                is_published: true
            }]);

        if (error) console.error(`Error ${raw.title}:`, error.message);
        else console.log(`bit: ${raw.title}`);
    }
}

importEvents();
