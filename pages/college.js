import SectionWrapper from "@/components/SectionWrapper";
import College from "@/components/ui/College";
import Head from "next/head";


export default function collegePage() {
  return (
    
    <>
     <Head>
        <title>College - CollegeGenie</title>
      </Head>
      <SectionWrapper>
        <College />
      </SectionWrapper>
    </>
  );
}