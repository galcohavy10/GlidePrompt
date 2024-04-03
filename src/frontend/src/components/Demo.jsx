import React, { useState } from 'react';

function Demo() {
  const [inputText, setInputText] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submit action
    console.log(inputText); // Log the input text to the console or handle it as needed
    // Add further actions here, such as sending the text to an API
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
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
    </div>
  );
}

export default Demo;
