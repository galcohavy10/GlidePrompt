//about page
import React from "react";
import Founder from "../assets/founder.png";

const About = () => {


return (
    <div className='text-white px-4 py-5'>
      <div className='max-w-[1240px] w-full mx-auto text-left flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2 text-center md:text-left'>
          The Story
        </p>
        <p className='text-xl font-medium p-2'>
        Hi, I'm Gal Cohavy and I'm the creator of NexaFlow. Here's the story. 
        <br /> <br /> I was building an app called uStock, a self-improvement app for people
        to connect about how they've been improving at different parts of their life. 
        One of the features was being able to chat with different language models about
        different communities you were a part of: I realized that this feature alone should be its own company.
        <br /> <br /> I knew there could be something really valuable about customizing models for your needs
        and I wanted to build a platform that would allow anyone to do that. 
        The problem was that, for example, teachers need textbooks when writing tests with AI,
        coders would prefer their whole codebase in there, and so on. I realized that the only way to make this work 
        was to compress the data in a way that would allow for the most amount of data to be stored in the least amount 
        of space. A couple days later, someone was talking to me about my idea. <br /> <br />I apologized and told him I 
        needed silence and ran to get a napkin, <b>I spent the next 30 minutes drawing out the algorithm that would allow for unforeseen, historic compression on a napkin.</b> 
        That night, I was up until 4 am discussing these specs with my mathematician friend. 
        I then glued myself to the chair for a week and coded this, slowly seeing the beauty of the algorithm unveil itself. The first time I got GPT-4 to write code specific to different parts of my codebase after giving it 100s of files, I knew this was a world-changing concept. <br /> <br />I'm now refining the under-the-hood tech and the platform for you guys to use almost all day every day. I'm very excited to see what people build with this, and I suppose we shall see in December.  
     </p>

     <div className='flex items-center space-x-4 py-10'>
    <div className='w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden'>
        <img src={Founder} alt="Founder's Portrait" className='object-cover w-full h-full' />
    </div>
          <div className='text-lg md:text-xl text-gray-400'>
              <span>Gal Cohavy, founder of NexaFlow</span><br />
              <i><span>- 2023</span></i>
          </div>
      </div>


      </div>
    </div>
  );

}

export default About;