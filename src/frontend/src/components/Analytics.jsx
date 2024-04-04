import React, { useRef } from 'react';
import Laptop from '../assets/laptop.jpg';

const Analytics = () => {
  const componentRef = useRef(null);

  const handleReserveClick = () => {
    if (componentRef.current) {
      const distanceToBottom = componentRef.current.scrollHeight - componentRef.current.scrollTop;
      const scrollAmount = distanceToBottom + (distanceToBottom / 2);
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className='w-full bg-white py-16 px-4' ref={componentRef}>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>TEST-FIRST SOLUTION</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Make Evidence-Based Prompting Decisions</h1>
          <p>
            Sick of the contraints of specific large language models? Centralize your prompts in one place and see which LLM performs best for YOUR use case with ease.
          </p>
          <button 
            className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'
            onClick={handleReserveClick}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
