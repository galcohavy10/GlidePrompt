import React, { useEffect, useState } from 'react';
import { signOut, getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path matches your actual import path
import CardsMini from './CardsMini.jsx';
import axios from 'axios';

const Profile = ({ user }) => {
  const [userData, setUserData] = useState({ creditsRemaining: null, paymentPlan: '', fullName: 'User' });
  const auth = getAuth();
  const [serverResponse, setServerResponse] = useState(''); // Add this line

  const cancelSubscription = async () => {
    try {
      const response = await axios.post('/cancelSubscription', { subscriptionId: userData.stripeSubscriptionId, uid: user.uid });
      if (response.data.success) {
        setServerResponse('Subscription canceled successfully');
        //wait 2 seconds and then clear the server response
        setTimeout(() => {
          setServerResponse('');
        }, 2000);
      }
    }
    catch (error) {
      console.error('Failed to cancel subscription', error);
      setServerResponse('Failed to cancel subscription, contact support if this persists');
      //wait 2 seconds and then clear the server response
      setTimeout(() => {
        setServerResponse('');
      }, 2000);
    }
  };
    


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
    <div className="container mx-auto mt-4 p-4 shadow-lg rounded-lg bg-white">
      <h1 className="text-xl font-semibold mb-6">Welcome, {userData.fullName || "User"}!</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Your Plan: {displayPlan(userData.paymentPlan)}</h2>
        <h2 className="text-lg font-semibold">Credits Remaining: {userData.creditsRemaining}</h2>
        {userData.paymentPlan !== 'freeTrial' && (
          <button onClick={cancelSubscription} className="text-gray-500 hover:text-gray-700 underline font-medium mt-4">
            Cancel Subscription
          </button>
        )}
        {serverResponse && <p className="text-gray-800 mt-4">{serverResponse}</p>}
      </div>
      {userData.paymentPlan === 'freeTrial' && <CardsMini />} {/* Conditionally display Cards component */}
      <button onClick={handleLogout} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
        Log Out
      </button>
    </div>
  );
  
};

export default Profile;
