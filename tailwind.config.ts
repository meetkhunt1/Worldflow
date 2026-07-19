import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        paper: "#ffffff",
        brainpink: "#ff0283",
        soft: "#f4f4f4",
        muted: "#6b6b6b",
        // WorldFlow palette — primary brand colour.
        korange: "#F95B23",
        korangeDark: "#DE4913",
        knavy: "#1b2431",
      },
      fontFamily: {
        // Figtree (body) + Roboto Condensed (headlines), loaded via next/font.
        book: ["var(--font-book)", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Arial Narrow", "Impact", "sans-serif"],
      },
      maxWidth: {
        shell: "1440px",
      },
      transitionTimingFunction: {
        sc: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        marqueeX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        marquee: "marqueeX 26s linear infinite",
        float: "floatY 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
