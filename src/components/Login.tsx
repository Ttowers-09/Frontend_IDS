import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const ParticleField: React.FC = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 8
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="particles fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [-20, -100]
          }}
          transition={{
            duration: 8,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

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
    <div className="min-h-screen bg-dark-50 flex items-center justify-center relative overflow-hidden font-inter animated-bg">
      <ParticleField />
      
      <div className="fixed inset-0 grid-pattern opacity-20"></div>
      
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 0.9, 1.1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-2/3 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [0.8, 1.3, 0.8],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          ease: [0.25, 0.46, 0.45, 0.94],
          staggerChildren: 0.1
        }}
        className="relative z-10 w-full max-w-md p-8"
      >
        <div className="glass-premium rounded-4xl p-8 border border-glass-400 relative group hover-lift">
          <div className="card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center mb-8"
          >
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 via-purple-600 to-cyan-500 mb-6 relative group"
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Shield className="w-10 h-10 text-white icon-glow" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500 via-purple-600 to-cyan-500 blur-xl opacity-50 -z-10 group-hover:opacity-75 transition-opacity"></div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold text-gradient mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Fargo Security
            </motion.h1>
            <motion.p 
              className="text-blue-300/80 text-sm tracking-wide font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Advanced Cybersecurity Platform
            </motion.p>
            <motion.div
              className="h-1 w-16 bg-gradient-to-r from-primary-500 to-cyan-500 mx-auto mt-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            />
          </motion.div>

          <motion.form 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <label className="block text-sm font-semibold text-white/80 mb-3">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-blue-400/60" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-input w-full pl-12 pr-4 py-4 rounded-xl border border-glass-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 text-white placeholder-blue-300/50 font-medium"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <label className="block text-sm font-semibold text-white/80 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-400/60" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input w-full pl-12 pr-14 py-4 rounded-xl border border-glass-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 text-white placeholder-blue-300/50 font-medium"
                  placeholder="Enter your password"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-400/60 hover:text-white/80 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.label 
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <input 
                  type="checkbox" 
                  className="form-checkbox h-4 w-4 text-primary-500 rounded border-glass-300 bg-glass-200 focus:ring-primary-500 focus:ring-2 transition-all"
                />
                <span className="ml-3 text-sm text-white/70 font-medium">Remember me</span>
              </motion.label>
              <motion.a 
                href="#" 
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Forgot password?
              </motion.a>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full relative overflow-hidden rounded-xl py-4 px-6 text-white font-bold shadow-2xl hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="spinner"></div>
                    <span className="font-semibold">Authenticating...</span>
                  </div>
                ) : (
                  <>
                    <span className="font-semibold text-lg">Sign In</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary w-full relative overflow-hidden rounded-xl py-4 px-6 text-white font-bold shadow-2xl hover:shadow-glow-lg transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Shield className="w-5 h-5 icon-glow" />
                <span className="font-semibold text-lg">Demo Access</span>
              </div>
            </motion.button>
          </motion.form>

          <motion.div 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.9 }}
            className="mt-8 pt-6 border-t border-glass-300/50 text-center"
          >
            <p className="text-sm text-white/60 mb-4 font-medium">
              Don't have an account?
            </p>
            <motion.button 
              className="text-primary-400 hover:text-primary-300 transition-colors duration-300 text-sm font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Access
            </motion.button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center justify-center gap-3 mt-8 text-xs text-blue-300/60 font-medium"
        >
          <Shield className="w-4 h-4 icon-glow" />
          <span>Protected by 256-bit SSL encryption</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
