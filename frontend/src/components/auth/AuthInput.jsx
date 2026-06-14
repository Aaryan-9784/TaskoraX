import React, { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { HiExclamationCircle, HiCheckCircle } from 'react-icons/hi2';

const AuthInput = forwardRef(({
  label,
  icon: Icon,
  type = 'text',
  error,
  success,
  helperText,
  rightElement,
  className,
  value,
  onChange,
  onBlur,
  onFocus,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Is active if it has focus or has a value
  const isActive = isFocused || (value !== undefined && value !== '');

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div className={cn('relative w-full', className)}>
      <div 
        className={cn(
          "relative flex items-center w-full min-h-[56px] rounded-2xl border bg-surface-primary transition-all duration-300",
          isFocused ? "border-primary-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]" : "border-border hover:border-text-tertiary",
          error && "border-danger-500 shadow-[0_0_0_4px_rgba(239,68,68,0.1)] hover:border-danger-500",
          success && !error && "border-success-500 hover:border-success-500"
        )}
      >
        {/* Left Icon */}
        {Icon && (
          <div className="absolute left-4 flex items-center justify-center pointer-events-none">
            <Icon 
              className={cn(
                "w-5 h-5 transition-colors duration-300",
                isFocused ? "text-primary-500" : "text-text-tertiary",
                error && "text-danger-500",
                success && !error && "text-success-500"
              )} 
            />
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "w-full h-full bg-transparent outline-none text-text-primary text-sm font-medium px-4 pt-4 pb-1",
            Icon ? "pl-11" : ""
          )}
          {...props}
        />

        {/* Floating Label */}
        <motion.label
          initial={false}
          animate={{
            y: isActive ? -12 : 0,
            scale: isActive ? 0.85 : 1,
            color: error ? '#EF4444' : isFocused ? '#3B82F6' : '#6B7280'
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "absolute left-4 pointer-events-none origin-left flex items-center",
            Icon ? "left-11" : ""
          )}
        >
          {label}
        </motion.label>

        {/* Right Status Icon or Custom Element */}
        <div className="absolute right-4 flex items-center justify-center">
          {rightElement ? (
            rightElement
          ) : (
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <HiExclamationCircle className="w-5 h-5 text-danger-500" />
                </motion.div>
              )}
              {success && !error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <HiCheckCircle className="w-5 h-5 text-success-500" />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Helper Text / Error Message */}
      <AnimatePresence>
        {(error || helperText) && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "text-xs mt-1.5 ml-1 font-medium",
              error ? "text-danger-500" : "text-text-secondary"
            )}
          >
            {error || helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

AuthInput.displayName = 'AuthInput';

export default AuthInput;
