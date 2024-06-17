import React, { useState } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowRight } from 'react-icons/ai';

const FAQ = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
  
    const questionsAnswers = [
      { question: "Can I use API keys?", answer: "Not for testing, but we will roll out the deployments feature with API keys so you don't need to use external APIs." },
      { question: "How much does it cost?", answer: "10 bucks a month for 100 credits, 25 a month per user for teams plan." },
      { question: "Is it safe to put company data here?", answer: "TLDR: up to you. The interace all runs through the API (programming interface) of these larger language models. Teams users will have all their data encrypted with us soon, so we're not your concern here. And when we do analytics research on our free or pro users, we don't tie it to users. We just try to improve the product. But if you don't trust the actual API from these big companies like Google, or OpenAI then maybe it's not private enough for you. To be honest, I don't believe most of these companies don't really benefit from training on your API data, as it's extremely risky for their brand and it also is hard to organize such a variety of use cases." },
      // { question: "Will you increase the prices?" , answer: "I will grandfather you in at the same price when we raise them." },
      { question: "Can I start using glideprompt?", answer: "Yes. Sign in with the same email you used to pay and you should be able to start using the tool at glideprompt.com" },
      { question: "How does glideprompt work?", answer: "glideprompt uses a host of different concurrent tasks and manages the analytics live to provide you with a faster testing process. If there's any feature request you have or suggestions on how to build something, just text me." },
      { question: "Can I talk prices for large enterprise?", answer: "Click the `Contact` tab to email or text the CEO directly and get a quote, we respond quickly." },
      { question: "Do you train internal models on my questions and usage?", answer: "No. I look at the messages people use on the free version to see how I can improve the product, I always do my best to never steal prompts, jokes or ideas from other people in my life." },
    ];
  
    return (
        <div className='text-white px-4 py-5'>
          <div className='max-w-[1240px] w-full mx-auto text-left flex flex-col justify-center'>
            <p className='text-[#00df9a] font-bold p-2 text-center md:text-left'>
              Frequently Asked Questions
            </p>
      
            {questionsAnswers.map((qa, index) => (
              <div key={index} className='my-4'>
                <div 
                  className='flex justify-between items-center cursor-pointer'
                  onClick={() => setSelectedQuestion(index === selectedQuestion ? null : index)}
                >
                  <h2 className='md:text-xl sm:text-lg font-bold p-2'>
                    {qa.question}
                  </h2>
                  {index === selectedQuestion ? 
                    <AiOutlineArrowDown className='text-[#00df9a]' /> : 
                    <AiOutlineArrowRight className='text-[#00df9a]' />
                  }
                </div>
                {index === selectedQuestion && <p className='text-gray-200 mt-2 p-2'>{qa.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      );
};

export default FAQ;
