import Stripe from "stripe";
import connectDB from '../../lib/mongodb';
import User from '../../models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { userId } = req.query;

      if (!userId) {
        throw new Error('User ID is required');
      }

      // Connect to MongoDB
      await connectDB();

      // Find the user by Clerk ID
      const user = await User.findOne({ clerkId: userId });

      if (!user) {
        throw new Error('User not found');
      }

      // Check if the user has a Stripe subscription ID
      if (!user.stripeId) {
        throw new Error('No Stripe subscription found for this user');
      }

      // Retrieve the subscription details from Stripe using the stripeId
      const subscription = await stripe.subscriptions.retrieve(user.stripeId);

      return res.status(200).json({
        billingDetails: {
          email: subscription.customer_email || 'N/A', // Email from Stripe
          subscriptionStart: subscription.current_period_start,
          subscriptionEnd: subscription.current_period_end,
          status: subscription.status,
          plan: subscription.items.data[0].plan.nickname, // Assuming only one plan
        },
      });
    } catch (error) {
      console.error('Error retrieving subscription details:', error);
      return res.status(500).json({ error: { message: error.message } });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}