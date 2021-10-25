// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          dark: '#545871',
          darker: '#424B63',
          darkest: '#373A4D',
        },
        blue: {
          dark: '#233975',
          highlight: '#2C4893',
        },
        lightblue: {
          dark: '#819E9E',
          highlight: '#CEE3E6',
        },
        green: {
          dark: '#3CD68E',
          highlight: '#65ECAD'
        },
        gold: {
          dark: '#CF903E',
          highlight: '#FFD895',
        }
      },
      fontFamily: {
        text: ["Segoe UI"],
        header: ["Montserrat"],
      }
    },
  },
  variants: {},
  plugins: [],
}