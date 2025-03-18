/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#3B82F6', // Blue
      secondary: '#10B981', // Green
      background: '#F9FAFB', // Light gray
    },
    fontFamily: {
      sans: ['montserrat'],
    },
    screens: {
      sm: '640px',
      md: '1024px',
      lg: '1280px',
    },
    extend: {},
  },
  plugins: [],
};
