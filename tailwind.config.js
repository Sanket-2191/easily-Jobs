
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/layout/*.ejs'],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
