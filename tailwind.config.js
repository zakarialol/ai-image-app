/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/*.{html,js}'],
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
        },
        scalesize:{
          "0%":{
            transform:"scale(1.5)",
          },
          "50%":{
            transform:"scale(1)",
          },
          "100%":{
            transform :"scale(1.5)"
          }
        }
      },
      animation:{
          skelton:'skeltonAnimation 1s ease infinite',
          dot1 : "scalesize 2s ease infinite 0s",
          dot2 : "scalesize 2s ease infinite .3s",
          dot3 : "scalesize 2s ease infinite .6s",
      }
      
    },
  },
  plugins: [],
  
}

