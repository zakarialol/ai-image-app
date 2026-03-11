/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        firstClr:'#31393c',// for backgrounds
        secondClr:'#368F8B', // for button background
        thirdClr:'#CCE6F4',// for main background
        fourthClr:'#A33B20'// for bady background color
      },
      keyframes:{
        skeltonAnimation:{
          "0%,100%":{
            opacity:.5
          },
          "50%":{
            opacity:.1
          }
        }
      },
      animation:{
          skelton:'skeltonAnimation 1s ease infinite'
      }
      
    },
  },
  plugins: [],
  
}

