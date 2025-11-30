import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req) {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Get email from the session
        const email = session.customer_details?.email || session.customer_email;

        if (email) {
            console.log(`Processing subscription for: ${email}`);

            try {
                // 1. Generate Token
                const calendarToken = uuidv4().replace(/-/g, '');

                // 2. Create/Update User in Supabase
                // We use upsert in case they already exist (e.g. resubscribing)
                const { data: user, error: userError } = await supabase
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

                if (userError) {
                    console.error('Error creating user:', userError);
                    // We don't return error here to avoid Stripe retrying indefinitely if it's a logic error
                    // But in production you might want to handle this better
                } else {
                    // 3. Create Default Preferences if new user
                    const { error: prefError } = await supabase
                        .from('user_preferences')
                        .insert([
                            {
                                user_id: user.id,
                                interests: ["food", "music", "arts", "outdoors", "family"],
                                location_preference: "all_slc",
                            },
                        ]);

                    // Ignore error if preferences already exist (unique constraint)
                    if (prefError && !prefError.message.includes('duplicate key')) {
                        console.error('Error creating preferences:', prefError);
                    }

                    // 4. Send Welcome Email
                    if (resend) {
                        const calendarUrl = `https://sunlandnews.com/cal/${calendarToken}`;
                        const setupUrl = `https://sunlandnews.com/calendar/setup?token=${calendarToken}`;

                        await resend.emails.send({
                            from: `${process.env.EMAIL_FROM_NAME || 'Sunland News'} <${process.env.EMAIL_FROM || 'hello@sunland.news'}>`,
                            to: email,
                            subject: 'Welcome to Sunland Calendar! 📅',
                            html: `
                        <h1>Your Calendar is Ready!</h1>
                        <p>Thanks for joining Sunland Calendar. We're excited to help you discover the best local events.</p>
                        <p><strong>Your Calendar Link:</strong></p>
                        <p><a href="${setupUrl}">Click here to set up your calendar</a></p>
                        <p>Or copy this link directly:</p>
                        <code>${calendarUrl}</code>
                        <p>If you have any questions, just reply to this email.</p>
                        <p>- Ja'Min & The Sunland Team</p>
                    `
                        });
                        console.log('Welcome email sent to:', email);
                    }
                }
            } catch (error) {
                console.error('Error processing webhook logic:', error);
            }
        }
    }

    return NextResponse.json({ received: true });
}
