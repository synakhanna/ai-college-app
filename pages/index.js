import CTA from "@/components/ui/CTA";
import FAQs from "@/components/ui/FAQs";
import Features from "@/components/ui/Features";
import Hero from "@/components/ui/Hero";
import Pricing from "@/components/ui/Pricing";
import Testimonial from "@/components/ui/Testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CTA />
      <Testimonial />
      <Pricing />
      <FAQs />
    </>
  );
}
