// Signup.jsx
import React, { useState } from 'react';
import Login from './Login';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
// get db from firebase.js
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Signup = ({ onAuthChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginView, setIsLoginView] = useState(false); // State to toggle between login and signup
  const auth = getAuth();

  const isPasswordComplex = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && (hasNumbers || hasSpecialChar);
  }

  const handleSignup = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isPasswordComplex(password)) {
      setErrorMessage("Password must have:|1. At least 8 characters |2. Include both uppercase and lowercase|3. Include at least one number OR special character");
      return;
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Set initial user data in Firestore
        const userRef = doc(db, "users", userCredential.user.uid);
        setDoc(userRef, {
          creditsRemaining: 3,
          paymentPlan: 'freeTrial',
          fullName: fullName  // Optional: store full name in Firestore
        }, { merge: true })
        .then(() => {
          onAuthChange(userCredential.user);
          console.log("Document successfully written! " + userCredential.user.uid);
        })
        .catch((error) => {
          console.error("Error setting document:", error);
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };


  // Toggle view between signup and login
  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  if (isLoginView) {
    return <Login onAuthChange={onAuthChange} />;
  }

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSignup} className="space-y-6">
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="input input-bordered w-full max-w-lg text-lg rounded-lg px-4 py-2 border-gray-300"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input input-bordered w-full max-w-lg text-lg rounded-lg px-4 py-2 border-gray-300"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input input-bordered w-full max-w-lg text-lg rounded-lg px-4 py-2 border-gray-300"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="input input-bordered w-full max-w-lg text-lg rounded-lg px-4 py-2 border-gray-300"
          required
        />
        <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
          Sign Up
        </button>
        {errorMessage.split('|').map((line, index) => (
          <p key={index} className="text-red-500 text-sm my-1">{line}</p>
        ))}  
      </form>
      <p className="mt-4">
        Already have an account?
        <button onClick={toggleView} className="text-blue-500 hover:underline ml-1">Log in</button>
      </p>
    </div>
  );
};

export default Signup;
