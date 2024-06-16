// AuthButton.jsx
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthButton = ({ setShowAuth }) => {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser); // Listen for auth changes
        return () => unsubscribe(); // Cleanup subscription
    }, [auth]);

    const handleAuthAction = () => {
        setShowAuth(true);  // Trigger to show authentication modal
    };

    if (user) {
        const initial = user.displayName ? user.displayName[0] : 'U'; // First letter of display name
        return (
            <li className='p-4 cursor-pointer bg-blue-500 text-white rounded flex items-center justify-center' onClick={handleAuthAction}>
                <div className='w-8 h-8 bg-white text-blue-500 rounded-full flex items-center justify-center mr-2'>
                    {initial} {/* Display first initial */}
                </div>
                Profile
            </li>
        );
    }

    return (
        <li className='p-4 cursor-pointer bg-veryLightGray text-black rounded' onClick={handleAuthAction}>
            Sign In
        </li>
    );
};

export default AuthButton;
