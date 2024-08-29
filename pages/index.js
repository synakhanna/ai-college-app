import { useEffect, useState } from 'react';
import SectionWrapper from "@/components/SectionWrapper";
import FAQs from "@/components/ui/FAQs";
import Features from "@/components/ui/Features";
import Hero from "@/components/ui/Hero";
import Pricing from "@/components/ui/Pricing";
import Testimonial from "@/components/ui/Testimonial";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Profile from "@/components/ui/Profile";

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 300) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 300) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  return (
    <>
      <SignedOut>
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

        <div 
          onClick={scrollTop}
          style={{
            display: showScroll ? 'flex' : 'none',
            position: 'fixed',
            right: '30px',
            bottom: '30px',
            height: '50px',
            width: '50px',
            backgroundColor: '#9334E9',
            color: 'white',
            textAlign: 'center',
            lineHeight: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 1000,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px'
          }}
        >
          ↑
        </div>
      </SignedOut>

      <SignedIn>
        <SectionWrapper>
          <Profile />
        </SectionWrapper>
      </SignedIn>
    </>
  );
}
