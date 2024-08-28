import GradientWrapper from "@/components/GradientWrapper"
import LayoutEffect from "@/components/LayoutEffect"
import SectionWrapper from "@/components/SectionWrapper"

const Testimonial = () => {

    const testimonials = [
        {
            name: "Alex Johnson",
            title: "High School Senior",
            quote: "CollegeGenie just launched, and it's already been a game changer for me. The AI guidance made my college application process so much less stressful. I felt more organized and confident throughout the entire process."
        },
        {
            name: "Maria Gonzalez",
            title: "High School Junior",
            quote: "I was overwhelmed with the thought of applying to colleges, but CollegeGenie really helped me out. The personalized support made it easier to choose the right schools and keep track of deadlines. I'm feeling way more prepared now!"
        },
        {
            name: "David Lee",
            title: "High School Senior",
            quote: "As someone who tends to procrastinate, I was worried about staying on top of everything. But CollegeGenie recently came out and has made the whole process so much easier to manage. I can’t imagine going through this without it."
        },
        {
            name: "Emily Zhang",
            title: "High School Junior",
            quote: "Even though CollegeGenie is new, it's already proving to be an essential tool for anyone applying to college. It’s helped me narrow down my college list and stay on track with all the things I need to get done."
        },
        {
            name: "Michael Brown",
            title: "High School Senior",
            quote: "CollegeGenie just launched, but it’s already made a huge difference for me. The AI features are amazing—they give you the insights you need without the stress. It’s like having a personal college counselor with you all the time."
        },
        {
            name: "Sarah Williams",
            title: "High School Senior",
            quote: "I heard about CollegeGenie right after it launched, and I’m so glad I did. The step-by-step guidance has made applying to colleges so much more manageable. I actually feel excited about my future instead of just anxious."
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
                        CollegeGenie may have just launched, but it's already making a big impact. Here’s what high school students are saying about how CollegeGenie has helped them with their college applications.
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
