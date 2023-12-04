module.exports = {
  purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'butterfly-ai': "url('/images/bg-image.jpg')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
