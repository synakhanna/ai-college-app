import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Result = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [loading, setLoading] = useState(true);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      if (!session_id) return;

      try {
        const response = await axios.get(`/api/check_subscription?session_id=${session_id}`);
        if (response.status === 200) {
          setSubscriptionDetails(response.data.subscriptionDetails);
        } else {
          setError('Failed to retrieve subscription details');
        }
      } catch (err) {
        console.error('Error retrieving subscription:', err);
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionDetails();
  }, [session_id]);

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post('/api/create_checkout_session', {
        userId: 'your-user-id',  // Replace with actual user ID
        email: 'user@example.com',  // Replace with actual user email
      });
      window.location.href = data.url;  // Redirect to Stripe Checkout
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {!subscriptionDetails ? (
        <div>
          <h1>Start Your Subscription</h1>
          <button onClick={handleCheckout} className="btn btn-primary">
            Go to Stripe Checkout
          </button>
        </div>
      ) : (
        <div>
          <h1>Subscription Details</h1>
          <p>Status: {subscriptionDetails.status}</p>
          <p>Start Date: {new Date(subscriptionDetails.start_date * 1000).toLocaleDateString()}</p>
          <p>Current Period End: {new Date(subscriptionDetails.current_period_end * 1000).toLocaleDateString()}</p>
          <button onClick={() => router.reload()} className="btn btn-secondary">
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default Result;
