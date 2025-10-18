import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light' | 'cyberpunk' | 'matrix';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const themes = {
  dark: {
    '--color-primary-500': '#3b82f6',
    '--color-primary-600': '#2563eb',
    '--color-secondary-500': '#8b5cf6',
    '--color-accent-cyan': '#06b6d4',
    '--color-dark-50': '#0f172a',
    '--color-dark-100': '#1e293b',
    '--glass-bg': 'rgba(15, 23, 42, 0.4)',
    '--glass-border': 'rgba(255, 255, 255, 0.1)',
  },
  light: {
    '--color-primary-500': '#3b82f6',
    '--color-primary-600': '#2563eb',
    '--color-secondary-500': '#8b5cf6',
    '--color-accent-cyan': '#06b6d4',
    '--color-dark-50': '#f8fafc',
    '--color-dark-100': '#f1f5f9',
    '--glass-bg': 'rgba(248, 250, 252, 0.6)',
    '--glass-border': 'rgba(0, 0, 0, 0.1)',
  },
  cyberpunk: {
    '--color-primary-500': '#ff0080',
    '--color-primary-600': '#e6007a',
    '--color-secondary-500': '#00ff80',
    '--color-accent-cyan': '#00ffff',
    '--color-dark-50': '#0a0a0a',
    '--color-dark-100': '#1a1a1a',
    '--glass-bg': 'rgba(255, 0, 128, 0.1)',
    '--glass-border': 'rgba(255, 0, 128, 0.3)',
  },
  matrix: {
    '--color-primary-500': '#00ff41',
    '--color-primary-600': '#00e63b',
    '--color-secondary-500': '#39ff14',
    '--color-accent-cyan': '#00ffff',
    '--color-dark-50': '#000000',
    '--color-dark-100': '#001100',
    '--glass-bg': 'rgba(0, 255, 65, 0.05)',
    '--glass-border': 'rgba(0, 255, 65, 0.2)',
  }
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('fargo-theme');
    return (saved as Theme) || 'dark';
  });

  const toggleTheme = () => {
    const themeOrder: Theme[] = ['dark', 'light', 'cyberpunk', 'matrix'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  useEffect(() => {
    localStorage.setItem('fargo-theme', theme);
    
    // Apply theme variables to CSS
    const root = document.documentElement;
    const themeVariables = themes[theme];
    
    Object.entries(themeVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Add theme class to body
    document.body.className = `theme-${theme}`;
    
    // Update body background for different themes
    if (theme === 'light') {
      document.body.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%, #f8fafc 100%)';
    } else if (theme === 'cyberpunk') {
      document.body.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 25%, #0a0a0a 50%, #1a0a1a 75%, #0a0a0a 100%)';
    } else if (theme === 'matrix') {
      document.body.style.background = 'linear-gradient(135deg, #000000 0%, #001100 25%, #000000 50%, #001100 75%, #000000 100%)';
    } else {
      document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #0c1426 25%, #0a0f1c 50%, #0d1420 75%, #0f172a 100%)';
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;