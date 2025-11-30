import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

import { v4 as uuidv4 } from 'uuid';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
        return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    }

    try {
        // 1. Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const email = session.customer_details?.email || session.customer_email;

        if (!email) {
            return NextResponse.json({ error: 'No email found in session' }, { status: 400 });
        }

        // 2. Check if user exists
        let { data: user, error: fetchError } = await supabase
            .from('users')
            .select('calendar_token, id') // Select id as well for user_preferences
            .eq('email', email)
            .single();

        // 3. If user doesn't exist (webhook failed or delayed), create them now
        if (!user || !user.calendar_token) {
            console.log(`User not found for ${email}, creating fallback record...`);

            const calendarToken = uuidv4().replace(/-/g, '');

            const { data: newUser, error: createError } = await supabase
                .from('users')
                .upsert([
                    {
                        email,
                        calendar_token: calendarToken,
                        subscription_status: 'active',
                        subscription_expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                        stripe_customer_id: session.customer,
                        stripe_subscription_id: session.subscription
                    },
                ], { onConflict: 'email' })
                .select()
                .single();

            if (createError) {
                console.error('Error creating fallback user:', createError);
                return NextResponse.json({ error: 'Failed to create user record' }, { status: 500 });
            }

            // Create default preferences
            await supabase.from('user_preferences').insert([
                {
                    user_id: newUser.id,
                    interests: ["food", "music", "arts", "outdoors", "family"],
                    location_preference: "all_slc",
                },
            ]);

            user = newUser;
        }

        return NextResponse.json({ token: user.calendar_token });

    } catch (error) {
        console.error('Error retrieving session:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
