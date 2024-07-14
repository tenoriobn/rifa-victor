/** @type {import('tailwindcss').Config} */
import forms  from '@tailwindcss/forms';

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    extend: {
      colors: {
        'slate-800': 'rgb(32 32 42)',
        'blue-500': 'rgb(78 115 223)',
        'blue-400': '#fff'
      },
    },
  },
  plugins: [forms],
}

