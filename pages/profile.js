import SectionWrapper from "@/components/SectionWrapper";
import Profile from "@/components/ui/Profile";
import Head from "next/head";
import { SignedIn } from "@clerk/nextjs";


export default function profilePage() {
  return (
    
    <>
    <SignedIn>
     <Head>
        <title>Profile - CollegeGenie</title>
      </Head>
      <SectionWrapper>
        <Profile />
      </SectionWrapper>
      </SignedIn>
    </>
  );
}