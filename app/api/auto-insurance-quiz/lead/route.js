import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY;

export async function POST(request) {
    try {
        const body = await request.json();
        const { leadData } = body;

        if (!leadData || !leadData.email) {
            return NextResponse.json({ success: false, error: 'Missing lead data' }, { status: 400 });
        }

        if (resendApiKey) {
            const resend = new Resend(resendApiKey);

            // 1. Send Preliminary Notification to Ms. Daisy and Ja'min (thesunlandcompany)
            try {
                await resend.emails.send({
                    from: `${process.env.EMAIL_FROM_NAME || 'SE Benchmark'} <${process.env.EMAIL_FROM || 'hello@sunland.news'}>`,
                    to: ['daisy@sebenchmark.com', 'thesunlandcompany@gmail.com'], 
                    subject: `[Step 1] New Lead Started Quiz: ${leadData.name}`,
                    html: `
                        <h2>A user just started the Auto Insurance Quiz!</h2>
                        <p>This user just submitted their contact information and is currently taking the quiz.</p>
                        <br/>
                        <p><strong>Name:</strong> ${leadData.name}</p>
                        <p><strong>Email:</strong> ${leadData.email}</p>
                        <p><strong>Phone:</strong> ${leadData.phone}</p>
                        <br/>
                        <p><em>You will receive another email once they complete the quiz and receive their savings estimates.</em></p>
                    `
                });
            } catch (emailError) {
                console.error('Error sending preliminary notification:', emailError);
            }
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
