import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatResponsePreview from './ChatResponsePreview'; 
import { FaCogs, FaCheckSquare, FaRegTrashAlt, FaHistory }from "react-icons/fa";
import { DemoStatusBar } from './DemoStatusBar';
import TestHistory from '../TestHistory';
import AuthButton from '../AuthButton';
import Auth from '../Auth';
import Logo from '../../assets/logo3.png';

import { getAuth } from 'firebase/auth';  // Import getAuth if needed
import { doc, collection, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';  // Firestore methods
import { db } from '../../firebase';  // Import your Firebase config

// Import SVGs as React components
import { ReactComponent as ChatGPTIcon } from '../../assets/chatgpt-icon.svg';
import { ReactComponent as ClaudeIcon } from '../../assets/claude-icon.svg';
import { ReactComponent as ReplicateIcon } from '../../assets/replicate-icon.svg';
import { ReactComponent as GeminiIcon } from '../../assets/gemini-icon.svg';

function TestResponses({ initialPrompt, goToFirstStep, initialTask }) {
  const [inputText, setInputText] = useState('');
  const [systemMessage, setSystemMessage] = useState('');
  const [isEditingSystemMessage, setIsEditingSystemMessage] = useState(true);
  const [openAIResponse, setOpenAIResponse] = useState('Ask me anything!');
  const [claudeResponse, setClaudeResponse] = useState('Ask me anything!');
  const [replicateResponse, setReplicateResponse] = useState('Ask me anything!');
  const [geminiResponse, setGeminiResponse] = useState('Ask me anything!');
  const [credits, setCredits] = useState(3);  
  const auth = getAuth();
  const user = auth.currentUser;
  const [showHistory, setShowHistory] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [showAuth, setShowAuth] = useState(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleHistoryClick = (test) => {
    setSystemMessage(test.systemMessage);
    setInputText(test.inputText);
    setShowHistory(false);
  };

  // Function to show notification
  const triggerNotification = (text) => {
    setNotificationText(text);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 1500); // Notification will hide after 1.5 seconds
  };
  
  const [selectedModels, setSelectedModels] = useState({
    OpenAI: 'gpt-3.5-turbo',
    Anthropic: 'claude-3-haiku-20240307',
    Replicate: 'meta/llama-2-13b',
    Google: 'gemini-1.0-pro'
  });

  const updateModelSelection = (company, model) => {
    setSelectedModels(prev => ({
      ...prev,
      [company]: model
    }));
  };

   // Adjust the currentStep based on the systemMessage and isEditingSystemMessage states
  const currentStep = isEditingSystemMessage ? 2 : (systemMessage ? 3 : 1);


  useEffect(() => {
    if (initialPrompt) {
      //set system message but display it with no quotes
      setSystemMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (user) {
      // Fetch user credits from Firestore when the component mounts if the user is signed in
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then(docSnap => {
        if (docSnap.exists()) {
          setCredits(docSnap.data().creditsRemaining);
        }
      });
    } else {
      const storedCredits = localStorage.getItem('guestUserCredits');
      if (storedCredits) {
        setCredits(storedCredits);
      }
    }
  }, [user]);

  const deductCredit = () => {
    let newCredits = credits - 1;
    setCredits(newCredits);

    if (user) {
      const userRef = doc(db, "users", user.uid);
      updateDoc(userRef, {
        creditsRemaining: newCredits
      });
    } else {
      localStorage.setItem('guestUserCredits', newCredits)
    }

    // Trigger notification
    triggerNotification(`You have ${newCredits} credits remaining.`);
  };

  const handleSaveSystemMessage = (e) => {
    e.preventDefault();
    setIsEditingSystemMessage(false);
    setInputText(''); // Clear the input text
  };

  const handleEditSystemMessage = () => {
    setIsEditingSystemMessage(true);
    //clear responses
    setClaudeResponse('Ask me anything!');
    setReplicateResponse('Ask me anything!');
    setGeminiResponse('Ask me anything!');
    setOpenAIResponse('Ask me anything!');
  };

    // Function to navigate back to the task editing state in Demo
    const handleEditUserTask = () => {
      setIsEditingSystemMessage(false);  // Exit the system message editing state
      setSystemMessage('');  // Clear the system message
      goToFirstStep();  // Assuming goToFirstStep resets the necessary state
    };

  const handleSubmit = async (e) => {



    setClaudeResponse('Loading...');
    setReplicateResponse('Loading...');
    setGeminiResponse('Loading...');
    setOpenAIResponse('Loading...');
    e.preventDefault();
    const messages = [{ role: "user", content: inputText }];
    const payloads = [
      { company: 'OpenAI', modelName: selectedModels.OpenAI, messages: messages, systemMessage: systemMessage },
      { company: 'Anthropic', modelName: selectedModels.Anthropic, messages: messages, systemMessage: systemMessage },
      { company: 'Replicate', modelName: selectedModels.Replicate, messages: messages, systemMessage: systemMessage },
      { company: 'Google', modelName: selectedModels.Google, messages: messages, systemMessage: systemMessage }
    ];
    if (credits > 0) {
      console.log('Deducting credit');
      deductCredit();
    } else {
      triggerNotification('You have no credits remaining. Please upgrade your plan.');
      return;
    }

    // Correct way to generate a new document ID
    console.log('Generating new document ID for prompt test...');
    const promptTestRef = doc(collection(db, "PromptTests"));
    //if user's logged in tell him the test is saved
    if (user) {
      triggerNotification('Prompt test saved successfully.');
    }

    const promptTest = {
      inputText: inputText,
      systemMessage: systemMessage,
      task: initialTask,
      timestamp: new Date().toISOString(),
      modelsSelected: selectedModels,
      user: user ? user.uid : 'guestUser'
    };

    try {
    // Save the new prompt test using the correct reference
    await setDoc(promptTestRef, promptTest);

    // Update the user's document to include the new prompt test ID if there's a user
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        promptTests: arrayUnion(promptTestRef.id)
      });
    }
    
    } catch (error) {
      console.error('Error saving prompt test:', error);
    }


    

    payloads.forEach(payload => {
      axios.post('/chatWithAI', payload)
        .then(res => {
          const response = res.data.response;
          switch(payload.company) {
            case 'OpenAI':
              setOpenAIResponse(response);
              break;
            case 'Anthropic':
              setClaudeResponse(response.map(message => message.text).join('\n'));
              break;
            case 'Replicate':
              setReplicateResponse(response);
              break;
            case 'Google':
              setGeminiResponse(response);
              break;
            default:
              console.error(`Error: Unsupported company ${payload.company}`);
          }
        })
        .catch(error => {
          const errorMessage = `Error with ${payload.company}: ${error.message}`;
          switch(payload.company) {
            case 'OpenAI':
              setOpenAIResponse(errorMessage);
              break;
            case 'Anthropic':
              setClaudeResponse(errorMessage);
              break;
            case 'Replicate':
              setReplicateResponse(errorMessage);
              break;
            case 'Google':
              setGeminiResponse(errorMessage);
              break;
            default:
              console.error(`Error: Unsupported company ${payload.company}`);
          }
        });
    });
  };

  const handleRerun = async (company) => {
  
    try {

        //set company response to loading
        switch (company) {
          case 'OpenAI':
            setOpenAIResponse('Loading...');
            break;
          case 'Anthropic':
            setClaudeResponse('Loading...');
            break;
          case 'Replicate':
            setReplicateResponse('Loading...');
            break;
          case 'Google':
            setGeminiResponse('Loading...');
            break;
          default:
            console.error(`Error: Unsupported company ${company}`);
        }
        const payload = {
          company: company,
          modelName: selectedModels[company],
          messages: [{ role: "user", content: inputText }],
          systemMessage: systemMessage
        };

      const response = await axios.post('/chatWithAI', payload);
      const resText = response.data.response;

      //deduct a credit
      if (credits > 0) {
        console.log('Deducting credit');
        deductCredit();
      } else {
        triggerNotification('You have no credits remaining. Please upgrade your plan.');
        return;
      }

      switch (company) {
        case 'OpenAI':
          setOpenAIResponse(resText);
          break;
        case 'Anthropic':
          setClaudeResponse(resText.map(message => message.text).join('\n'));
          break;
        case 'Replicate':
          setReplicateResponse(resText);
          break;
        case 'Google':
          setGeminiResponse(resText);
          break;
        default:
          console.error(`Error: Unsupported company ${company}`);
      }
    } catch (error) {
      console.error(`Error with ${company}: ${error.message}`);
    }
  };
  

return (
  <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-[#79fcd3] to-[#00df9a] p-4">
    {showNotification && (
      <div className={`fixed top-5 right-5 p-4 bg-blue-500 text-white rounded shadow-lg transition-opacity duration-500 ease-in-out ${showNotification ? 'opacity-100' : 'opacity-0'}`}>
        {notificationText}
      </div>
    )}
            <div className="flex w-full items-center justify-between m-5">
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

    {isEditingSystemMessage ? (
      <>



        <form onSubmit={handleSaveSystemMessage} className="relative w-full max-w-4xl px-8 py-6 md:px-12 md:py-10 space-y-6 bg-white rounded-lg shadow-xl transition-all z-10">
        <DemoStatusBar currentStep={currentStep} />

          
        <div onClick={handleEditUserTask} className="cursor-pointer flex items-center justify-between p-3 text-sm text-gray-800 bg-slate-200 rounded-full border border-gray-300 shadow-sm mb-4 hover:bg-gray-400 transition-all duration-200 ease-in-out mx-auto max-w-2xl">
          <div className="flex items-center gap-2">
            <FaCheckSquare className="text-gray-500" />
            <span><strong>Task:</strong> {initialTask.slice(0, 50) + (initialTask.length > 50 ? '...' : '')}</span>
          </div>
          <span className="text-purple-500 text-xs italic ml-2 whitespace-nowrap">tap to edit</span>
        </div>
          <h1 className="text-xl font-bold text-center text-gray-800">Editing System Prompt <FaCogs className="inline-block text-gray-500 ml-2" /></h1>
          <textarea
            value={systemMessage}
            onChange={(e) => setSystemMessage(e.target.value)}
            className="block w-full px-4 py-3 text-base text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 transition-all"
            placeholder="Type your system prompt..."
            required
            rows={10}
          />
          <button type="submit" className="w-full px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-700 rounded-lg hover:from-purple-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg transition-all">
            Save
          </button>


        </form>
      </>
    ) : (
      <>
      {/** Show the system message and allow the user to see tests in one div */}
      <div className="w-full max-w-2xl p-6 md:p-10 space-y-4 bg-white rounded-lg shadow-xl flex flex-col">
      <div onClick={handleEditSystemMessage} className="cursor-pointer flex items-center justify-between p-3 text-sm text-gray-800 bg-white rounded-full border border-gray-300 shadow-sm mb-4 hover:bg-gray-100 transition-all duration-200 ease-in-out w-full max-w-2xl">
          <div className="flex items-center gap-2">
            <FaCogs className="text-gray-500" />
            <span><strong>System Prompt:</strong> {systemMessage.slice(0, 50) + (systemMessage.length > 50 ? '...' : '')}</span>
          </div>
          <span className="text-purple-500 text-xs italic ml-2 whitespace-nowrap">tap to edit</span>
        </div>

        <div className="w-full max-w-2xl flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4 flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex-grow p-6 space-y-4 bg-slate-200 rounded-lg shadow-xl flex flex-col">
              <h1 className="text-xl font-bold text-center text-gray-800">Write a message to start testing</h1>
              <div className="text-sm text-center text-gray-700 flex flex-wrap justify-center items-center gap-2">
                <span>See which model performs best.</span>
                <div className="flex gap-2">
                  <ChatGPTIcon style={{ width: '24px', height: '24px' }} />
                  <ClaudeIcon style={{ width: '24px', height: '24px' }} />
                  <ReplicateIcon style={{ width: '24px', height: '24px' }} />
                  <GeminiIcon style={{ width: '24px', height: '24px' }} />
                </div>
              </div>

              <textarea
                id="userInput"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-grow block w-full px-4 py-3 text-base text-gray-700 bg-white rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="Send a message..."
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-700 rounded-lg hover:from-purple-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg transition-all">
                  Send
                </button>
                <button
                  type="button"
                  onClick={() => inputText && setInputText('')}
                  className={`inline-flex items-center p-2 rounded-lg focus:outline-none focus:ring-2 transition text-white ${
                    inputText ? "bg-gray-400 hover:bg-gray-700 focus:ring-gray-500" : "bg-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!inputText}
                >
                  <FaRegTrashAlt className="text-lg" />
                  <span className="ml-1 text-sm">Clear</span>
                </button>
              </div>
            </form>
          </div>

          <div className="w-full md:w-2/4 flex flex-col gap-4">
            {/* <div className="bg-gray-100 p-3 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900">API Responses</h2>
              <p className="text-xs text-gray-600">Scroll to see all. Select model, see pricing and redo to test again.</p>
            </div> */}
            <div className="flex-grow overflow-y-auto" style={{ maxHeight: 'calc(70vh - 4rem)' }}>
              {openAIResponse && <ChatResponsePreview title="OpenAI" text={openAIResponse} Logo={ChatGPTIcon} updateModelSelection={updateModelSelection} company={'OpenAI'} handleRerun={handleRerun}/>}
              {claudeResponse && <ChatResponsePreview title="Claude" text={claudeResponse} Logo={ClaudeIcon} updateModelSelection={updateModelSelection} company={'Anthropic'} handleRerun={handleRerun}/>}
              {replicateResponse && <ChatResponsePreview title="Open Source" text={replicateResponse} Logo={ReplicateIcon} updateModelSelection={updateModelSelection} company={'Replicate'} handleRerun={handleRerun}/>}
              {geminiResponse && <ChatResponsePreview title="Gemini" text={geminiResponse} Logo={GeminiIcon} updateModelSelection={updateModelSelection} company={'Google'} handleRerun={handleRerun}/>}
            </div>
          </div>
        </div>
      </div>


      </>
    )}
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

export default TestResponses;
