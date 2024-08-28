import GradientWrapper from "@/components/GradientWrapper"
import LayoutEffect from "@/components/LayoutEffect"
import SectionWrapper from "@/components/SectionWrapper"

const Testimonial = () => {

    const testimonials = [
        {
            name: "Alex Johnson",
            title: "College Student",
            quote: "CollegeGenie made the application process so much easier for me. The AI-driven guidance was spot on, helping me stay organized and confident every step of the way."
        },
        {
            name: "Maria Gonzalez",
            title: "High School Senior",
            quote: "Applying to colleges felt overwhelming until I found CollegeGenie. The personalized support and resources gave me the clarity I needed to make the right choices."
        },
        {
            name: "David Lee",
            title: "College Student",
            quote: "With CollegeGenie, I was able to navigate the complex college application process effortlessly. The platform's intuitive design and AI tools were a game changer."
        },
        {
            name: "Emily Zhang",
            title: "High School Junior",
            quote: "CollegeGenie is an incredible tool for anyone planning to apply to college. It helped me identify the best schools for my goals and made sure I didn’t miss any important deadlines."
        },
        {
            name: "Michael Brown",
            title: "College Student",
            quote: "Thanks to CollegeGenie, I felt supported throughout my entire application journey. The AI features provided invaluable insights and personalized advice."
        },
        {
            name: "Sarah Williams",
            title: "High School Senior",
            quote: "CollegeGenie took the stress out of applying to colleges. The AI recommendations and step-by-step guidance made the process much more manageable."
        },
    ]

    return (
        <SectionWrapper>
            <div id="testimonials" className="custom-screen text-gray-300">
                <div className="max-w-2xl text-center md:mx-auto">
                    <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                        Why Students Love CollegeGenie
                    </h2>
                    <p className="mt-3 text-gray-300">
                        Hear from students who have used CollegeGenie to simplify their college application process. Here’s why they believe CollegeGenie is the perfect companion for their educational journey.
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
