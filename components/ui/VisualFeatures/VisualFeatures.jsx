import SectionWrapper from "@/components/SectionWrapper"
import Feature1 from "@/public/images/Feature-1.svg"
import Feature2 from "@/public/images/Feature-2.svg"
import Image from "next/image"

const VisualFeatures = () => {

    const features = [
        {
            title: "Explore Top Colleges",
            desc: "Discover a wide range of top colleges that align with your interests and academic goals.",
            img: Feature1
        },
        {
            title: "Get Personalized Application Assistance",
            desc: "Receive AI-powered guidance through every step of the application process, ensuring you submit the best application possible.",
            img: Feature2
        },
    ]
    
    return (
        <SectionWrapper>
            <div className="custom-screen text-gray-300">
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                        Elevate Your College Application Experience
                    </h2>
                    <p className="mt-3">
                        Our platform offers powerful features that help you find the best colleges, streamline your application process, and set yourself up for success.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="space-y-8 gap-x-6 sm:flex sm:space-y-0">
                        {
                            features.map((item, idx) => (
                                <li className="flex-1 flex flex-col justify-between border border-gray-800 rounded-2xl" key={idx}
                                    style={{
                                        background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)"
                                    }}
                                >
                                    <div className="p-8">
                                        <h3 className="text-gray-50 text-xl font-semibold">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 sm:text-sm md:text-base">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="pl-8">
                                        <Image
                                            src={item.img}
                                            className="w-full ml-auto"
                                            alt={item.title}
                                        />
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default VisualFeatures;
