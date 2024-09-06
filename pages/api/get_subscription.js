import Stripe from "stripe";
import connectDB from '../../lib/mongodb';
import User from '../../models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { userId } = req.query;  // Clerk userId (MongoDB _id) is passed in the query

      if (!userId) {
        throw new Error('User ID is required');
      }

      await connectDB();  // Connect to MongoDB

      // Find the user by Clerk userId (which is _id in your schema)
      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the user has a Stripe session ID saved in MongoDB
      if (!user.stripeId) {
        throw new Error('No Stripe session found for this user');
      }

      // Retrieve the Stripe checkout session
      const checkoutSession = await stripe.checkout.sessions.retrieve(user.stripeId);

      // Get the subscription ID from the session
      const subscriptionId = checkoutSession.subscription;

      if (!subscriptionId) {
        throw new Error('No subscription found for this session');
      }

      // Retrieve the subscription details from Stripe using the subscription ID
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      // If the user's `stripeId` hasn't been updated with the actual subscription ID, update it
      if (user.stripeId !== subscriptionId) {
        user.stripeId = subscriptionId;
        await user.save();
      }

      // Return the subscription details
      return res.status(200).json({
        billingDetails: {
          email: subscription.customer_email || 'N/A',
          subscriptionStart: subscription.current_period_start,
          subscriptionEnd: subscription.current_period_end,
          status: subscription.status,
          plan: subscription.items.data[0].plan.nickname,  // Assuming only one plan
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