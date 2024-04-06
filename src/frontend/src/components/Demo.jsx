import React, { useState } from 'react';
import axios from 'axios';

function Demo() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(''); // Clear previous response

    try {
      // Payload for OpenAI request
      const payloadOpenAI = {
        company: 'OpenAI',
        modelName: 'gpt-3.5-turbo',
        messages: [{ role: "system", content: inputText }],
        systemMessage: inputText,
      };

      // Payload for Claude request
      const payloadClaude = {
        company: 'Anthropic',
        modelName: 'claude-3-haiku-20240307',
        messages: [{ role: "system", content: inputText }],
        systemMessage: inputText,
      };

      // Send request to your backend for OpenAI and Claude in parallel
      const [resOpenAI, resClaude] = await Promise.all([
        axios.post('http://localhost:5000/chatWithAI', payloadOpenAI),
        axios.post('http://localhost:5000/chatWithAI', payloadClaude)
      ]);

      // Update the state with both responses
      setResponse(`OpenAI Response: ${JSON.stringify(resOpenAI.data)}\nClaude Response: ${JSON.stringify(resClaude.data)}`);
    } catch (error) {
      console.error('Error sending data to the backend:', error);
      setResponse('Error: Could not get a response. Check the console for more details.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-xl p-8 space-y-4 bg-white rounded shadow-md">
        <div className="text-xl font-bold text-center">Create Prompt</div>
        <div>
          <label htmlFor="promptInput" className="block mb-2 text-sm font-medium text-gray-900">Enter your prompt:</label>
          <input
            type="text"
            id="promptInput"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type something..."
            required
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
          Send
        </button>
      </form>
      {response && (
        <div className="mt-4 w-full max-w-xl p-4 bg-gray-50 rounded-lg border border-gray-300">
          <p className="text-sm text-gray-900">Response:</p>
          <pre className="whitespace-pre-wrap text-sm text-gray-800">{response}</pre>
        </div>
      )}
    </div>
  );
}

export default Demo;
