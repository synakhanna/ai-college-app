import LayoutEffect from "@/components/LayoutEffect"

const College = () => (
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
                            Colleges
                        </h1>
                        <p className="max-w-xl mx-auto text-gray-300 py-6">
                            You have now joined our waitlist!
                        </p>
                    </div>
                </div>
            </LayoutEffect>
        </div>
    </section>
)

export default College