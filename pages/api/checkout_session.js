import { NextResponse } from "next/server";
import Stripe from "stripe";
import mongoose from 'mongoose';
import User from '../../models/User';


const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const formatAmountForStripe = (amount, currency) => {
    return Math.round(amount * 100)
   }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { clerkId } = req.body;  // Assuming the frontend sends the user's clerkId

      await connectDB(); // Ensure you're connected to MongoDB

      // Find the user in the database
      const user = await User.findOne({ clerkId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Create a new Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Pro subscription',
              },
              unit_amount: 699, // Assuming $6.99/month
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.referer}result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.referer}result?session_id={CHECKOUT_SESSION_ID}`,
        client_reference_id: clerkId, // Reference the user in Stripe with clerkId
      });

      // Update the user in MongoDB with the Stripe session ID
      user.stripeId = session.id;
      await user.save();

      return res.status(200).json({ url: session.url });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return res.status(500).json({ error: { message: error.message } });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}






  // export async function GET(req) {
  //   const searchParams = req.nextUrl.searchParams
  //   const session_id = searchParams.get('session_id')
  
  //   try {
  //     if (!session_id) {
  //       throw new Error('Session ID is required')
  //     }
  
  //     const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
  
  //     return NextResponse.json(checkoutSession)
  //   } catch (error) {
  //     console.error('Error retrieving checkout session:', error)
  //     return NextResponse.json({ error: { message: error.message } }, { status: 500 })
  //   }
  // }
