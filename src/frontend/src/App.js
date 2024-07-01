import './firebase';  // This ensures Firebase is initialized first
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { analytics, logEvent } from './firebase'; // Import analytics and logEvent
import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Analytics from './components/Analytics';
import Cards from './components/Cards';
import Newsletter from './components/Newsletter';
import Demo from './components/Demo/Demo';

import FAQ from './components/FAQ';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/Privacy';
import TOS from './components/TOS';
import Dashboard from './components/Dashboard';

const stripePromise = loadStripe(process.env.REACT_APP_NODE_ENV === 'development' 
  ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST 
  : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
    axios.defaults.baseURL = baseURL;
    console.log('axios base URL:', axios.defaults.baseURL);

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && location.pathname === '/') {
        navigate('/dashboard');
      }
      // if the user's logged out and they were on dashboard, redirect to home
      if (!currentUser && location.pathname === '/dashboard') {
        navigate('/');
      }
    });

    logEvent(analytics, 'page_view', {
      page_path: window.location.pathname,
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [navigate, location.pathname]);

  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_path: location.pathname,
    });
  }, [location]);

  return (
    <Elements stripe={stripePromise}>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<>
            <Hero />
            <Demo />
            <Analytics />
            <Newsletter />
            <Cards />
          </>} />
          <Route path="/faq" element={<>
            <FAQ />
            <Newsletter />
          </>} />
          <Route path="/about" element={<>
            <About />
            <Newsletter />
          </>} />
          <Route path="/contact" element={<>
            <Contact />
            <Newsletter />
          </>} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/tos" element={<TOS />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </Elements>
  );
}

export default App;