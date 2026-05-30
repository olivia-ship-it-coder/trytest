/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        ink: {
          50: '#f8f6f0',
          100: '#ebe6d8',
          200: '#d8cfb8',
          300: '#c4b694',
          400: '#b09d74',
          500: '#9c885b',
          600: '#7a6a48',
          700: '#5c4f37',
          800: '#4a3d2b',
          900: '#3d3223',
          950: '#1f1a11',
        },
        leather: {
          50: '#f5f0e8',
          100: '#e8ddd0',
          200: '#d4c0ab',
          300: '#bca086',
          400: '#a8846a',
          500: '#967057',
          600: '#7d5b48',
          700: '#66483b',
          800: '#543d32',
          900: '#4a3728',
          950: '#2a1e15',
        },
        crimson: {
          50: '#fdf2f2',
          100: '#fce3e3',
          200: '#f9cbcc',
          300: '#f4a7a8',
          400: '#ec7a7c',
          500: '#dc4b4e',
          600: '#c93336',
          700: '#a9262a',
          800: '#8b2225',
          900: '#772226',
          950: '#410d0f',
        },
        page: {
          DEFAULT: '#f5f0e8',
          dark: '#e8ddd0',
          light: '#faf7f2',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif CN"', 'serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'book': '0 2px 12px rgba(74, 55, 40, 0.08), 0 1px 3px rgba(74, 55, 40, 0.06)',
        'book-lg': '0 8px 30px rgba(74, 55, 40, 0.12), 0 2px 8px rgba(74, 55, 40, 0.06)',
        'inner-glow': 'inset 0 1px 3px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
};