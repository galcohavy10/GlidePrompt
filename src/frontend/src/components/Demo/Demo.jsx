import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResponses from './TestResponses';
import { DemoStatusBar } from './DemoStatusBar';  // Import the new component
import Lottie from 'react-lottie';
import animationData from '../../assets/Animation-loadingBot.json'; // Import your Lottie JSON file

function Demo() {
  const [userTask, setUserTask] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [taskOptions, setTaskOptions] = useState([]);

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {

    const allTasks = [
        "Create packing lists for of trips",
        "Write persuasive essays on various topics",
        "Create weekly meal plans for users",
        "Draft emails for professional scenarios",
        "Compose stories tailored to 5 year olds.",
        "Explain complex concepts in simple terms",
        "Plan itineraries for various travel destinations",
        "Develop business ideas from scratch",
        "Create detailed marketing strategies",
        "Generate educational content in a fun way",
      ];
      
    setTaskOptions(shuffleArray(allTasks).slice(0, 3));
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleTaskOptionClick = (task) => {
    setUserTask(task);
    setCurrentStep(1); // Move to the next step

  };

  const getSystemPrompt = async (task) => {
    setIsLoading(true);
    const message = {
      role: "user",
      content: `The user has inputted this task: [[  ${task} ]]. Your job is to make an ai chatbot to generate a response to this task, so you need to give extremely good instructions. 
      Start your response with " YOU ARE A ___ AI. " and then give the ai instructions on how to generate a response to the task. 
      Example: 
      input: Write a poem about the sea.

      output: YOU ARE A POETRY AI. Write poems about the sea using the user's input. Be vivid and descriptive, and use metaphors and similes to create a beautiful image of the sea in the reader's mind.

      Remember to be specific and detailed in your instructions.
      REMEMBER YOU ARE INSTRUCTING A language model, a computer program that generates human-like text and doesn't have real-time access to anything beyond its training data.
      BE EXTREMELY WELL-FORMATTED AND CONCISE IN YOUR INSTRUCTIONS.
      `
    };
    const payload = {
      company: 'OpenAI',
      modelName: 'gpt-3.5-turbo',
      messages: [message],
      systemMessage: "Generate system-level prompts for language models"
    };

    try {
      const res = await axios.post('/chatWithAI', payload);
      const response = res.data.response;
      setSystemPrompt(response); // Handle the response appropriately
    } catch (error) {
      console.error(`Error with OpenAI API call: ${error.message}`);
      setSystemPrompt(`Failed to generate system prompt: ${error.message}`);
    }
    setIsLoading(false);
  };

  const handleTaskSubmit = async (event) => {
    event.preventDefault();
    await getSystemPrompt(userTask);
  };


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#79fcd3] to-[#00df9a]">
       <DemoStatusBar currentStep={currentStep} />
        <div className="w-full max-w-2xl p-10 space-y-6 bg-white rounded-lg shadow-xl transform transition-all hover:scale-105">
          <div className="flex flex-col items-center">
            <Lottie options={defaultOptions} height={250} width={300} />
            <h2 className="text-xl font-italic text-black mt-4 text-center px-2">Crafting a system prompt for task: {userTask}</h2>
          </div>
        </div>
      </div>
    );
  }
  
  
  

  if (systemPrompt) {
    return <TestResponses initialPrompt={systemPrompt} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#79fcd3] to-[#00df9a]">
          <div className="text-center mt-8 mb-10">
          <h2 className="text-xl font-semibold text-gray-800">Don't just take our word for it —</h2>
          <h1 className="text-3xl font-bold text-gray-800">Give it a try, for free!</h1>
        </div>
      <DemoStatusBar currentStep={currentStep} />
      <form onSubmit={handleTaskSubmit} className="w-full max-w-2xl p-10 space-y-6 bg-white rounded-lg shadow-xl transform transition-all hover:scale-105">
        <h1 className="text-2xl font-bold text-center text-gray-800">What do you want your AI to do?</h1>
        <div>
          <textarea
            id="taskInput"
            value={userTask}
            onChange={(e) => setUserTask(e.target.value)}
            className="block w-full px-5 py-4 text-lg text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 transition-all overflow-auto"
            placeholder="Enter a task..."
            required
            rows={Math.min(6, Math.max(1, userTask.split('\n').length))}
            style={{ resize: 'none', lineHeight: '24px' }}
            wrap="soft"
          />
        </div>
        <button type="submit" className="w-full px-5 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-700 rounded-lg hover:from-purple-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg transition-all" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Prompt'}
        </button>
        <div className="flex justify-around w-full mt-4">
          {taskOptions.map((task, index) => (
            <button key={index} onClick={() => handleTaskOptionClick(task)} className="bg-white text-gray-800 font-medium py-2 px-4 border border-gray-300 rounded shadow hover:bg-gray-100">
              {task}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Demo;
