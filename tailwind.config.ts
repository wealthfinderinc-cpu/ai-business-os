import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    extend: {
      colors: {
        // Add any project-specific color tokens here
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out forwards',
      },
    },
  },
  // Keep a safelist for tw-animate-css and other dynamic classes that may
  // not be discovered by the static content scanner.
  safelist: [
    { pattern: /^animate-/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^tw-animate-/, variants: [] },
  ],
  plugins: [],
};

export default config;
