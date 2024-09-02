import Stripe from "stripe";
import connectDB from '../../lib/mongodb';
import User from '../../models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export default async function handler(req, res) {
  const { session_id } = req.query;

  try {
    if (!session_id) {
      throw new Error('Session ID is required');
    }

    await connectDB();

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) {
      return res.status(404).json({ error: { message: "Session not found" } });
    }

    const user = await User.findOne({ clerkId: session.client_reference_id });

    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    // Store the Stripe subscription ID and update subscription status
    user.stripeId = session.subscription;
    user.subscriptionStatus = 'active';
    await user.save();

    const subscription = await stripe.subscriptions.retrieve(session.subscription);

    return res.status(200).json({
      subscriptionStatus: subscription.status,
      subscriptionDetails: subscription,
    });
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    return res.status(500).json({ error: { message: error.message } });
  }
}
