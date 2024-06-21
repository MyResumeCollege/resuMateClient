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
        accent: 'var(--accent-color)'
      },
      fontFamily: {
        poppins: ["Poppins"]
      }
    },
  },
  plugins: [
    preilne,
  ]
}