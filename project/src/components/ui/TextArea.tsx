import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  const textareaId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={textareaId} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        rows={4}
        className={`
          w-full rounded-lg border border-gray-300 px-4 py-2
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-colors duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${
            props.disabled
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
              : 'bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700'
          }
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default TextArea;