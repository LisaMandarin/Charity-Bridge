/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
           "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(100px, 1fr))'
      }
    },
  },
  plugins: [],
}

