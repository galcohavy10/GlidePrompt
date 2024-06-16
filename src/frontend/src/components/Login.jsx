// Login.jsx
import React, { useState } from 'react';
import Signup from './Signup'; // Import Signup component for toggling
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

const Login = ({ onAuthChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupView, setIsSignupView] = useState(false); // State to toggle between login and signup
  const auth = getAuth();

  const handleLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onAuthChange(userCredential.user);
      })
      .catch((error) => {
        console.error("Login error", error.message);
      });
  };

  // Toggle view between login and signup
  const toggleView = () => {
    setIsSignupView(!isSignupView);
  };

  if (isSignupView) {
    return <Signup onAuthChange={onAuthChange} />;
  }

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-lg font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input input-bordered w-full max-w-xs" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input input-bordered w-full max-w-xs" />
        <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Login</button>
      </form>
      <p className="mt-4">
        or <button onClick={toggleView} className="text-blue-500 hover:underline">create an account</button>
      </p>
    </div>
  );
};

export default Login;
