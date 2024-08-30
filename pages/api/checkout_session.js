import { NextResponse } from "next/server";
import Stripe from "stripe";

const formatAmountForStripe = (amount, currency) => {
    return Math.round(amount * 100)
   }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
});
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const referer = req.headers.referer; // Accessing the Referer header directly

      const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Pro subscription',
              },
              unit_amount: formatAmountForStripe(10, 'usd'), // $10.00
              recurring: {
                interval: 'month',
                interval_count: 1,
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${referer}result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${referer}result?session_id={CHECKOUT_SESSION_ID}`,
      };

      const checkoutSession = await stripe.checkout.sessions.create(params);

      return res.status(200).json(checkoutSession);
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return res.status(500).json({ error: { message: error.message } });
    }
  } else {
    // Handle other HTTP methods or return 405 if method is not allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

  export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const session_id = searchParams.get('session_id')
  
    try {
      if (!session_id) {
        throw new Error('Session ID is required')
      }
  
      const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
  
      return NextResponse.json(checkoutSession)
    } catch (error) {
      console.error('Error retrieving checkout session:', error)
      return NextResponse.json({ error: { message: error.message } }, { status: 500 })
    }
  }
