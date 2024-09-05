import SectionWrapper from "@/components/SectionWrapper";
import Head from "next/head";
import Network from "@/components/ui/Network";
import { SignedIn } from "@clerk/nextjs";


export default function networkPage() {
  return (
    
    <>
    <SignedIn>
     <Head>
        <title>Network - CollegeGenie</title>
      </Head>
      <SectionWrapper>
        <Network />
      </SectionWrapper>
      </SignedIn>
    </>
  );
}