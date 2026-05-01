import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Make sure to use the correct env variable from your Sunland setup
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      fullName,
      stageName,
      phone,
      email,
      cityState,
      talentType,
      groupName,
      numPerformers,
      description,
      perfLength,
      videoLink,
      socialHandles,
      experience,
      musicPlayback,
      bringEquipment,
      equipmentDetails,
      specialReqs,
      acknowledgement,
      contentShoot
    } = data;

    const emailContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="background-color: #D32F2F; color: white; padding: 15px; margin-bottom: 20px;">
          TCBU Juneteenth Performer Application
        </h2>
        
        <h3 style="color: #1B5E20; border-bottom: 2px solid #eaeaea; padding-bottom: 5px;">Section 1: Contact Information</h3>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Stage Name:</strong> ${stageName || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>City/State:</strong> ${cityState}</p>

        <h3 style="color: #1B5E20; border-bottom: 2px solid #eaeaea; padding-bottom: 5px; margin-top: 25px;">Section 2: Performance Details</h3>
        <p><strong>Type of Talent:</strong> ${talentType}</p>
        <p><strong>Performance/Group Name:</strong> ${groupName}</p>
        <p><strong>Number of Performers:</strong> ${numPerformers}</p>
        <p><strong>Preferred Length:</strong> ${perfLength}</p>
        <p><strong>Description:</strong><br/> ${description}</p>

        <h3 style="color: #1B5E20; border-bottom: 2px solid #eaeaea; padding-bottom: 5px; margin-top: 25px;">Section 3: Media & Experience</h3>
        <p><strong>Video Link:</strong> <a href="${videoLink}">${videoLink}</a></p>
        <p><strong>Social Handles:</strong> ${socialHandles}</p>
        <p><strong>Previous Experience:</strong><br/> ${experience || 'N/A'}</p>

        <h3 style="color: #1B5E20; border-bottom: 2px solid #eaeaea; padding-bottom: 5px; margin-top: 25px;">Section 4: Logistics</h3>
        <p><strong>Requires Music Playback:</strong> ${musicPlayback}</p>
        <p><strong>Bringing Equipment:</strong> ${bringEquipment}</p>
        <p><strong>Equipment Details:</strong> ${equipmentDetails || 'N/A'}</p>
        <p><strong>Special Requirements:</strong> ${specialReqs || 'N/A'}</p>

        <h3 style="color: #1B5E20; border-bottom: 2px solid #eaeaea; padding-bottom: 5px; margin-top: 25px;">Section 5: Agreement</h3>
        <p><strong>Acknowledged Terms:</strong> ${acknowledgement ? 'Yes' : 'No'}</p>
        <p><strong>Content Shoot Availability:</strong> ${contentShoot}</p>
      </div>
    `;

    // Try to send email
    const result = await resend.emails.send({
      from: 'Juneteenth Events <hello@email.sunland.news>',
      to: ['thesunlandcompany@gmail.com', 'kayylovemanagement@gmail.com'],
      subject: `Juneteenth Performer App: ${stageName || groupName || fullName}`,
      html: emailContent,
    });

    if (result.error) {
      console.error('Resend Error:', result.error);
      return NextResponse.json({ error: 'Error sending email' }, { status: 400 });
    }

    // Send data to Zapier Webhook (Fire and forget)
    try {
      await fetch('https://hooks.zapier.com/hooks/catch/19891721/uvg8747/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (zapError) {
      console.error('Zapier Error:', zapError);
    }

    return NextResponse.json({ success: true, data: result.data }, { status: 200 });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
