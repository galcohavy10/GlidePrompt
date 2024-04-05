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
      // Assuming `inputText` contains all necessary information
      // You may need to adjust this to match your backend requirements
      const payload = {
        company: 'OpenAI', // Example, adjust as needed
        modelName: 'gpt-3.5-turbo', // Example, adjust accordingly
        messages: [{ role: "system", content: inputText }], // Adjust based on your requirements
        systemMessage: inputText, // User input as systemMessage
      };
  

      // Send request to your backend
      const resOpenAI = await axios.post('http://localhost:5000/chatWithAI', { ...payload, company: 'OpenAI' });
      // const resClaude = await axios.post('http://localhost:5000/chatWithAI', { ...payload, company: 'Anthropic' });
      console.log('resOpenAI: ', resOpenAI);

      // Update the state with the response
      setResponse(`OpenAI Response: ${JSON.stringify(resOpenAI.data)}\nClaude Response not implemented yet.`);
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
