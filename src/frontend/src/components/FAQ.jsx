import React, { useState } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowRight } from 'react-icons/ai';

const FAQ = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
  
    const questionsAnswers = [
      { question: "Is it safe to put company data here?", answer: "Our model runs REMOTELY so your files are not uploaded to any servers unless collaborating between teammates. OpanAI's API does NOT train it's language models on your data, but they do store data for limited periods to prevent misue of their API. Refer to the OpenAI official API policy to learn more." },
      { question: "Will you auto-charge me for the monthly plan after the beta?" , answer: "No, we will not charge you unless you explicitly choose to opt in after experiencing the beta." },
      { question: "Can I start using NexaFlow?", answer: "The underlying technology has been demonstrated internally but we're working through making the product cohesive and safe for companies. We project the beta will be available in December, due to higher demand those who reserve a spot are guaranteed better prices and quicker access to the launch." },
      { question: "How does NexaFlow work?", answer: "NexaFlow uses a proprietary semantic compression algorithm to `stuff` existing models with more data. We also give you deep access to speed, context, and personality of your model to suit personal needs." },
      { question: "Can I negotiate prices for large enterprise?", answer: "Click the `Contact` tab to email or text the CEO directly and get a quote, we respond quickly." },
      { question: "Do you train your models on my questions and usage?", answer: "No." },
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
                {index === selectedQuestion && <p className='text-gray-500 mt-2 p-2'>{qa.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      );
};

export default FAQ;
