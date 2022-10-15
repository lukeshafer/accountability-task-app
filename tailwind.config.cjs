/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        grow: "clamp(1rem, calc(16vw - 4rem), 5rem)",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  presets: [require("@downwindcss/easings")],
};
