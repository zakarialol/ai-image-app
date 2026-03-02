// selecting elements 
const getRandomQuoteBtn = document.querySelector("[data-random ='random-quote']")
const imgsSettingDiv = document.querySelector('[data-img-stting = "img-settings"]')
const imgMdlTitle = document.querySelector("[data-title='ModalTitle']")
const imgCountTitle = document.querySelector("[data-title='count-title']")
const asptRatioTitle = document.querySelector("[data-title='aspectratio-title']")
const genirateBtn = document.querySelector("[data-Btn='genirateBtn']")
// export let imageSettingArr = []
import { randomQuotefunc , genirateFunc , genirateWidthAndHeight} from "./ui.js"
import { imageSettingArr } from "./state.js"
import { ImageParameter } from "./state.js"
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
    return
  }
  if(currentDiv.dataset.imgnbr === 'imgNbr'){
    currentDiv?.nextElementSibling.classList.toggle('activeNone')
    return
  }
  if(currentDiv.dataset.landscape === 'landScape'){
    currentDiv?.nextElementSibling.classList.toggle('activeNone')
    return
  }
  //this for the content inside 
  //for img model
  if(currentP.dataset.mode === 'forImgModel'){
    imgMdlTitle.textContent = currentP.textContent
    imageSettingArr[0] = currentP.dataset.paramiter.trim()
    ImageParameter.model = currentP.dataset.paramiter.trim()
    event.target.closest('div').classList.add('activeNone')
    console.log(ImageParameter,'the array i will need')
    return
  }
  // for img count
  if(currentP.dataset.mode === 'forImgCount'){
    imgCountTitle.textContent = currentP.textContent
    imageSettingArr[1] = currentP.textContent.trim()
    ImageParameter.count =Number(currentP.textContent.trim().slice(0,1)) 
    event.target.closest('div').classList.add('activeNone')
    console.log(ImageParameter,'the array i will need')
    return
  }
  // for aspt ratio
  if(currentP.dataset.mode === 'forAspctRatio'){
    asptRatioTitle.textContent = currentP.textContent
    imageSettingArr[2] = currentP.textContent.trim()
    // this for image height and widgh
    const imgObj = genirateWidthAndHeight(currentP.textContent.trim())
    ImageParameter.height =Number(imgObj.height) 
    ImageParameter.width = Number(imgObj.width) 
    event.target.closest('div').classList.add('activeNone')
    console.log(ImageParameter,'image paramerter')    
    return
  }
})
// working on the genirate btn 
genirateBtn.addEventListener('click',()=>{
  genirateFunc()
  console.log("genirating ...")
  generate()
})
// "eyJlcnJvcnMiOlt7Im1lc3NhZ2UiOiJBaUVycm9yOiBCYWQgaW5wdXQ6IEVycm9yOiByZXF1aXJlZCBwcm9wZXJ0aWVzIGF0ICcvJyBhcmUgJ211bHRpcGFydCcgKGYyY2RiYjhjLTJhODMtNDgzMC04MGQ1LWM3YTQ3MDE2MmJjZSkiLCJjb2RlIjo1MDA2fV0sInN1Y2Nlc3MiOmZhbHNlLCJyZXN1bHQiOnt9LCJtZXNzYWdlcyI6W119"
