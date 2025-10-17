import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Lock, User, ArrowRight } from 'lucide-react';
import { authEndpoints } from '../utils/auth';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  onGoogleLogin?: (googleUser: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onGoogleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onLogin(username, password);
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    try {
      // Opción 1: Redirigir directamente al backend para OAuth
      window.location.href = authEndpoints.googleLogin;
      
      // Opción 2: Para implementación con popup (comentado por ahora)
      /*
      const popup = window.open(
        authEndpoints.googleLogin,
        'google-oauth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );
      
      // Escuchar el mensaje del popup con el resultado
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          popup?.close();
          if (onGoogleLogin) {
            onGoogleLogin(event.data.user);
          } else {
            onLogin(event.data.user.email, 'google_oauth');
          }
        } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          popup?.close();
          console.error('Google login failed:', event.data.error);
        }
        
        window.removeEventListener('message', handleMessage);
        setIsGoogleLoading(false);
      };
      
      window.addEventListener('message', handleMessage);
      */
      
    } catch (error) {
      console.error('Google login failed:', error);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-900 to-gray-800 p-md">
      {/* Simplified background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="glass-card p-2xl space-y-2xl">
          {/* Header */}
          <div className="text-center space-y-lg">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 backdrop-blur-sm">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            
            <div className="space-y-sm">
              <h1 className="text-3xl font-bold text-white">
                ISD-IA Organization
              </h1>
              <p className="text-base text-gray-400">
                Advanced Cybersecurity Platform
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-xl">
            {/* Google OAuth Button */}
            <div className="space-y-lg">
              <motion.button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-lg px-lg rounded-xl glass-input border border-gray-600 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-md group"
              >
                {isGoogleLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-gray-400 border-t-primary rounded-full animate-spin" />
                    <span className="text-white font-medium text-lg">Connecting to Google...</span>
                  </>
                ) : (
                  <>
                    {/* Google Icon SVG - Mejorado para tema oscuro */}
                    <div className="relative p-2 bg-white rounded-lg group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <span className="text-white font-medium text-lg group-hover:text-primary transition-colors">
                      Continue with Google
                    </span>
                  </>
                )}
              </motion.button>
              
              {/* Divider */}
              <div className="relative py-md">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-base">
                  <span className="px-lg bg-gray-800/80 text-gray-400 font-medium">or continue with email</span>
                </div>
              </div>
            </div>
            {/* Email/Username Field */}
            <div className="space-y-sm">
              <label className="block text-base font-medium text-gray-200">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-lg flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-input w-full pl-14 pr-lg py-lg rounded-xl focus-ring text-white placeholder-gray-400 text-base"
                  placeholder="Enter your email or username"
                  required
                />
              </div>
            </div>

            <div className="space-y-sm">
              <label className="block text-base font-medium text-gray-200">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-lg flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input w-full pl-14 pr-14 py-lg rounded-xl focus-ring text-white placeholder-gray-400 text-base"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-lg flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-base pt-sm">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-primary rounded border-gray-600 bg-gray-800 focus-ring"
                />
                <span className="ml-sm text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:text-primary-light transition-colors font-medium">
                Forgot password?
              </a>
            </div>

            <div className="space-y-md pt-md">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full py-lg px-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
              >
                <div className="flex items-center justify-center gap-sm">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </div>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => {
                  setUsername('demo');
                  setPassword('demo');
                  onLogin('demo', 'demo');
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary w-full py-lg px-lg rounded-xl text-lg font-medium"
              >
                <div className="flex items-center justify-center gap-sm">
                  <Shield className="w-5 h-5" />
                  <span>Demo Access</span>
                </div>
              </motion.button>
            </div>
          </form>

          {/* Footer */}
          <div className="pt-md border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400 mb-xs">
              Don't have an account?
            </p>
            <button className="text-primary hover:text-primary-light transition-colors text-sm font-medium">
              Request Access
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-xs mt-lg text-xs text-gray-500">
          <Shield className="w-3 h-3" />
          <span>Protected by 256-bit SSL encryption</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
