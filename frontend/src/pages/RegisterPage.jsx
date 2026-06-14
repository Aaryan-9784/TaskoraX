import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AuthSidebar from '../components/auth/AuthSidebar';
import AuthInput from '../components/auth/AuthInput';
import PasswordField from '../components/auth/PasswordField';
import AuthButton from '../components/auth/AuthButton';
import SocialButton from '../components/auth/SocialButton';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineLockClosed, HiCheck, HiXMark } from 'react-icons/hi2';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }



    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    } catch (err) {
      setError(err.message || 'Failed to create account');
      setLoading(false);
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
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-soft">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-2xl font-bold font-display tracking-tight text-text-primary">
              Taskora<span className="text-primary-500">X</span>
            </span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-extrabold font-display tracking-tight text-text-primary mb-3">
              Create an account
            </h2>
            <p className="text-text-secondary text-base">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors relative group">
                Sign in instead
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <SocialButton provider="google" />
            <SocialButton provider="github" />
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-surface-primary px-4 text-text-tertiary font-medium">
                or register with email
              </span>
            </div>
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
              label="Full Name"
              type="text"
              icon={HiOutlineUser}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <AuthInput
              label="Email Address"
              type="email"
              icon={HiOutlineEnvelope}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <PasswordField
              label="Password"
              showStrengthMeter={true}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />



            <AuthButton type="submit" loading={loading} success={success} className="mt-6">
              Create Account
            </AuthButton>
          </form>

          <p className="mt-8 text-sm text-text-tertiary text-center leading-relaxed">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-primary-600 font-medium hover:underline transition-all">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 font-medium hover:underline transition-all">
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
