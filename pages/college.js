import SectionWrapper from "@/components/SectionWrapper";
import College from "@/components/ui/College";
import Head from "next/head";
import { SignedIn } from "@clerk/nextjs";


export default function collegePage() {
  return (
    
    <>
    <SignedIn>
     <Head>
        <title>College - CollegeGenie</title>
      </Head>
      <SectionWrapper>
        <College />
      </SectionWrapper>
      </SignedIn>
    </>
  );
}