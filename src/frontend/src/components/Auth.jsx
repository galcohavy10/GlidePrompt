// src/components/Auth.jsx
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { auth } from '../firebase';

const Auth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });

    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => false // Avoid redirects after sign-in
      },
      tosUrl: '/terms-of-service',
      privacyPolicyUrl: '/privacy-policy',
    };

    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    if (!user) { // Initialize the FirebaseUI Widget using Firebase auth if there's no user signed in already.
      ui.start('#firebaseui-auth-container', uiConfig);
    }

    return () => {
      unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
      ui.delete(); // Delete the FirebaseUI instance when the component unmounts.
    };
  }, [user]); // Re-run the effect when the user state changes.

  return (
    <div>
      {user ? (
        <div>
          Successfully signed in! Hi, {user.displayName || "there"}!
        </div>
      ) : (
        <div id="firebaseui-auth-container"></div>
      )}
    </div>
  );
};

export default Auth;
