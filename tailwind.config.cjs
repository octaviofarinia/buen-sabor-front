/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    maxWidth: {
      3.75: '60px',
      7.5: '120px',
      9: '144px',
    },
  },
  darkMode: 'class',
  plugins: [],
};
