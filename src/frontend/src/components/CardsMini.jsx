import React from 'react';
import Single from '../assets/single.png';
import Triple from '../assets/triple.png';
import CheckoutButton from './CheckoutButton';

const CardsMini = () => {
  return (
    <div className='w-full px-4 py-2.5 bg-white flex justify-center items-center'>
      <div className='container mx-auto'>

        {/* Title Section */}
        <h1 className='text-center text-xl font-bold py-4'>
          Upgrade Your Plan
        </h1>

        {/* Cards Section */}
        <div className='flex justify-center items-center gap-4'>
          <div className='shadow flex flex-col p-3 rounded hover:scale-105 duration-300' style={{ width: "200px" }}>
              <img className='w-12 mx-auto' src={Single} alt="Pro Plan" />
              <h2 className='text-lg font-bold text-center my-2'>Pro</h2>
              <p className='text-center text-xl font-bold'>$15/month</p>
              <ul className='text-center text-sm my-2'>
                <li>100 credits/mo</li>
              </ul>
              <CheckoutButton plan="pro" />

          </div>

          <div className='shadow bg-gray-100 flex flex-col p-3 rounded hover:scale-105 duration-300' style={{ width: "200px" }}>
              <img className='w-12 mx-auto' src={Triple} alt="Teams Plan" />
              <h2 className='text-lg font-bold text-center my-2'>Teams</h2>
              <p className='text-center text-xl font-bold'>$25/user/mo</p>
              <ul className='text-center text-sm my-2'>
                <li>300 credits/mo</li>
                <li>24/7 Support</li>
              </ul>
              <CheckoutButton plan="teams" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsMini;
