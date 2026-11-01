import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FBBF24",
        "primary-dark": "#F59E0B",
        ink: "#151515",
        background: "#FFFDF7",
        surface: "#FFFFFF",
        muted: "rgba(21, 21, 21, 0.70)",
      },
      boxShadow: {
        soft: "0 18px 55px rgba(21, 21, 21, 0.07)",
        button: "0 10px 24px rgba(245, 158, 11, 0.24)",
      },
      animation: {
        "fade-up": "fadeUp 650ms ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
