import LayoutEffect from "@/components/LayoutEffect";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

const Profile = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const [formData, setFormData] = useState({
        major: "",
        gpa: "",
        rank: "",
        satScore: "",
        helpNeeded: [], // Holds multiple options
        preferredLocation: "",
        tuition: 0,
    });

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        router.push("/sign-in");
        return null;
    }

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        setFormData((prevState) => {
            let newHelpNeeded = [];

            if (value === "all") {
                if (checked) {
                    newHelpNeeded = [
                        "essays",
                        "extracurricular",
                        "financialAid",
                        "additionalCounseling",
                        "all"
                    ];
                }
            } else {
                newHelpNeeded = checked
                    ? [...prevState.helpNeeded, value]
                    : prevState.helpNeeded.filter((option) => option !== value);

                if (newHelpNeeded.length === 4 && !newHelpNeeded.includes("all")) {
                    newHelpNeeded.push("all");
                } else if (newHelpNeeded.includes("all") && newHelpNeeded.length < 5) {
                    newHelpNeeded = newHelpNeeded.filter((option) => option !== "all");
                }
            }

            return {
                ...prevState,
                helpNeeded: newHelpNeeded,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle saving the data, e.g., sending it to an API or saving in state management
        console.log("Form submitted:", formData);
        // No redirection, just a save action
    };

    return (
        <section>
            <div className="custom-screen py-20">
                <LayoutEffect
                    className="duration-1000 delay-300"
                    isInviewState={{
                        trueState: "opacity-1",
                        falseState: "opacity-0",
                    }}
                >
                    <div>
                        <div className="space-y-5 max-w-3xl mx-auto text-center">
                            <h1
                                className="text-4xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto sm:text-6xl py-6"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)",
                                }}
                            >
                                My Profile
                            </h1>
                            <p className="max-w-xl mx-auto text-gray-300 py-6">
                                Welcome, {user.fullName || user.username}! Please fill out the information below to help me better assist you with your college applications.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                            {/* Intended Major */}
                            <div>
                                <label className="block text-white text-lg font-semibold">
                                    Intended Major <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="major"
                                    value={formData.major}
                                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                                    className="w-full p-2 mt-2 bg-gray-800 text-white rounded-lg"
                                    placeholder="What major are you interested in?"
                                    required
                                />
                            </div>
                            {/* GPA */}
                            <div>
                                <label className="block text-white text-lg font-semibold">
                                    GPA <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="gpa"
                                    value={formData.gpa}
                                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                                    className="w-full p-2 mt-2 bg-gray-800 text-white rounded-lg"
                                    placeholder="GPA"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            {/* Rank */}
                            <div>
                                <label className="block text-white text-lg font-semibold">
                                    Rank
                                </label>
                                <input
                                    type="number"
                                    name="rank"
                                    value={formData.rank}
                                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                                    className="w-full p-2 mt-2 bg-gray-800 text-white rounded-lg"
                                    placeholder="Rank"
                                    min="0"
                                />
                            </div>
                            {/* SAT Score */}
                            <div>
                                <label className="block text-white text-lg font-semibold">
                                    SAT Score
                                </label>
                                <input
                                    type="number"
                                    name="satScore"
                                    value={formData.satScore}
                                    onChange={(e) => setFormData({ ...formData, satScore: e.target.value })}
                                    className="w-full p-2 mt-2 bg-gray-800 text-white rounded-lg"
                                    placeholder="SAT Score"
                                    min="400"
                                    max="1600"
                                />
                            </div>
                            {/* Help Needed */}
                            <div>
                                <label className="block text-white text-lg font-semibold">
                                    What do you need help with? <span className="text-red-500">*</span>
                                </label>
                                <div className="space-y-2">
                                    <div>
                                        <input
                                            type="checkbox"
                                            value="essays"
                                            onChange={handleCheckboxChange}
                                            checked={formData.helpNeeded.includes("essays")}
                                            className="mr-2"
                                        />
                                        <label className="text-white">Essays</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value="extracurricular"
                                            onChange={handleCheckboxChange}
                                            checked={formData.helpNeeded.includes("extracurricular")}
                                            className="mr-2"
                                        />
                                        <label className="text-white">Extracurricular Activities</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value="financialAid"
                                            onChange={handleCheckboxChange}
                                            checked={formData.helpNeeded.includes("financialAid")}
                                            className="mr-2"
                                        />
                                        <label className="text-white">Financial Aid</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value="additionalCounseling"
                                            onChange={handleCheckboxChange}
                                            checked={formData.helpNeeded.includes("additionalCounseling")}
                                            className="mr-2"
                                        />
                                        <label className="text-white">Additional Counseling</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value="all"
                                            onChange={handleCheckboxChange}
                                            checked={formData.helpNeeded.includes("all")}
                                            className="mr-2"
                                        />
                                        <label className="text-white">All</label>
                                    </div>
                                </div>
                            </div>
                            {/* Preferred Location */}
                            <div>
                                <label className="block text-white text-lg font-semibold">
                                    Preferred Location
                                </label>
                                <textarea
                                    name="preferredLocation"
                                    value={formData.preferredLocation}
                                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                                    className="w-full p-2 mt-2 bg-gray-800 text-white rounded-lg"
                                    placeholder="List the states or cities you're interested in"
                                />
                            </div>
                            {/* Tuition */}
                            <div>
                                <label className="block text-white text-lg font-semibold">
                                    Desired Tuition (per year) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="range"
                                    name="tuition"
                                    min="0"
                                    max="100000"
                                    step="500"
                                    value={formData.tuition}
                                    onChange={(e) => setFormData({ ...formData, tuition: e.target.value })}
                                    className="w-full mt-2"
                                />
                                <div className="text-white mt-2">
                                    ${formData.tuition.toLocaleString()} per year
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </LayoutEffect>
            </div>
        </section>
    );
};

export default Profile;
