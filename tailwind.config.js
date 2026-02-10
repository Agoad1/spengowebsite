/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0B',
        cyan: {
          DEFAULT: '#00E5FF',
          50: '#E0FCFF',
          400: '#00E5FF',
          500: '#00C4D9',
          600: '#00A3B3',
        },
        risk: '#FF3B30',
        body: '#E0E0E0',
        muted: '#A0A0A0',
        card: 'rgba(255, 255, 255, 0.03)',
        'card-border': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      letterSpacing: {
        headline: '-0.02em',
      },
    },
  },
  plugins: [],
};
