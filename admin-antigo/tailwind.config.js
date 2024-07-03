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
        darkBlue: "#20202a",
        "darkBlue-400": "#2a2b37",
        darkgreen: "#428534",
        lightGreen: "#4eac3a",
        // transparentBlack: "rgba(0,0,0,.4)",
        customTransparent: "rgba(0,0,0,.1)",
      },
      boxShadow: {
        opt1: "3px 1px 10px -9px #000",
      }
    },
  },
  plugins: [],
};
