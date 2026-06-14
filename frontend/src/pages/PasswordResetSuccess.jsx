import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthSidebar from '../components/auth/AuthSidebar';
import AuthButton from '../components/auth/AuthButton';

const PasswordResetSuccess = () => {
  return (
    <div className="min-h-screen bg-surface-primary flex font-sans text-text-primary selection:bg-primary-500/30">
      <AuthSidebar />

      {/* Right panel — Success Message */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[440px] mx-auto text-center"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-soft">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-2xl font-bold font-display tracking-tight text-text-primary">
              Taskora<span className="text-primary-500">X</span>
            </span>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-soft border border-border">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-success-50 text-success-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-success-100"
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            
            <h2 className="text-3xl font-extrabold font-display tracking-tight text-text-primary mb-4">
              Password Updated!
            </h2>
            <p className="text-text-secondary text-base leading-relaxed mb-8">
              Your password has been changed successfully. You can now use your new password to log in to your account.
            </p>
            
            <Link to="/login" className="block w-full">
              <AuthButton className="w-full">
                Go to Login
              </AuthButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
