import React, { useState, useRef, useEffect } from 'react';
import { HiChevronDown, HiCheck } from 'react-icons/hi2';

const Select = ({ label, options, value, onChange, error, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={`space-y-1.5 ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-full rounded-xl border text-left flex items-center justify-between ${
            error
              ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500'
              : 'border-border/80 focus:border-primary-500 focus:ring-primary-500 hover:border-primary-300'
          } bg-white px-4 py-2.5 text-sm text-text-primary shadow-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-500/10 disabled:cursor-not-allowed disabled:bg-gray-50`}
        >
          <span className="block truncate">{selectedOption?.label || 'Select...'}</span>
          <span className="pointer-events-none flex items-center text-text-secondary">
            <HiChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-xl bg-white p-1 shadow-elevated border border-border/50 focus:outline-none animate-scale-in origin-top">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`relative w-full cursor-pointer rounded-lg select-none py-2 pl-4 pr-9 text-left text-sm transition-colors ${
                  value === opt.value ? 'bg-primary-50/50 text-primary-700 font-semibold' : 'text-text-primary font-medium hover:bg-surface-secondary'
                }`}
                onClick={() => {
                  onChange({ target: { value: opt.value } });
                  setIsOpen(false);
                }}
              >
                <span className="block truncate">{opt.label}</span>
                {value === opt.value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-600">
                    <HiCheck className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-danger-500">{error}</p>}
    </div>
  );
};

export default Select;
