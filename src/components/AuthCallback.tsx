import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authUtils } from '../utils/auth';

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (token) {
      authUtils.setToken(token);
      // short delay to ensure storage is set before navigation
      setTimeout(() => navigate('/dashboard'), 100);
    } else if (error) {
      navigate('/login');
    } else {
      // No token or error: try to parse fragment (some flows return hash)
      const hash = window.location.hash.replace('#', '');
      const params = new URLSearchParams(hash);
      const t = params.get('token') || params.get('access_token');
      if (t) {
        authUtils.setToken(t);
        setTimeout(() => navigate('/dashboard'), 100);
      } else {
        navigate('/login');
      }
    }
  }, [searchParams, navigate]);

  return <div className="p-4 text-center">Procesando autenticación...</div>;
};

export default AuthCallback;
