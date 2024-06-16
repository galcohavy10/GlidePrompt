// Login.jsx
import React, { useState } from 'react';
import Signup from './Signup'; // Import Signup component for toggling
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

const Login = ({ onAuthChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignupView, setIsSignupView] = useState(false); // State to toggle between login and signup
  const auth = getAuth();

  const handleLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onAuthChange(userCredential.user);
      })
      .catch((error) => {
        setErrorMessage(error.message);  // Set error message for display
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
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleLogin} className="space-y-6">
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
        <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
          Login
        </button>
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      </form>
      <p className="mt-4">
        or <button onClick={toggleView} className="text-blue-500 hover:underline">create an account</button>
      </p>
    </div>
  );
};

export default Login;
