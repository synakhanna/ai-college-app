import LayoutEffect from "@/components/LayoutEffect";
import { BsLinkedin } from "react-icons/bs"; 

//user should be prompted to submit linkedin link before having access to the cards on this page
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs'; // Assuming you are using Clerk's React package

const Network = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/community');
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
        <div style={{ padding: '80px 0', margin: '0 auto', maxWidth: '1280px' }}>
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
    {users.map((user, idx) => (
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
            <div style={{ marginBottom: '16px', color: '#f7fafc', fontWeight: '600' }}>
                <p>{user.fullName}</p>
                <p>{user.email}</p>
                <p>{user.academicTrack}</p>
            </div>
            <div style={{ marginBottom: '16px' }}>
                <p>GPA: {user.academicInfo.gpa}</p>
                {user.academicInfo.satScore && (
                    <p>SAT: {user.academicInfo.satScore}</p>
                )}
            </div>
            <div>
                <p style={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#f7fafc',
                    marginBottom: 'auto'
                }}>
                    Date Created: {new Date(user.dateCreated).toLocaleDateString()}
                </p>
            </div>
        </li>
    ))}
</ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Network;