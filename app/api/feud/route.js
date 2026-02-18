import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
    try {
        if (!resend) {
            console.error('RESEND_API_KEY is missing');
            return NextResponse.json({ success: false, error: 'Configuration error: Missing API key' }, { status: 500 });
        }

        const { response, email } = await request.json();

        if (!response) {
            return NextResponse.json({ success: false, error: 'Response is required' }, { status: 400 });
        }

        const data = await resend.emails.send({
            from: 'Sunland Feud <hello@sunland.news>',
            to: ['thesunlandcompany@gmail.com'],
            reply_to: email || 'no-reply@sunland.news',
            subject: `Family Feud: New Submission`,
            html: `
                <h2>New Family Feud Response!</h2>
                <p><strong>Question:</strong> "What do you wish was in Saint Lucie county that currently not in Saint Lucie county..."</p>
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="font-size: 18px; font-weight: bold; color: #111827;">"${response}"</p>
                </div>
                <p><strong>Submitted by:</strong> ${email || 'Anonymous'}</p>
            `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Feud survey error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
