/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Add dark mode support if needed later
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F8ECEF', // Soft Maroon Background
          100: '#F1D8DE',
          200: '#E5B8C2',
          300: '#D58E9E',
          400: '#C35E74',
          500: '#A52A44', // Light Maroon
          600: '#800020', // Primary Maroon
          700: '#6E001B',
          800: '#5C0014', // Dark Maroon
          900: '#4A0010',
          950: '#2D000A',
        },
        secondary: {
          50: '#FFFFFF', // Pure White
          100: '#FAFAFA', // Off White
          200: '#F3F4F6',
          300: '#E5E7EB', // Border
          400: '#D1D5DB',
          500: '#9CA3AF',
          600: '#6B7280', // Text Secondary
          700: '#4B5563',
          800: '#374151',
          900: '#1F2937', // Text Dark
          950: '#111827',
        },
        accent: {
          50: '#FCF0F3',
          100: '#F9DFE6',
          200: '#F0B8C7',
          300: '#E68CA2',
          400: '#D95878',
          500: '#C82B51', // Brighter highlight
          600: '#A5183A',
          700: '#830C29',
          800: '#6E0821',
          900: '#5C0A1E',
          950: '#36020E',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        surface: {
          primary: '#FFFFFF',
          secondary: '#FAFAFA',
          tertiary: '#F8ECEF',
        },
        border: '#E5E7EB',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'text-tertiary': '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
        'overlay': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(0,0,0,0.05), 0 0 3px rgba(0,0,0,0.02)',
        'card-hover': '0 12px 30px -4px rgba(0,0,0,0.08), 0 0 4px rgba(0,0,0,0.03)',
        'glow': '0 0 20px rgba(128, 0, 32, 0.5)',
        'glow-accent': '0 0 20px rgba(200, 43, 81, 0.5)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'counter': 'counter 2s ease-out',
        'slide-up-fade': 'slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down-fade': 'slideDownFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        slideUpFade: {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDownFade: {
          '0%': { opacity: 0, transform: 'translateY(-4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
