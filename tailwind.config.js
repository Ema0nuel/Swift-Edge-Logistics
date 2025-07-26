/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          DEFAULT: '#142D4C',
          light: '#243B55',
          dark: '#0F1E33',
        },
        peach: {
          DEFAULT: '#FDF5E6',
          soft: '#FBECD5',
          dark: '#F3E4C4',
        },
        accent: {
          DEFAULT: '#FFD76F',
          soft: '#FFE8A1',
          dark: '#D9B450',
        },
        text: {
          light: '#ffffff',
          dark: '#1F2937',
          subtle: '#4B5563',
        },
        background: {
          light: '#FDF5E6',
          dark: '#0E172A',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}
