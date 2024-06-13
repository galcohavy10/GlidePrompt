import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatResponsePreview from './ChatResponsePreview'; 
import { FaCogs, FaCheckSquare } from "react-icons/fa";
import { DemoStatusBar } from './DemoStatusBar';


// Import SVGs as React components
import { ReactComponent as ChatGPTIcon } from '../../assets/chatgpt-icon.svg';
import { ReactComponent as ClaudeIcon } from '../../assets/claude-icon.svg';
import { ReactComponent as ReplicateIcon } from '../../assets/replicate-icon.svg';
import { ReactComponent as GeminiIcon } from '../../assets/gemini-icon.svg';

function TestResponses({ initialPrompt, goToFirstStep, initialTask }) {
  const [inputText, setInputText] = useState('');
  const [systemMessage, setSystemMessage] = useState('');
  const [isEditingSystemMessage, setIsEditingSystemMessage] = useState(true);
  const [openAIResponse, setOpenAIResponse] = useState('');
  const [claudeResponse, setClaudeResponse] = useState('');
  const [replicateResponse, setReplicateResponse] = useState('');
  const [geminiResponse, setGeminiResponse] = useState('');

   // Adjust the currentStep based on the systemMessage and isEditingSystemMessage states
  const currentStep = isEditingSystemMessage ? 2 : (systemMessage ? 3 : 1);


  useEffect(() => {
    if (initialPrompt) {
      //set system message but display it with no quotes
      setSystemMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSaveSystemMessage = (e) => {
    e.preventDefault();
    setIsEditingSystemMessage(false);
    setInputText(''); // Clear the input text
  };

  const handleEditSystemMessage = () => {
    setIsEditingSystemMessage(true);
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
      { company: 'OpenAI', modelName: 'gpt-3.5-turbo', messages: messages, systemMessage: systemMessage },
      { company: 'Anthropic', modelName: 'claude-3-haiku-20240307', messages: messages, systemMessage: systemMessage },
      { company: 'Replicate', modelName: 'meta/meta-llama-3-70b-instruct', messages: messages, systemMessage: systemMessage },
      { company: 'Google', modelName: 'gemini-pro', messages: messages, systemMessage: systemMessage }
    ];

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
    setInputText(''); // Clear the input after sending
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#79fcd3] to-[#00df9a]">
      <DemoStatusBar currentStep={currentStep}/>

      {isEditingSystemMessage ? (
        <>
          {/* Tap to Edit Task Button */}
          <div onClick={handleEditUserTask} className="cursor-pointer flex items-center justify-between p-3 text-sm text-gray-800 bg-white rounded-full border border-gray-300 shadow-sm mb-4 hover:bg-gray-100 transition-all duration-200 ease-in-out">
            <div className="flex items-center gap-2">
              <FaCheckSquare className="text-gray-500" />
              <span><strong>Task:</strong> {initialTask.slice(0, 50) + (initialTask.length > 50 ? '...' : '')}</span>
            </div>
            <span className="text-purple-500 text-xs italic ml-2">tap to edit</span>
          </div>

        <form onSubmit={handleSaveSystemMessage} className="w-full max-w-2xl p-10 space-y-8 bg-white rounded-lg shadow-xl transform transition-all hover:scale-105">
          { /* Add settings cogs icon next to header */}
          <h1 className="text-2xl font-bold text-center text-gray-800">Editing System Prompt  <FaCogs className="inline-block text-gray-500" /></h1> 
          <textarea
            value={systemMessage}
            onChange={(e) => setSystemMessage(e.target.value)}
            className="block w-full px-5 py-4 text-lg text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 transition-all overflow-auto"
            placeholder="Type your system prompt..."
            required
            rows={7}
            wrap='soft'
          />
          <button type="submit" className="w-full px-5 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-700 rounded-lg hover:from-purple-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg transition-all">
            Save
          </button>
        </form>
        </>
      ) : (
        <>

          <div onClick={handleEditSystemMessage} className="cursor-pointer flex items-center justify-between p-3 text-sm text-gray-800 bg-white rounded-full border border-gray-300 shadow-sm mb-4 hover:bg-gray-100 transition-all duration-200 ease-in-out">
            <div className="flex items-center gap-2">  {/* Added gap for consistent spacing */}
              <FaCogs className="text-gray-500" />
              <span><strong>System Prompt:</strong> {systemMessage.slice(0, 50) + (systemMessage.length > 50 ? '...' : '')}</span>
            </div>
            <span className="text-purple-500 text-xs italic ml-2">tap to edit</span>  {/* Adjusted margin for better spacing */}
          </div>


          <form onSubmit={handleSubmit} className="w-full max-w-2xl p-10 space-y-8 bg-white rounded-lg shadow-xl transform transition-all hover:scale-105">
            <h1 className="text-2xl font-bold text-center text-gray-800">Test Out Your AI!
            </h1>
            {/* Subheading saying see which companies perform best for you, no vertical padding small */}
            <div className="text-lg text-center text-gray-700 flex justify-center items-center gap-4">
              See which companies perform best for you!
              <ChatGPTIcon style={{ width: '30px', height: '30px' }} />
              <ClaudeIcon style={{ width: '30px', height: '30px' }} />
              <ReplicateIcon style={{ width: '30px', height: '30px' }} />
              <GeminiIcon style={{ width: '30px', height: '30px' }} />
            </div>

            <textarea
              id="userInput"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="block w-full px-5 py-4 text-lg text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 transition-all overflow-auto"
              placeholder="Send your first message..."
              required
              rows={7}
              wrap='soft'
            />
            <button type="submit" className="w-full px-5 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-700 rounded-lg hover:from-purple-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg transition-all">
              Send
            </button>

          </form>
        </>
      )}

      <div className="flex flex-wrap justify-center mt-8">
        {openAIResponse && <ChatResponsePreview title="OpenAI Response" text={openAIResponse} Logo={ChatGPTIcon} />}
        {claudeResponse && <ChatResponsePreview title="Claude Response" text={claudeResponse} Logo={ClaudeIcon} />}
        {replicateResponse && <ChatResponsePreview title="Replicate: Llama-3 Response" text={replicateResponse} Logo={ReplicateIcon} />}
        {geminiResponse && <ChatResponsePreview title="Gemini Response" text={geminiResponse} Logo={GeminiIcon} />}
      </div>
    </div>
  );
}

export default TestResponses;
