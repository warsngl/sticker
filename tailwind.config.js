const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'ex': '1280px',
        'exx': '1366px',
        'exxx': '1920px',
      },
    },
    screens:{
      'se': '360px',
      'xr': '414px',
      'gg': '560px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    },
    fontSize: {
      xxs: '.6rem',
      ...defaultTheme.fontSize,
    },
  },
  variants: {},
  plugins: [],
};
