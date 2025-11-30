import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

        // 2. Poll for the user in Supabase (webhook might be slightly delayed)
        // We'll try 3 times with a 1-second delay
        let user = null;
        for (let i = 0; i < 5; i++) {
            const { data, error } = await supabase
                .from('users')
                .select('calendar_token')
                .eq('email', email)
                .single();

            if (data && data.calendar_token) {
                user = data;
                break;
            }

            // Wait 1 second before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        if (!user || !user.calendar_token) {
            return NextResponse.json({ error: 'Setup still processing. Please refresh in a moment.' }, { status: 404 });
        }

        return NextResponse.json({ token: user.calendar_token });

    } catch (error) {
        console.error('Error retrieving session:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
