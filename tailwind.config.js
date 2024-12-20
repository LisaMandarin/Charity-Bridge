/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        "chat-bubble": "16px 16px 16px 0",
      },
    },
  },
  plugins: [],
};
