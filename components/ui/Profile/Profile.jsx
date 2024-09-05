import LayoutEffect from "@/components/LayoutEffect";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useState, useEffect } from "react";
import CreatableSelect from 'react-select/creatable';
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

    const programOptions = [
        { value: "latest.academics.program_percentage.agriculture", label: "Agriculture, Agriculture Operations, And Related Sciences" },
        { value: "latest.academics.program_percentage.resources", label: "Natural Resources And Conservation" },
        { value: "latest.academics.program_percentage.architecture", label: "Architecture And Related Services" },
        { value: "latest.academics.program_percentage.ethnic_cultural_gender", label: "Area, Ethnic, Cultural, Gender, And Group Studies" },
        { value: "latest.academics.program_percentage.communication", label: "Communication, Journalism, And Related Programs" },
        { value: "latest.academics.program_percentage.communications_technology", label: "Communications Technologies/Technicians And Support Services" },
        { value: "latest.academics.program_percentage.computer", label: "Computer And Information Sciences And Support Services" },
        { value: "latest.academics.program_percentage.personal_culinary", label: "Personal And Culinary Services" },
        { value: "latest.academics.program_percentage.education", label: "Education" },
        { value: "latest.academics.program_percentage.engineering", label: "Engineering" },
        { value: "latest.academics.program_percentage.engineering_technology", label: "Engineering Technologies And Engineering-Related Fields" },
        { value: "latest.academics.program_percentage.language", label: "Foreign Languages, Literatures, And Linguistics" },
        { value: "latest.academics.program_percentage.family_consumer_science", label: "Family And Consumer Sciences/Human Sciences" },
        { value: "latest.academics.program_percentage.legal", label: "Legal Professions And Studies" },
        { value: "latest.academics.program_percentage.english", label: "English Language And Literature/Letters" },
        { value: "latest.academics.program_percentage.humanities", label: "Liberal Arts And Sciences, General Studies And Humanities" },
        { value: "latest.academics.program_percentage.library", label: "Library Science" },
        { value: "latest.academics.program_percentage.biological", label: "Biological And Biomedical Sciences" },
        { value: "latest.academics.program_percentage.mathematics", label: "Mathematics And Statistics" },
        { value: "latest.academics.program_percentage.military", label: "Military Technologies And Applied Sciences" },
        { value: "latest.academics.program_percentage.multidiscipline", label: "Multi/Interdisciplinary Studies" },
        { value: "latest.academics.program_percentage.parks_recreation_fitness", label: "Parks, Recreation, Leisure, And Fitness Studies" },
        { value: "latest.academics.program_percentage.philosophy_religious", label: "Philosophy And Religious Studies" },
        { value: "latest.academics.program_percentage.theology_religious_vocation", label: "Theology And Religious Vocations" },
        { value: "latest.academics.program_percentage.physical_science", label: "Physical Sciences" },
        { value: "latest.academics.program_percentage.science_technology", label: "Science Technologies/Technicians" },
        { value: "latest.academics.program_percentage.psychology", label: "Psychology" },
        { value: "latest.academics.program_percentage.security_law_enforcement", label: "Homeland Security, Law Enforcement, Firefighting And Related Protective Services" },
        { value: "latest.academics.program_percentage.public_administration_social_service", label: "Public Administration And Social Service Professions" },
        { value: "latest.academics.program_percentage.social_science", label: "Social Sciences" },
        { value: "latest.academics.program_percentage.construction", label: "Construction Trades" },
        { value: "latest.academics.program_percentage.mechanic_repair_technology", label: "Mechanic And Repair Technologies/Technicians" },
        { value: "latest.academics.program_percentage.precision_production", label: "Precision Production" },
        { value: "latest.academics.program_percentage.transportation", label: "Transportation And Materials Moving" },
        { value: "latest.academics.program_percentage.visual_performing", label: "Visual And Performing Arts" },
        { value: "latest.academics.program_percentage.health", label: "Health Professions And Related Programs" },
        { value: "latest.academics.program_percentage.business_marketing", label: "Business, Management, Marketing, And Related Support Services" },
        { value: "latest.academics.program_percentage.history", label: "History" },
    ];

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get('/api/fetch_details');
                    if (response.status === 200) {
                        const data = response.data;
                        setFormData({
                           // major: data.major || "",
                            gpa: data.academicInfo.gpa || "",
                            satScore: data.academicInfo.satScore || "",
                            helpNeeded: data.help || [],
                            preferredLocation: data.preferredLocations  || [],
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

    const loadLocationOptions = async (inputValue) => {
        try {
            const response = await axios.get(`/api/locations?query=${inputValue}`);
            return response.data.map((location) => ({
                label: `${location.city}, ${location.state}`,
                value: location.city,
            }));
        } catch (error) {
            console.error('Error fetching locations:', error);
            return [];
        }
    };

    const handleLocationChange = (selectedOptions) => {
        setFormData({
            ...formData,
            preferredLocation: selectedOptions || [], // Set to empty array if no options are selected
        });
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        router.push("/sign-in");
        return null;
    }

    const placeholders = [
        "LinkedIn URL",
        "Discord Username",
        "WhatsApp Number"
    ];


    const handleSocialMediaChange = (index, value) => {
        const newSocialMediaTags = [...formData.socialMediaTags];
        newSocialMediaTags[index] = value || ""; // Allow empty values
        setFormData({ ...formData, socialMediaTags: newSocialMediaTags });
    };

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

    const handleCitySelect = (selectedCity) => {
        console.log("The values in the selectcity inside handleCitySelect :"+selectedCity.city+" "+selectedCity.state);
        setFormData((prevFormData) => ({
            ...prevFormData,
            preferredLocation: selectedCity, // Set the single city object as location
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.gpa || formData.helpNeeded.length === 0 || formData.tuition === 0) {
            alert("Please fill in all the required fields.");
            return;
        }

        if (!formData.selectedProgram) {
            alert("Please select an academic track (intended major).");
            return;
        }

        try {

        // Prepare params for the API request
        let params = {
            sortOrder: 'asc',
            limit: 500,
            major: formData.selectedProgram,
            fee_range: formData.tuition
        };

        // If preferredLocation is available, add location data to params
        if (formData.preferredLocation && formData.preferredLocation.city && formData.preferredLocation.state) {
            const loc = `{\"city\":\"${formData.preferredLocation.city}\",\"state\":\"${formData.preferredLocation.state}\"}`;
            params.location = decodeURI(loc);
        }

        // Fetch suggested colleges
        const collegeResponse = await axios.get('/api/colleges', { params });
        console.log('Colleges:', collegeResponse.data);

    

        const saveResponse = await axios.post('/api/save_profile', {
            clerkId: user.id,
            fullName: user.fullName || user.username,
            email: user.primaryEmailAddress.emailAddress,
            academicTrack: formData.selectedProgram, // Mapping formData.selectedProgram to academicTrack
            gpa: formData.gpa,
            satScore: formData.satScore,
            helpNeeded: formData.helpNeeded, // Mapping formData.helpNeeded to help
            addresses: formData.preferredLocation ? formData.preferredLocation : null, // Sends null if preferredLocation is empty
            tuition: formData.tuition, // Mapping formData.tuition to desiredTuition
            suggestedColleges: collegeResponse.data,
            socialMediaTags: formData.socialMediaTags.filter(tag => tag !== ""), // Filtering out empty tags
        });

    } catch (error) {
        console.error('Error during the process:', error.message);
        alert('An error occurred. Please try again.');
    }
    };
    return (
        <section className="py-10 sm:py-20">
        <div className="container mx-auto px-4">
            <div className="space-y-5 max-w-3xl mx-auto text-center">
                <h1
                    className="text-3xl sm:text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto py-6"
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
                {/* Social Media Links */}
                <div>
                        <label className="block text-white text-lg font-semibold">
                            Social Media Links
                        </label>
                        {formData.socialMediaTags.map((tag, index) => (
                            <input
                                key={index}
                                type="url"
                                value={tag}
                                onChange={(e) => handleSocialMediaChange(index, e.target.value)}
                                className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg"
                                placeholder={placeholders[index] || `Social Media Link ${index + 1}`}
                            />
                        ))}
                </div>
                {/* Preferred Locations */}
                <div>
                    <label className="block text-white text-lg font-semibold">
                        Preferred Location
                    </label>
                    {/* Replace with your CitySearch component */}
                    <CitySearch onCitySelect={handleCitySelect} />
                    {/* If you need to display the selected city, you can add below */}
                    {formData.preferredLocation && (
                        <div className="text-white mt-2">
                            Selected Location: {formData.preferredLocation.city}, {formData.preferredLocation.state}
                        </div>
                    )}
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
                        required
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
        </div>
    </section>
    );
};

export default Profile;
