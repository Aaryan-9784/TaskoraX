import React, { useState, forwardRef } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlineLockClosed, HiCheck, HiXMark } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import AuthInput from './AuthInput';
import { cn } from '../../utils/cn';

const PasswordField = forwardRef(({ showStrengthMeter = false, value = '', onChange, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  // Live validation checks
  const checks = [
    { id: 'length', label: 'Minimum 8 characters', regex: /.{8,}/ },
    { id: 'uppercase', label: 'Uppercase letter', regex: /[A-Z]/ },
    { id: 'lowercase', label: 'Lowercase letter', regex: /[a-z]/ },
    { id: 'number', label: 'Number', regex: /[0-9]/ },
    { id: 'special', label: 'Special character', regex: /[^A-Za-z0-9]/ },
  ];

  const calculateStrength = () => {
    if (!value) return 0;
    const passedChecks = checks.filter(check => check.regex.test(value)).length;
    return passedChecks;
  };

  const strength = calculateStrength();
  
  const getStrengthLabel = () => {
    if (strength === 0) return '';
    if (strength <= 2) return 'Weak';
    if (strength <= 4) return 'Medium';
    if (strength === 5) return 'Strong';
    return '';
  };

  const getStrengthColor = () => {
    if (strength === 0) return 'bg-border';
    if (strength <= 2) return 'bg-danger-500';
    if (strength <= 4) return 'bg-warning-500';
    if (strength === 5) return 'bg-success-500';
    return 'bg-border';
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const RightElement = (
    <button
      type="button"
      onClick={togglePassword}
      className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={showPassword ? 'hide' : 'show'}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          {showPassword ? (
            <HiOutlineEyeSlash className="w-5 h-5" />
          ) : (
            <HiOutlineEye className="w-5 h-5" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );

  return (
    <div className="w-full">
      <AuthInput
        ref={ref}
        type={showPassword ? "text" : "password"}
        icon={HiOutlineLockClosed}
        rightElement={RightElement}
        value={value}
        onChange={onChange}
        {...props}
      />

      <AnimatePresence>
        {showStrengthMeter && value.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            {/* Strength Meter Bar */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 flex gap-1 h-1.5">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      "flex-1 rounded-full transition-colors duration-300",
                      strength >= level ? getStrengthColor() : "bg-border"
                    )}
                  />
                ))}
              </div>
              <span className={cn(
                "text-xs font-semibold w-12 text-right transition-colors duration-300",
                strength <= 2 ? "text-danger-500" : strength <= 4 ? "text-warning-500" : "text-success-500"
              )}>
                {getStrengthLabel()}
              </span>
            </div>

            {/* Validation Checklist */}
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 mt-3">
              {checks.map((check) => {
                const isPassed = check.regex.test(value);
                return (
                  <div key={check.id} className="flex items-center gap-1.5">
                    {isPassed ? (
                      <HiCheck className="w-3.5 h-3.5 text-success-500 flex-shrink-0" />
                    ) : (
                      <HiXMark className="w-3.5 h-3.5 text-text-tertiary flex-shrink-0" />
                    )}
                    <span className={cn(
                      "text-xs transition-colors duration-300",
                      isPassed ? "text-text-primary" : "text-text-tertiary"
                    )}>
                      {check.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

PasswordField.displayName = 'PasswordField';

export default PasswordField;
