import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Configuration for Beehiiv API
const BEEHIIV_PUBLICATION_ID = 'pub_4cdbaa69-8749-4433-881b-ef4090c671d1';
const BEEHIIV_API_URL = 'https://api.beehiiv.com/v2';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
  try {
    // Parse request body
    const { email, name, source, isPremium } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Call Beehiiv API to subscribe the user
    const response = await fetch(`${BEEHIIV_API_URL}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY || ''}`,
      },
      body: JSON.stringify({
        email: email,
        name: name || '',
        referring_site: 'sunlandnews.com',
        custom_fields: [
          {
            name: 'premium_member',
            value: isPremium ? 'Yes' : 'No'
          }
        ],
        utm_source: 'website',
        utm_campaign: 'sunland_signup',
        utm_medium: source || 'direct',
        reactivate_existing: true,
        send_welcome_email: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Beehiiv API error:', data);
      return NextResponse.json(
        {
          success: false,
          error: data.message || 'Failed to subscribe to newsletter'
        },
        { status: response.status }
      );
    }

    // Send admin notification
    if (resend) {
      try {
        await resend.emails.send({
          from: 'system@sunland.news',
          to: ['thesunlandcompany@gmail.com'],
          subject: 'New Newsletter Signup 🎉',
          html: `
            <p><strong>New Subscriber!</strong></p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Source:</strong> ${source || 'direct'}</p>
            <p><strong>Premium:</strong> ${isPremium ? 'Yes' : 'No'}</p>
          `
        });
      } catch (emailError) {
        console.error('Failed to send admin notification:', emailError);
      }
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 