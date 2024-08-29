/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '1100px': {'max': '1100px'},  // Custom breakpoint at 1100px
      },
    },
  },
  plugins: [],
};
