import SectionWrapper from "@/components/SectionWrapper";
import Counselor from "@/components/ui/Counselor";
import Head from "next/head";
import { SignedIn } from "@clerk/nextjs";

export default function CounselorPage() {  // Capitalized 'C'
  return (
    <>
    <SignedIn>
     <Head>
        <title>Counselor - CollegeGenie</title>
      </Head>
      <SectionWrapper>
        <Counselor />
      </SectionWrapper>
      </SignedIn>
    </>
  );
}
