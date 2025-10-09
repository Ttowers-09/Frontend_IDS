import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Zap, Eye } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { 
      name: 'dark', 
      icon: Moon, 
      label: 'Dark',
      gradient: 'from-slate-600 to-slate-800',
      activeGradient: 'from-blue-500 to-purple-600'
    },
    { 
      name: 'light', 
      icon: Sun, 
      label: 'Light',
      gradient: 'from-gray-200 to-gray-400',
      activeGradient: 'from-yellow-400 to-orange-500'
    },
    { 
      name: 'cyberpunk', 
      icon: Zap, 
      label: 'Cyberpunk',
      gradient: 'from-pink-600 to-purple-800',
      activeGradient: 'from-pink-500 to-cyan-500'
    },
    { 
      name: 'matrix', 
      icon: Eye, 
      label: 'Matrix',
      gradient: 'from-green-600 to-green-800',
      activeGradient: 'from-green-400 to-green-600'
    }
  ];

  return (
    <div className="flex items-center gap-2 p-2 glass-card rounded-xl">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isActive = theme === themeOption.name;
        
        return (
          <motion.button
            key={themeOption.name}
            onClick={() => setTheme(themeOption.name as any)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`relative p-3 rounded-lg transition-all duration-300 ${
              isActive 
                ? `bg-gradient-to-r ${themeOption.activeGradient} shadow-lg` 
                : `bg-gradient-to-r ${themeOption.gradient} hover:opacity-80`
            }`}
            title={`Switch to ${themeOption.label} theme`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-300'}`} />
            
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;