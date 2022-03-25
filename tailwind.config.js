const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*/*.{js,jsx,ts,tsx,vue}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: {
      xxs: "360px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: "#38b000",
      blue: {
        100: "#CAF0F8",
        200: "#ADE8F4",
        300: "#90E0EF",
        400: "#48CAE4",
        500: "#00B4D8",
        600: "#0096C7",
        700: "#0077B6",
        800: "#023E8A",
        900: "#03045E",
      },
    },
    extend: {
      fontFamily: {
        urbanist: ["Roboto", "sans-serif"],
      },
      colors: {
        violet1: "#8312A5",
        blue1: "#0037A5",
        pink1: "#fc0fc0",
        blue2: "#0b54fe",
        violetDark: "#10002B",
        violet: "#240046",
        persianIndigo: "#3C096C",
        purple: "#5A189A",
        frenchViolet: "#7B2CBF",
        orchid: "#9D4EDD",
        heliotrope: "#C77DFF",
        mauve: "#E0AAFF",
        DARKgray: "#121212",
        DARKtext: "#FFFFFF",
      },
      opacity: {
        87: 0.87,
        60: 0.6,
        38: 0.38,
      },
    },
  },
  variants: {
    extend: {
      theme: {
        height: {
          pic: "450px",
        },
        borderWidth: {},
      },
    },
  },
  plugins: [],
};
