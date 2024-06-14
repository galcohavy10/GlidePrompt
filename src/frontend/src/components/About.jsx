//about page
import React from "react";
// import Founder from "../assets/founder.png";

const About = () => {


return (
    <div className='text-white px-4 py-5'>
      <div className='max-w-[1240px] w-full mx-auto text-left flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2 text-center md:text-left'>
          The Story
        </p>
        <p className='text-xl font-medium p-2'>
        Hi, I'm the creator of GlidePrompt. Here's the story. 
        <br /> <br /> I was working on a project where I needed to generate prompts and test them on a host of different language models. I don't like the existing solutions because they're expensive and don't give me the use-case I want. Literally a big prompt playground and a place to collect evidence.
        <br /> <br /> So I freaking coded it.
        I like helping builders build and my vision is to have this hooked up to people's API keys so it's easy to use.
       </p>

     {/* <div className='flex items-center space-x-4 py-10'>
    <div className='w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden'>
        <img src={Founder} alt="Founder's Portrait" className='object-cover w-full h-full' />
    </div>
          <div className='text-lg md:text-xl text-gray-400'>
              <span>Founder of GlidePrompt</span><br />
              <i><span>- 2024</span></i>
          </div>
      </div> */}


      </div>
    </div>
  );

}

export default About;