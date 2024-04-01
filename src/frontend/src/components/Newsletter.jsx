import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async () => {
    try {
        const response = await fetch('/user/subscribeEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        if (response.ok) {
            setFeedback('success');
            setEmail('');
        } else {
            setFeedback('error');
        }
    } catch (error) {
        setFeedback('error');
    }
    setTimeout(() => {
        setFeedback(null);
    }, 5000); //5 seconds of showing the feedback to the user
};


  return (
    <div className='w-full py-16 text-white px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Want to talk directly to the founder?
          </h1>
          <p>Suggest a feature or leave feedback, but be nice!</p>
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
            {feedback === 'success' && <div style={{ padding: '10px', animation: 'fadeInOut 5s' }}>✔️</div>}
            {feedback === 'error' && <div style={{ padding: '10px', animation: 'fadeInOut 5s' }}>❌</div>}
          </div>
          <p>
            I will not spam or share your email, this is purely to talk to you directly. 
          </p>

        </div>
      </div>
    </div>
  );
};

export default Newsletter;
