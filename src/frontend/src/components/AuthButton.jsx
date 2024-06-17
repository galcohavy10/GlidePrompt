import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path matches your actual import path

const AuthButton = ({ setShowAuth }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({ creditsRemaining: null, fullName: 'User' });
    const [guestCredits, setGuestCredits] = useState(0);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
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

        // Fetch guest user credits from localStorage
        const storedCredits = localStorage.getItem('guestUserCredits');
        if (storedCredits) {
            setGuestCredits(Number(storedCredits));
        }

        return () => unsubscribe(); // Cleanup subscription
    }, [auth]);

    const handleAuthAction = () => {
        setShowAuth(true);  // Trigger to show authentication modal
    };

    if (user) {
        const initial = userData.fullName ? userData.fullName[0] : 'U';
        const firstName = userData.fullName.split(' ')[0];
        return (
            <li className='p-4 cursor-pointer bg-blue-500 text-white rounded flex items-center justify-center' onClick={handleAuthAction}>
                <div className='w-8 h-8 bg-white text-blue-500 rounded-full flex items-center justify-center mr-2'>
                    {initial} {/* Display first initial */}
                </div>
                {`${firstName} (${userData.creditsRemaining} credits)`}
            </li>
        );
    }

    return (
        <div className="flex items-center">
            <div className="p-3.5 bg-gray-200 text-gray-700 rounded mr-2">
                {guestCredits} credits
            </div>
            <li className='p-4 cursor-pointer bg-blue-500 text-black text-bold rounded' onClick={handleAuthAction}>
                Sign In
            </li>
        </div>
    );
};

export default AuthButton;

