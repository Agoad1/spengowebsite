/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#1a1a1a',
        surface: '#242424',
        primary: {
          DEFAULT: '#a855f7',
          hover: '#9333ea',
        },
        cyan: {
          DEFAULT: '#06b6d4',
        },
        risk: '#FF3B30',
        body: '#ffffff',
        muted: '#a0a0a0',
        card: '#242424',
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
