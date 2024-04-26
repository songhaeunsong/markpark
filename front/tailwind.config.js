/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-violet": "#9859ff",
        "hover-color": "#2c0072",
      },
      boxShadow: {
        "custom-purple": "3px 3px 10px 1px #6c5483",
        "hover-purple": "5px 5px 10px 1px #6c5483",
        "custom-gray": "1px 1px 5px 1px #e2e2e2",
        "hover-gray": "2px 2px 5px 1px #aeaeae",
      },
    },
  },
  plugins: [],
};
