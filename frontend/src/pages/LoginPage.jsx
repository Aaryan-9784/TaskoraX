import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AuthSidebar from '../components/auth/AuthSidebar';
import AuthInput from '../components/auth/AuthInput';
import PasswordField from '../components/auth/PasswordField';
import AuthButton from '../components/auth/AuthButton';
import SocialButton from '../components/auth/SocialButton';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(searchParams.get('error') === 'OAuthFailed' ? 'Google/GitHub login failed. Please ensure your account has a public email address.' : (searchParams.get('error') || ''));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await login(form.email, form.password, true);
      const userRole = response?.data?.user?.role;
      setSuccess(true);
      toast.success('Welcome back! Redirecting...');
      setTimeout(() => {
        if (userRole?.toLowerCase() === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      }, 800);
    } catch (err) {
      setError(err.message || 'Failed to login');
      toast.error(err.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary flex font-sans text-text-primary selection:bg-primary-500/30">
      
      <AuthSidebar type="login" />

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
            <h2 className="text-3xl font-extrabold font-display tracking-tight text-text-primary mb-3">
              Welcome back
            </h2>
            <p className="text-text-secondary text-base">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors relative group">
                Create one for free
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
                or continue with email
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
              label="Email Address"
              type="email"
              icon={HiOutlineEnvelope}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <div>
              <PasswordField
                label="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <div className="flex items-center justify-end mt-4">
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors relative group"
                >
                  Forgot password?
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </div>

            <AuthButton type="submit" loading={loading} success={success} className="mt-2">
              Sign In to Workspace
            </AuthButton>
          </form>

        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
