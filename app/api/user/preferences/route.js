import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }

    // Get User
    const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('calendar_token', token)
        .single();

    if (userError || !user) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get Preferences
    const { data: preferences, error: prefError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

    return NextResponse.json({
        user: {
            email: user.email,
            subscription_status: user.subscription_status,
            created_at: user.created_at
        },
        preferences: preferences || { interests: [], location_preference: 'all_slc' }
    });
}

export async function POST(req) {
    try {
        const { token, preferences } = await req.json();

        if (!token) {
            return NextResponse.json({ error: 'Missing token' }, { status: 401 });
        }

        // Get User ID from token
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('calendar_token', token)
            .single();

        if (userError || !user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        // Upsert Preferences
        const { error: upsertError } = await supabase
            .from('user_preferences')
            .upsert({
                user_id: user.id,
                interests: preferences.interests,
                location_preference: preferences.location_preference
            }, { onConflict: 'user_id' });

        if (upsertError) {
            console.error('Error saving preferences:', upsertError);
            return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Preferences API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
