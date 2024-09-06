import React, { useRef } from 'react';
import { ReactTyped } from 'react-typed';

const Hero = () => {
  const heroRef = useRef(null);

  const scrollToBottom = () => {
    if (heroRef.current) {
      const bottomOfHero = heroRef.current.getBoundingClientRect().bottom + window.pageYOffset;
      window.scrollTo({ top: bottomOfHero, behavior: 'smooth' });
    }
  };

  return (
    <div className='text-white h-screen flex flex-col justify-center items-center' ref={heroRef}>
      <div className='text-center'>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold mb-6'>
          Prompt-Engineering Made Easy.
        </h1>
        <div className='flex justify-center items-center mb-8'>
          <p className='md:text-5xl sm:text-4xl text-xl font-extralight'>
            glideprompt
          </p>
          <ReactTyped
            className='md:text-5xl sm:text-4xl text-xl font-extralight md:pl-4 pl-2'
            strings={['compares LLM pricing.', 'compares LLM outputs.', 'creates your system prompts.']}
            typeSpeed={70}
            backSpeed={35}
            loop
          />

          
        </div>

        <div className='flex flex-col justify-center items-center'>
        
        <button 
          className='bg-[#00df9a] w-[200px] rounded-md font-medium mx-auto py-3 text-black mb-8'
          onClick={scrollToBottom}
        >
          Try Now ↓
        </button>

        <div className='flex justify-center py-3'>
          <a href="https://www.aitechsuite.com/tools/28300?ref=featured&v=449" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://aitsmarketing.s3.amazonaws.com/aits-verified-tool.svg?width=600" 
              alt="AI Tech Suite" 
              width="300"
            />
          </a>
        </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;