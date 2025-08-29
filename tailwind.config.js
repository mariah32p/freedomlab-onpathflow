/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        'brand': {
          'navy': '#01004d',
          'teal': '#01b79e',
          'purple': '#8b5cf6',
        }
      }
    },
  },
  plugins: [],
}