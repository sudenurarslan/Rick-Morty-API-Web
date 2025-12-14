/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        galaxyBg: "#0A0118",
        galaxyBgSoft: "#1A0B2E",
        galaxyCard: "#16213E",
        galaxyAccent: "#9D4EDD",
        galaxyAccentSoft: "#C77DFF",
        galaxyAccentDark: "#7209B7",
        galaxyTextSoft: "#E0AAFF",
        galaxyTextMuted: "#B8A6D9",
        galaxyBorder: "#3C096C",
      },
      keyframes: {
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 12s linear infinite",
      },
    },
  },
  plugins: [],
};
