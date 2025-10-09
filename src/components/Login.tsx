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
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onLogin(username, password);
    setIsLoading(false);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-dark-50 flex items-center justify-center relative overflow-hidden font-inter">
      <div className="fixed inset-0 grid-pattern opacity-30"></div>
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8"
      >
        <div className="glass-premium rounded-4xl p-8 border border-glass-400 relative group">
          <div className="card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 mb-6 relative">
              <Shield className="w-8 h-8 text-white icon-glow" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 blur-lg opacity-50 -z-10"></div>
            </div>
            
            <h1 className="text-3xl font-bold text-gradient mb-2">Fargo Security</h1>
            <p className="text-blue-300/70 text-sm tracking-wide">Advanced Cybersecurity Platform</p>
          </motion.div>

          <motion.form 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="relative">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-dark-600" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-input w-full pl-10 pr-4 py-3 rounded-xl border border-glass-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 text-white placeholder-dark-600"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-dark-600" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input w-full pl-10 pr-12 py-3 rounded-xl border border-glass-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 text-white placeholder-dark-600"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-600 hover:text-white/70 transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="form-checkbox h-4 w-4 text-primary-500 rounded border-glass-300 bg-glass-200 focus:ring-primary-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-white/70">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary-400 hover:text-primary-300 transition-colors duration-300">
                Forgot password?
              </a>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative overflow-hidden rounded-xl py-3 px-6 bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </motion.button>

            {/* Demo Access Button */}
            <motion.button
              type="button"
              onClick={() => {
                setUsername('demo');
                setPassword('demo');
                onLogin('demo', 'demo');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-3 relative overflow-hidden rounded-xl py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Demo Access</span>
              </div>
            </motion.button>
          </motion.form>

          <motion.div 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
            className="mt-8 pt-6 border-t border-glass-300 text-center"
          >
            <p className="text-sm text-white/50 mb-4">
              Don't have an account?
            </p>
            <button className="text-primary-400 hover:text-primary-300 transition-colors duration-300 text-sm font-medium">
              Request Access
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center justify-center gap-2 mt-6 text-xs text-dark-600"
        >
          <Shield className="w-4 h-4" />
          <span>Protected by 256-bit SSL encryption</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
