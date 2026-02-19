// selecting elements 
const getRandomQuoteBtn = document.querySelector("[data-random ='random-quote']")
const imgsSettingDiv = document.querySelector('[data-img-stting = "img-settings"]')
const imgMdlTitle = document.querySelector("[data-title='ModalTitle']")
const imgCountTitle = document.querySelector("[data-title='count-title']")
const asptRatioTitle = document.querySelector("[data-title='aspectratio-title']")
// // testing if the ur working or no
import "/ui.js"
import { randomQuotefunc, imageModelFunc , imgCountFunc,imgAspectRatioFunc} from "./ui.js"
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
    const item = currentDiv
    item?.nextElementSibling.classList.toggle('activeNone')
    return
  }
  if(currentDiv.dataset.imgnbr === 'imgNbr'){
    const item = currentDiv
    item?.nextElementSibling.classList.toggle('activeNone')
    return
  }
  if(currentDiv.dataset.landscape === 'landScape'){
    const item = currentDiv
    item?.nextElementSibling.classList.toggle('activeNone')
    return
  }
  //this for the content inside 
  //for img model
  if(currentP.dataset.mode === 'forImgModel'){
    imgMdlTitle.textContent = currentP.textContent
    return
  }
  // for img count
  if(currentP.dataset.mode === 'forImgCount'){
    imgCountTitle.textContent = currentP.textContent
    return
  }
  // for aspt ratio
  if(currentP.dataset.mode === 'forAspctRatio'){
    asptRatioTitle.textContent = currentP.textContent
    return
  }
})