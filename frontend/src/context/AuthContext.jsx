import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('taskorax_token');
      if (token) {
        try {
          // Fetch current user from backend using token via api interceptor
          const { data } = await api.get('/users/me');
          setUser(data.data.user);
        } catch (error) {
          console.error('Failed to authenticate token', error);
          localStorage.removeItem('taskorax_token');
          localStorage.removeItem('taskorax_refresh_token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('taskorax_token', data.token);
      localStorage.setItem('taskorax_refresh_token', data.refreshToken);
      setUser(data.data.user);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('taskorax_token', data.token);
      localStorage.setItem('taskorax_refresh_token', data.refreshToken);
      setUser(data.data.user);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const updateProfile = async (updates) => {
    try {
      const { data } = await api.put('/users/me', updates);
      setUser(data.data.user);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const changePassword = async (passwordCurrent, password) => {
    try {
      const { data } = await api.put('/users/updateMyPassword', { passwordCurrent, password });
      localStorage.setItem('taskorax_token', data.token);
      localStorage.setItem('taskorax_refresh_token', data.refreshToken);
      setUser(data.data.user);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  };

  const logout = () => {
    localStorage.removeItem('taskorax_token');
    localStorage.removeItem('taskorax_refresh_token');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    updateProfile,
    changePassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
