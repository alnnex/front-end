/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#FFB4A7',
        'secondary': '#FEBB90',
        'tertiary': '#FFF1D6',
      }
    },
  },
  plugins: [],
}