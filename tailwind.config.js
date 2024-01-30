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
        "warnText": '#e0a883',
        'weirdBgIg': '#1f2937',
        'weirdBgLight': '#374151',
      },
      keyframes: {
        popup: {
          '0%, 100%': { transform: 'translate(0%, 150%)' },
          '10%, 90%': { transform: 'translate(0%, 0%)'},
        }
      },
      animation: {
        popup: 'popup 3.2s'
      }
    },
    borderWidth: {
      '1': '1px',
      '2': '2px'
    }
  },
  plugins: [],
}

