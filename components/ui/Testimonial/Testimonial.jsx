import GradientWrapper from "@/components/GradientWrapper"
import LayoutEffect from "@/components/LayoutEffect"
import SectionWrapper from "@/components/SectionWrapper"
import user1 from "@/public/testimonial/user1.webp"
import user2 from "@/public/testimonial/user2.webp"
import user3 from "@/public/testimonial/user3.webp"
import user4 from "@/public/testimonial/user4.webp"
import Image from "next/image"

const Testimonial = () => {

    const testimonials = [
        {
            avatar: user1,
            name: "Mukut Sharma",
            title: "Co-Founder of AI-COLLEGE",
            quote: "At AI-COLLEGE, our mission is to leverage AI to simplify the college application process for students everywhere. We believe that with the right tools, anyone can achieve their educational dreams."
        },
        {
            avatar: user2,
            name: "Syna Patel",
            title: "Co-Founder of AI-COLLEGE",
            quote: "We created AI-COLLEGE to make applying to colleges less stressful and more accessible. With personalized AI-driven guidance, students can feel confident and empowered as they navigate their path to higher education."
        },
        {
            avatar: user3,
            name: "Fatima Rahman",
            title: "Co-Founder of AI-COLLEGE",
            quote: "Our goal with AI-COLLEGE is to provide students with a platform that not only assists with applications but also connects them with scholarships and financial aid opportunities. We believe education should be within reach for everyone."
        },
        {
            avatar: user4,
            name: "Tahmidur Rahman",
            title: "Co-Founder of AI-COLLEGE",
            quote: "We believe that by using cutting-edge AI technology, AI-COLLEGE can revolutionize the way students approach their college applications. Our platform is designed to be intuitive, supportive, and tailored to the needs of each student."
        },
    ]

    return (
        <SectionWrapper>
            <div id="testimonials" className="custom-screen text-gray-300">
                <div className="max-w-2xl text-center md:mx-auto">
                    <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                        Why We Founded AI-COLLEGE
                    </h2>
                    <p className="mt-3 text-gray-300">
                        As founders of AI-COLLEGE, we are driven by a shared vision to transform the college application process using AI. Here’s why we believe AI-COLLEGE will help students achieve their educational goals.
                    </p>
                </div>
                <GradientWrapper wrapperClassName="max-w-sm h-40 top-12 inset-x-0" className="mt-12">
                    <LayoutEffect
                        className="duration-1000 delay-300"
                        isInviewState={{
                            trueState: "opacity-1",
                            falseState: "opacity-0 translate-y-12"
                        }}
                    >
                        <ul className="grid gap-6 duration-1000 delay-300 ease-in-out sm:grid-cols-2 lg:grid-cols-3">
                            {
                                testimonials.map((item, idx) => (
                                    <li key={idx} className="p-4 rounded-xl border border-gray-800"
                                        style={{
                                            backgroundImage: "radial-gradient(100% 100% at 50% 50%, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0) 100%)"
                                        }}
                                    >
                                        <figure className="flex flex-col justify-between gap-y-6 h-full">
                                            <blockquote className="">
                                                <p className="">
                                                    {item.quote}
                                                </p>
                                            </blockquote>
                                            <div className="flex items-center gap-x-4">
                                                <Image
                                                    src={item.avatar}
                                                    alt={item.name}
                                                    className="w-14 h-14 rounded-full object-cover"
                                                />
                                                <div>
                                                    <span className="block text-gray-50 font-semibold">{item.name}</span>
                                                    <span className="block text-sm mt-0.5">{item.title}</span>
                                                </div>
                                            </div>
                                        </figure>
                                    </li>
                                ))
                            }
                        </ul>
                    </LayoutEffect>
                </GradientWrapper>
            </div>
        </SectionWrapper>
    )
}

export default Testimonial;
