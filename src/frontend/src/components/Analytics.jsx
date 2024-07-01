import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ValueProp from '../assets/valueProp.png';
import Auth from '../components/Auth';
import Profile from '../components/Profile';

const Analytics = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('currentUser', currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={ValueProp} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>Save Time</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Gather Evidence Efficiently. Deploy better Language Models.
          </h1>
          {showAuth && !user ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <Auth onClose={handleCloseAuth} />
            </div>
          ) : user ? (
            <Profile user={user} />
          ) : (
            <button
              className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'
              onClick={() => setShowAuth(true)}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;