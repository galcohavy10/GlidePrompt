// Profile.jsx
import React from 'react';
import { signOut, getAuth } from 'firebase/auth';

const Profile = ({ user }) => {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log("Logged out successfully");
    }).catch((error) => {
      console.error("Logout error", error);
    });
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-lg font-bold mb-4">Welcome, {user.displayName || "User"}!</h1>
      <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Logout
      </button>
    </div>
  );
};

export default Profile;
