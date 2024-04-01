import React from 'react';
import Single from '../assets/single.png'
import Triple from '../assets/triple.png'

const Cards = () => {
  return (
    <div className='w-full py-20 px-4 bg-white flex justify-center items-center'>

        <div className='container mx-auto'>

        {/* Title Section */}
        <h1 className='text-center text-4xl font-bold py-8'>
        BUY A SPOT
        </h1>

        <p className='text-center text-gray-500 mb-20'>
        Prices will never be this low again, lock in now 🔒
        </p>

      {/* Cards Section */}
      <div className='flex flex-wrap justify-center items-start gap-8'>
          <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-xl flex flex-col p-4 rounded-lg hover:scale-105 duration-300' style={{ maxWidth: "300px" }}>
              <img className='w-20 mx-auto -mt-16 bg-white' src={Single} alt="Starter" />
              <h2 className='text-2xl font-bold text-center py-8'>Starter</h2>
              <p className='text-center text-4xl font-bold'>$10/month</p>
              <p className='text-center text-gray-500'>Get a Taste</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>100 tests per month</p>
                  <p className='py-2 border-b mx-8'>1000 total queries</p>
              </div>
              <a href="https://buy.stripe.com/aEU03igXv7955Ve6or" rel="noopener noreferrer" className="block w-full text-center">
                  <button className='bg-[#00df9a] w-full rounded-md font-medium my-6 px-6 py-3'>Buy Now</button>
              </a>
          </div>

          <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-xl  bg-gray-100 flex flex-col p-4 rounded-lg hover:scale-105 duration-300' style={{ maxWidth: "300px" }}>
              <img className='w-20 mx-auto -mt-16 bg-white' src={Triple} alt="Starter" />
              <h2 className='text-2xl font-bold text-center py-8'>Pro</h2>
              <p className='text-center text-4xl font-bold'>$50/month</p>
              <p className='text-center text-gray-500'>Invest in Yourself</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>1000 tests per month</p>
                  <p className='py-2 border-b mx-8'>10,000 total queries</p>
              </div>
              <a href="https://buy.stripe.com/bIY7vKdLj3WTerKfZ2" rel="noopener noreferrer" className="block w-full text-center">
              <button className='bg-black text-[#00df9a] w-full rounded-md font-medium my-6 px-6 py-3'>Buy Now</button>
              </a>
          </div>
      </div>
    </div>
    </div>
  );
};

export default Cards;