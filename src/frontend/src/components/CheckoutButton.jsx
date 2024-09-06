import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

const CheckoutButton = ({ plan }) => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const stripe = useStripe();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth]);

    const handleClick = async (event) => {
        event.preventDefault();

        if (plan === 'teams') {
            // Open email client for Teams plan inquiry in a new tab
            window.open('mailto:gal@glideprompt.com?subject=Inquiry%20of%20Teams%20Services', '_blank');
            return;
        }

        if (!user) {
            alert('Please sign in to upgrade your plan. The button is at top of page.');
            return;
        }

        if (!stripe) {
            alert('Payment service is currently unavailable. Please try again later.');
            return;
        }

        try {
            const { data: { sessionId } } = await axios.post('/createCheckoutSession', {
                plan,
                uid: user.uid,
            });

            const result = await stripe.redirectToCheckout({ sessionId });
            if (result.error) {
                alert(result.error.message);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to initiate payment process. Please try again.');
        }
    };

    return (
        <button 
            onClick={handleClick} 
            className={`w-full rounded-md font-medium my-6 px-6 py-3 ${
                plan === 'pro' ? 'bg-[#00df9a] text-black' : 'bg-black text-[#00df9a]'
            }`}
        >
            Select
        </button>
    );
};

export default CheckoutButton;