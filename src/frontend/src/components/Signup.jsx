// Signup.jsx
import React, { useState } from 'react';
import Login from './Login';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const Signup = ({ onAuthChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginView, setIsLoginView] = useState(false); // State to toggle between login and signup
  const auth = getAuth();

  const handleSignup = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onAuthChange(userCredential.user);
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
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      </form>
      <p className="mt-4">
        Already have an account?
        <button onClick={toggleView} className="text-blue-500 hover:underline ml-1">Log in</button>
      </p>
    </div>
  );
};

export default Signup;
