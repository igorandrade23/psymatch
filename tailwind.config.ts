import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f7f1e8",
        ember: "#c75b39",
        ink: "#1f1a17",
        moss: "#647a57",
        blush: "#df9b8d",
        gold: "#d9b05f",
      },
      boxShadow: {
        card: "0 18px 50px rgba(45, 31, 21, 0.18)",
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(31, 26, 23, 0.06) 1px, transparent 0)",
      },
      fontFamily: {
        sans: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;

