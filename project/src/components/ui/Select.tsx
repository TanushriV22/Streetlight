import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  value,
  onChange,
  className = '',
  ...props
}) => {
  const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };
  
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={selectId} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      
      <select
        id={selectId}
        value={value}
        onChange={handleChange}
        className={`
          w-full rounded-lg border border-gray-300 px-4 py-2
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${
            props.disabled
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
              : ''
          }
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Select;