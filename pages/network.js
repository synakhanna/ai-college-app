import SectionWrapper from "@/components/SectionWrapper";
import Head from "next/head";
import Network from "@/components/ui/Network";


export default function networkPage() {
  return (
    
    <>
     <Head>
        <title>Network - CollegeGenie</title>
      </Head>
      <SectionWrapper>
        <Network />
      </SectionWrapper>
    </>
  );
}