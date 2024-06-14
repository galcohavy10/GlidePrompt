import React, { useState } from 'react';
import { FaRedo } from 'react-icons/fa'; // Import the icon for the rerun button

// import ExpandedView from './ExpandedChatResponse';

function ChatResponsePreview({ title, text, Logo, updateModelSelection, company, handleRerun }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxCharLength, setMaxCharLength] = useState(100);
  const isDisabled = text === "Ask me anything!";


    // store the possible models for each company
    const possibleModels = {
      OpenAI: [
        'gpt-3.5-turbo',
        'gpt-4',
        'gpt-4-turbo',
        'gpt-4-turbo-2024-04-09',
        'gpt-4-turbo-preview',
        'gpt-4-0125-preview',
        'gpt-4-1106-preview',
        'gpt-4-0613',
        'gpt-4o',
        'gpt-4o-2024-05-13'
      ],
      Anthropic: [
        'claude-3-haiku-20240307',
        'claude-3-opus-20240229',
        'claude-3-sonnet-20240229',
      ],
      Replicate: [
        'meta/llama-2-13b',
        'meta/llama-2-13b-chat',
        'meta/llama-2-70b',
        'meta/llama-2-70b-chat',
        'meta/llama-2-7b',
        'meta/llama-2-7b-chat',
        'meta/meta-llama-3-70b',
        'meta/meta-llama-3-70b-instruct',
        'meta/meta-llama-3-8b',
        'meta/meta-llama-3-8b-instruct',
        'mistralai/mistral-7b-instruct-v0.2',
        'mistralai/mistral-7b-v0.1',
        'mistralai/mixtral-8x7b-instruct-v0.1'
      ],
      Google: [
        'gemini-1.0-pro',
        'gemini-1.5-pro',
        'gemini-1.5-flash',
      ]
    };
  const toggleView = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setMaxCharLength(100);
    } else {
      setMaxCharLength(10000);
    }
  };


  const handleModelChange = (newModel) => {
    updateModelSelection(company, newModel);
  };

  // Truncate text if it exceeds the maximum character length, but add a ... if it's truncated
  const displayText = text.length > maxCharLength ? text.slice(0, maxCharLength) + '...' : text;

  return (
    <div className="flex p-4 my-4 mx-auto max-w-lg bg-veryLightGray rounded-lg border border-gray-200 shadow-md animate-fadeIn">
      {Logo && <Logo className="w-10 h-10 flex-shrink-0 mr-2" />}
      <div className="flex flex-col flex-grow cursor-pointer">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <div className="flex items-center">
            <select
              className="form-select block p-2 border border-gray-300 rounded-md text-sm mr-2" // Added margin-right to the selector
              onChange={e => handleModelChange(e.target.value)}
              defaultValue={possibleModels[company][0]}
            >
              {possibleModels[company].map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
            <button
              onClick={() => handleRerun(company)}
              disabled={isDisabled}
              className={`flex items-center justify-center p-2 h-10 w-10 text-white rounded ${
                isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }`}
            >
              <FaRedo className="text-md" />
            </button>
          </div>
        </div>
        <p className="text-gray-700 mt-2">{displayText}</p>
        {text.length > 100 && (
          <button onClick={toggleView} className="mt-2 text-blue-500 text-sm">
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )}

      </div>
    </div>
  );
  
}

export default ChatResponsePreview;