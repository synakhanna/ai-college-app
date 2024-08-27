import {
  Box,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Stack,
  Tag,
  Text,
  useClipboard,
  VStack,
  Wrap
} from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import type { NextPage } from "next";
import Image from "next/image";
import * as React from "react";

import { Br, Link } from "@saas-ui/react";
import { Faq } from "components/faq";
import { Features } from "components/features";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { Hero } from "components/hero";
import { FallInPlace } from "components/motion/fall-in-place";
import { Pricing } from "components/pricing/pricing";
import { Em } from "components/typography";
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiCode,
  FiCopy,
  FiFlag,
  FiGrid,
  FiLock,
  FiSearch,
  FiSliders,
  FiSmile,
  FiTerminal,
  FiThumbsUp,
  FiToggleLeft,
  FiTrendingUp,
  FiUserPlus,
} from "react-icons/fi";

import { ButtonLink } from "components/button-link/button-link";
import { Testimonial, Testimonials } from "components/testimonials";

import faq from "data/faq";

import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from "components/highlights";

const Home: NextPage = () => {
  return (
    <Box>
      <SEO
        title="College Application Service"
        description="Your trusted platform to simplify and streamline the college application process."
      />
      <Box>
        <HeroSection />

        <HighlightsSection />

        <FeaturesSection />

        <TestimonialsSection />

        <PricingSection />

        <FaqSection />
      </Box>
    </Box>
  );
};

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: "column", lg: "row" }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Simplify Your College Applications
                <Br /> with Our Expert Guidance
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                Our platform helps you navigate the college application process <Br /> 
                with ease and confidence, providing personalized advice <Br />{" "}
                and streamlined application tracking.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <ButtonGroup spacing={4} alignItems="center">
                <ButtonLink colorScheme="primary" size="lg" href="/signup">
                  Get Started
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  href="/learn-more"
                  variant="outline"
                  rightIcon={
                    <Icon
                      as={FiArrowRight}
                      sx={{
                        transitionProperty: "common",
                        transitionDuration: "normal",
                        ".chakra-button:hover &": {
                          transform: "translate(5px)",
                        },
                      }}
                    />
                  }
                >
                  Learn More
                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>
          <Box
            height="600px"
            position="absolute"
            display={{ base: "none", lg: "block" }}
            left={{ lg: "60%", xl: "55%" }}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace delay={1}>
              <Box overflow="hidden" height="100%">
                <Image
                  src="/static/screenshots/college-dashboard.png"
                  layout="fixed"
                  width={1200}
                  height={762}
                  alt="Screenshot of College Application Dashboard"
                  quality="75"
                  priority
                />
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>

      <Features
        id="benefits"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="20"
        features={[
          {
            title: "Personalized Guidance",
            icon: FiSmile,
            description: "Get expert advice and personalized tips tailored to your strengths.",
            iconPosition: "left",
            delay: 0.6,
          },
          {
            title: "Application Tracking",
            icon: FiSliders,
            description:
              "Keep track of your applications, deadlines, and tasks in one place.",
            iconPosition: "left",
            delay: 0.8,
          },
          {
            title: "College Matching",
            icon: FiGrid,
            description:
              "We match you with the best colleges based on your profile and interests.",
            iconPosition: "left",
            delay: 1,
          },
          {
            title: "Essay Assistance",
            icon: FiThumbsUp,
            description:
              "Receive feedback on your essays and improve your writing skills.",
            iconPosition: "left",
            delay: 1.1,
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  );
};

const HighlightsSection = () => {
  const { value, onCopy, hasCopied } = useClipboard("yarn add @college-app/react");

  return (
    <Highlights>
      <HighlightsItem colSpan={[1, null, 2]} title="Core components">
        <VStack alignItems="flex-start" spacing="8">
          <Text color="muted" fontSize="xl">
            Get started for free with <Em>30+ open source components</Em>.
            Including college application tracking, essay feedback, and expert advice.
          </Text>

          <Flex
            rounded="full"
            borderWidth="1px"
            flexDirection="row"
            alignItems="center"
            py="1"
            ps="8"
            pe="2"
            bg="primary.900"
            _dark={{ bg: "gray.900" }}
          >
            <Box>
              <Text color="yellow.400" display="inline">
                yarn add
              </Text>{" "}
              <Text color="cyan.300" display="inline">
                @college-app/react
              </Text>
            </Box>
            <IconButton
              icon={hasCopied ? <FiCheck /> : <FiCopy />}
              aria-label="Copy install command"
              onClick={onCopy}
              variant="ghost"
              ms="4"
              isRound
              color="white"
            />
          </Flex>
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Solid foundations">
        <Text color="muted" fontSize="lg">
          We don't re-invent the wheel. We leverage the best tools and build on top of them.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Renata Alink"
        description="Founder"
        avatar="/static/images/avatar.jpg"
        gradient={["pink.200", "purple.500"]}
      >
        “This platform saved us hundreds of hours in development time and allowed us to focus on building the best product for students.”
      </HighlightsTestimonialItem>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="Start your journey two steps ahead"
      >
        <Text color="muted" fontSize="lg">
          We've taken care of all the essentials so you can start building functionality that makes your college application unique.
        </Text>
        <Wrap mt="8">
          {[
            "application tracking",
            "essay assistance",
            "college matching",
            "multi-tenancy",
            "layouts",
            "billing",
            "a11y testing",
            "server-side rendering",
            "documentation",
            "onboarding",
            "responsiveness",
          ].map((value) => (
            <Tag
              key={value}
              variant="subtle"
              colorScheme="purple"
              rounded="full"
              px="3"
            >
              {value}
            </Tag>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  );
};

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={["2xl", null, "4xl"]}
          textAlign="left"
          as="p"
        >
          Your gateway to higher education.
        </Heading>
      }
      description={
        <>
          Our platform includes everything you need to navigate your college applications.
          <Br />
          Use it as a foundation for your future success.
        </>
      }
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: "Components.",
          icon: FiBox,
          description:
            "All premium components are available on a private NPM registry, ensuring you're always up-to-date.",
          variant: "inline",
        },
        {
          title: "Starterkits.",
          icon: FiLock,
          description:
            "Example apps, including tracking and essay feedback, everything you need to get started FAST.",
          variant: "inline",
        },
        {
          title: "Documentation.",
          icon: FiSearch,
          description:
            "Extensively documented, including use-cases, examples, and storybooks.",
          variant: "inline",
        },
        {
          title: "Onboarding.",
          icon: FiUserPlus,
          description:
            "Add user onboarding flows without breaking a sweat.",
          variant: "inline",
        },
        {
          title: "Feature flags.",
          icon: FiFlag,
          description:
            "Implement feature toggles for your billing plans with easy-to-use hooks.",
          variant: "inline",
        },
        {
          title: "Upselling.",
          icon: FiTrendingUp,
          description:
            "Upsell premium plans inside your app with frictionless upgrade flows.",
          variant: "inline",
        },
        {
          title: "Themes.",
          icon: FiToggleLeft,
          description:
            "Includes multiple themes with dark mode support, perfect for your next project.",
          variant: "inline",
        },
        {
          title: "Generators.",
          icon: FiTerminal,
          description:
            "Maintain code quality and consistency with built-in generators.",
          variant: "inline",
        },
        {
          title: "Monorepo.",
          icon: FiCode,
          description: (
            <>
              All code is available in a high-performance{" "}
              <Link href="https://turborepo.com">Turborepo</Link>.
            </>
          ),
          variant: "inline",
        },
      ]}
    />
  );
};

const TestimonialsSection = () => {
  return (
    <Testimonials
      title="What Our Students Say"
      columns={[1, 2, 3]}
      innerWidth="container.xl"
    >
      <>
        {[
          {
            name: "John Doe",
            description: "Accepted to Harvard University",
            testimonial:
              "This platform made the application process so easy and stress-free. I couldn't have done it without their help!",
          },
          {
            name: "Jane Smith",
            description: "Accepted to Stanford University",
            testimonial:
              "The personalized guidance was a game-changer for me. I felt confident every step of the way.",
          },
        ].map((t, i) => (
          <Stack key={i} spacing="8">
            <Testimonial {...t} />
          </Stack>
        ))}
      </>
    </Testimonials>
  );
};

const PricingSection = () => {
  return (
    <Pricing
      title="Choose Your Plan"
      description="Select a plan that best suits your needs and start your college journey today."
      plans={[
        {
          name: "Basic",
          price: "$99",
          features: ["Application tracking", "College matching", "Essay feedback"],
          action: { label: "Get Basic", href: "/signup-basic" }
        },
        {
          name: "Premium",
          price: "$199",
          features: [
            "Everything in Basic",
            "One-on-one counseling",
            "Priority support",
          ],
          action: { label: "Get Premium", href: "/signup-premium" }
        },
        {
          name: "VIP",
          price: "$499",
          features: [
            "Everything in Premium",
            "Personalized college strategy",
            "Unlimited counseling",
          ],
          action: { label: "Get VIP", href: "/signup-vip" }
        },
      ]}
    >
      <Text p="8" textAlign="center" color="muted">
        VAT may be applicable depending on your location.
      </Text>
    </Pricing>
  );
};

const FaqSection = () => {
  return <Faq {...faq} />;
};

export default Home;

export async function getStaticProps() {
  return {
    props: {
      announcement: {
        title: "Support us by becoming a stargazer! 🚀 ",
        description:
          '<img src="https://img.shields.io/github/stars/college-app/college-ui.svg?style=social&label=Star" />',
        href: "https://github.com/college-app/college-ui",
        action: false,
      },
    },
  };
}
