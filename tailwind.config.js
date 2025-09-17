/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        golf: {
          50: '#f0f9f4',
          100: '#dcf2e4',
          200: '#bce4cd',
          300: '#8dd0ab',
          400: '#57b482',
          500: '#339966',
          600: '#247a50',
          700: '#1e6142',
          800: '#1a4d36',
          900: '#16402c',
        }
      }
    },
  },
  plugins: [],
}
