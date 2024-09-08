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

      await connectDB();

      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!user.stripeId) {
        throw new Error('No Stripe customer found for this user');
      }

      // Retrieve all subscriptions for this customer
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeId,
        status: 'all',  // Fetch all subscriptions, including canceled ones
        expand: ['data.default_payment_method'],
      });

      if (subscriptions.data.length === 0) {
        throw new Error('No subscriptions found for this customer');
      }

      const subscription = subscriptions.data[0];  // Assuming one active subscription

      return res.status(200).json({
        billingDetails: {
          email: subscription.customer_email || 'N/A',
          subscriptionStart: new Date(subscription.current_period_start * 1000).toLocaleDateString(), // Convert from Unix timestamp
          subscriptionEnd: new Date(subscription.current_period_end * 1000).toLocaleDateString(), // Convert from Unix timestamp
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
