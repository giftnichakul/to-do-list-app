/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
        "primary": "#585292",
        "secondary": "#E07C7C",
        "accent": "#FFFFFF",
        "neutral": "#3B3B3B",
        "base-100": "F5F5F5"
      }
    },
  ]}
}
