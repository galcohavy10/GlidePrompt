import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResponses from './TestResponses';
import { DemoStatusBar } from './DemoStatusBar';  // Import the new component
import Lottie from 'react-lottie';
import animationData from '../../assets/Animation-loadingBot.json'; // Import your Lottie JSON file
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Ensure this path is correct
import { FaLock, FaChevronRight } from "react-icons/fa";
//get firebase analytics
import { getAnalytics, logEvent } from "firebase/analytics";

function Demo() {
  const [userTask, setUserTask] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [taskOptions, setTaskOptions] = useState([]);
  const [credits, setCredits] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const auth = getAuth();
  const analytics = getAnalytics();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const allTasks = [
      "Create packing lists for trips",
      "Write persuasive essays on various topics",
      "Create weekly meal plans for users",
      "Draft emails for professional scenarios",
      "Compose stories tailored to 5-year-olds",
      "Explain complex concepts in simple terms",
      "Plan itineraries for various travel destinations",
      "Develop business ideas from scratch",
      "Create detailed marketing strategies",
      "Generate educational content in a fun way",
      "Identify NSFW content in text",
      "Draft emails to construction workers about site updates",
      "Write cold emails to stock brokers to introduce new tools",
      "Reply to angry customers in a call center scenario",
      "Identify and filter out spam emails effectively",
      "Take orders for food delivery using chat",
      "Automate responses to frequently asked questions",
      "Create summaries of financial reports for quick review",
      "Generate promotional content for social media campaigns",
      "Develop training materials for AI ethics and compliance"
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

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then(docSnap => {
        if (docSnap.exists()) {
          setCredits(docSnap.data().creditsRemaining);
        }
      });
    } else {
      const storedCredits = localStorage.getItem('guestUserCredits');
      if (storedCredits) {
        setCredits(Number(storedCredits));
      } else {
        setCredits(3);
      }
    }
  }, [user]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function goToFirstStep() {
    setSystemPrompt('');
    setCurrentStep(0);

  }

  const handleTaskOptionClick = (task) => {
    setUserTask(task);
    setCurrentStep(1); // Move to the next step
  };

  const getSystemPrompt = async (task) => {
    // Log the event to Firebase Analytics
    try {
      console.log('Logging event to Firebase Analytics + ' + task);
      await logEvent(analytics, 'task_option_selected', {
        task: userTask,
      });
    } catch (error) {
      console.error('Error logging event to Firebase Analytics:', error);
    }
    setIsLoading(true);
    const message = {
      role: "user",
      content: `The user has inputted this task: [[  ${task} ]]. Your job is to make an ai chatbot to generate a response to this task, so you need to give extremely good instructions. 
      Start your response with " YOU ARE A ___ AI. " and then give the ai instructions on how to generate a response to the task. 
      You may also use variables if users are likely to provide inputs for this task. Wrap all variables with two brackets like so: {{variableName}}.
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
    setCurrentStep(1); // Move to the next step
    // Log the event to Firebase Analytics
    try {
      console.log('Logging event to Firebase Analytics + ' + userTask);
      await logEvent(analytics, 'task_option_selected', {
        task: userTask,
      });
    } catch (error) {
      console.error('Error logging event to Firebase Analytics:', error);
    }
    await getSystemPrompt(userTask);
  };


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#79fcd3] to-[#00df9a] px-4 py-8">
        <DemoStatusBar currentStep={currentStep} />
        <div className="w-full max-w-2xl p-6 md:p-10 space-y-4 md:space-y-6 bg-white rounded-lg shadow-xl transition-all">
          <div className="flex flex-col items-center">
            <Lottie 
              options={defaultOptions} 
              height={200} 
              width={250} 
              className="max-w-full"
            />
            <h2 className="text-lg md:text-xl font-italic text-gray-800 mt-4 text-center">
              Crafting a system prompt for task:
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-2 text-center break-words max-w-full">
              {userTask}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (credits === 0 && !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#79fcd3] to-[#00df9a]">
        <FaLock className="text-6xl text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">You have no remaining credits.</h2>
        <p className="text-lg text-gray-700 mb-8">Scroll up and sign in to continue.</p>
      </div>
    );
  }
  
  
  

  if (systemPrompt) {
    return <TestResponses initialPrompt={systemPrompt} goToFirstStep={goToFirstStep} initialTask={userTask}/>;
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#79fcd3] to-[#00df9a] z-0 px-4 py-8">
        <div className="text-center mt-8 mb-10">
          <h2 className="text-xl font-semibold text-gray-800">No more switching tabs—</h2>
          <h1 className="text-3xl font-bold text-gray-800">Prompt the models in 1 place</h1>
        </div>
      <form 
        onSubmit={handleTaskSubmit} 
        className="relative w-full max-w-2xl p-6 md:p-10 space-y-6 bg-white rounded-lg shadow-xl transition-all z-10"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">What do you want your AI to do?</h1>
        <textarea
          value={userTask}
          onChange={(e) => setUserTask(e.target.value)}
          className="w-full p-4 text-lg text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
          placeholder="Enter a task..."
          rows={4}
        />
        <button 
          type="submit" 
          className="w-full py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-700 rounded-lg hover:from-purple-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg transition-all"
        >
          {isLoading ? 'Generating...' : 'Generate Prompt'}
        </button>
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-2">Sample tasks:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {taskOptions.map((task, index) => (
              <button 
                key={index} 
                onClick={() => handleTaskOptionClick(task)} 
                className="flex items-center justify-between text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <span className="text-sm text-gray-600 truncate">{task}</span>
                <FaChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );


}

export default Demo;