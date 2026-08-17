/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: '#1A0F00',
          surface: '#2D1A00',
          gold: '#D4A017',
          'gold-light': '#FFD700',
          'gold-dark': '#8B6914',
          cream: '#F5E6C8',
          red: '#8B0000',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        lato: ['Lato', 'sans-serif'],
        hind: ['Hind', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
