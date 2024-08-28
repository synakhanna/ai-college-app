import GradientWrapper from "@/components/GradientWrapper"
import LayoutEffect from "@/components/LayoutEffect"
import SectionWrapper from "@/components/SectionWrapper"

const Testimonial = () => {

    const testimonials = [
        {
            name: "Alex Johnson",
            title: "High School Senior",
            quote: "I was told that I can't get into my dream school because my grades are not good enough. The Genie helped me navigate through the various things I could do to improve my chances of getting accepted. It gave me ideas for extra-curricular activities I could participate in as well as extra courses which I could take. I feel much more confident about getting into my dream school now."
        },
        {
            name: "Maria Gonzalez",
            title: "High School Junior",
            quote: "Shortlisting colleges feels so overwhelming, but CollegeGenie made everything so much easier for me. The personalized support helped me compile a list of schools."
        },
        {
            name: "David Lee",
            title: "High School Senior",
            quote: "Even though I just signed up, the platform has already saved me so many hours by providing me with a number of essay topic ideas."
        },
        {
            name: "Emily Zhang",
            title: "High School Junior",
            quote: "CollegeGenie is an amazing tool for anyone applying to college. It helped me narrow down my college list and I feel less confused now."
        },
        {
            name: "Michael Brown",
            title: "High School Senior",
            quote: "The Genie counselor is incredible. It provides me with insights and advice that I wouldn’t have found on my own. It’s like having a personal college counselor available 24/7."
        },
        {
            name: "Sarah Williams",
            title: "High School Senior",
            quote: "CollegeGenie made the college application process so much more manageable. The step-by-step guidance kept me organized, and now I don't feel anxious about deadlines."
        },
    ]

    return (
        <SectionWrapper>
            <div id="testimonials" className="custom-screen text-gray-300">
                <div className="max-w-2xl text-center md:mx-auto">
                    <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                        Why High Schoolers Love CollegeGenie
                    </h2>
                    <p className="mt-3 text-gray-300">
                        Hear from high school students who have used CollegeGenie to simplify their college application process. Here’s why they believe CollegeGenie is the perfect companion for their educational journey.
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
