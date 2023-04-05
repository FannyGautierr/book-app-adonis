/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/**/*.{edge,js,ts,vue,jsx,tsx}' // 👈
  ],
  theme: {
    extend: {
      margin:{
        center :'0 auto',
      },
      color:{
        'primary' : "#F1E5DF",
        'accent' : "#3C49F3"
      },
      fontFamily:{
        'title' :"DM Serif Display",
        'para' : "DM Sans"
      },
      backgroundColor:{
        'primary' : "#F1E5DF",
        'accent' : "#3C49F3"
      }
    },
  },
  plugins: [],
}

