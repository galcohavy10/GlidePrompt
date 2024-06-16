import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, EmailAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { auth } from '../firebase';
import { FaCheckCircle } from 'react-icons/fa';

const Auth = () => {
  const [user, setUser] = useState(null);
  const [ui, setUi] = useState(null); // Store FirebaseUI instance in state

  useEffect(() => {
    if (!ui) {
      const firebaseUI = new firebaseui.auth.AuthUI(auth);
      setUi(firebaseUI);
    }

    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          signInMethod: EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
        },
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => false
      },
      tosUrl: '/terms-of-service',
      privacyPolicyUrl: '/privacy-policy'
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser && ui) {
        ui.start('#firebaseui-auth-container', uiConfig);
      }
    });

    return () => {
      unsubscribe();
      if (ui) {
        ui.delete();
      }
    };
  }, [ui]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <div>
      {user ? (
        <div className="flex items-center text-green-500">
          <FaCheckCircle className="mr-2" />
          You are logged in! Hi{user.displayName ? ", " + user.displayName : " there"}!
          <button 
            onClick={handleLogout} 
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div id="firebaseui-auth-container"></div>
      )}
    </div>
  );
};

export default Auth;
