/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'black': '#0f0f0f',
        'lblack': '#3B3B3B',
        'lgray': '#232529',
        'defText': '#767676',
        'actText': '#d8d8d8',
      }
    },
  },
  plugins: [],
}

