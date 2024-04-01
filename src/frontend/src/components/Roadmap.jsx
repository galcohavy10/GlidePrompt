import React from 'react';

const Roadmap = () => {
  return (
    <div className='text-white px-4 py-12'>
      <div className='max-w-[1240px] w-full mx-auto text-left flex flex-col justify-center space-y-6'>

        {/* Header */}
        <h1 className='text-center md:text-7xl sm:text-6xl text-4xl font-bold'>
          Beta in December
        </h1>
        
        {/* Subtext */}
        <p className='text-center md:text-xl sm:text-lg font-medium text-gray-500'>
          We're just finishing up...
        </p>

        {/* Checklist */}
        <div className='mx-auto w-full md:w-2/3 space-y-2'>
          <div className='flex items-center'>
            <span className='text-[#00df9a] mr-4'>✔</span> Meaningful compression algorithm
          </div>
          <div className='flex items-center'>
            <span className='text-[#00df9a] mr-4'>✔</span> Ability to upload any text docs
          </div>
          <div className='flex items-center'>
            <span className='text-gray-500 mr-4'>○</span> Deeper customization
          </div>
          <div className='flex items-center'>
            <span className='text-gray-500 mr-4'>○</span> Deployable interface
          </div>
        </div>

        {/* Note */}
        <p className='text-center md:text-xl text-lg font-medium text-gray-500'>
          We're hard at work, building the future.
        </p>
      </div>
    </div>
  );
};

export default Roadmap;
