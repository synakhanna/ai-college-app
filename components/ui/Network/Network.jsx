import { useEffect, useState } from 'react';
import { BsLinkedin } from "react-icons/bs";

const programOptions = {
    "latest.academics.program_percentage.agriculture": "Agriculture, Agriculture Operations, And Related Sciences",
    "latest.academics.program_percentage.resources": "Natural Resources And Conservation",
    "latest.academics.program_percentage.architecture": "Architecture And Related Services",
    "latest.academics.program_percentage.ethnic_cultural_gender": "Area, Ethnic, Cultural, Gender, And Group Studies",
    "latest.academics.program_percentage.communication": "Communication, Journalism, And Related Programs",
    "latest.academics.program_percentage.communications_technology": "Communications Technologies/Technicians And Support Services",
    "latest.academics.program_percentage.computer": "Computer And Information Sciences And Support Services",
    "latest.academics.program_percentage.personal_culinary": "Personal And Culinary Services",
    "latest.academics.program_percentage.education": "Education",
    "latest.academics.program_percentage.engineering": "Engineering",
    "latest.academics.program_percentage.engineering_technology": "Engineering Technologies And Engineering-Related Fields",
    "latest.academics.program_percentage.language": "Foreign Languages, Literatures, And Linguistics",
    "latest.academics.program_percentage.family_consumer_science": "Family And Consumer Sciences/Human Sciences",
    "latest.academics.program_percentage.legal": "Legal Professions And Studies",
    "latest.academics.program_percentage.english": "English Language And Literature/Letters",
    "latest.academics.program_percentage.humanities": "Liberal Arts And Sciences, General Studies And Humanities",
    "latest.academics.program_percentage.library": "Library Science",
    "latest.academics.program_percentage.biological": "Biological And Biomedical Sciences",
    "latest.academics.program_percentage.mathematics": "Mathematics And Statistics",
    "latest.academics.program_percentage.military": "Military Technologies And Applied Sciences",
    "latest.academics.program_percentage.multidiscipline": "Multi/Interdisciplinary Studies",
    "latest.academics.program_percentage.parks_recreation_fitness": "Parks, Recreation, Leisure, And Fitness Studies",
    "latest.academics.program_percentage.philosophy_religious": "Philosophy And Religious Studies",
    "latest.academics.program_percentage.theology_religious_vocation": "Theology And Religious Vocations",
    "latest.academics.program_percentage.physical_science": "Physical Sciences",
    "latest.academics.program_percentage.science_technology": "Science Technologies/Technicians",
    "latest.academics.program_percentage.psychology": "Psychology",
    "latest.academics.program_percentage.security_law_enforcement": "Homeland Security, Law Enforcement, Firefighting And Related Protective Services",
    "latest.academics.program_percentage.public_administration_social_service": "Public Administration And Social Service Professions",
    "latest.academics.program_percentage.social_science": "Social Sciences",
    "latest.academics.program_percentage.construction": "Construction Trades",
    "latest.academics.program_percentage.mechanic_repair_technology": "Mechanic And Repair Technologies/Technicians",
    "latest.academics.program_percentage.precision_production": "Precision Production",
    "latest.academics.program_percentage.transportation": "Transportation And Materials Moving",
    "latest.academics.program_percentage.visual_performing": "Visual And Performing Arts",
    "latest.academics.program_percentage.health": "Health Professions And Related Programs",
    "latest.academics.program_percentage.business_marketing": "Business, Management, Marketing, And Related Support Services",
    "latest.academics.program_percentage.history": "History"
};

const Network = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/community'); // Fetch users from your API
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="py-10 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-100 sm:text-6xl">
                Build Your Network
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {users.map((user, idx) => (
                <div key={idx} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center flex flex-col justify-between">
                    <div className="text-gray-300 font-semibold mb-4">
                    <p><span className="text-gray-400 text-xl">Name:</span> {user.fullName || "Anonymous"}</p>
                    <p className = "mb-2"> </p> 
                    <p><span className="text-gray-400 text-xl">Intended Major:</span> {programOptions[user.academicTrack] || "Unknown Major"}</p>
                    </div>

                    {/* Display LinkedIn if available */}
                    {user.socialMediaTags && user.socialMediaTags.length > 0 && user.socialMediaTags[0].includes('linkedin.com') && (
                    <div className="flex justify-center items-center space-x-2 mt-4">
                        <a href={user.socialMediaTags[0]} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                        <BsLinkedin size={24} className="text-blue-500 hover:text-blue-400" />
                        <span className="text-gray-300">LinkedIn</span>
                        </a>
                    </div>
                    )}

                    <p className="text-gray-500 mt-4 text-xs">Date Created: {new Date(user.dateCreated).toLocaleDateString()}</p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Network;