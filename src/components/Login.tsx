import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Lock, User, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onLogin(username, password);
    setIsLoading(false);
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
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card p-lg space-y-lg">
          {/* Header */}
          <div className="text-center space-y-md">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/20 backdrop-blur-sm">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-white mb-xs">
                Fargo Security
              </h1>
              <p className="text-sm text-gray-400">
                Advanced Cybersecurity Platform
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-md">
            <div className="space-y-xs">
              <label className="block text-sm font-medium text-gray-200">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-input w-full pl-12 pr-sm py-sm rounded-md focus-ring"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="space-y-xs">
              <label className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input w-full pl-12 pr-12 py-sm rounded-md focus-ring"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-sm flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-primary rounded border-gray-600 bg-gray-800 focus-ring"
                />
                <span className="ml-xs text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:text-primary-light transition-colors">
                Forgot password?
              </a>
            </div>

            <div className="space-y-sm">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full py-sm px-md rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center gap-xs">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
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
                className="btn-secondary w-full py-sm px-md rounded-md"
              >
                <div className="flex items-center justify-center gap-xs">
                  <Shield className="w-4 h-4" />
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
