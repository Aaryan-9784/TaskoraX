import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refreshToken');

    if (token && refreshToken) {
      localStorage.setItem('taskorax_token', token);
      localStorage.setItem('taskorax_refresh_token', refreshToken);
      
      // We use window.location.href instead of navigate to force a full app reload
      // This ensures AuthContext's useEffect runs, picks up the new token, and fetches the user.
      window.location.href = '/dashboard';
    } else {
      // If tokens are missing, redirect to login with an error
      navigate('/login?error=OAuthFailed');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-primary">
      <div className="flex flex-col items-center">
        <svg className="w-12 h-12 animate-spin text-primary-500 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 className="text-xl font-bold text-text-primary">Authenticating...</h2>
        <p className="text-text-secondary mt-2">Please wait while we log you in.</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
