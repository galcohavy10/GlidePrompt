// Signup.jsx
import React, { useState } from 'react';
import Login from './Login';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const Signup = ({ onAuthChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(false); // State to toggle between login and signup
  const auth = getAuth();

  const handleSignup = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onAuthChange(userCredential.user);
      })
      .catch((error) => {
        console.error("Signup error", error.message);
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
      <h1 className="text-lg font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input input-bordered w-full max-w-xs" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input input-bordered w-full max-w-xs" />
        <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Sign Up</button>
      </form>
      <p className="mt-4">
        Already have an account? 
        <button onClick={toggleView} className="text-blue-500 hover:underline ml-1">Log in</button>
      </p>
    </div>
  );
};

export default Signup;
