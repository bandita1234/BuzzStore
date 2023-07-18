/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "main-color": "var(--main-color)",
      "text-color": "var(--text-color)",
      "background-color": "var(--background-color)",
      "red" : "var(--red)"
    },
  },
  plugins: [],
}