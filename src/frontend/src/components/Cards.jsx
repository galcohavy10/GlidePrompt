import React from 'react';
import Single from '../assets/single.png'
import Double from '../assets/double.png'
import Triple from '../assets/triple.png'

const Cards = () => {
  return (
    <div className='w-full py-[5rem] px-4 bg-white'>

        <div className='max-w-[1240px] mx-auto'>

        {/* Title Section */}
        <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-bold py-8'>
        RESERVE A SPOT
        </h1>

        <p className='text-center text-gray-500 mb-20'>
        One-time fully refundable reservation fee.
        </p>


      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Single} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Basic</h2>
              <p className='text-center text-4xl font-bold'>$10</p>
              <p className='text-center text-gray-500'>$50/mo after beta (optional).</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>500 GPT-4 messages</p>
                  <p className='py-2 border-b mx-8'>1000 total messages</p>
                  <p className='py-2 border-b mx-8'>Up to 20 files/message</p>
              </div>
              <a href="https://buy.stripe.com/3cs6rGePn50X83m4gg" rel="noopener noreferrer" className="block w-full text-center">
                  <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Reserve Now</button>
              </a>
          </div>
          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-transparent' src={Double} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Small Team</h2>
              <p className='text-center text-4xl font-bold'>$20</p>
              <p className='text-center text-gray-500'>$150/mo after beta (optional).</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>1700 GPT-4 messages</p>
                  <p className='py-2 border-b mx-8'>5000 total messages</p>
                  <p className='py-2 border-b mx-8'>Up to 40 files</p>
              </div>
              <a href="https://buy.stripe.com/14kaHWcHfdxtabuaEF" rel="noopener noreferrer" className="block w-full text-center">
              <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Reserve Now</button>
              </a>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Triple} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Enterprise</h2>
              <p className='text-center text-4xl font-bold'>$50</p>
              <p className='text-center text-gray-500'>$1000/mo after beta (optional).</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>12,000 GPT-4 messages</p>
                  <p className='py-2 border-b mx-8'>Unlimited total messages</p>
                  <p className='py-2 border-b mx-8'>50+ files</p>
              </div>
              <a href="https://buy.stripe.com/00g6rGdLj3WT5VeeUW" rel="noopener noreferrer" className="block w-full text-center">
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Reserve Now</button>
              </a>
          </div>
      </div>
    </div>
    </div>
  );
};

export default Cards;
