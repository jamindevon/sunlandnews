require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const events = [
    {
        title: 'Jazz in the Park',
        description: 'Smooth jazz evening by the river.',
        start_datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days from now
        end_datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 2).toISOString(),
        location_name: 'River Walk Center',
        location_city: 'Fort Pierce',
        categories: ['Live Music', 'Arts & Culture', 'Nightlife'],
        is_published: true
    },
    {
        title: 'Morning Yoga on the Beach',
        description: 'Start your day with zen.',
        start_datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 9).toISOString(), // 3 days from now, 9 AM
        end_datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 10).toISOString(),
        location_name: 'South Beach Park',
        location_city: 'Fort Pierce',
        categories: ['Outdoors', 'Health & Wellness'],
        is_published: true
    },
    {
        title: 'Food Truck Frenzy',
        description: 'Best local eats in one place.',
        start_datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 60 * 18).toISOString(), // 5 days from now, 6 PM
        end_datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 60 * 21).toISOString(),
        location_name: 'Tradition Square',
        location_city: 'Port St. Lucie',
        categories: ['Food & Drink', 'Family & Kids'],
        is_published: true
    },
    {
        title: 'Kids Science Workshop',
        description: 'Fun experiments for little ones.',
        start_datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6 + 1000 * 60 * 60 * 10).toISOString(), // 6 days from now, 10 AM
        end_datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6 + 1000 * 60 * 60 * 12).toISOString(),
        location_name: 'Childrens Museum',
        location_city: 'Port St. Lucie',
        categories: ['Family & Kids', 'Workshops'],
        is_published: true
    },
    {
        title: 'Downtown Art Walk',
        description: 'Explore local galleries.',
        start_datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 60 * 17).toISOString(), // 7 days from now, 5 PM
        end_datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 60 * 20).toISOString(),
        location_name: 'Downtown Fort Pierce',
        location_city: 'Fort Pierce',
        categories: ['Arts & Culture', 'Outdoors'],
        is_published: true
    }
];

async function seed() {
    console.log('🌱 Seeding events...');
    const { data, error } = await supabase.from('events').insert(events).select();

    if (error) {
        console.error('Error seeding events:', error);
    } else {
        console.log(`✅ Successfully added ${data.length} events!`);
    }
}

seed();
