/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderCustom: {
        color: "#526763",
      },
      colors: {
        army: "#6f7d7a",
        "army-hover": "#4b5754",
      },
    },
  },
  plugins: [],
}
