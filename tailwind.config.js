/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins']
      },
      colors: {
        'primary-orange': '#FF5722',
        'blue-marin':'#062c6e',
        'white':'#f5f5f5',
        'blue-hover':'#0E3E91',
        'purple':'#6788FF',
        'full-white':'#ffffff',
        "red":'#fc5d5d',
        "green":'#86d8b4',
        "blue":"#1F55D2"
      },
      backgroundImage: {
        'bg-blue': "url('../public/bg-blue.svg')",
        'illustration':"url('../public/illustration.svg')"
      },
      screens: {
        '2xl': '1600px'
      }
    },
  },
  plugins: [],
}
