/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs':'0',
        'sm': '768px',
        'md': '968px',
        'lg': '1280px',
        'xl': '1536px',
        // '2xl': 'px',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        'abril-fatface': ['Abril Fatface', 'cursive'],

      },

    },
  },
  plugins: [],
}
