import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthSidebar from '../components/auth/AuthSidebar';
import AuthButton from '../components/auth/AuthButton';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

const ResetLinkExpired = () => {
  return (
    <div className="min-h-screen bg-surface-primary flex font-sans text-text-primary selection:bg-primary-500/30">
      <AuthSidebar />

      {/* Right panel — Expired Message */}
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
            <div className="w-20 h-20 bg-warning-50 text-warning-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-warning-100">
              <HiOutlineExclamationTriangle className="w-10 h-10" />
            </div>
            
            <h2 className="text-3xl font-extrabold font-display tracking-tight text-text-primary mb-4">
              Link Expired
            </h2>
            <p className="text-text-secondary text-base leading-relaxed mb-8">
              For security reasons, password reset links expire after 15 minutes. This link is no longer valid.
            </p>
            
            <Link to="/forgot-password" className="block w-full">
              <AuthButton className="w-full">
                Request New Link
              </AuthButton>
            </Link>

            <p className="mt-6 text-sm text-text-tertiary">
              Remembered your password?{' '}
              <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors relative group">
                Sign in
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetLinkExpired;
