import preilne from 'preline/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        bg: 'var(--bg-color)',
        accent: 'var(--accent-color)',
        dark: 'var(--color-primary-dark)'
      },
      fontFamily: {
        poppins: ["Poppins"],
        ptserif: ["PT serif"],
        lora: ['Lora']
      }
    },
  },
  plugins: [
    preilne,
  ]
}