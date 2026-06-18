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
          <div className="absolute top-full left-0 z-50 mt-2 max-h-60 w-full overflow-auto bg-surface-primary/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl shadow-black/5 p-1.5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-0.5">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                    value === opt.value ? 'bg-primary-500/10 text-primary-600' : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/80'
                  }`}
                  onClick={() => {
                    onChange({ target: { value: opt.value } });
                    setIsOpen(false);
                  }}
                >
                  <span className="block truncate text-left">{opt.label}</span>
                  {value === opt.value && (
                    <HiCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-danger-500">{error}</p>}
    </div>
  );
};

export default Select;
