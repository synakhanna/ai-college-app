import SectionWrapper from "@/components/SectionWrapper";
import Billing from "@/components/ui/Billing";
import Head from "next/head";

export default function billingPage() {
  return (
    
    <>
    <Head>
        <title>Billing - CollegeGenie</title>
      </Head>
      <SectionWrapper>
        <Billing />
      </SectionWrapper>
    </>
  );
}