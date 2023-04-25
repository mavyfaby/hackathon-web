/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "index.html",
    "src/**/*.{vue,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Roboto", "sans-serif"],
      }
    },
  },
  plugins: [],
}

