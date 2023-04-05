/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/**/*.{edge,js,ts,vue,jsx,tsx}' // 👈
  ],
  theme: {
    extend: {
      margin:{
        center :'0 auto',
      }
    },
  },
  plugins: [],
}

