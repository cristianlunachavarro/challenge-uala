const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Public Sans"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          400: '#00E0F3',
          500: '#00c4fd',
        },
        dark: '#333333',
      },
    },
  },
  variants: {
    extend: {},
  }
};
