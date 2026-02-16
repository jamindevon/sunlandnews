import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { subscribeToNewsletter } from '../../services/beehiivService';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
    try {
        const { email, zipCode, interests, isParent, isBusinessOwner } = await request.json();

        if (!email) {
            return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
        }

        // 1. Sync to Beehiiv
        try {
            await subscribeToNewsletter({
                email,
                name: '', // We don't collect name on this form
                isPremium: false,
                source: 'calendar_free_survey'
            });
            console.log('Synced free user to Beehiiv:', email);
        } catch (beehiivError) {
            console.error('Beehiiv sync error:', beehiivError);
            // Continue even if Beehiiv fails
        }

        // 2. Send Confirmation Email with Upsell
        if (resend) {
            await resend.emails.send({
                from: `${process.env.EMAIL_FROM_NAME || 'Sunland News'} <${process.env.EMAIL_FROM || 'hello@sunland.news'}>`,
                to: email,
                subject: 'Your Free Calendar Links 📅',
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1>You're All Set! ✅</h1>
                        <p>Thanks for taking our survey. Here are the free calendar feeds you unlocked:</p>
                        
                        <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0;">
                            <h3 style="margin-top: 0;">📚 Parent Calendar</h3>
                            <p><a href="webcal://sunlandnews.com/calendars/parent">Add to Apple Calendar</a> | <a href="https://calendar.google.com/calendar/r?cid=https://sunlandnews.com/calendars/parent">Add to Google Calendar</a></p>
                            
                            <h3>🏛️ Civic Calendar</h3>
                            <p><a href="webcal://sunlandnews.com/calendars/civic">Add to Apple Calendar</a> | <a href="https://calendar.google.com/calendar/r?cid=https://sunlandnews.com/calendars/civic">Add to Google Calendar</a></p>
                            
                            <h3>🎉 Big Events</h3>
                            <p><a href="webcal://sunlandnews.com/calendars/big-events">Add to Apple Calendar</a> | <a href="https://calendar.google.com/calendar/r?cid=https://sunlandnews.com/calendars/big-events">Add to Google Calendar</a></p>
                        </div>

                        <h2>Want More? 🔓</h2>
                        <p>You indicated interest in <strong>${interests && interests.length > 0 ? interests.join(', ') : 'local events'}</strong>.</p>
                        <p>Unlock the <strong>Full Calendar Club</strong> to get our curated feeds for:</p>
                        <ul>
                            <li>🎸 Live Music</li>
                            <li>🍷 Date Night</li>
                            <li>👨‍👩‍👧‍👦 Family Activities</li>
                            <li>🏃 Outdoor & Fitness</li>
                            <li>💼 Business & Networking</li>
                        </ul>
                        
                        <p style="text-align: center; margin: 30px 0;">
                            <a href="https://sunlandnews.com/calendar" style="background-color: #000; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">Upgrade for $39/year</a>
                        </p>

                        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;" />
                        
                        <p style="color: #666; font-size: 12px;">
                            You've also been added to our free weekly newsletter. You can unsubscribe at any time.
                        </p>
                    </div>
                `
            });
            console.log('Sent free calendar confirmation to:', email);
        }

        // 3. Notify Admin (Legacy/Backup)
        if (resend) {
            await resend.emails.send({
                from: 'system@sunland.news',
                to: ['thesunlandcompany@gmail.com'],
                subject: 'New Free Calendar Signup',
                html: `
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>ZIP:</strong> ${zipCode}</p>
                    <p><strong>Interests:</strong> ${JSON.stringify(interests)}</p>
                    <p><strong>Parent:</strong> ${isParent}</p>
                    <p><strong>Business Owner:</strong> ${isBusinessOwner}</p>
                `
            });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Free signup error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
