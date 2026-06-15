import React from 'react';
import { HiChevronDown } from 'react-icons/hi2';

const Select = ({ label, options, value, onChange, error, className = '' }) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`block w-full appearance-none rounded-xl border ${
            error
              ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500'
              : 'border-border focus:border-primary-500 focus:ring-primary-500'
          } bg-white px-4 py-2.5 text-sm text-text-primary shadow-sm transition-colors focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-gray-50`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary">
          <HiChevronDown className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
      {error && <p className="text-sm text-danger-500">{error}</p>}
    </div>
  );
};

export default Select;
