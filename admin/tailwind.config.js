/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1976D2",
        secondary: "#64B5F6 ",
        tertiary: "#424242",
        transparentBlack: "rgba(0,0,0,.4)",
        customTransparent: "rgba(0,0,0,.1)",
      },
    },
  },
  plugins: [],
};
