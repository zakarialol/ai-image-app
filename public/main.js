// selecting elements 
const getRandomQuoteBtn = document.querySelector("[data-random ='random-quote']")
const imgsSettingDiv = document.querySelector('[data-img-stting = "img-settings"]')
const imgMdlTitle = document.querySelector("[data-title='ModalTitle']")
const imgCountTitle = document.querySelector("[data-title='count-title']")
const asptRatioTitle = document.querySelector("[data-title='aspectratio-title']")
export const genirateBtn = document.querySelector("[data-Btn='genirateBtn']")
const modalSvgsBtns = document.querySelectorAll("[data-btn='modal-svgs'] svg")
const countSvgsBtns = document.querySelectorAll("[data-btn='count-svgs'] svg")
const aspectSvgsBtns = document.querySelectorAll("[data-btn='aspect-svgs'] svg")
// const themeButton = document.querySelector("[data-btn='theme-mode']")
const themModeSvg = document.querySelectorAll("[data-btn='svg-btn']")
const darkmodebtn = document.getElementById('darkmodeBtn')
const lightmodeBtn = document.getElementById('lightmodeBtn')
import { ImageParameter,imageSettingArr } from "./state.js"
import { randomQuotefunc , genirateWidthAndHeight ,checkParametersFunc,toggleHiddenSvgsFunc, errorMsgFunc} from "./ui.js"
import { generate } from "./api.js"
import "./api.js"
// adding event listenre
getRandomQuoteBtn.addEventListener('click',()=>{
  randomQuotefunc()
})
// calling funtion to open the image parameter
imgsSettingDiv.addEventListener('click',(event)=>{
  if(event.target.closest('div').dataset.imgStting === 'img-settings'){
    return 
  }
  const currentDiv = event.target.closest('div')
  const currentP = event.target.closest('p')
  if(currentDiv.dataset.imgtype === 'imgType'){
    currentDiv?.nextElementSibling.classList.toggle('activeNone')
    toggleHiddenSvgsFunc(modalSvgsBtns)
    return
  }
  if(currentDiv.dataset.imgnbr === 'imgNbr'){
    currentDiv?.nextElementSibling.classList.toggle('activeNone')
    toggleHiddenSvgsFunc(countSvgsBtns)
    return
  }
  if(currentDiv.dataset.landscape === 'landScape'){
    currentDiv?.nextElementSibling.classList.toggle('activeNone')
    toggleHiddenSvgsFunc(aspectSvgsBtns)
    return
  }
  //this for the content inside 
  //for img model
  if(currentP.dataset.mode === 'forImgModel'){
    imgMdlTitle.textContent = currentP.textContent
    imageSettingArr[0] = currentP.dataset.paramiter.trim()
    ImageParameter.model = currentP.dataset.paramiter.trim()
    event.target.closest('div').classList.add('activeNone')
    toggleHiddenSvgsFunc(modalSvgsBtns)
    return
  }
  // for img count
  if(currentP.dataset.mode === 'forImgCount'){
    imgCountTitle.textContent = currentP.textContent
    imageSettingArr[1] = currentP.textContent.trim()
    ImageParameter.count =Number(currentP.textContent.trim().slice(0,1)) 
    event.target.closest('div').classList.add('activeNone')
    toggleHiddenSvgsFunc(countSvgsBtns)
    return
  }
  // for aspt ratio
  if(currentP.dataset.mode === 'forAspctRatio'){
    asptRatioTitle.textContent = currentP.textContent
    imageSettingArr[2] = currentP.textContent.trim()
    // this for image height and widgh
    const imgObj = genirateWidthAndHeight(currentP.textContent.trim())
    ImageParameter.height = Number(imgObj.height) 
    ImageParameter.width = Number(imgObj.width) 
    event.target.closest('div').classList.add('activeNone')
    toggleHiddenSvgsFunc(aspectSvgsBtns)
    return
  }
})
// working on the genirate btn 
genirateBtn.addEventListener('click',()=>{
  console.log(ImageParameter,"image parametere")
  if(!navigator.onLine){
    errorMsgFunc('please check the internet')
    return
  }
  if(checkParametersFunc()){
    console.log('hello world')
    // return
  }else{
    generate()
  }
})
// ching if the internet exist or no 
if(localStorage.getItem("currentTheme")){
    toggleHiddenSvgsFunc(themModeSvg)
        // document.documentElement.classList.add('dark')
}
window.onload = ()=>{
  if(!navigator.onLine){
    errorMsgFunc('please check the internet')
  }
}
// dark mode main div 
darkmodebtn.addEventListener('click',()=>{
  console.log('you just presst the dark mode')
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('currentTheme',"dark")
  toggleHiddenSvgsFunc(themModeSvg)
})
//light mode btn
lightmodeBtn.addEventListener('click',()=>{
  console.log('you just presst the light mode')
  document.documentElement.classList.remove('dark')
  localStorage.removeItem("currentTheme")
  toggleHiddenSvgsFunc(themModeSvg)
})
