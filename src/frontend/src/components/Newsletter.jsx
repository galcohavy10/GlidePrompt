import React, { useState } from 'react';
import axios from 'axios';
//get a check mark and an x mark for feedback
import { FaCheckCircle } from 'react-icons/fa';
import { FaCircleXmark } from "react-icons/fa6";


const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async () => {
    try {
        const response = await axios.post('/subscribeEmail', { email });

        if (response.status === 200) {
            setFeedback('success');
            setEmail('');
        } else {
            setFeedback('error');
        }
    } catch (error) {
        setFeedback('error');
        console.error('Newsletter subscription error:', error);
    }
    setTimeout(() => {
        setFeedback(null);
    }, 3000); // Reset feedback after 3 seconds
  };


  return (
    <div className='w-full py-16 text-white px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Want to suggest a new feature? Report a bug?
          </h1>
          <p>My email is gal@glideprompt.com, but be nice!</p>
        </div>
        <div className='my-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              className='p-3 flex w-full rounded-md text-black'
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className='bg-[#00df9a] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'
              onClick={handleSubmit}
            >
             Let's Talk
            </button>
            {feedback === 'success' && (
              <div className='text-green-500 text-3xl animate-bounce m-3'>
                <FaCheckCircle />
              </div>
            )}
            {feedback === 'error' && (
              <div className='text-red-500 text-3xl animate-bounce m-3'>
                <FaCircleXmark />
              </div>
            )}
          </div>
          <p>
            {/* write the error here for a bit */}
            {feedback === 'success' && 'Thank you for subscribing!'}
            {feedback === 'error' && 'Something went wrong. Please try again.'}
            {feedback === null && 'You can also sign up to hear from me here.'}
            
          </p>

        </div>
      </div>
    </div>
  );
};

export default Newsletter;
