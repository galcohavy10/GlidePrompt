import React, { useState } from 'react';
// import ExpandedView from './ExpandedChatResponse';

function ChatResponsePreview({ title, text, Logo }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxCharLength, setMaxCharLength] = useState(100);

  const toggleView = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setMaxCharLength(150);
    } else {
      setMaxCharLength(10000);
    }
  };

  // Truncate text if it exceeds the maximum character length, but add a ... if it's truncated
  const displayText = text.length > maxCharLength ? text.slice(0, maxCharLength) + '...' : text;

  return (
    <div className="flex p-4 my-4 mx-auto max-w-md bg-veryLightGray rounded-lg border border-gray-200 shadow-md items-center space-x-4 animate-fadeIn">
      {Logo && <Logo className="w-10 h-10 flex-shrink-0" />}
      <div className="flex flex-col flex-grow cursor-pointer" onClick={toggleView}>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-gray-700">{displayText}</p>
        {text.length > maxCharLength && !isExpanded && (
          <button className="mt-2 text-blue-500 text-sm">Show More</button>
        )}
      </div>
    </div>
  );
}

export default ChatResponsePreview;