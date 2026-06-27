/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0B1220',
          900: '#0F172A',
          700: '#1E2A44',
        },
        academic: {
          50: '#EEF3FC',
          100: '#DCE6F9',
          200: '#B8CCF2',
          300: '#8FAEE9',
          400: '#5A82DA',
          500: '#2E54B8',
          600: '#1E3A8A',
          700: '#172E6E',
          800: '#122353',
          900: '#0C1A3D',
        },
        gold: {
          50: '#FDF8EC',
          100: '#FBEFCB',
          300: '#F0CE6B',
          400: '#E3B73C',
          500: '#C99A22',
          600: '#A87E16',
        },
        paper: '#F8FAFC',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        rail: '0 1px 0 0 rgba(15, 23, 42, 0.06)',
        card: '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.12)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease',
      },
    },
  },
  plugins: [],
}