import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';
import { subscribeToNewsletter } from '../../../../services/beehiivService';

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
        const name = session.customer_details?.name || '';

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
                            stripe_payment_id: session.subscription
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

                    // 4. Sync to Beehiiv
                    try {
                        await subscribeToNewsletter({
                            email,
                            name,
                            isPremium: true,
                            source: 'calendar_club_purchase'
                        });
                        console.log('Synced to Beehiiv:', email);
                    } catch (beehiivError) {
                        console.error('Beehiiv sync error:', beehiivError);
                        // Don't fail the webhook if Beehiiv fails
                    }

                    // 5. Send Welcome Email
                    if (resend) {
                        // Link directly to the dashboard with the token for instant login
                        const dashboardUrl = `https://sunlandnews.com/calendar/dashboard?token=${calendarToken}`;

                        await resend.emails.send({
                            from: `${process.env.EMAIL_FROM_NAME || 'Sunland News'} <${process.env.EMAIL_FROM || 'hello@sunland.news'}>`,
                            to: email,
                            subject: 'Welcome to Sunland Calendar! 📅',
                            html: `
                        <h1>Welcome to the Calendar Club! ☀️</h1>
                        <p>You're in! Thanks for supporting local independent journalism and joining the Sunland News community.</p>
                        
                        <h2>🚀 Your Calendar Access</h2>
                        <p>Your personalized calendar dashboard is ready. You can manage your feeds and preferences here:</p>
                        
                        <p style="text-align: center; margin: 30px 0;">
                            <a href="${dashboardUrl}" style="background-color: #000; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">Access My Dashboard</a>
                        </p>
                        
                        <p><strong>Link expired?</strong> No worries. You can always log in at <a href="https://sunlandnews.com/calendar/login">sunlandnews.com/calendar/login</a> using your email address.</p>

                        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;" />

                        <h3>What's Next?</h3>
                        <ol>
                            <li>Click the button above to enter your dashboard.</li>
                            <li>Select the calendars you want (Music, Food, Family, etc.).</li>
                            <li>Click "Add to Calendar" to sync them to your phone instantly.</li>
                        </ol>

                        <p>If you have any trouble setting this up, just reply to this email and I'll help you out personally.</p>
                        
                        <p>Cheers,</p>
                        <p><strong>The Sunland Team</strong><br>
                        <a href="https://sunlandnews.com">sunlandnews.com</a></p>
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

