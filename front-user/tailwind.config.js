/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#002B55",
        secondary: "#00051F",
        tertiary: "#080812",



        darkGray: "#171717",
        lightGray: "#e2e8f0",




        customBlue: "#0D6EFD",
        grayBlue: "#929FB0",
        grayBlack: "#081315",
        darkBlue: "#002B55",
        darkerBlue: "#001C44",

        customGreen: "rgba(25, 135, 84, .75)",
        darkGreen: "#0A6D0D",
        lightGreen: "#009C05",
        lighterGreen: "#309030",

        customYellow: "#FFDF00",
        darkYellow: "#D7BE12",
        darkerYellow: "#D1A008",
        yellowOrange: "#FFAD09",

        purple: "#541FB1",
        darkPurple: "#350C7C",

        customGray: "#E9ECEF",

        lightRed: "#DC3545",
        darkRed: "#AB2B38",
      },
    },
  },
  plugins: [],
};
