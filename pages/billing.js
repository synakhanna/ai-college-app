import SectionWrapper from "@/components/SectionWrapper";
import Billing from "@/components/ui/Billing";
import Head from "next/head";
import { useState } from "react";
import { SignedIn } from "@clerk/nextjs";

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
      <SignedIn>
      <Head>
        <title>Billing - CollegeGenie</title>
      </Head>
      <SectionWrapper>
        <Billing />
      </SectionWrapper>
      </SignedIn>
    </>
  );
}
