/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "customTransparent": 'rgba(0, 0, 0, 0)',
      "main-color": "var(--main-color)",
      "text-color": "var(--text-color)",
      "background-color": "var(--background-color)",
      "red" : "var(--red)",
      "border-color" : "var(--border-color)",
      "box-background" : "var(--box-background)",
      "product-descripion" : "var(--product-descripion)",
    },
  },
  plugins: [],
}