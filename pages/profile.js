import SectionWrapper from "@/components/SectionWrapper";
import Profile from "@/components/ui/Profile";
import Head from "next/head";


export default function profilePage() {
  return (
    
    <>
     <Head>
        <title>Profile - CollegeGenie</title>
      </Head>
      <SectionWrapper>
        <Profile />
      </SectionWrapper>
    </>
  );
}