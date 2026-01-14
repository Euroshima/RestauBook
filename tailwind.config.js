/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        beige: '#F8F5F0',
        brown: '#2D1E12',
        glass: 'rgba(255,255,255,0.6)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        '2xl': '1.5rem',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(44, 31, 18, 0.12)',
      },
    },
  },
  plugins: [],
};
