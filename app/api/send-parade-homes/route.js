import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { homes } from '../../data/parade-homes';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email, selectedHomeIds } = await req.json();

    if (!email || !selectedHomeIds || selectedHomeIds.length === 0) {
      return NextResponse.json(
        { error: 'Email and selected homes are required.' },
        { status: 400 }
      );
    }

    // Filter the homes to just the ones the user selected
    const selectedHomes = homes.filter(home => selectedHomeIds.includes(home.id));

    // Construct the email HTML content
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h1 style="text-align: center; color: #000;">Your Parade of Homes Favorites</h1>
        <p>Hi there,</p>
        <p>Thanks for exploring the 2026 Parade of Homes with Sunland News! Here are the homes you favorited during your window shopping:</p>
        
        ${selectedHomes.map(home => `
          <div style="border: 2px solid #000; padding: 15px; margin-bottom: 20px; border-radius: 8px;">
            <img src="${home.image}" alt="${home.name}" style="width: 100%; border-radius: 4px; box-shadow: 2px 2px 0px #000;" />
            <h2 style="margin-top: 15px; margin-bottom: 5px;">${home.name}</h2>
            <p style="margin: 0;"><strong>Builder:</strong> ${home.builder}</p>
            <p style="margin: 0;"><strong>Price:</strong> ${home.price}</p>
            <p style="margin: 0;"><strong>Specs:</strong> ${home.sqft} sq.ft. | ${home.bedrooms} beds | ${home.bathrooms} baths</p>
            <div style="margin-top: 10px;">
              <a href="${home.link}" style="display: inline-block; padding: 10px 15px; background: #000; color: #fff; text-decoration: none; border-radius: 4px; margin-right: 10px; font-weight: bold;">View Details</a>
              ${home.directions !== '#' ? `<a href="${home.directions}" style="display: inline-block; padding: 10px 15px; border: 2px solid #000; color: #000; text-decoration: none; border-radius: 4px; font-weight: bold;">Get Directions</a>` : ''}
            </div>
          </div>
        `).join('')}

        <hr style="border: 1px solid #ccc; margin: 30px 0;" />
        <div style="text-align: center; font-size: 14px; color: #666;">
          <p>Brought to you by Sunland News & Treasure Coast Builders Association.</p>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: [email],
      subject: 'Your Parade of Homes Favorites 🏡',
      html: htmlContent,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
