import React, { useState } from 'react';
import axios from 'axios';
import ChatResponsePreview from './ChatResponsePreview'; // Import the new component

// Import SVGs as React components so they can be used as props
import { ReactComponent as ChatGPTIcon } from '../assets/chatgpt-icon.svg';
import { ReactComponent as ClaudeIcon } from '../assets/claude-icon.svg';
import { ReactComponent as MistralIcon } from '../assets/mistral-icon.svg';


function Demo() {
  const [inputText, setInputText] = useState('');
  const [openAIResponse, setOpenAIResponse] = useState('');
  const [claudeResponse, setClaudeResponse] = useState('');
  const [mistralResponse, setMistralResponse] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous responses
    setOpenAIResponse('');
    setClaudeResponse('');
    setMistralResponse('');

    try {
      // Payload for OpenAI request
      const payloadOpenAI = {
        company: 'OpenAI',
        modelName: 'gpt-3.5-turbo',
        messages: [{ role: "user", content: "hi" }],
        systemMessage: inputText,
      };

      // Payload for Claude request
      const payloadClaude = {
        company: 'Anthropic',
        modelName: 'claude-3-haiku-20240307',
        messages: [{ "role": "user", "content": inputText }],
        systemMessage: inputText,
      };

      const payloadMistral = {
        company: 'Mistral',
        modelName: 'mistral-chat',
        messages: [{ role: "user", content: inputText }],
        systemMessage: inputText,
      };

      // Send request to your backend for OpenAI and Claude in parallel
      const [resOpenAI, resClaude, resMistral] = await Promise.all([
        axios.post('http://localhost:5000/chatWithAI', payloadOpenAI),
        axios.post('http://localhost:5000/chatWithAI', payloadClaude),
        axios.post('http://localhost:5000/chatWithAI', payloadMistral)
      ]);

      // Update state variables for each response
      setOpenAIResponse(resOpenAI.data.response);
      setClaudeResponse(resClaude.data.response.map(message => message.text).join('\n'));
      setMistralResponse(resMistral.data.response);

    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#79fcd3] to-[#00df9a]">
      <form onSubmit={handleSubmit} className="w-full max-w-xl p-10 space-y-8 bg-white rounded-lg shadow-xl transform transition-all hover:scale-105">
      <h1 className="text-2xl font-bold text-center text-gray-800">Test a System Prompt</h1>
        <div>
          <input
            type="text"
            id="promptInput"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="block w-full px-4 py-3 text-md text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 transition-all"
            placeholder="Type something..."
            required
          />
        </div>
        <button type="submit" className="w-full px-4 py-3 text-md font-medium text-white bg-gradient-to-r from-purple-600 to-blue-700 rounded-lg hover:from-purple-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg transition-all">
          Send
        </button>
      </form>
      <div className="flex flex-wrap justify-center mt-8">
{openAIResponse && <ChatResponsePreview title="OpenAI Response" text={openAIResponse} Logo={ChatGPTIcon} />}
{claudeResponse && <ChatResponsePreview title="Claude Response" text={claudeResponse} Logo={ClaudeIcon} />}
{mistralResponse && <ChatResponsePreview title="Mistral Response" text={mistralResponse} Logo={MistralIcon} />}

      </div>
    </div>
  );
  
  
}

export default Demo;
