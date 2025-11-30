import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
    try {
        if (!resend) {
            console.error('RESEND_API_KEY is missing');
            return NextResponse.json({ success: false, error: 'Configuration error: Missing API key' }, { status: 500 });
        }

        const { name, email, subject, message } = await request.json();

        const data = await resend.emails.send({
            from: `${process.env.EMAIL_FROM_NAME || 'Sunland Contact'} <${process.env.EMAIL_FROM || 'hello@sunland.news'}>`,
            to: ['thesunlandcompany@gmail.com'],
            reply_to: email,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
