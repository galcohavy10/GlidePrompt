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

      // Send request to your backend for OpenAI and Claude in parallel
      const [resOpenAI, resClaude] = await Promise.all([
        axios.post('http://localhost:5000/chatWithAI', payloadOpenAI),
        axios.post('http://localhost:5000/chatWithAI', payloadClaude)
      ]);

      // Assuming resOpenAI.data contains the message string directly
      const openAIResponse = resOpenAI.data.response;

      // Assuming resClaude.data.response is an array of message objects
      const claudeResponse = resClaude.data.response
        .filter(message => message.type === 'text') // Filter out only text responses, if needed
        .map(message => message.text) // Extract the text from each message object
        .join('\n'); // Join all messages with a newline, or choose another separator as needed

      setResponse(`ChatGPT Response: ${openAIResponse}\nClaude Response: ${claudeResponse}`);

    } catch (error) {
      console.error('Error sending data to the backend:', error);
      setResponse('Error: Could not get a response. Check the console for more details.');
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
      {response && (
        <div className="mt-8 w-full max-w-2xl p-8 bg-white rounded-lg border border-gray-300 shadow-xl">
          <p className="text-lg font-semibold text-gray-900">Response:</p>
          <pre className="whitespace-pre-wrap text-lg text-gray-800">{response}</pre>
        </div>
      )}
    </div>
  );
  
  
}

export default Demo;
