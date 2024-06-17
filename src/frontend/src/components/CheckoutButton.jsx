import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

const CheckoutButton = ({ plan }) => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const stripe = useStripe();  // This hook provides the Stripe object once it's loaded

    useEffect(() => {
        // Subscribe to authentication changes
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);

    const handleClick = async (event) => {
        event.preventDefault();

        // Ensure user is logged in
        if (!user) {
            alert('Please sign in to upgrade your plan. The button is at top of page.');
            return;
        }

        // Ensure Stripe is loaded
        if (!stripe) {
            alert('Payment service is currently unavailable. Please try again later.');
            return;
        }

        // Call your API to create a checkout session
        try {
            const { data: { sessionId } } = await axios.post('/createCheckoutSession', {
                plan,
                uid: user.uid,
            });

            // Redirect to Stripe checkout
            const result = await stripe.redirectToCheckout({ sessionId });
            console.log(result);
            if (result.error) {
                alert(result.error.message);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to initiate payment process. Please try again.');
        }
    };

    return (
        <button onClick={handleClick} className={`w-full rounded-md font-medium my-6 px-6 py-3 ${plan === 'pro' ? 'bg-[#00df9a] text-black' : 'bg-black text-[#00df9a]'}`}>
            Select
        </button>
    );
};

export default CheckoutButton;
