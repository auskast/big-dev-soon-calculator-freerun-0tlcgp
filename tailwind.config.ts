import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      // bg
      "indygo-200": "#8c9eff",
      "calc-bg-dark": "#202128",
      "calc-surface": "#262831",
      "calc-btn-dark": "#2b2d35",
      "calc-bg-light": "#eeeeee",
      // dark
      "blue-200": "#90caf9",
      "red-200": "#e57373",
      white: "#ffffff",
      "white/60": "rgba(255, 255, 255, 0.60)",
      "white/36": "rgba(255, 255, 255, 0.36)",
      "gray-900/8": "rgba(33, 33, 33, 0.08)",
      // light
      "blue-400": "#42a5f5",
      "red-400": "#ef5350",
      "gray-900": "#212121",
      "gray-900/60": "rgba(33, 33, 33, 0.60)",
      "gray-900/36": "rgba(33, 33, 33, 0.36)",
      "white/8": "rgba(255, 255, 255, 0.08)",
    },
    extend: {
      dropShadow: {
        button: "0px 10px 20px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
