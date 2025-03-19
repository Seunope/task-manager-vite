/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      background: '#F9FAFB',
      gray: {
        1: '#BBBBBB',
        2: '#EEEEEE',
        3: '#8B909A',
      },
      green: {
        3: '#F5F8F4',
      },
      blue: {
        1: '#0CA6DB',
        2: '#0779E4',
        3: '#2202E9',
      },
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
