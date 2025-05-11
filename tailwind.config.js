/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors:{
        greyish:{
          base: "#D8D5D5"
        }
      },
      fontFamily: {
        'press-start': ['PressStart2P', 'monospace']
      },
    },
  },
  plugins: [],
};
