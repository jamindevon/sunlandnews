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
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
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

    // Send Juneteenth RSVP email if source is 'juneteenth_619'
    if (resend && source === 'juneteenth_619') {
      try {
        await resend.emails.send({
          from: 'Juneteenth Festival <hello@email.sunland.news>',
          to: [email],
          subject: '★ RSVP Confirmed: Juneteenth 2026 Map & Schedule ★',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <title>Your Juneteenth RSVP Confirmation</title>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                  background-color: #F5EFEB;
                  color: #1A1A1A;
                  margin: 0;
                  padding: 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border: 4px solid #1A1A1A;
                  box-shadow: 8px 8px 0px #1A1A1A;
                  overflow: hidden;
                }
                .header {
                  background-color: #D32F2F;
                  color: #F5EFEB;
                  padding: 30px 20px;
                  text-align: center;
                  border-bottom: 4px solid #1A1A1A;
                }
                .header h1 {
                  font-size: 32px;
                  font-weight: 900;
                  margin: 0;
                  text-transform: uppercase;
                  letter-spacing: 2px;
                }
                .badge {
                  display: inline-block;
                  background-color: #FFD54F;
                  color: #1A1A1A;
                  font-weight: bold;
                  padding: 6px 16px;
                  border: 2px solid #1A1A1A;
                  margin-top: 15px;
                  text-transform: uppercase;
                  font-size: 14px;
                }
                .content {
                  padding: 30px 20px;
                }
                .section-title {
                  font-size: 20px;
                  font-weight: 900;
                  color: #1B5E20;
                  border-bottom: 2px dashed #1A1A1A;
                  padding-bottom: 5px;
                  margin-top: 25px;
                  text-transform: uppercase;
                }
                .schedule-item {
                  margin-top: 15px;
                  margin-bottom: 15px;
                }
                .schedule-time {
                  font-size: 11px;
                  font-weight: 900;
                  color: #D32F2F;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                .schedule-title {
                  font-size: 18px;
                  font-weight: 900;
                  margin: 2px 0;
                  text-transform: uppercase;
                }
                .playlist-btn {
                  display: block;
                  text-align: center;
                  background-color: #1B5E20;
                  color: #F5EFEB;
                  font-size: 18px;
                  font-weight: 900;
                  text-decoration: none;
                  padding: 15px;
                  border: 3px solid #1A1A1A;
                  box-shadow: 4px 4px 0px #1A1A1A;
                  margin: 25px 0;
                  text-transform: uppercase;
                }
                .footer {
                  background-color: #1A1A1A;
                  color: #F5EFEB;
                  text-align: center;
                  padding: 20px;
                  font-size: 12px;
                }
                .footer a {
                  color: #FFD54F;
                  text-decoration: none;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>★ JUNETEENTH 2026 ★</h1>
                  <div class="badge">You're RSVP'd!</div>
                </div>
                <div class="content">
                  <p style="font-size: 16px; line-height: 1.6; font-weight: bold; margin-top: 0;">
                    Thanks for RSVPing! You are officially on the list for the 2026 Juneteenth Celebration in Fort Pierce, FL.
                  </p>
                  <p style="font-size: 14px; line-height: 1.5; color: #444444;">
                    We will send you the official vendor map and real-time festival alerts straight to your inbox as we get closer to the event. In the meantime, save the dates and check out the schedule below!
                  </p>

                  <div class="section-title">📍 LOCATION</div>
                  <p style="font-size: 15px; font-weight: bold; margin: 8px 0 2px 0;">Percy Peek Gymnasium & Lot</p>
                  <p style="font-size: 14px; margin: 0; color: #555555;">2902 Avenue D, Fort Pierce, FL</p>

                  <div class="section-title">📅 FESTIVAL SCHEDULE</div>
                  
                  <div class="schedule-item">
                    <div class="schedule-time">Thursday, June 18 — 6:00 PM - 9:00 PM</div>
                    <div class="schedule-title">Education Symposium</div>
                    <p style="font-size: 14px; margin: 4px 0 0 0; color: #555555; line-height: 1.4;">
                      Featuring the Sankofa Historic Mobile Museum inside the Percy Peek Gymnasium. Food and refreshments will be provided.
                    </p>
                  </div>

                  <div class="schedule-item" style="margin-top: 20px;">
                    <div class="schedule-time">Friday, June 19 — 12:00 PM - 8:00 PM</div>
                    <div class="schedule-title">Festival & Activations</div>
                    <p style="font-size: 14px; margin: 4px 0 0 0; color: #555555; line-height: 1.4;">
                      <strong>Gym (12 PM - 4 PM):</strong> Career Fair, Health Screenings, Highwaymen Paint Class, and Free Haircuts.<br/>
                      <strong>Outdoor (12 PM - 8 PM):</strong> Youth & Cultural Performances, Live Bands, E-sport Tournament, and 30+ Local Vendors!
                    </p>
                  </div>

                  <div class="section-title">🎵 SOUNDTRACK OF FREEDOM</div>
                  <p style="font-size: 14px; color: #555555; margin-top: 8px; line-height: 1.4;">
                    Get into the spirit early with our curated playlist featuring tracks and artists defining this year's festival.
                  </p>
                  <a href="https://youtube.com/playlist?list=PLd4UFeulPDefXji7AOegZ6aiZ5qAgm1kq" target="_blank" class="playlist-btn">
                    🎧 Listen to the Playlist
                  </a>
                  
                  <p style="font-size: 13px; color: #666666; text-align: center; margin-top: 30px; font-style: italic;">
                    Presented by the St. Lucie County Juneteenth Committee & Sunland News.
                  </p>
                </div>
                <div class="footer">
                  <p>© 2026 Sunland News. All rights reserved.</p>
                  <p>Want to unsubscribe? <a href="https://sunlandnews.com/unsubscribe" target="_blank">Click here</a></p>
                </div>
              </div>
            </body>
            </html>
          `
        });
      } catch (subscriberEmailError) {
        console.error('Failed to send Juneteenth welcome email to subscriber:', subscriberEmailError);
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