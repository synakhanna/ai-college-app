import LayoutEffect from "@/components/LayoutEffect";
import SectionWrapper from "@/components/SectionWrapper";
import Button from "../Button";
import Link from 'next/link';

const Pricing = () => {

    const plans = [
        {
            name: "1 Month FREE for EVERYONE!",
            desc: "Catered for students applying to college.",
            price: 1.99,
            isMostPop: true,
            features: [
                "Counseling With AI Genie",
                "Customized College List",
                "Help With Essays",
                "Career Guidance",
                "Financial Advisor",
                "Connection Opportunity",
            ],
        }
    ];

    const mostPopPricingBg = "radial-gradient(130.39% 130.39% at 51.31% -0.71%, #1F2937 0%, rgba(31, 41, 55, 0) 100%)";

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <SectionWrapper id="pricing" className='flex flex-col items-center justify-center'>
                <div className='relative max-w-xl mx-auto text-center mb-8'>
                    <h2 className='text-gray-50 text-3xl font-semibold sm:text-4xl'>
                        Pricing
                    </h2>
                </div>
                <LayoutEffect
                    className="duration-1000 delay-300"
                    isInviewState={{
                        trueState: "opacity-1",
                        falseState: "opacity-0"
                    }}
                >
                    <div className='flex justify-center'>
                        {
                            plans.map((item, idx) => (
                                <div key={idx} className={`relative flex-1 max-w-sm flex items-stretch flex-col rounded-xl border border-gray-800 ${item.isMostPop ? "border border-purple-500" : ""}`}
                                    style={{
                                        backgroundImage: item.isMostPop ? mostPopPricingBg : ""
                                    }}
                                >
                                    <div className="p-8 space-y-4 border-b border-gray-800 text-center">
                                        <span className='text-gray-50 text-l font-semibold'>
                                            {item.name}
                                        </span>
                                        <div className='text-gray-50 text-3xl font-semibold'>
                                            ${item.price} <span className="text-xl text-gray-400 font-normal">/mo</span>
                                        </div>
                                        <p className="text-gray-400">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="p-8">
                                        <ul className='space-y-3'>
                                            {
                                                item.features.map((featureItem, idx) => (
                                                    <li key={idx} className='flex items-center gap-5 text-gray-300'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='h-5 w-5 text-indigo-600'
                                                            viewBox='0 0 20 20'
                                                            fill='currentColor'>
                                                            <path
                                                                fillRule='evenodd'
                                                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                                clipRule='evenodd'></path>
                                                        </svg>
                                                        {featureItem}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        <div className="pt-8">
                                        <Button className={`w-full rounded-full text-white ring-offset-2 focus:ring ${item.isMostPop ? "bg-purple-600 hover:bg-purple-500 focus:bg-purple-700 ring-purple-600" : "bg-gray-800 hover:bg-gray-700 ring-gray-800"}`}>
                                            <Link href="/sign-up">
                                                Get Started
                                            </Link>
                                        </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </LayoutEffect>
            </SectionWrapper>
        </div>
    );
};

export default Pricing;
