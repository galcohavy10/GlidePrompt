import React, { useState } from 'react';
import ExpandedView from './ExpandedChatResponse'; // New component for expanded view

function ChatResponsePreview({ title, text, Logo }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxCharLength = 150; // Adjust this number as needed

  const toggleView = () => {
    setIsExpanded(!isExpanded);
  };

  // Truncate text if it exceeds the maximum character length
  const displayText = isExpanded ? text : `${text.substring(0, maxCharLength)}...`;

  return (
    <div className="flex p-4 my-4 mx-auto max-w-md bg-white rounded-lg border border-gray-200 shadow-md items-center space-x-4 animate-fadeIn">
      {Logo && <Logo className="w-10 h-10 flex-shrink-0" />}
      <div className="flex flex-col flex-grow cursor-pointer" onClick={toggleView}>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-gray-700">{displayText}</p>
        {text.length > maxCharLength && !isExpanded && (
          <button className="mt-2 text-blue-500 text-sm">Show More</button>
        )}
      </div>
      {isExpanded && (
        <ExpandedView
          title={title}
          text={text}
          Logo={Logo}
          onClose={toggleView}
        />
      )}
    </div>
  );
}

export default ChatResponsePreview;