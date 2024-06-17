import React, { useEffect, useState } from 'react';
import { signOut, getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path matches your actual import path
import CardsMini from './CardsMini.jsx';

const Profile = ({ user }) => {
  const [userData, setUserData] = useState({ creditsRemaining: null, paymentPlan: '', fullName: 'User' });
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchUserData();
  }, [user.uid]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log("Logged out successfully");
    }).catch((error) => {
      console.error("Logout error", error);
    });
  };

  // Convert 'freeTrial' to 'Free Trial' for display
  const displayPlan = (plan) => {
    return plan === 'freeTrial' ? 'Free Trial' : plan;
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-lg font-bold mb-4">Welcome, {userData.fullName || "User"}!</h1>
      <div className="mb-4">
        <h2 className="text-md font-bold">Your Plan: {displayPlan(userData.paymentPlan)}</h2>
        <h2 className="text-md font-bold">Credits Remaining: {userData.creditsRemaining}</h2>
      </div>
      {userData.paymentPlan === 'freeTrial' && <CardsMini />} {/* Conditionally display Cards component */}
      <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Log Out
      </button>
    </div>
  );
};

export default Profile;
