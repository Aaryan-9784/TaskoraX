import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthSidebar from '../components/auth/AuthSidebar';
import PasswordField from '../components/auth/PasswordField';
import AuthButton from '../components/auth/AuthButton';
import { HiOutlineLockClosed } from 'react-icons/hi2';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.password || !form.passwordConfirm) {
      setError('Please fill in all fields.');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/reset-password/${token}`, {
        password: form.password,
        passwordConfirm: form.passwordConfirm,
      });
      setSuccess(true);
      toast.success('Password reset successfully!');
      
      // Navigate to success page instead of direct login to match requirements
      setTimeout(() => {
        navigate('/reset-success');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired token.');
      setLoading(false);
      
      // If token expired error, redirect to expired page
      if (err.response?.data?.message?.toLowerCase().includes('expired')) {
        navigate('/reset-expired');
      }
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary flex font-sans text-text-primary selection:bg-primary-500/30">
      <AuthSidebar />

      {/* Right panel — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
        
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

          <div className="mb-10">
            <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-primary-100">
              <HiOutlineLockClosed className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-extrabold font-display tracking-tight text-text-primary mb-3">
              Set New Password
            </h2>
            <p className="text-text-secondary text-base leading-relaxed">
              Your new password must be different from previously used passwords.
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
            <PasswordField
              label="New Password"
              showStrengthMeter={true}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <PasswordField
              label="Confirm New Password"
              showStrengthMeter={false}
              value={form.passwordConfirm}
              onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
              required
            />
            
            {/* Password Match Indicator */}
            {form.passwordConfirm.length > 0 && (
              <div className="mt-2 text-sm">
                {form.password === form.passwordConfirm ? (
                  <span className="text-success-600 flex items-center gap-1 font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    Passwords match
                  </span>
                ) : (
                  <span className="text-danger-600 flex items-center gap-1 font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                    Passwords do not match
                  </span>
                )}
              </div>
            )}

            <AuthButton type="submit" loading={loading} success={success} className="mt-6">
              Reset Password
            </AuthButton>
          </form>
          
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
