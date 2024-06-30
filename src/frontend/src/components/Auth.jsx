import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Signup from './Signup';
import Profile from './Profile';

const Auth = ({ onClose }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleAuthChange = (user) => {
    setUser(user);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-700">X</button>
        {!user ? <Signup onAuthChange={handleAuthChange} /> : <Profile user={user} />}
      </div>
    </div>
  );
};

export default Auth;
