/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // GREEN — primary brand color, Tanzanian nature & growth
        forest: {
          50: '#f0f9f0',
          100: '#dcf0dc',
          200: '#bbe1bc',
          300: '#8ccb8e',
          400: '#54a857',
          500: '#2e8a31',
          600: '#1d6f21',
          700: '#185a1c',
          800: '#144918',
          900: '#103b14',
          950: '#08210b',
        },
        // RED — accent / CTA, warmth & passion
        spice: {
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
        hibiscus: {
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
        // WHITE — clean, bright neutrals for backgrounds
        cream: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f4f4f5',
          300: '#e7e7e8',
          400: '#d4d4d5',
          500: '#a1a1a3',
          600: '#71717a',
          700: '#52525b',
          800: '#3f3f46',
          900: '#27272a',
          950: '#18181b',
        },
        // Neutrals — soft warm-gray for text & borders, harmonized with green/red
        earth: {
          50: '#f6f7f6',
          100: '#e9ebee',
          200: '#d3d8dc',
          300: '#b0b8bf',
          400: '#828d96',
          500: '#5f6b74',
          600: '#4a545c',
          700: '#3d464d',
          800: '#333a40',
          900: '#2b3035',
          950: '#15181b',
        },
        // Semantic
        success: { 500: '#2e8a31', 600: '#1d6f21' },
        warning: { 500: '#f87171', 600: '#dc2626' },
        error: { 500: '#ef4444', 600: '#dc2626' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(24, 90, 28, 0.08)',
        card: '0 8px 30px -8px rgba(24, 90, 28, 0.12)',
        lift: '0 20px 50px -12px rgba(24, 90, 28, 0.22)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'toast-in': {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'price-pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)' },
        },
        'cart-bounce': {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.35)' },
          '60%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        'error-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-4px)' },
          '40%, 80%': { transform: 'translateX(4px)' },
        },
        'check-draw': {
          '0%': { strokeDashoffset: '40' },
          '100%': { strokeDashoffset: '0' },
        },
        'expand-height': {
          '0%': { opacity: '0', maxHeight: '0' },
          '100%': { opacity: '1', maxHeight: '200px' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'fade-out': 'fade-out 0.25s ease both',
        'scale-in': 'scale-in 0.25s ease both',
        'slide-down': 'slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-right': 'slide-right 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'toast-in': 'toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'price-pulse': 'price-pulse 0.4s ease',
        'cart-bounce': 'cart-bounce 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'error-shake': 'error-shake 0.4s ease both',
        'check-draw': 'check-draw 0.5s ease-out 0.1s both',
        'expand-height': 'expand-height 0.3s ease both',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
};
