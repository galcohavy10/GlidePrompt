import React from 'react';
import { FaClipboardList, FaRocket, FaRegEdit, FaVials } from "react-icons/fa";

const steps = [
  { name: 'Task', icon: <FaClipboardList />, description: 'User inputs a task' },
  { name: 'Get Prompt', icon: <FaRocket />, description: 'System generates prompt' },
  { name: 'Edit Prompt', icon: <FaRegEdit />, description: 'User edits the prompt' },
  { name: 'Test', icon: <FaVials />, description: 'User tests the generated prompt' }
];

export const DemoStatusBar = ({ currentStep }) => (
  <div className="flex items-center justify-center my-4">
    {steps.map((step, index) => (
      <React.Fragment key={index}>
        <div className={`flex flex-col items-center ${currentStep === index ? 'text-purple-600' : 'text-gray-400'}`}>
          <div className={`text-${currentStep === index ? '3xl' : '5xl'} ${currentStep === index ? 'onceBounce' : ''}`}>
            {step.icon}
          </div>
          <span className="text-xs">{step.name}</span>
        </div>
        {index < steps.length - 1 && (
          <div
            className={`h-0.5 ${currentStep > index ? 'bg-purple-600' : 'bg-gray-300'} transition-colors duration-300 w-8 mx-2`}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

