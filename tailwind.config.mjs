/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        dark: "#0d121c",
        "dark-surface": "#121926",
        primary: "#b692f6",
        light: "#f2f4f7",
        "gray-muted": "#9aa4b2",
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        heading: ["Outfit", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
