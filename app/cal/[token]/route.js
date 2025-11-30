import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import ical from 'ical-generator';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(req, { params }) {
    const { token } = params;

    if (!token) {
        return new NextResponse('Missing token', { status: 400 });
    }

    // 1. Validate Token
    const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, subscription_status')
        .eq('calendar_token', token)
        .single();

    if (userError || !user) {
        return new NextResponse('Invalid calendar token', { status: 401 });
    }

    if (user.subscription_status !== 'active') {
        return new NextResponse('Subscription expired', { status: 403 });
    }

    // 2. Fetch Events
    // In the future, we can filter by user.preferences
    const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true);

    if (eventsError) {
        console.error('Error fetching events:', eventsError);
        return new NextResponse('Error fetching events', { status: 500 });
    }

    // 3. Generate ICS
    const calendar = ical({
        name: 'Sunland News Events',
        url: `https://sunlandnews.com/cal/${token}`,
    });

    events.forEach(event => {
        calendar.createEvent({
            start: new Date(event.start_datetime),
            end: new Date(event.end_datetime),
            summary: event.title,
            description: event.description,
            location: event.location_name + (event.location_address ? `, ${event.location_address}` : ''),
            url: event.url,
            // Add categories/tags if needed
        });
    });

    // 4. Return ICS File
    return new NextResponse(calendar.toString(), {
        headers: {
            'Content-Type': 'text/calendar; charset=utf-8',
            'Content-Disposition': `attachment; filename="sunland-events.ics"`,
        },
    });
}
