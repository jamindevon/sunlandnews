import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // 1. Find user
        const { data: user, error } = await supabase
            .from('users')
            .select('calendar_token')
            .eq('email', email)
            .single();

        if (error || !user) {
            // Security: Don't reveal if user exists or not, but for UX we might want to be helpful
            // For now, let's just return success to prevent enumeration, but log it.
            console.log(`Magic link requested for non-existent user: ${email}`);
            return NextResponse.json({ success: true });
        }

        // 2. Send Email
        if (resend) {
            const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sunlandnews.com'}/calendar/dashboard?token=${user.calendar_token}`;

            await resend.emails.send({
                from: `${process.env.EMAIL_FROM_NAME || 'Sunland News'} <${process.env.EMAIL_FROM || 'hello@sunland.news'}>`,
                to: email,
                subject: 'Your Calendar Access Link 🔑',
                html: `
                    <h1>Access Your Calendar Dashboard</h1>
                    <p>Click the link below to manage your calendar preferences and subscription:</p>
                    <p>
                        <a href="${dashboardUrl}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                            Go to Dashboard
                        </a>
                    </p>
                    <p>Or copy this link:</p>
                    <code>${dashboardUrl}</code>
                    <p>If you didn't request this, you can safely ignore this email.</p>
                `
            });
            console.log(`Magic link sent to ${email}`);
        } else {
            console.error('Resend API key missing, cannot send magic link');
            return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Magic link error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
