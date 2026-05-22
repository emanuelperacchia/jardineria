/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#E8FBE8',
          100: '#C4F5C4',
          200: '#92EE92',
          300: '#5DE65D',
          400: '#2DE330',
          500: '#1FC420',
          600: '#0D8033',
          700: '#0B6B2B',
          800: '#1A401A',
          900: '#0F2E0F',
        },
      },
    },
  },
  plugins: [],
}
