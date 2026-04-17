import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY;

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey) 
  : null;

export async function POST(request) {
    try {
        const body = await request.json();
        const { leadData, answers, estimates } = body;

        if (!leadData || !leadData.email) {
            return NextResponse.json({ success: false, error: 'Missing lead data' }, { status: 400 });
        }

        // 1. Insert into Supabase Databse (if configured)
        if (supabase) {
            try {
                const { error } = await supabase
                    .from('insurance_leads')
                    .insert([{
                        full_name: leadData.name,
                        email: leadData.email,
                        phone: leadData.phone,
                        estimated_low_savings: estimates.lowEnd,
                        estimated_high_savings: estimates.highEnd,
                        raw_answers: answers
                    }]);

                if (error) {
                    console.error('Supabase Insertion Error:', error);
                    // We don't return an error here so the emails still send even if DB fails
                }
            } catch (dbError) {
                console.error('Database connection error:', dbError);
            }
        } else {
            console.warn("Supabase credentials missing. Skipping database insert.");
        }

        if (resendApiKey) {
            const resend = new Resend(resendApiKey);

            // 1. Send Internal Notification to Ms. Daisy
            try {
                await resend.emails.send({
                    from: `${process.env.EMAIL_FROM_NAME || 'SE Benchmark'} <${process.env.EMAIL_FROM || 'hello@sunland.news'}>`,
                    to: ['daisy@sebenchmark.com', 'thesunlandcompany@gmail.com'], 
                    subject: `[Completed] Quiz Results for: ${leadData.name}`,
                    html: `
                        <h2>New Auto Insurance Discount Lead!</h2>
                        <p><strong>Name:</strong> ${leadData.name}</p>
                        <p><strong>Email:</strong> ${leadData.email}</p>
                        <p><strong>Phone:</strong> ${leadData.phone}</p>
                        <br/>
                        <h3>Estimated Savings Bounds</h3>
                        <p><strong>Low End:</strong> $${estimates.lowEnd}</p>
                        <p><strong>High End:</strong> $${estimates.highEnd}</p>
                        <br/>
                        <h3>Quiz Answers:</h3>
                        <ul>
                            <li><strong>Homeowner:</strong> ${answers[2] || 'N/A'}</li>
                            <li><strong>Under 25 Drivers:</strong> ${answers[3] || 'N/A'}</li>
                            <li><strong>Good Grades:</strong> ${answers[4] || 'N/A'}</li>
                            <li><strong>Current Premium Range:</strong> ${answers[5] || 'N/A'}</li>
                        </ul>
                    `
                });
            } catch (emailError) {
                console.error('Error sending admin notification:', emailError);
            }

            // Calculate which specific discounts they triggered to list in the email
            let triggeredDiscounts = '';
            
            if (answers[2] === "Yes") {
                triggeredDiscounts += `
                <li style="margin-bottom: 10px;">
                    <strong>🏠 Homeowner Discount:</strong> Insurers love stability. Bundling your auto insurance with a home you own often triggers the largest available bulk discount on your policy.
                </li>`;
            }
            if (answers[3] === "Yes" && answers[4] === "Yes") {
                triggeredDiscounts += `
                <li style="margin-bottom: 10px;">
                    <strong>🎓 Good Student Discount:</strong> Insuring young drivers is expensive, but maintaining a B-average or better statistically proves responsibility, unlocking significant premium reductions for students.
                </li>`;
            }

            // Always add a universal/base tip
            triggeredDiscounts += `
                <li style="margin-bottom: 10px;">
                    <strong>🛡️ Safe Driver / Loyalty Programs:</strong> Based on standard industry practices, opting for paperless billing, auto-pay, or having a clean record for 3+ years unlocks baseline rate drops.
                </li>
            `;

            // 2. Send Auto-Response to the Survey Taker
            try {
                await resend.emails.send({
                    from: `${process.env.EMAIL_FROM_NAME || 'Ms. Daisy at SE Benchmark'} <${process.env.EMAIL_FROM || 'hello@sunland.news'}>`,
                    to: [leadData.email],
                    subject: `Your Auto Insurance Savings Estimate!`,
                    html: `
                        <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
                            <h2 style="color: #7b2cb5;">Hi ${leadData.name},</h2>
                            <p>Thank you for taking our quick 30-second discount checker!</p>
                            
                            <p>Based on the initial information you provided, we estimate you might be eligible for <strong style="font-size: 1.2em; color: #7b2cb5;">$${estimates.lowEnd} to $${estimates.highEnd}</strong> in savings on your auto insurance over a 6-month period.</p>
                            
                            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;"/>
                            
                            <h3 style="color: #333;">Here is exactly where those savings are coming from:</h3>
                            <ul style="padding-left: 20px;">
                                ${triggeredDiscounts}
                            </ul>
                            
                            <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #7b2cb5; margin-top: 30px;">
                                <em><strong>Did you know?</strong> Most people leave hundreds on the table simply because neither they nor their agent proactively asked for these standard discounts to be applied to their renewal.</em>
                            </p>

                            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;"/>

                            <p>I will be reviewing your profile personally and reaching out to you shortly at <strong>${leadData.phone}</strong> to verify these discounts and explore how we can lock in better rates for you.</p>
                            <br/>
                            <p>Looking forward to speaking with you,</p>
                            <p><strong>Ms. Daisy</strong><br/>SE Benchmark Insurance Agency</p>
                        </div>
                    `
                });
            } catch (emailError) {
                console.error('Error sending user notification:', emailError);
            }
        } else {
            console.warn("RESEND_API_KEY is not defined. Skipping email sending.");
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
