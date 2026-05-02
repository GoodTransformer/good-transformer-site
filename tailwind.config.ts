import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sand: "rgb(var(--color-sand) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        mist: "rgb(var(--color-mist) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        slate: "rgb(var(--color-slate) / <alpha-value>)",
        copper: "rgb(var(--color-copper) / <alpha-value>)",
        brass: "rgb(var(--color-brass) / <alpha-value>)",
        moss: "rgb(var(--color-moss) / <alpha-value>)",
        line: "rgb(var(--color-line) / 0.14)",
        glow: "rgb(var(--color-glow) / 0.7)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      boxShadow: {
        glow: "0 28px 80px rgba(4, 31, 37, 0.14)",
      },
      letterSpacing: {
        display: "0.22em",
      },
      backgroundImage: {
        haze:
          "radial-gradient(circle at top, rgba(0, 140, 149, 0.08), transparent 32%), radial-gradient(circle at 82% 8%, rgba(196, 135, 58, 0.05), transparent 26%), linear-gradient(180deg, rgba(4, 31, 37, 0.025), rgba(4, 31, 37, 0))",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "scale(1.02) translate3d(0, 0, 0)" },
          "50%": { transform: "scale(1.08) translate3d(-1.5%, 1%, 0)" },
        },
        rise: {
          from: { opacity: "0", transform: "translate3d(0, 30px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        lineSweep: {
          from: { transform: "scaleX(0)", transformOrigin: "left" },
          to: { transform: "scaleX(1)", transformOrigin: "left" },
        },
      },
      animation: {
        drift: "drift 22s ease-in-out infinite",
        rise: "rise 0.8s ease forwards",
        line: "lineSweep 1.1s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
