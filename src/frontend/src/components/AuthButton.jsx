import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path matches your actual import path

const AuthButton = ({ setShowAuth }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({ creditsRemaining: null, fullName: 'User' });
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Fetch user data when a user is logged in
                const userRef = doc(db, "users", currentUser.uid);
                getDoc(userRef).then(docSnap => {
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.log("No such document!");
                        setUserData(prev => ({ ...prev, fullName: 'User' }));
                    }
                }).catch(error => console.error("Error fetching user data:", error));
            }
        });
        return () => unsubscribe(); // Cleanup subscription
    }, [auth]);

    const handleAuthAction = () => {
        setShowAuth(true);  // Trigger to show authentication modal
    };

    if (user) {
        // Use the first letter of fullName, or 'U' if fullName is not available
        const initial = userData.fullName ? userData.fullName[0] : 'U';
        return (
            <li className='p-4 cursor-pointer bg-blue-500 text-white rounded flex items-center justify-center' onClick={handleAuthAction}>
                <div className='w-8 h-8 bg-white text-blue-500 rounded-full flex items-center justify-center mr-2'>
                    {initial} {/* Display first initial */}
                </div>
                {`Profile (${userData.creditsRemaining} credits)`}
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
