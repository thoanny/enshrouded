/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        quality: {
          common: "#e1f3d2",
          uncommon: "#53d57d",
          rare: "#a8e1ff",
          epic: "#d4b5ff",
          legendary: "#ffe03e",
        },
      },
    },
  },
  safelist: [
    {
      pattern: /(text|border)-quality-(common|uncommon|rare|epic|legendary)/,
    },
  ],
  daisyui: {
    themes: ["dark"],
  },
  plugins: [require("daisyui")],
};
