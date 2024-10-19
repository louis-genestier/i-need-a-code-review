/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/**/*.edge', './inertia/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi-Variable', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
