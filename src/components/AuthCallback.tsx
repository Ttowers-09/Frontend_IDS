import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, XCircle, Loader } from 'lucide-react';

interface AuthCallbackProps {
  onAuthSuccess: (token: string) => void;
  onAuthError: (error: string) => void;
}

const AuthCallback: React.FC<AuthCallbackProps> = ({ onAuthSuccess, onAuthError }) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const processAuthCallback = () => {
      try {
        // Obtener parámetros de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const error = urlParams.get('error');

        if (token) {
          // Autenticación exitosa
          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          
          // Guardar token y notificar al componente padre
          localStorage.setItem('authToken', token);
          
          setTimeout(() => {
            onAuthSuccess(token);
          }, 1500);
          
        } else if (error) {
          // Error en la autenticación
          setStatus('error');
          
          const errorMessages: { [key: string]: string } = {
            'access_denied': 'You denied access to your Google account.',
            'oauth_failed': 'OAuth authentication failed. Please try again.',
            'invalid_request': 'Invalid authentication request.',
            'server_error': 'Server error occurred during authentication.'
          };
          
          const errorMessage = errorMessages[error] || 'An unknown error occurred during authentication.';
          setMessage(errorMessage);
          
          setTimeout(() => {
            onAuthError(error);
          }, 3000);
          
        } else {
          // No hay token ni error - estado inválido
          setStatus('error');
          setMessage('Invalid authentication response. Please try logging in again.');
          
          setTimeout(() => {
            onAuthError('invalid_response');
          }, 3000);
        }
        
      } catch (err) {
        console.error('Error processing auth callback:', err);
        setStatus('error');
        setMessage('An error occurred while processing authentication.');
        
        setTimeout(() => {
          onAuthError('processing_error');
        }, 3000);
      }
    };

    processAuthCallback();
  }, [onAuthSuccess, onAuthError]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader className="w-12 h-12 text-primary animate-spin" />;
      case 'success':
        return <CheckCircle className="w-12 h-12 text-success" />;
      case 'error':
        return <XCircle className="w-12 h-12 text-error" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'text-primary';
      case 'success':
        return 'text-success';
      case 'error':
        return 'text-error';
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-900 to-gray-800 p-md">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card p-lg space-y-lg text-center">
          {/* Header */}
          <div className="space-y-md">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/20 backdrop-blur-sm">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-white mb-xs">
                Authentication
              </h1>
              <p className="text-sm text-gray-400">
                CyberShield Security Platform
              </p>
            </div>
          </div>

          {/* Status */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-md"
          >
            <div className="flex justify-center">
              {getStatusIcon()}
            </div>
            
            <div className={`${getStatusColor()} font-medium`}>
              {message}
            </div>
          </motion.div>

          {/* Progress indicator for loading */}
          {status === 'loading' && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="h-1 bg-primary rounded-full"
            />
          )}

          {/* Additional actions for error state */}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="space-y-sm"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/login'}
                className="btn-primary w-full py-sm px-md rounded-md"
              >
                Return to Login
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.reload()}
                className="btn-secondary w-full py-sm px-md rounded-md"
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
        </div>

        <div className="flex items-center justify-center gap-xs mt-lg text-xs text-gray-500">
          <Shield className="w-3 h-3" />
          <span>Secure OAuth 2.0 Authentication</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthCallback;