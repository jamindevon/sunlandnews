import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const priceId = process.env.STRIPE_PRICE_ID;

        if (!priceId) {
            console.error('Missing STRIPE_PRICE_ID');
            return NextResponse.json({ error: 'Stripe configuration missing' }, { status: 500 });
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sunlandnews.com'}/calendar/setup?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sunlandnews.com'}/calendar`,
            automatic_tax: { enabled: true },
            allow_promotion_codes: true,
        });

        return NextResponse.json({ url: session.url });

    } catch (error) {
        console.error('Stripe Checkout error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
