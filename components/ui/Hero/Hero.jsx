import LayoutEffect from "@/components/LayoutEffect"
import NavLink from "../NavLink"

const Hero = () => (
    <section>
        <div className="custom-screen py-20">
            <LayoutEffect className="duration-1000 delay-300"
                isInviewState={{
                    trueState: "opacity-1",
                    falseState: "opacity-0"
                }}
            >
                <div>
                    <div className="space-y-5 max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto sm:text-6xl py-6"
                            style={{
                                backgroundImage: "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)"
                            }}
                        >
                            Simplify Your College Application Process with AI
                        </h1>
                        <p className="max-w-xl mx-auto text-gray-300 py-6">
                            Our AI-powered platform helps you find the right colleges, streamline applications, and achieve success in your college journey.

                        </p>
                        <div className="flex justify-center font-medium text-sm py-6">
                            <NavLink
                                href="/signup"
                                className="flex items-center text-white bg-purple-600 hover:bg-purple-500 active:bg-purple-700"
                            >
                                Get Started Now With Your FREE 1 Month Trial!
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </LayoutEffect>
        </div>
    </section>
)

export default Hero
