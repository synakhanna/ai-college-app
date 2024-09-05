import Stripe from "stripe";
import connectDB from '../../lib/mongodb';
import User from '../../models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { session_id } = req.query;

      if (!session_id) {
        throw new Error('Session ID is required');
      }

      await connectDB();

      // Retrieve the checkout session from Stripe
      const session = await stripe.checkout.sessions.retrieve(session_id);

      if (!session) {
        return res.status(404).json({ error: { message: "Session not found" } });
      }

      // Find the user in MongoDB using the clerkId stored in the session's client_reference_id
      const user = await User.findOne({ clerkId: session.client_reference_id });

      if (!user) {
        return res.status(404).json({ error: { message: "User not found" } });
      }

      // Update user's subscription status to 'active' if it's a successful payment
      if (session.payment_status === 'paid') {
        user.subscriptionStatus = 'active';
        user.stripeId = session.subscription;
        await user.save();
      }

      // Retrieve the subscription details
      const subscription = await stripe.subscriptions.retrieve(session.subscription);

      return res.status(200).json({
        subscriptionStatus: subscription.status,
        subscriptionDetails: subscription,
      });
    } catch (error) {
      console.error('Error retrieving subscription:', error);
      return res.status(500).json({ error: { message: error.message } });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}