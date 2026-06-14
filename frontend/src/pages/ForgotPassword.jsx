import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthSidebar from '../components/auth/AuthSidebar';
import AuthInput from '../components/auth/AuthInput';
import AuthButton from '../components/auth/AuthButton';
import { HiOutlineEnvelope, HiArrowLeft } from 'react-icons/hi2';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/forgot-password`, { email });
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary flex font-sans text-text-primary selection:bg-primary-500/30">
      <AuthSidebar type="forgot" />

      {/* Right panel — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 relative">
        
        {/* Back to login top link */}
        <div className="absolute top-8 left-8 lg:left-12">
          <Link 
            to="/login" 
            className="flex items-center gap-2 text-text-tertiary hover:text-primary-600 font-medium transition-colors"
          >
            <HiArrowLeft className="w-5 h-5" />
            Back to login
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[440px] mx-auto"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <img src="/favicon.svg" alt="TaskoraX Logo" className="w-10 h-10 rounded-xl shadow-soft" />
            <span className="text-2xl font-bold font-display tracking-tight text-text-primary">
              Taskora<span className="text-primary-500">X</span>
            </span>
          </div>

          {!success ? (
            <>
              <div className="mb-10">
                <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-primary-100">
                  <HiOutlineEnvelope className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-extrabold font-display tracking-tight text-text-primary mb-3">
                  Forgot Password?
                </h2>
                <p className="text-text-secondary text-base leading-relaxed">
                  No worries, we'll send you reset instructions.
                </p>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  className="mb-6 p-4 rounded-xl bg-danger-50 border border-danger-100 text-danger-600 text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <AuthInput
                  label="Email Address"
                  type="email"
                  icon={HiOutlineEnvelope}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                />

                <AuthButton type="submit" loading={loading} className="mt-2">
                  Send Reset Link
                </AuthButton>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white p-8 rounded-2xl shadow-soft border border-border"
            >
              <div className="w-16 h-16 bg-success-50 text-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">Check your email</h3>
              <p className="text-text-secondary mb-8">
                We sent a password reset link to <span className="font-semibold text-text-primary">{email}</span>
              </p>
              <Link to="/login">
                <AuthButton>Back to log in</AuthButton>
              </Link>
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
