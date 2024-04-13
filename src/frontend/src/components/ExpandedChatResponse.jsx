import React from 'react';
import ReactMarkdown from 'react-markdown';

function ExpandedChatResponse({ title, text, Logo, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-3xl w-full mx-4 relative overflow-y-auto" style={{ maxHeight: '50vh', marginTop: '10vh' }}>
        <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold">
          &times;
        </button>
        <div className="mt-2">
          <Logo className="w-12 h-12 mb-2" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <ReactMarkdown className="text-gray-800 text-lg whitespace-pre-wrap">
            {text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ExpandedChatResponse;

