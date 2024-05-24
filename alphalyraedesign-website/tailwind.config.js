/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        accent: "#478ec4",
        darkAccent : "#39739f",
        darkSecondary: "#80a327",
        secondary: "#a9d734",
        background: "#FFFFFF",
        backgrounddark: "#22252a",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

