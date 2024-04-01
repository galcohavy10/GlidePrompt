import React from 'react';
import Single from '../assets/single.png'
import Triple from '../assets/triple.png'

const Cards = () => {
  return (
    <div className='w-full py-[5rem] px-4 bg-white'>

        <div className='max-w-[1240px] mx-auto'>

        {/* Title Section */}
        <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-bold py-8'>
        BUY A SPOT
        </h1>

        <p className='text-center text-gray-500 mb-20'>
        Prices will never be this low again, lock in now 🔒
        </p>


      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Single} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Starter</h2>
              <p className='text-center text-4xl font-bold'>$10/month</p>
              <p className='text-center text-gray-500'>Get a Taste</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>100 tests per month</p>
                  <p className='py-2 border-b mx-8'>1000 total messages</p>
              </div>
              <a href="https://buy.stripe.com/3cs6rGePn50X83m4gg" rel="noopener noreferrer" className="block w-full text-center">
                  <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Buy Now</button>
              </a>
          </div>
          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-transparent' src={Triple} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Pro</h2>
              <p className='text-center text-4xl font-bold'>$50/mo</p>
              <p className='text-center text-gray-500'>Invest In Yourself</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>1000 tests/month</p>
                  <p className='py-2 border-b mx-8'>10,000 total messages</p>
                  <p className='py-2 border-b mx-8'>Up to 5 teammates</p>
              </div>
              <a href="https://buy.stripe.com/bIY7vKdLj3WTerKfZ2" rel="noopener noreferrer" className="block w-full text-center">
              <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Buy Now</button>
              </a>
          </div>
      </div>
    </div>
    </div>
  );
};

export default Cards;
