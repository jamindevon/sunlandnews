import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
    try {
        const { email, action, eventTitle } = await request.json();

        // 1. Log to database if Supabase credentials exist
        if (supabaseUrl && supabaseServiceKey) {
            const supabase = createClient(supabaseUrl, supabaseServiceKey);
            // This will gracefully succeed if the table exists, and log a warning if it doesn't.
            const { error } = await supabase
                .from('calendar_clicks')
                .insert({
                    email: email || 'anonymous',
                    action,
                    event_title: eventTitle || null
                });

            if (error) {
                console.warn('Supabase logging failed (make sure table "calendar_clicks" exists):', error.message);
            }
        }

        // 2. Send email notification via Resend
        if (resend) {
            const subject = `📅 Calendar Click: ${email || 'Anonymous'} - ${action}`;
            await resend.emails.send({
                from: `${process.env.EMAIL_FROM_NAME || 'Sunland Calendar'} <${process.env.EMAIL_FROM || 'hello@sunland.news'}>`,
                to: ['thesunlandcompany@gmail.com'],
                subject: subject,
                html: `
                    <h2>Calendar Click Event Logged</h2>
                    <p><strong>User Email:</strong> ${email || 'Anonymous (visitor without link email)'}</p>
                    <p><strong>Action Taken:</strong> ${action}</p>
                    ${eventTitle ? `<p><strong>Event Title:</strong> ${eventTitle}</p>` : ''}
                    <p><strong>Timestamp:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</p>
                `
            });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Logging API error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
