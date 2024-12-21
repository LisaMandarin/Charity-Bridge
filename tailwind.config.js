/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        "chat-bubble-other": "16px 16px 16px 0",
        "chat-bubble-own": "16px 16px 0 16px",
      },
    },
  },
  plugins: [],
};
