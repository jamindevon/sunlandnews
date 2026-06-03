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
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const eventsToImport = [
    {
        title: "Kids' Story Walk! \"Halfway Wild\"",
        description: `Kick off the summer with an adventurous Story Walk in the gardens reading "Halfway Wild" by Laura Freudig (illustrated by Kevin M. Barry).\n\n• Appearance and meet & greet by "BookMan", the local superhero!\n• Free book giveaway.\n• Fun family-friendly activities, story time, and garden exploration.\n• Admission is FREE during event hours (children must be accompanied by an adult).\n\nHost/Organizer: Tales in the Wild & Heathcote Botanical Gardens\nWebsite: http://www.heathcotebotanicalgardens.org\nContact: 772-464-4672.`,
        start_datetime: "2026-06-05T10:00:00",
        end_datetime: "2026-06-05T12:00:00",
        location_name: "Heathcote Botanical Gardens",
        location_address: "210 Savannah Rd, Fort Pierce, FL 34950",
        location_city: "Fort Pierce",
        categories: ["Family", "Parent", "Outdoor", "Free Tier", "Big Events"],
        price: "Free",
        url: "https://www.facebook.com/events/3001199253416257/",
        is_published: true
    },
    {
        title: "Friday Fest - June 2026 with The Riverdawgs",
        description: `Enjoy an evening on the water shopping with craft vendors, amazing food trucks, live music by The Riverdawgs, and a FREE kids' activity area.\n\n• Kids' Activities: Face Painting & Balloon Sculpting by Faces by Jenna, Lego Land by Mainstreet Fort Pierce, The Sparkle Bar, and The Charm Bar.\n• Craft Vendors: Toucan Sweets, Totally Totes, Bleu Burn Hats, Peaceful Printing 3d, Blue Flame Cigar Society, Sunrise City Soapery, Ocean Nirvana, Savage Krafted, Simply Freshie, Salty’s Water Sports, Sweetest Generations, Philly’s Treats, Sun City Closet, AT&T, South Tech Academy, Curious & Sundry Creations, JJCK Collectables, Mi Cultura Viva, Muddy Barn Hats.\n• Food Trucks: Fl Donut NV, Tristan's Kool Dreemz, Gilbert Rib King BBQ, Sabor Latino, Tacos Downtown, J’s Wings & More.\n• Sponsors: City of Fort Pierce, Southern Eagle Distributing, Cobb’s Landing, and Little Jim Bait & Tackle.\n\nHost/Organizer: Main Street Fort Pierce, City of Fort Pierce`,
        start_datetime: "2026-06-05T17:30:00",
        end_datetime: "2026-06-05T20:30:00",
        location_name: "Marina Square",
        location_address: "Marina Square, Fort Pierce, FL",
        location_city: "Fort Pierce",
        location_lat: 27.449336,
        location_lng: -80.322163,
        categories: ["Family", "Parent", "Outdoor", "Free Tier", "Big Events", "Live Music"],
        price: "Free",
        url: "https://www.facebook.com/events/1440543028084721/",
        is_published: true
    },
    {
        title: "Elks Lodge 1520 Fort Pierce - Live Music with Leah Orchid",
        description: `Live music featuring Leah Orchid performing oldies, requests, current hits, and dance style tunes.\n\n• Open to members and guests. Bring a guest and inquire about joining.\n• Good music, great vibes, and great people.\n\nHost/Organizer: Historic Elks Lodge #1520 Fort Pierce`,
        start_datetime: "2026-06-05T18:30:00",
        end_datetime: "2026-06-05T21:30:00",
        location_name: "Elks Lodge 1520",
        location_address: "608 S 5th St, Fort Pierce, FL 34950",
        location_city: "Fort Pierce",
        categories: ["Live Music", "Date Night"],
        price: "Members & Guests",
        url: "https://www.facebook.com/events/1519060526440262/",
        is_published: true
    },
    {
        title: "1st Fridays",
        description: `Save the date... Movie time. Networking, socializing, great food, and drinks for the grown and sexy.\n\n• Dress to impress (strict dress code enforced).\n• 2-for-1 drinks from 7 PM - 8 PM.\n• Indoor/outdoor seating, ample parking directly across the street, and security on site.\n\nHost/Organizer: Bleu Clarinet Fort Pierce\nContact: (772) 241-5984.`,
        start_datetime: "2026-06-05T19:00:00",
        end_datetime: "2026-06-06T01:45:00",
        location_name: "Bleu Clarinet",
        location_address: "901 Avenue D, Fort Pierce, FL 34950",
        location_city: "Fort Pierce",
        categories: ["Date Night", "Big Events"],
        price: "Paid",
        url: "https://www.facebook.com/events/1443269234506821/",
        is_published: true
    },
    {
        title: "Swing Into Summer Reading (St. Lucie Mets)",
        description: `Celebrate the start of summer reading with the St. Lucie Mets. Bring the whole family out for a night of baseball, books, and fun.\n\n• FREE tickets for K-12 students.\n• Free table space available for Chamber Members (maximum 2 representatives per vendor, responsible for own marketing materials, table, and chairs).\n• Chamber Ticket Link: stluciechamber.org/event/swing-into-summer-reading\n\nHost/Organizer: St. Lucie County Chamber of Commerce (presented by Children's Services Council of St. Lucie County & Levitt Family Foundation)`,
        start_datetime: "2026-06-06T17:15:00",
        end_datetime: "2026-06-06T21:30:00",
        location_name: "Clover Park (St. Lucie Mets)",
        location_address: "31 Piazza Dr (or 137 Port Ave), Port St. Lucie / Fort Pierce, FL 34950",
        location_city: "Port St. Lucie",
        categories: ["Family", "Parent", "Free Tier", "Big Events"],
        price: "Free for K-12 students",
        url: "https://www.facebook.com/events/1662362061555625/",
        is_published: true
    },
    {
        title: "Saturday Drive In Movie Nights | Hoppers",
        description: `Family Movie Night featuring Hoppers.\n\n• Sound transmitted through FM radio at 87.9 FM.\n• Tickets: $19.00 plus tax/processing fees per vehicle online, or $19.00 cash at the gate.\n• Concessions on-site including popcorn, pizza, hot dogs, cold drinks, ice cream, and candy. (No outside food or drinks permitted).\n\nTicket Link: https://www.eventbrite.com/e/saturday-drive-in-movie-night-tickets\nRules: https://tcparkandwatch.com/rules\nHost/Organizer: Treasure Coast Park and Watch\nSponsors: Superior Floor Coatings, Wilco Electric, Avid Entertainment, Causeway Cove Marina.`,
        start_datetime: "2026-06-06T19:00:00",
        end_datetime: "2026-06-06T22:30:00",
        location_name: "Causeway Cove Marina",
        location_address: "601 Seaway Drive, Fort Pierce, FL 34949",
        location_city: "Fort Pierce",
        categories: ["Family", "Parent", "Outdoor"],
        price: "$19.00 per vehicle",
        url: "https://www.facebook.com/events/817341967865736/",
        is_published: true
    },
    {
        title: "TEMPTATION SATURDAYS",
        description: `A night of R&B, Afrobeat, and Caribbean music for the grown & sexy.\n\n• Music by WOAHCARTIER! & DJ Tee.\n• Tickets: $13.39.\n• Special offers: Free entry before 11:30 PM, and one FREE drink ticket before 11:30 PM.\n• Dress to impress (strict dress code enforced).\n• 21+ Event.\n\nTicket Link: https://www.eventbrite.com/e/temptation-saturdays-where-good-decisions-go-bad-tickets-1990453692576\nHost/Organizer: DJ Tee and Bleu Clarinet Fort Pierce`,
        start_datetime: "2026-06-06T22:00:00",
        end_datetime: "2026-06-07T02:00:00",
        location_name: "Bleu Clarinet Fort Pierce",
        location_address: "901 Avenue D, Fort Pierce, FL 34950",
        location_city: "Fort Pierce",
        categories: ["Date Night"],
        price: "$13.39",
        url: "https://www.facebook.com/events/2155917605229822/",
        is_published: true
    },
    {
        title: "Bruce's Beatles Birthday Bash",
        description: `Bruce's Birthday Beatles Bash featuring Liverpool Live (Beatles Tribute Band).\n\n• Live auction and Beatles memorabilia.\n• Tickets: $25 & up. VIP tickets available.\n\nHost/Organizer: MIDFLORIDA Event Center`,
        start_datetime: "2026-06-07T14:00:00",
        end_datetime: "2026-06-07T18:00:00",
        location_name: "MIDFLORIDA Event Center",
        location_address: "9221 Southeast Event Center Place, Port St. Lucie, FL 34952",
        location_city: "Port St. Lucie",
        categories: ["Live Music", "Big Events"],
        price: "$25 & up",
        url: "https://www.facebook.com/events/1523376659416965/",
        is_published: true
    },
    {
        title: "PSL Green Market at Sidonia Grand Opening!",
        description: `Grand Opening of the PSL Green Markets at Sidonia.\n\n• Fresh local produce, local vendors, food trucks, honey, and sustainable goods.\n• Grand opening indoor/outdoor market experience.\n• Neighbors Loving Neighbors event, fun for the whole family with good local vibes.\n\nHost/Organizer: PSL Green Markets\nInstagram: @PSLGREENMARKETS`,
        start_datetime: "2026-06-06T09:00:00",
        end_datetime: "2026-06-06T14:00:00",
        location_name: "PSL Green Market at Sidonia",
        location_address: "2401 SE Sidonia St, Port Saint Lucie, FL 34952",
        location_city: "Port Saint Lucie",
        categories: ["Family", "Parent", "Outdoor", "Free Tier", "Big Events"],
        price: "Free",
        url: "https://www.facebook.com/events/1311277754483262/",
        is_published: true
    },
    {
        title: "Summer Arts & Music Festival",
        description: `Summer Arts & Music Festival presented by The Music Academy of Port St. Lucie.\n\n• Live music in the theater, student performances, notes & jams.\n• Student art gallery, art displays, and local craft vendors.\n• Food trucks and family fun.\n• FREE Admission!\n\nHost/Organizer: The Music Academy of Port St. Lucie\nWebsite: http://www.themusicacademyofpsl.com`,
        start_datetime: "2026-06-06T17:00:00",
        end_datetime: "2026-06-06T20:00:00",
        location_name: "The Music Academy of Port St. Lucie",
        location_address: "442 NW Lake Whitney Pl., Port Saint Lucie, FL 34986",
        location_city: "Port Saint Lucie",
        categories: ["Family", "Parent", "Free Tier", "Big Events", "Live Music"],
        price: "Free",
        url: "https://www.facebook.com/events/1558040452627322/",
        is_published: true
    }
];

async function importEvents() {
    console.log(`Starting import of ${eventsToImport.length} events...`);

    for (const event of eventsToImport) {
        // Check if event already exists with same title and start date
        const { data: existing, error: checkError } = await supabase
            .from('events')
            .select('id')
            .eq('title', event.title)
            .eq('start_datetime', event.start_datetime);

        if (checkError) {
            console.error(`Error checking existence of ${event.title}:`, checkError);
            continue;
        }

        if (existing && existing.length > 0) {
            console.log(`Event "${event.title}" on ${event.start_datetime} already exists. Skipping.`);
            continue;
        }

        const { error: insertError } = await supabase
            .from('events')
            .insert(event);

        if (insertError) {
            console.error(`Failed to insert "${event.title}":`, insertError);
        } else {
            console.log(`Successfully imported: "${event.title}"`);
        }
    }

    console.log('Import process complete!');
}

importEvents().catch(console.error);
