import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// TEST: Use Anon Key to check RLS policies
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugUserFeed(email) {
    console.log(`Debugging for: ${email}`);

    // 1. Get User
    const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (userError || !user) {
        console.error('User not found:', userError?.message);
        return;
    }

    console.log('User found:', {
        id: user.id,
        subscription_status: user.subscription_status,
        calendar_token: user.calendar_token
    });

    if (user.subscription_status !== 'active') {
        console.warn('WARNING: Subscription is NOT active.');
    }

    // 2. Get Preferences
    const { data: prefs, error: prefsError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

    console.log('User Preferences:', prefs || 'None found (using defaults)');

    // 3. Fetch Events
    const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true);

    if (eventsError) {
        console.error('Error fetching events:', eventsError);
        return;
    }

    console.log(`Total Published Events in DB: ${events.length}`);

    // 4. Simulate Filtering Logic (Copy-paste from route.js roughly)
    const filteredEvents = events.filter(event => {
        // A. Interest Match
        const userInterests = prefs?.interests || [];
        const eventCategories = event.categories || [];
        const hasInterestMatch = userInterests.length === 0 || eventCategories.some(cat => userInterests.includes(cat));

        if (!hasInterestMatch) {
            // console.log(`  [Excluded Interest] ${event.title} (Cats: ${eventCategories})`);
            return false;
        }

        // B. Location Match
        const userLoc = prefs?.location_preference;
        const eventCity = event.location_city || '';
        let hasLocationMatch = true;

        if (userLoc === 'fort_pierce') {
            hasLocationMatch = eventCity.toLowerCase().includes('fort pierce');
        } else if (userLoc === 'psl_fp') {
            hasLocationMatch = eventCity.toLowerCase().includes('fort pierce') || eventCity.toLowerCase().includes('port st. lucie');
        }

        if (!hasLocationMatch) {
            // console.log(`  [Excluded Location] ${event.title} (City: ${eventCity})`);
            return false;
        }

        return true;
    });

    console.log(`Events matching preferences: ${filteredEvents.length}`);

    const finalEvents = filteredEvents.length > 0 ? filteredEvents : events;
    console.log(`Final Events returned to user: ${finalEvents.length}`);

    if (finalEvents.length === 0) {
        console.error('CRITICAL: Feed is returning 0 events!');
    } else {
        console.log('Sample Event Titles:', finalEvents.map(e => e.title).slice(0, 3));
    }

    console.log(`\nTest URL: https://www.sunlandnews.com/cal/${user.calendar_token}`);
}

debugUserFeed('jamindevonbrown@gmail.com');
