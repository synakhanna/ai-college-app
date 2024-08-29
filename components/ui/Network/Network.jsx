import LayoutEffect from "@/components/LayoutEffect";
import { BsLinkedin } from "react-icons/bs"; 

//user should be prompted to submit linkedin link before having access to the cards on this page

const Network = () => {

    const featuresList = [
        {
            icon: ( // profile photo from clerk sign in account
                <img 
                    src="path_to_profile_photo1.jpg" 
                    alt="Profile" 
                    style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '50%', 
                        objectFit: 'cover' 
                    }} 
                />
            ),
            title: "Full Name 1", // name from clerk sign in account
            linkedin: (
                <a 
                    href="https://www.linkedin.com/company/codefusionartificialintelligence/posts/?feedView=all" 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="LinkedIn"
                    style={{ 
                        color: '#cbd5e0', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        fontSize: '24px'
                    }}
                >
                    <BsLinkedin style={{ width: '24px', height: '24px' }} />
                </a>
            ),
        },
        {
            icon: (
                <img 
                    src="path_to_profile_photo2.jpg" 
                    alt="Profile" 
                    style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '50%', 
                        objectFit: 'cover' 
                    }} 
                />
            ),
            title: "Full Name 2",
            linkedin: (
                <a 
                    href="https://www.linkedin.com/in/someprofile" 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="LinkedIn"
                    style={{ 
                        color: '#cbd5e0', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        fontSize: '24px'
                    }}
                >
                    <BsLinkedin style={{ width: '24px', height: '24px' }} />
                </a>
            ),
        },
        {
            icon: (
                <img 
                    src="path_to_profile_photo3.jpg" 
                    alt="Profile" 
                    style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '50%', 
                        objectFit: 'cover' 
                    }} 
                />
            ),
            title: "Full Name 3",
            linkedin: (
                <a 
                    href="https://www.linkedin.com/in/anotherprofile" 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="LinkedIn"
                    style={{ 
                        color: '#cbd5e0', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        fontSize: '24px'
                    }}
                >
                    <BsLinkedin style={{ width: '24px', height: '24px' }} />
                </a>
            ),
        },
        {
            icon: (
                <img 
                    src="path_to_profile_photo4.jpg" 
                    alt="Profile" 
                    style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '50%', 
                        objectFit: 'cover' 
                    }} 
                />
            ),
            title: "Full Name 4",
            linkedin: (
                <a 
                    href="https://www.linkedin.com/in/yetanotherprofile" 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="LinkedIn"
                    style={{ 
                        color: '#cbd5e0', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        fontSize: '24px'
                    }}
                >
                    <BsLinkedin style={{ width: '24px', height: '24px' }} />
                </a>
            ),
        },
        {
            icon: (
                <img 
                    src="path_to_profile_photo5.jpg" 
                    alt="Profile" 
                    style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '50%', 
                        objectFit: 'cover' 
                    }} 
                />
            ),
            title: "Full Name 5",
            linkedin: (
                <a 
                    href="https://www.linkedin.com/in/finalprofile" 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="LinkedIn"
                    style={{ 
                        color: '#cbd5e0', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        fontSize: '24px'
                    }}
                >
                    <BsLinkedin style={{ width: '24px', height: '24px' }} />
                </a>
            ),
        },
    ];

    return (
        <div style={{ padding: '80px 0', margin: '0 auto', maxWidth: '1280px' }}>
            <LayoutEffect
                className="duration-1000 delay-500"
                isInviewState={{
                    trueState: "opacity-1",
                    falseState: "opacity-0",
                }}
            >
                <div>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h1
                            className="text-4xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto sm:text-6xl py-6"
                            style={{
                                backgroundImage:
                                    "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)",
                            }}
                        >
                            Build Your Network
                        </h1>
                        <div style={{ marginTop: '48px', position: 'relative' }}>
                            <ul style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                                {featuresList.map((item, idx) => (
                                    <li key={idx} style={{
                                        padding: '16px',
                                        borderRadius: '16px',
                                        border: '1px solid #2d3748',
                                        background: "radial-gradient(157.73% 157.73% at 50% -29.9%, rgba(203, 213, 225, 0.16) 0%, rgba(203, 213, 225, 0) 100%)",
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        textAlign: 'center',
                                        height: '200px' // Set a fixed height for the card
                                    }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginBottom: '16px'
                                        }}>
                                            {item.icon}
                                        </div>
                                        <h3 style={{
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            color: '#f7fafc',
                                            marginBottom: 'auto'
                                        }}>
                                            {item.title}
                                        </h3>
                                        {item.linkedin}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </LayoutEffect>
        </div>
    )
}

export default Network;
