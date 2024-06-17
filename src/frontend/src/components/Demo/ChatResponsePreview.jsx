import React, { useState } from 'react';
import { FaRedo } from 'react-icons/fa';
import { FaDollarSign } from "react-icons/fa";


// import ExpandedView from './ExpandedChatResponse';

function ChatResponsePreview({ title, text, Logo, updateModelSelection, company, handleRerun }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxCharLength, setMaxCharLength] = useState(100);
  const [tooltipVisible, setTooltipVisible] = useState(false); // State to manage tooltip visibility


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

  const [selectedModel, setSelectedModel] = useState(possibleModels[company][0]); // Default to the first model
  const isDisabled = text === "Ask me anything!";




    // store the cost per million tokens for each model
    const costPerMillionTokenInAmericanDollars = {
      OpenAI: {
        'gpt-3.5-turbo': [0.5, 1.5],
        'gpt-4': [30, 60],
        'gpt-4-turbo': [10, 30],
        'gpt-4-turbo-2024-04-09': [10, 30],
        'gpt-4-turbo-preview': [10, 30],
        'gpt-4-0125-preview': [10, 30],
        'gpt-4-1106-preview': [10, 30],
        'gpt-4-0613': [30, 60],
        'gpt-4o': [5, 15],
        'gpt-4o-2024-05-13': [5, 15]
      },
      Anthropic: {
        'claude-3-haiku-20240307': [0.25, 1.25],
        'claude-3-opus-20240229': [15, 75],
        'claude-3-sonnet-20240229': [3, 15]
      },
      Replicate: {
        'meta/llama-2-13b': [0.1, 0.5],
        'meta/llama-2-13b-chat': [0.1, 0.5],
        'meta/llama-2-70b': [0.65, 2.75],
        'meta/llama-2-70b-chat': [0.65, 2.75],
        'meta/llama-2-7b': [0.05, 0.25],
        'meta/llama-2-7b-chat': [0.05, 0.25],
        'meta/meta-llama-3-70b': [0.65, 2.75],
        'meta/meta-llama-3-70b-instruct': [0.65, 2.75],
        'meta/meta-llama-3-8b': [0.05, 0.25],
        'meta/meta-llama-3-8b-instruct': [0.05, 0.25],
        'mistralai/mistral-7b-instruct-v0.2': [0.05, 0.25],
        'mistralai/mistral-7b-v0.1': [0.05, 0.25],
        'mistralai/mixtral-8x7b-instruct-v0.1': [0.3, 1.0]
      },
      Google: {
        'gemini-1.0-pro': [0.5, 1.5],
        'gemini-1.5-pro': [3.5, 10.5],
        'gemini-1.5-flash': [0.35, 1.05]
      }
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
    setSelectedModel(newModel); 
  };

  const modelCost = costPerMillionTokenInAmericanDollars[company][selectedModel] || [0, 0]; // Fallback to [0, 0] if no cost is found

  // Truncate text if it exceeds the maximum character length, but add a ... if it's truncated
  const displayText = text.length > maxCharLength ? text.slice(0, maxCharLength) + '...' : text;

  return (
    <div className="flex p-4 my-4 mx-auto max-w-lg bg-veryLightGray rounded-lg border border-gray-200 shadow-md animate-fadeIn relative">
      {Logo && <Logo className="w-10 h-10 flex-shrink-0 mr-2" />}
      <div className="flex flex-col flex-grow cursor-pointer">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <div className="flex items-center">
            <select
              className="form-select block p-2 border border-gray-300 rounded-md text-sm mr-2"
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
        <p className="text-gray-700 mt-2 mb-2.5">{displayText}</p>
        {text.length > 100 && (
          <button onClick={toggleView} className="mt-1 text-blue-500 text-sm mb-4">
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
      <div 
        className="absolute bottom-1 right-1 text-gray-500 text-xs flex items-center"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        style={{ paddingBottom: '8px' }} // Adds padding at the bottom
      >
        <FaDollarSign className="mr-1" />
        <span>
          {`${modelCost[0].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} | ${modelCost[1].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} per million tokens`}
        </span>
        {tooltipVisible && (
          <div className="absolute bottom-full mb-2 p-2 bg-black text-white text-xs rounded">
            Pricing for 1M tokens - formatted INPUT | OUTPUT as of June 14th, 2024.
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatResponsePreview;