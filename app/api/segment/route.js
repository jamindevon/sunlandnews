import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// Configuration for Beehiiv API
const BEEHIIV_PUBLICATION_ID = 'pub_4cdbaa69-8749-4433-881b-ef4090c671d1';
const BEEHIIV_API_URL = 'https://api.beehiiv.com/v2';

export async function POST(request) {
    try {
        const { email, firstName, zipCode, interest } = await request.json();

        if (!email) {
            return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
        }

        console.log('Processing segmentation for:', { email, firstName, zipCode, interest });

        // 1. Save to Supabase
        const { error: dbError } = await supabase
            .from('onboarding_segments')
            .insert({
                email,
                first_name: firstName,
                zip_code: zipCode,
                interest
            });

        if (dbError) {
            console.error('Failed to save segment to Supabase:', dbError);
            // We'll log the error but still try to tag them in Beehiiv so they aren't blocked
        }

        // 2. Map interest to a Beehiiv tag
        let tag = '';
        if (interest === 'Stay informed on local news and breaking alerts') {
            tag = 'segment-news';
        } else if (interest === 'Events, things to do, food, and new openings') {
            tag = 'segment-events';
        } else if (interest === 'Feel more connected to my community') {
            tag = 'segment-community';
        }

        // 3. Update Beehiiv Subscriber
        if (tag) {
            try {
                const response = await fetch(`${BEEHIIV_API_URL}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY || ''}`,
                    },
                    body: JSON.stringify({
                        email: email,
                        name: firstName || '', // Update their name if they provided it
                        reactivate_existing: true, // Crucial: updates existing sub without throwing error
                        send_welcome_email: false, // They already got one from the initial signup
                        custom_fields: [
                            {
                                name: 'zip_code',
                                value: zipCode || ''
                            }
                        ],
                        tags: [tag]
                    }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    console.error('Failed to update Beehiiv tag:', data);
                }
            } catch (beehiivErr) {
                console.error('Error calling Beehiiv API:', beehiivErr);
            }
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Segment API error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
