// Signup.jsx
import React, { useState } from 'react';
import Login from './Login';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Signup = ({ onAuthChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoginView, setIsLoginView] = useState(false);
  const auth = getAuth();

  const isEmailValid = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    //if number or special character, increase strength
    if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleSignup = (event) => {
    event.preventDefault();
    if (!isEmailValid(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (passwordStrength < 3) {
      setErrorMessage("Password is too weak. Please make it stronger.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userRef = doc(db, "users", userCredential.user.uid);
        setDoc(userRef, {
          creditsRemaining: 3,
          paymentPlan: 'freeTrial',
          fullName: fullName
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

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1:
        return 'red';
      case 2:
        return 'orange';
      case 3:
        return 'yellow';
      case 4:
        return 'green';
      default:
        return 'red';
    }
  };

 const getPasswordStrengthDescription = () => {
    switch (passwordStrength) {
      case 1:
        return 'Weak';
      case 2:
        return 'Better';
      case 3:
        return 'Almost there';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  }

  if (isLoginView) {
    return <Login onAuthChange={onAuthChange} />;
  }

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSignup} className="space-y-6 bg-slate-200 p-5 rounded-md">
        <input
          type="text"
          autoComplete='name'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="input input-bordered w-full max-w-lg text-lg rounded-lg px-4 py-2 border-gray-300"
          required
        />
        <input
          type="email"
          autoComplete='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input input-bordered w-full max-w-lg text-lg rounded-lg px-4 py-2 border-gray-300"
          required
        />
        <input
          type=""
          autoComplete=''
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="input input-bordered w-full max-w-lg text-lg rounded-lg px-4 py-2 border-gray-300"
          required
        />
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Password strength: <span style={{ color: getPasswordStrengthColor() }}>{getPasswordStrengthDescription()}</span>
          </div>
        </div>
        <input
          type="password"
          autoComplete='new-password'
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
