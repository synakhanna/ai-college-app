import SectionWrapper from "@/components/SectionWrapper";
import FAQs from "@/components/ui/FAQs";
import Features from "@/components/ui/Features";
import Hero from "@/components/ui/Hero";
import Pricing from "@/components/ui/Pricing";
import Testimonial from "@/components/ui/Testimonial";

export default function Home() {
  return (
    <>
      <SectionWrapper>
        <Hero />
      </SectionWrapper>
      <SectionWrapper>
        <Features />
      </SectionWrapper>
      <SectionWrapper>
        <Testimonial />
      </SectionWrapper>
      <SectionWrapper>
        <Pricing />
      </SectionWrapper>
      <SectionWrapper>
        <FAQs />
      </SectionWrapper>
    </>
  );
}
