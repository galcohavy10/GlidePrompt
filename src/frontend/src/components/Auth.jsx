// src/components/Auth.jsx
import React, { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { auth } from '../firebase';

const Auth = () => {
  useEffect(() => {
    const uiConfig = {
      signInSuccessUrl: '/', // Redirect to homepage after sign-in
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      tosUrl: '/terms-of-service',
      privacyPolicyUrl: '/privacy-policy'
    };

    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', uiConfig);
  }, []);

  return (
    <div id="firebaseui-auth-container"></div>
  );
};

export default Auth;
