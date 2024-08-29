import SectionWrapper from "@/components/SectionWrapper";
import Counselor from "@/components/ui/Counselor";
import Head from "next/head";


export default function CounselorPage() {  // Capitalized 'C'
  return (
    <>
     <Head>
        <title>Counselor - CollegeGenie</title>
      </Head>
      <SectionWrapper>
        <Counselor />
      </SectionWrapper>
    </>
  );
}
