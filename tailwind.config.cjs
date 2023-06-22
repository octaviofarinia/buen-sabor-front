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
        100: '100px',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms'),],
};
