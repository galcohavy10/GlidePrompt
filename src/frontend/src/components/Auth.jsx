// Auth.jsx
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Signup from './Signup';
import Profile from './Profile';

const Auth = () => {
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

  if (!user) {
    return (
      <div>
        <Signup onAuthChange={handleAuthChange} />
      </div>
    );
  }
  return <Profile user={user} />;
};

export default Auth;
