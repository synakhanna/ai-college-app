import SectionWrapper from "@/components/SectionWrapper";
import Billing from "@/components/ui/Billing";
import Head from "next/head";
import { useState } from "react";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // You can add userId or email here if necessary
        }),
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

  return (
    <>
      <Head>
        <title>Billing - CollegeGenie</title>
      </Head>
      <SectionWrapper>
        <Billing />
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="btn-primary mt-4"
        >
          {loading ? 'Processing...' : 'Get a subscription to use CodeFlash! Only $6.99 a month.'}
        </button>
        
      </SectionWrapper>
    </>
  );
}
