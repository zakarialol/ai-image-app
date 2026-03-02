/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    extend: {
      colors:{
        firstClr:'#31393c',// for backgrounds
        secondClr:'#368F8B', // for button background
        thirdClr:'#CCE6F4',// for main background
        fourthClr:'#A33B20'// for bady background color
      },
      keyframes:{
        test:{
          "0%,100%":{
            backgroundColor: 'gray'
          },
          "50%":{
            backgroundColor:'white'
          }
        }
      },
      animation:{
          test:'test 1s ease infinite'
      }
      
    },
  },
  plugins: [],
}

