import { NextResponse } from 'next/server';

// Configuration for Beehiiv API
const BEEHIIV_PUBLICATION_ID = 'pub_4cdbaa69-8749-4433-881b-ef4090c671d1';
const BEEHIIV_API_URL = 'https://api.beehiiv.com/v2';

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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 