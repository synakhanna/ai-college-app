import LayoutEffect from "@/components/LayoutEffect";
import SectionWrapper from "@/components/SectionWrapper";
import { BsBarChart, BsCashStack, BsChatSquareText, BsFileText, BsPencilSquare, BsSearch } from "react-icons/bs";

const Features = () => {

    const featuresList = [
        {
            icon: <BsSearch className="w-6 h-6" />,
            title: "College Search & Matching",
            desc: "Find the perfect college based on your interests, location, and academic goals using our AI-powered search."
        },
        {
            icon: <BsPencilSquare className="w-6 h-6" />,
            title: "Personalized Application Assistance",
            desc: "Receive personalized guidance and tips for every part of your application, from essays to recommendation letters."
        },
        {
            icon: <BsBarChart className="w-6 h-6" />,
            title: "Track Your Progress",
            desc: "Monitor your application progress and stay on top of deadlines with our intuitive progress tracking dashboard."
        },
        {
            icon: <BsFileText className="w-6 h-6" />,
            title: "AI-Powered Essay Reviews",
            desc: "Get feedback on your college essays from our AI tool that provides suggestions for improving clarity, tone, and impact."
        },
        {
            icon: <BsCashStack className="w-6 h-6" />,
            title: "Scholarship Finder",
            desc: "Discover scholarships that you qualify for based on your background and academic achievements."
        },
        {
            icon: <BsChatSquareText className="w-6 h-6" />,
            title: "Interview Preparation",
            desc: "Prepare for college interviews with AI-generated practice questions and tips to help you feel confident."
        },
    ]

    return (
        <SectionWrapper>
            <div id="features" className="custom-screen text-gray-300">
                <LayoutEffect
                    className="duration-1000 delay-300"
                    isInviewState={{
                        trueState: "opacity-1",
                        falseState: "opacity-0 translate-y-6"
                    }}
                >
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                            All-in-One College Application Platform
                        </h2>
                        <p className="mt-3">
                            Our platform provides everything you need to find the right college, craft your applications, and achieve success in your college journey.
                        </p>
                    </div>
                </LayoutEffect>
                <LayoutEffect
                    className="duration-1000 delay-500"
                    isInviewState={{
                        trueState: "opacity-1",
                        falseState: "opacity-0"
                    }}
                >
                    <div className="relative mt-12">
                        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                featuresList.map((item, idx) => (
                                    <li key={idx} className="space-y-3 p-4 rounded-xl border border-gray-800"
                                        style={{
                                            background: "radial-gradient(157.73% 157.73% at 50% -29.9%, rgba(203, 213, 225, 0.16) 0%, rgba(203, 213, 225, 0) 100%)"
                                        }}
                                    >
                                        <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-lg text-gray-50">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-lg text-gray-50 font-semibold">
                                            {item.title}
                                        </h3>
                                        <p>
                                            {item.desc}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </LayoutEffect>
            </div>
        </SectionWrapper>
    )
}

export default Features;
