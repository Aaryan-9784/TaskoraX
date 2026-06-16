import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { saveTokens, getToken, clearTokens } from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          // Fetch current user from backend using token via api interceptor
          const { data } = await api.get('/users/me');
          setUser(data.data.user);
        } catch (error) {
          console.error('Failed to authenticate token', error);
          clearTokens();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password, rememberMe = true) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      saveTokens(data.token, data.refreshToken, rememberMe);
      setUser(data.data.user);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      saveTokens(data.token, data.refreshToken, true); // new accounts always remember
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
      saveTokens(data.token, data.refreshToken, true);
      setUser(data.data.user);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  };

  const logout = () => {
    clearTokens();
    setUser(null);
  };

  const deactivateAccount = async () => {
    try {
      await api.patch('/users/deactivate');
      logout();
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to deactivate account');
    }
  };

  const deleteAccount = async () => {
    try {
      await api.delete('/users/delete');
      logout();
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete account');
    }
  };

  const getSessions = async () => {
    try {
      const { data } = await api.get('/users/sessions');
      return data.data.sessions;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sessions');
    }
  };

  const revokeSession = async (sessionId) => {
    try {
      await api.delete(`/users/sessions/${sessionId}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to revoke session');
    }
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
    deactivateAccount,
    deleteAccount,
    getSessions,
    revokeSession,
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
