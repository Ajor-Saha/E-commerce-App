/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      height: {
        '100': '29rem',
        '110': '35rem',
      },
      padding: {
        '18': '4.5rem'
      },
    },
    colors: {
      newarrival: '#fcf4e9',
      charcoal: '#36454F',
      darkGreen: '#023020',
      darkPurple: '#301934',
      jetBlack: '#343434',
      licorice: '#1B1212',
      matteBlack: '#28282B'
    }
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin'),
    require('tailwind-scrollbar')
  ],
  daisyui: {
    themes: ["light"],
  },
}

