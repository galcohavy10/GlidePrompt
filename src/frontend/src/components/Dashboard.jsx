import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResponses from './Demo/TestResponses';
import { DemoStatusBar } from './Demo/DemoStatusBar';  // Import the new component
import Lottie from 'react-lottie';
import animationData from '../assets/Animation-loadingBot.json'; // Import your Lottie JSON file
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct
import { FaLock, FaChevronRight, FaHistory } from "react-icons/fa";
//get firebase analytics
import { getAnalytics, logEvent } from "firebase/analytics";
import TestHistory from './TestHistory';
import Logo from '../assets/logo3.png';
import Auth from './Auth';
import AuthButton from './AuthButton';


function Dashboard({testPreset}) {
  const [userTask, setUserTask] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [taskOptions, setTaskOptions] = useState([]);
  const [credits, setCredits] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const auth = getAuth();
  const analytics = getAnalytics();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  //if there's a test preset, we need to render the existing content
  useEffect(() => {
    if (testPreset) {
      setUserTask(testPreset.task);
      setSystemPrompt(testPreset.prompt);
      setCurrentStep(1);
    }
  }, [testPreset]);

  const handleHistoryClick = (test) => {
    setUserTask(test.task);
    setSystemPrompt(test.systemMessage);
    setCurrentStep(1);
    setShowHistory(false);
  };

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

  const toggleHistory = () => {
    setShowHistory(!showHistory);
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
        <div className="w-full max-w-2xl p-10 md:p-16 space-y-4 md:space-y-6 bg-white rounded-lg shadow-xl transition-all">
        <DemoStatusBar currentStep={currentStep} />
          <div className="flex flex-col items-center">
            <Lottie 
              options={defaultOptions} 
              height={200} 
              width={250} 
              className="max-w-full bg-white p-8"
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
    <div className="relative flex flex-col items-center justify-center bg-gradient-to-r from-[#79fcd3] to-[#00df9a] z-0 px-4 py-8">
      <div className="flex w-full items-center justify-between mb-2">
        {/* Responsive logo placement: centered on mobile, left-aligned on larger screens */}
        <div className="flex-grow flex justify-center lg:justify-start">
          <a href="/" className="bg-white rounded-full p-1">
            <img src={Logo} alt="glideprompt Logo" className='w-14 h-14 object-cover cursor-pointer' />
          </a>
        </div>


        {/* Auth button on the right side */}
        <div className="flex-grow flex justify-end space-x-1">
        <button
            onClick={toggleHistory}
            className="text-blue-500 hover:bg-blue-200 p-2 flex items-center space-x-2 flex-col"
            type="button"
          >
            <FaHistory className="w-8 h-8" /> 
            <span className="text-xs">Test History</span>
          </button>
          <AuthButton setShowAuth={setShowAuth} />
        </div>

      </div>




      <form 
        onSubmit={handleTaskSubmit} 
        className="relative w-full max-w-4xl px-8 py-6 md:px-12 md:py-10 space-y-6 bg-white rounded-lg shadow-xl transition-all z-10"
        >

        {/* DemoStatusBar component centered */}
        <DemoStatusBar currentStep={currentStep} />


        <h1 className="text-2xl font-bold text-center text-gray-800">Write a task, get a prompt.</h1>
        <textarea
          value={userTask}
          onChange={(e) => setUserTask(e.target.value)}
          className="w-full p-4 text-lg text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all items-center"
          placeholder="Enter a task..."
          rows={4}
        />
          <div className="mt-8 p-4 bg-slate-200 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">Sample tasks:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {taskOptions.map((task, index) => (
                      <button 
                          key={index} 
                          onClick={() => handleTaskOptionClick(task)}
                          className="flex items-center justify-between text-left p-3 bg-slate-100 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                          <span className="text-sm text-gray-600 truncate">{task}</span>
                          <FaChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400" />
                      </button>
                  ))}
              </div>
          </div>

        <button 
          type="submit" 
          className="w-full py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-700 rounded-lg hover:from-purple-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg transition-all"
        >
          {isLoading ? 'Generating...' : 'Generate Prompt'}
        </button>
  

      </form>

      {/* Add TestHistory component */}
      {showHistory && (
        <div className="absolute top-16 right-4 w-64 bg-white p-4 rounded-lg shadow-xl z-20 max-h-screen overflow-y-auto">
          <TestHistory onHistoryClick={handleHistoryClick} toggleShowHistory={toggleHistory} />
        </div>
      )}

    {showAuth && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <Auth onClose={() => setShowAuth(false)} />
        <button onClick={() => setShowAuth(false)} className="absolute top-2 right-2 text-gray-700">X</button> 
        </div>
      </div>
      )}
    </div>
  );
}

export default Dashboard;
