import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
    try {
        if (!resend) {
            console.error('RESEND_API_KEY is missing');
            return NextResponse.json({ success: false, error: 'Configuration error: Missing API key' }, { status: 500 });
        }

        const data = await request.json();

        // Destructure incoming dynamic fields
        const {
            city,
            email,
            questions,
            answers
        } = data;

        // Basic validation
        if (!city || !questions || !answers || questions.length !== answers.length) {
            return NextResponse.json({ success: false, error: 'Required fields missing or mismatched' }, { status: 400 });
        }

        // Combine into a JSON object for Supabase
        const qaData = questions.map((q, i) => ({
            question: q,
            answer: answers[i]
        }));

        // Save to Supabase
        try {
            const { error: dbError } = await supabase
                .from('feud_responses')
                .insert([{
                    city,
                    email: email || null,
                    responses: qaData // Inserting the dynamic JSON payload
                }]);

            if (dbError) {
                console.error("Supabase insert error:", dbError);
            }
        } catch (dbErr) {
            console.error("Database connection error:", dbErr);
        }

        // Generate the HTML for the email dynamically
        const questionsHtml = qaData.map((item, index) => `
            <p style="margin-bottom: 4px; color: #6b7280; font-size: 14px; margin-top: 20px;">${index + 1}. ${item.question}</p>
            <p style="margin-top: 0; font-weight: bold; font-size: 16px;">${item.answer}</p>
        `).join('');

        const emailResponse = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
            to: ['thesunlandcompany@gmail.com'],
            reply_to: email || 'no-reply@sunland.news',
            subject: `Florida Feud: New Response from ${city}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">New Florida Feud Entry</h2>
                    
                    <div style="margin-bottom: 20px;">
                        <p><strong>City:</strong> ${city}</p>
                        <p><strong>Email:</strong> ${email || 'Anonymous'}</p>
                    </div>

                    <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                        ${questionsHtml}
                    </div>
                </div>
            `,
        });

        return NextResponse.json({ success: true, data: emailResponse });
    } catch (error) {
        console.error('Feud survey error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
