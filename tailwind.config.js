/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        primaryGradient: 'var(--color-primaryGradient)',
        secondary: 'var(--color-secondary)',
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        
        gray: {
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: '#F7F7F7',
          400: '#797979'
        },
        border: 'var(--color-border)',
        bgwhite: 'var(--color-bgwhite)',
        textprimary:'var(--color-textprimary)',
        blue: '#24ABE3',
        blackText:'var(--color-blacktext)',
        
      },
      fontFamily:{
          outfit: ['Outfit', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        'sm': '360px', 
        'md': '540px', 
        'lg': '768px',
        'xl': '1024px', 
        '2xl': '1280px',
        '3xl': '1440px',
        '4xl': '1600px', 
        '5xl': '1920px', 
      },
    },
  },
  plugins: [],
};
