const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        600: '600px',
      },
      maxWidth: {
        120: '120px',
        100: '100px',
      },
      animation: {
        loadinGradient: 'loadinGradient 10s infinite',
      },
      keyframes: {
        loadinGradient: {
          '0%': {
            'background-color': '#171717',
            'color': '#fafafa',
          },
          '25%': {
            'background-color': '#737373',
            'color': '#404040',
          },
          '50%': {
            'background-color': '#fafafa',
            'color': '#171717',
          },
          '75%': {
            'background-color': '#737373',
            'color': '#404040',
          },
          '100%': {
            'background-color': '#171717',
            'color': '#fafafa',
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')],
};
