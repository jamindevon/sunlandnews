import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request) {
    try {
        const body = await request.json();

        // 1. Spam Check (Honeypot)
        if (body.website_url) {
            console.log('Spam detected (honeypot filled)');
            // Return success to fool the bot, but don't save anything
            return NextResponse.json({ success: true });
        }

        // 2. Prepare Event Data
        const {
            name, email, eventName, eventDate, startTime, endTime,
            venue, address, isRecurring, link, isSponsored
        } = body;

        // Combine date and time
        const startDateTime = new Date(`${eventDate}T${startTime}`);
        const endDateTime = new Date(`${eventDate}T${endTime}`);

        // Create description with submitter info
        const fullDescription = `
      Venue: ${venue}
      Link: ${link}
      
      ---
      Submitted by: ${name} (${email})
      Sponsored Interest: ${isSponsored ? 'YES' : 'NO'}
    `.trim();

        // 3. Insert into Supabase
        const { data, error } = await supabase
            .from('events')
            .insert([
                {
                    title: eventName,
                    description: fullDescription,
                    start_datetime: startDateTime.toISOString(),
                    end_datetime: endDateTime.toISOString(),
                    location_name: venue,
                    location_address: address,
                    url: link,
                    is_recurring: isRecurring,
                    is_published: false, // Draft mode
                    price: 'See Link', // Default
                    categories: ["community"] // Default category
                }
            ])
            .select();

        if (error) {
            console.error('Error inserting event:', error);
            return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
        }

        // 4. Send Admin Notification
        if (process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            try {
                await resend.emails.send({
                    from: `${process.env.EMAIL_FROM_NAME || 'Sunland News'} <${process.env.EMAIL_FROM || 'hello@sunland.news'}>`,
                    to: ['thesunlandcompany@gmail.com'], // Admin email
                    subject: `New Event Submission: ${eventName}`,
                    html: `
            <h2>New Event Submitted!</h2>
            <p><strong>Event:</strong> ${eventName}</p>
            <p><strong>Date:</strong> ${eventDate} @ ${startTime}</p>
            <p><strong>Venue:</strong> ${venue}</p>
            <p><strong>Submitted by:</strong> ${name} (${email})</p>
            <p><strong>Sponsored Interest:</strong> ${isSponsored ? 'YES' : 'NO'}</p>
            <br/>
            <p><a href="${link}">View Event Link</a></p>
            <p><em>Check Supabase to approve/publish this event.</em></p>
          `
                });
            } catch (emailError) {
                console.error('Error sending admin notification:', emailError);
            }
        }

        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
