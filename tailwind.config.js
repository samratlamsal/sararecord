/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        astra: {
          black: '#050505',
          charcoal: '#111111',
          gold: '#D6A84A',
          softGold: '#F3D98B',
          cream: '#F7F3EA',
        },
      },
      boxShadow: {
        gold: '0 22px 70px rgba(214, 168, 74, 0.18)',
      },
    },
  },
  plugins: [],
};
