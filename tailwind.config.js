/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe', 
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        glass: {
          50: 'rgba(255, 255, 255, 0.02)',
          100: 'rgba(255, 255, 255, 0.04)',
          200: 'rgba(255, 255, 255, 0.06)',
          300: 'rgba(255, 255, 255, 0.08)',
          400: 'rgba(255, 255, 255, 0.10)',
          500: 'rgba(255, 255, 255, 0.12)',
        },
        dark: {
          50: '#0A0F1C',
          100: '#0F172A',
          200: '#1E293B',
          300: '#334155',
          400: '#475569',
          500: '#64748B',
          600: '#94A3B8',
          700: '#CBD5E1',
          800: '#E2E8F0',
          900: '#F1F5F9',
        },
        neon: {
          blue: '#3B82F6',
          cyan: '#06B6D4',
          green: '#22C55E',
          yellow: '#F59E0B',
          red: '#EF4444',
          purple: '#8B5CF6',
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'grid-move': 'grid-move 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.3), 0 0 10px rgba(59, 130, 246, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'glow': {
          '0%': {
            textShadow: '0 0 10px #3B82F6, 0 0 20px #3B82F6, 0 0 30px #3B82F6',
          },
          '100%': {
            textShadow: '0 0 5px #3B82F6, 0 0 10px #3B82F6, 0 0 15px #3B82F6',
          },
        },
        'shimmer': {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      backdropBlur: {
        '4xl': '72px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-inset': 'inset 0 0 1px rgba(255, 255, 255, 0.1)',
        'glow-sm': '0 0 10px rgba(59, 130, 246, 0.3)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-lg': '0 0 30px rgba(59, 130, 246, 0.5)',
        'neon-blue': '0 0 5px #3B82F6, 0 0 10px #3B82F6, 0 0 15px #3B82F6',
        'neon-green': '0 0 5px #22C55E, 0 0 10px #22C55E, 0 0 15px #22C55E',
        'neon-red': '0 0 5px #EF4444, 0 0 10px #EF4444, 0 0 15px #EF4444',
        'inner-border': 'inset 0 0 1px rgba(255, 255, 255, 0.1), 0 0 30px rgba(0, 0, 50, 0.3)',
        'card-glow': '0 0 30px rgba(0, 0, 80, 0.3)',
        'card-hover': '0 0 50px rgba(59, 130, 246, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}