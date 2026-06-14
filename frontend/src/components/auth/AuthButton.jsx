import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { HiCheck } from 'react-icons/hi2';

const AuthButton = ({
  children,
  type = 'button',
  loading = false,
  success = false,
  disabled = false,
  className,
  onClick,
  ...props
}) => {
  const isDisabled = disabled || loading || success;

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      whileHover={!isDisabled ? { scale: 1.01, translateY: -1 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={cn(
        "relative w-full h-12 flex items-center justify-center rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden",
        "bg-primary-500 text-white shadow-soft hover:shadow-glow hover:bg-primary-600",
        "disabled:bg-surface-tertiary disabled:text-text-tertiary disabled:cursor-not-allowed disabled:shadow-none",
        success ? "bg-success-500 hover:bg-success-500" : "",
        className
      )}
      {...props}
    >
      {/* Ripple Effect Background (simple implementation via motion) */}
      {!isDisabled && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ opacity: 0, scale: 0 }}
          whileTap={{ opacity: 1, scale: 2 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Button Content */}
      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 animate-spin text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Please wait...</span>
          </div>
        ) : success ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2"
          >
            <HiCheck className="w-5 h-5" />
            <span>Success!</span>
          </motion.div>
        ) : (
          children
        )}
      </div>
    </motion.button>
  );
};

export default AuthButton;
