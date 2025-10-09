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
      fontFeatureSettings: {
        'cv02': ['cv02'],
        'cv03': ['cv03'], 
        'cv04': ['cv04'],
        'cv11': ['cv11'],
      },
      colors: {
        cyber: {
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
        neon: {
          blue: '#00f5ff',
          purple: '#bf00ff', 
          green: '#00ff41',
          pink: '#ff0080',
          yellow: '#ffff00',
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'grid-move': 'grid-move 20s linear infinite',
        'glitch': 'glitch 0.5s infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
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
        'grid-move': {
          '0%': {
            backgroundPosition: '0 0',
          },
          '100%': {
            backgroundPosition: '50px 50px',
          },
        },
        'glitch': {
          '0%, 14%, 15%, 49%, 50%, 99%, 100%': {
            transform: 'translate(0)',
          },
          '15%, 49%': {
            transform: 'translate(-2px, 0)',
          },
        },
      },
      backdropBlur: {
        '4xl': '72px',
      },
      boxShadow: {
        'neon-blue': '0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6',
        'neon-purple': '0 0 5px #8b5cf6, 0 0 10px #8b5cf6, 0 0 15px #8b5cf6',
        'neon-cyan': '0 0 5px #06b6d4, 0 0 10px #06b6d4, 0 0 15px #06b6d4',
        'glow': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}