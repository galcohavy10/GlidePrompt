import React, { useRef } from 'react'; // Import useRef for scroll when learn more button is clicked
import { ReactTyped } from 'react-typed';

const Hero = () => {
  // Create a ref for the hero container
  const heroRef = useRef(null);

    // Define the scroll function
    const scrollToBottom = () => {
      if (heroRef.current) {
        const bottomOfHero = heroRef.current.getBoundingClientRect().bottom + window.pageYOffset;
        window.scrollTo({ top: bottomOfHero, behavior: 'smooth' });
      }
    };

  return (
    <div className='text-white' ref={heroRef}> {/* Attach the ref here for scrolling programatically */}
      <div className='max-w-[1000px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          Finally,
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          A Prompt Engineering Toolkit
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            GlidePrompt
          </p>
          <ReactTyped
          className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['helps you edit prompts', 'compares model pricing', 'stores prompt changes']}
            typeSpeed={100}
            backSpeed={50}
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>We help your agents shine</p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black' onClick={scrollToBottom}>Learn More</button>
      </div>
    </div>
  );
};

export default Hero;
