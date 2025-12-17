/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#011F5B',
        'navy-blue-light': '#003262',
        'navy-blue-lighter': '#00416A',
        'warm-orange': '#FF6B35',
        'warm-orange-light': '#FF8C61',
        'warm-orange-dark': '#E55A2B',
        'light-blue': '#E8F4F8',
        'light-blue-medium': '#D0E8F2',
        'light-blue-dark': '#B8DCE8',
      },
      fontFamily: {
        'heading': ['Lexend', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

