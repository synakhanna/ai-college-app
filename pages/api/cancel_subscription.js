import { NextResponse } from "next/server";
import Stripe from "stripe";
import {doc, getDoc, updateDoc } from 'firebase/firestore';
import {db} from '../../firebase';

export async function POST(req) {
    try {
      const { userId } = await req.json(); // Get the user ID from the request body
  
      // Fetch user document to get the subscription ID from Firebase
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists() || !userDoc.data().stripeSubscriptionId) {
        throw new Error('No active subscription found for this user');
      }
  
      const subscriptionId = userDoc.data().stripeSubscriptionId;
  
      // Cancel the subscription in Stripe
      const deletedSubscription = await stripe.subscriptions.del(subscriptionId);
  
      // Update the user document in Firebase to remove the subscription ID
      await updateDoc(userRef, {
        stripeSubscriptionId: null,
        stripeCheckoutSessionId: null,
      });
  
      return NextResponse.json({ success: true, message: 'Subscription cancelled successfully', deletedSubscription }, { status: 200 });
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      return new NextResponse(JSON.stringify({ error: { message: error.message } }), { status: 500 });
    }
  }
  