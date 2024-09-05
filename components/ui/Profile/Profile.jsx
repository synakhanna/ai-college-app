import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import CitySearch from "../CitySearch";

const Profile = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const [formData, setFormData] = useState({
        gpa: "",
        satScore: "",
        helpNeeded: [],
        preferredLocation: null,
        tuition: 0,
        selectedProgram: "",
        suggestedColleges: [],
        socialMediaTags: ["", "", ""],
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const helpOptions = ["essays", "extracurricular", "financialAid", "additionalCounseling"];

    const programOptions = [
        { value: "latest.academics.program_percentage.agriculture", label: "Agriculture, Agriculture Operations, And Related Sciences" },
        { value: "latest.academics.program_percentage.resources", label: "Natural Resources And Conservation" },
        // Add other program options here...
    ];

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get('/api/fetch_details');
                    if (response.status === 200) {
                        const data = response.data;
                        setFormData({
                            gpa: data.academicInfo.gpa || "",
                            satScore: data.academicInfo.satScore || "",
                            helpNeeded: data.help || [],
                            preferredLocation: !data.preferredLocations ? null : data.preferredLocations,
                            selectedProgram: data.academicTrack || "",
                            tuition: data.desiredTuition || 0,
                            socialMediaTags: data.socialMediaTags || ["", "", ""],
                        });
                    }
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            };

            fetchUserData();
        }
    }, [isLoaded, isSignedIn]);

    const handleSocialMediaChange = (index, value) => {
        const updatedTags = [...formData.socialMediaTags];
        updatedTags[index] = value;
        setFormData({ ...formData, socialMediaTags: updatedTags });
    };

    const handleHelpNeededChange = (value) => {
        let updatedHelpNeeded = [...formData.helpNeeded];

        if (value === "all") {
            // If "All" is selected or unselected, select/unselect all options
            if (formData.helpNeeded.includes("all")) {
                updatedHelpNeeded = [];
            } else {
                updatedHelpNeeded = ["all", ...helpOptions];
            }
        } else {
            // Toggle individual options
            if (updatedHelpNeeded.includes(value)) {
                updatedHelpNeeded = updatedHelpNeeded.filter((option) => option !== value);
            } else {
                updatedHelpNeeded.push(value);
            }

            // If "All" is unchecked, remove it
            if (updatedHelpNeeded.includes("all") && updatedHelpNeeded.length - 1 < helpOptions.length) {
                updatedHelpNeeded = updatedHelpNeeded.filter((option) => option !== "all");
            }

            // If all options are selected, check "All"
            if (helpOptions.every((option) => updatedHelpNeeded.includes(option))) {
                updatedHelpNeeded.push("all");
            }
        }

        setFormData({ ...formData, helpNeeded: updatedHelpNeeded });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.gpa || formData.helpNeeded.length === 0) {
            alert("Please fill in all the required fields.");
            return;
        }

        if (!formData.selectedProgram) {
            alert("Please select an academic track (intended major).");
            return;
        }

        try {
            let params = {
                sortOrder: 'asc',
                limit: 500,
                major: formData.selectedProgram,
            };

            if (formData.preferredLocation) {
                const loc = `{\"city\":\"${formData.preferredLocation.city}\",\"state\":\"${formData.preferredLocation.state}\"}`;
                params.location = decodeURI(loc);
            }

            if (formData.tuition > 0) {
                params.fee_range = formData.tuition;
            }

            const collegeResponse = await axios.get('/api/colleges', { params });
            console.log('Colleges:', collegeResponse.data);

            const saveResponse = await axios.post('/api/save_profile', {
                clerkId: user.id,
                fullName: user.fullName || user.username,
                email: user.primaryEmailAddress.emailAddress,
                academicTrack: formData.selectedProgram,
                gpa: formData.gpa,
                satScore: formData.satScore,
                helpNeeded: formData.helpNeeded,
                addresses: formData.preferredLocation ? formData.preferredLocation : null,
                tuition: formData.tuition > 0 ? formData.tuition : null,
                suggestedColleges: collegeResponse.data,
                socialMediaTags: formData.socialMediaTags.filter(tag => tag !== ""),
            });

            if (saveResponse.status === 200) {
                setShowSuccessMessage(true);
            }
        } catch (error) {
            console.error('Error during the process:', error.message);
        }
    };

    return (
        <section className="py-10 sm:py-20">
            <div className="container mx-auto px-4">
                <div className="space-y-5 max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto py-6"
                        style={{ backgroundImage: "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)" }}>
                        My Profile
                    </h1>
                    <p className="max-w-xl mx-auto text-gray-300 py-6">
                        Welcome, {user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress || "User"}! Please fill out the information below to help me better assist you with your college applications.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                    {/* Intended Major */}
                    <div>
                        <label className="block text-white text-lg font-semibold">
                            Intended Major <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="selectedProgram"
                            value={formData.selectedProgram}
                            onChange={(e) => setFormData({ ...formData, selectedProgram: e.target.value })}
                            className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg"
                            required
                        >
                            <option value="">Select a major</option>
                            {programOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
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
                            className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg"
                            placeholder="GPA"
                            min="0"
                            step="0.01"
                            required
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
                            className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg"
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
                            {helpOptions.map((option) => (
                                <div key={option}>
                                    <input
                                        type="checkbox"
                                        value={option}
                                        onChange={() => handleHelpNeededChange(option)}
                                        checked={formData.helpNeeded.includes(option)}
                                        className="mr-2"
                                    />
                                    <label className="text-white">{option.charAt(0).toUpperCase() + option.slice(1)}</label>
                                </div>
                            ))}
                            <div>
                                <input
                                    type="checkbox"
                                    value="all"
                                    onChange={() => handleHelpNeededChange("all")}
                                    checked={formData.helpNeeded.includes("all")}
                                    className="mr-2"
                                />
                                <label className="text-white">All</label>
                            </div>
                        </div>
                    </div>
                    {/* Social Media Links */}
                    <div>
                        <label className="block text-white text-lg font-semibold">
                            Social Media Links
                        </label>
                        {["LinkedIn URL"].map((placeholder, index) => (
                            <div key={index} className="mt-2">
                                <input
                                    type="url"
                                    value={formData.socialMediaTags[index] || ""}
                                    onChange={(e) => handleSocialMediaChange(index, e.target.value)}
                                    className="w-full p-3 bg-gray-800 text-white rounded-lg"
                                    placeholder={placeholder}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Preferred Locations */}
                    <div>
                        <label className="block text-white text-lg font-semibold">
                            Preferred Location
                        </label>
                        <CitySearch onCitySelect={(city) => setFormData({ ...formData, preferredLocation: city })} />
                    </div>
                    {/* Tuition */}
                    <div>
                        <label className="block text-white text-lg font-semibold">
                            Desired Tuition (per year)
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
                            ${Number(formData.tuition).toLocaleString()} per year
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-6 text-lg text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                        Save
                    </button>
                </form>

                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-lg text-center">
                            <p className="text-lg font-semibold mb-4">Profile saved successfully! Kindly see the college section.</p>
                            <button
                                className="py-2 px-4 bg-blue-600 text-white rounded-lg"
                                onClick={() => setShowSuccessMessage(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Profile;
