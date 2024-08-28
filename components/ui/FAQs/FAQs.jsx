import LayoutEffect from "@/components/LayoutEffect";
import SectionWrapper from "@/components/SectionWrapper";

const faqsList = [
    {
        q: "What is CollegeGenie?",
        a: "CollegeGenie is an AI-powered platform designed to streamline and personalize the college application process for students. From finding the right colleges to receiving essay assistance and tracking progress, our tools provide the support students need."
    },
    {
        q: "Why did you create CollegeGenie?",
        a: "We created CollegeGenie to make the daunting college application process more accessible and less stressful. Our goal is to ensure that students can navigate their journey with ease and confidence using the latest AI technology."
    },
    {
        q: "How can AI help with my college application?",
        a: "AI can provide personalized recommendations based on your preferences, assist with essay reviews, and help you stay organized by tracking deadlines and application statuses. It's like having a virtual college advisor."
    },
    {
        q: "How do I start using CollegeGenie?",
        a: "Simply sign up for an account, and you'll gain access to our full suite of tools, including college matching, essay support, and scholarship searches. Get started today to take the first step towards your future."
    },
    {
        q: "Can CollegeGenie help me find scholarships?",
        a: "Yes! CollegeGenie helps you discover scholarships that match your academic achievements, background, and goals, ensuring you don't miss out on valuable financial aid opportunities."
    },
    {
        q: "How do you ensure that CollegeGenie is helpful for all students?",
        a: "We continually refine our algorithms to ensure that CollegeGenie is as effective as possible for all students, no matter their academic interests or goals. Our tools are built to adapt to individual needs, offering personalized guidance at every step."
    }
];

const FAQs = () => (
    <SectionWrapper id="faqs">
        <div className="custom-screen text-gray-300">
            <div className="flex flex-col items-center text-center max-w-xl mx-auto">
                <h2 className="text-gray-50 text-3xl font-extrabold sm:text-4xl">
                    Everything you need to know about CollegeGenie
                </h2>
                <p className="mt-3">
                    Here are some of the most common questions we get about CollegeGenie and how it helps students on their college journey.
                </p>
            </div>
            <div className='mt-12'>
                <LayoutEffect
                    className="duration-1000 delay-300"
                    isInviewState={{
                        trueState: "opacity-1",
                        falseState: "opacity-0 translate-y-12"
                    }}
                >
                    <ul className='space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3'>
                        {faqsList.map((item, idx) => (
                            <li
                                key={idx}
                                className="space-y-3"
                            >
                                <summary
                                    className="flex items-center justify-between font-semibold text-gray-100">
                                    {item.q}
                                </summary>
                                <p
                                    dangerouslySetInnerHTML={{ __html: item.a }}
                                    className='leading-relaxed'>
                                </p>
                            </li>
                        ))}
                    </ul>
                </LayoutEffect>
            </div>
        </div>
    </SectionWrapper>
);

export default FAQs;
