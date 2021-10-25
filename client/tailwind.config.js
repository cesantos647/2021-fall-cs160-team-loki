// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'tower-hall': "url('/towerhall.jpg')",
      }),
    },
  },
  variants: {},
  plugins: [],
}