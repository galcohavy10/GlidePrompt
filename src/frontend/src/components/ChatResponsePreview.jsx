import React from 'react';

function ChatResponsePreview({ title, text, Logo }) {
  // Set a smaller, fixed size for all logos directly in the className
  return (
    <div className="flex p-4 my-4 mx-auto max-w-md bg-white rounded-lg border border-gray-200 shadow-md items-center space-x-4 animate-fadeIn">
      {Logo && (
        <Logo className="w-10 h-10 flex-shrink-0" /> // Using Tailwind to set the logo size to width and height of 1rem each
      )}
      <div className="flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-gray-700">{text}</p>
      </div>
    </div>
  );
}

export default ChatResponsePreview;
