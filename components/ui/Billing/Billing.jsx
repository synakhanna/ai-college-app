import React from "react";
import { useEffect, useState } from "react";
import LayoutEffect from "@/components/LayoutEffect";
import connectDB from '../../../lib/mongodb';
import NavLink from 'next/link'; // Ensure you're using the correct import for NavLink

export default function Table() {
  const [account, setAccount] = useState({
    name: '',
    dateJoined: '',
    subscriptionStatus: '',
  });
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const session = await response.json();

      if (response.ok && session.url) {
        window.location.href = session.url; // Redirect to Stripe checkout
      } else {
        console.error("Error:", session.error?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const response = await fetch('/api/get_subscription', {
          method: 'GET',
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.subscriptionStatus === 'active') {
            // Display subscription details
            setAccount({
              name: user.fullName || 'N/A',
              dateJoined: new Date(user.dateCreated).toLocaleDateString(),
              subscriptionStatus: 'Active',
            });
          }
        } else {
          console.error('Failed to fetch subscription details');
        }
      } catch (error) {
        console.error('Error fetching subscription details:', error);
      }
    };
  
    fetchSubscriptionDetails();
  }, []);

  return (
    <div className="custom-screen py-20">
      <LayoutEffect
        className="duration-1000 delay-300"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0",
        }}
      >
        <div>
          <div className="space-y-5 max-w-6xl mx-auto text-center">
            <h1
              className="text-4xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto sm:text-6xl py-6"
              style={{
                backgroundImage:
                  "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)",
              }}
            >
              Billing Information
            </h1>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="flex items-center justify-center gap-x-1 text-lg ml-5 text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900 px-4 py-2 rounded-lg md:inline-flex"
            >
              {loading ? 'Processing...' : 'Visit Stripe to Pay, Edit Payment Method, or Unsubscribe'}
            </button>
            <div
              className={
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-3xl bg-white"
              }
            >
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse rounded-3xl">
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td
                        className="px-6 py-4 align-middle text-sm text-left font-bold text-gray-700 rounded-tl-3xl"
                        style={{ width: '150px' }}
                      >
                        Name
                      </td>
                      <td className="px-6 py-4 align-middle text-sm text-left text-gray-700 rounded-tr-3xl">
                        {account.name}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td
                        className="px-6 py-4 align-middle text-sm text-left font-bold text-gray-700"
                        style={{ width: '150px' }}
                      >
                        Date Joined
                      </td>
                      <td className="px-6 py-4 align-middle text-sm text-left text-gray-700">
                        {account.dateJoined}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td
                        className="px-6 py-4 align-middle text-sm text-left font-bold text-gray-700 rounded-bl-3xl"
                        style={{ width: '150px' }}
                      >
                        Subscription Status
                      </td>
                      <td className="px-6 py-4 align-middle text-sm text-left text-gray-700 rounded-br-3xl">
                        {account.subscriptionStatus}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </LayoutEffect>
    </div>
  );
}
