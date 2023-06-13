/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        600: '600px',
      },
      maxWidth:{
        120: '120px',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
};
