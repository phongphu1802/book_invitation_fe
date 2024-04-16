/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      fontFamily: {
        "source-sans-pro": ["Source Sans Pro", "sans-serif"],
      },
      padding: {
        4.5: "1.125 rem",
      },
      colors: {
        primary: {
          ...colors.violet,
        },
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "9/16": "9 / 16",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        primary: "9999px",
      },
      height: {
        4.5: "18px",
        13: "3.25rem",
        15: "3.75rem",
        120: "30rem",
        65: "43.25rem",
        "fit-layout": "calc(100vh - 80px)",
      },
      minHeight: {
        "fit-layout": "calc(100vh - 80px)",
        13: "3.25rem",
      },
      maxHeight: {
        "fit-layout": "calc(100vh - 80px)",
      },
      scale: {
        25: "0.25",
        120: "1.2",
        140: "1.4",
        160: "1.6",
        175: "1.75",
        180: "1.8",
        200: "2.00",
      },
      width: {
        13: "3.25rem",
        4.5: "18px",
        128: "32rem",
        160: "40rem",
        "fit-layout": "calc(100% - 288px)",
      },
      boxShadow: {
        ...defaultTheme.boxShadow,
        xl: "0px 5px 14px 0px rgba(100, 100, 111, 0.2)",
        left: "0px 2px 4px 0px rgba(14, 30, 37, 0.12) , 0px 2px 16px 0px rgba(14, 30, 37, 0.32)",
      },
      keyframes: {
        dash: {
          "0%": { "stroke-dasharray": "1, 150", "stroke-dashoffset": 0 },
          "50%": { "stroke-dasharray": "90, 150", "stroke-dashoffset": -35 },
          "100%": { "stroke-dasharray": "90, 150", "stroke-dashoffset": -124 },
        },
        "super-bounce": {
          "0%, 20%, 50%, 80%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
          },
          "40%": {
            transform: "translateY(-30%)",
            animationTimingFunction: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
          },
          "60%": {
            transform: "translateY(30%)",
            animationTimingFunction: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
          },
        },
      },
      animation: {
        dash: "dash 1.5s ease-in-out infinite",
        "super-bounce": "super-bounce 1s ease-in-out infinite",
      },
    },
    screens: {
      xs: "320px",
      ...defaultTheme.screens,
      "3xl": "1600px",
      "4xl": "1920px",
    },
  },

  plugins: [require("tailwind-scrollbar")],
};
