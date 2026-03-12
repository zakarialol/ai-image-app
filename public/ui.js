export const textArea = document.querySelector("[data-inputArea='inputArea']")
let imgModel = document.querySelector("[data-img-type ='image-type']")
const imgCount = document.querySelector("[data-img-nbr ='image-nbr']")
const imgAspectRatio = document.querySelector("[data-landscape ='landscape']")
const errMainDiv = document.querySelector('[data-err="div-err-holder"]')
export const imgHolderDiv = document.querySelector("[data-imgHolder='imgHolder']")
const errMessage = document.querySelector("[data-err='error-message']")
//exportin functions
export {randomQuotefunc ,genirateFunc ,genirateWidthAndHeight , checkParametersFunc ,toggleHiddenSvgsFunc,errorMsgFunc}
//
import { ImageParameter, imageSettingArr } from "./state.js";
const quoteArray = ["A futuristic cyberpunk city at night, neon lights reflecting on wet streets, flying cars, ultra-detailed, cinematic lighting, 4K, wide angle, realistic style","Minimalist programmer workspace, laptop with code on screen, soft ambient lighting, coffee cup, modern desk, clean aesthetic, shallow depth of field","Anime-style portrait of a young man with messy black hair, glowing eyes, soft pastel background, detailed shading, high quality illustration","Epic fantasy landscape with floating islands, waterfalls in the sky, golden sunset, dramatic clouds, ultra-detailed, magical atmosphere","Modern product mockup of wireless earbuds on a dark background, studio lighting, soft shadows, realistic reflections, high-end commercial photography","Humanoid AI robot with transparent face showing glowing circuits, futuristic design, realistic materials, cinematic lighting, ultra sharp focus","Street photography of a busy city market, candid people, natural light, motion blur, realistic colors, documentary style","Minimal logo design for a tech startup, abstract geometric symbol, flat design, black and white, clean and modern branding","Portrait of a woman surrounded by floating light particles, dreamy atmosphere, soft glow, bokeh background, artistic photography style","Dark aesthetic wallpaper with moon, clouds, and subtle stars, moody lighting, cinematic feel, high contrast, 4K resolution"]
//
 let index = 0;
 //calling the function to shufle the array
 function shufleArray(arr){
         for (let i = arr.length - 1; i > 0; i--) {
             const j = Math.floor(Math.random() * (i + 1));
             ([arr[i], arr[j]] = [arr[j], arr[i]]);
         }
 }
 shufleArray(quoteArray)
 // funtion to get random quote
 function randomQuotefunc(){
     textArea.value = ' '
     const quote = quoteFunc()
     typingSmoth(quote)
 }
 //function to return random quote
 function quoteFunc(){
     if (index >= quoteArray.length) {
         shufleArray(quoteArray);
         index = 0;
     }
     return quoteArray[index++];
 }
// function to mak ethe typing smoth
function typingSmoth(text){
    let i = 0
    textArea.focus()
    let interval = setInterval(() => {
        if(i <= text.length-1){
            textArea.value += text[i++]
        }else{
            clearInterval(interval)
        }
    },20);
}

// this function for image modal ****
function imageModelFunc(){
    const models = [{name:"select model",dataName:'title'},
        {name:"stable-diffusion-xl-lightning",parametre:"@cf/bytedance/stable-diffusion-xl-lightning",dataName:"forImgModel"},
        {name:"dreamshaper-8-lcm",parametre:"@cf/lykon/dreamshaper-8-lcm",dataName:'forImgModel'},
        {name:"stable-diffusion-xl-base-1.0",parametre:"@cf/stabilityai/stable-diffusion-xl-base-1.0",dataName:'forImgModel'},
        ]
    const html = HtmlFunc(models);
    imgModel.appendChild(html)
    htmlHeight(html)

}
imageModelFunc()

//function to add html height ****
function htmlHeight(html){
    html.style.height = html.scrollHeight + 'px'
}
//this function for image count ****
function imgCountFunc(){
    const numberOfImages = [{name:'image count',dataName:'title'},{name:"1 image",dataName:'forImgCount'},{name:"2 image",dataName:'forImgCount'},{name:"3 image",dataName:'forImgCount'},{name:"4 image",dataName:'forImgCount'}]
    const html = HtmlFunc(numberOfImages)
    imgCount.appendChild(html)
    htmlHeight(html)
}
imgCountFunc()

//this function for image image aspectRatio ****
function imgAspectRatioFunc(){
    const AspectRatio = [{name:'aspect ratio',dataName:'title'},{name:'square (1:1)',dataName:'forAspctRatio'},{name:'landscape (16:9)',dataName:'forAspctRatio'},{name:'portrait',dataName:'forAspctRatio'}]
    const html = HtmlFunc(AspectRatio)
    imgAspectRatio.appendChild(html)
    htmlHeight(html)
}
imgAspectRatioFunc()
// genirate html for image sttings ****
function HtmlFunc(arr){
    let divSettingHolder = document.createElement('div')
    divSettingHolder.className="rounded-md mt-[1px] bg-firstClr overflow-hidden activeNone transition-all duration-500"
    divSettingHolder.id = 'genirate-id'
    arr.forEach((element,index) => {
        if(element.dataName ==='title'){
            const p = `<p  class="pl-px pointer-events-none text-white capitalize text-[9px] bg-gray-500" data-mode='${element.dataName}'>${element.name}</p>`
        divSettingHolder.innerHTML += p
            return
        }
        let p = `<p  class="p-2 hover:bg-secondClr text-white capitalize text-xs cursor-pointer dark:text-firstClr dark:bg-white" data-paramiter = ${element.parametre} data-mode='${element.dataName}'>${element.name}</p>`
        divSettingHolder.innerHTML += p
    });
    return divSettingHolder
}
// function for genirate button
function genirateFunc(){
    let numberOfImg = Number(imageSettingArr[1]?.slice(0,1))
    if (!numberOfImg) numberOfImg = 1;
    console.log(numberOfImg,"number of img")
    let genratedHtml = geniaretHtmlForimgFunc(numberOfImg)
    imgHolderDiv.innerHTML = genratedHtml
}
//genirate divs for imgs
function geniaretHtmlForimgFunc(imgcount){
    let aspectR = ""
    aspectR = GetaspectRatioFunc(imageSettingArr[2])
    let html = ''
    if(imgcount){
        for(let i=1 ; i <= imgcount ; i++){
            html += `<div class='animate-skelton bg-gray-400 dark:bg-gray-700 w-full max-w-[300px] ${aspectR}'>
            </div>`
        }
        return html
    }else{
        html = `<div class='${aspectR} bg-[#e0e0e0] max-w-[300px] animate-skelton'>
                </div>`
        return html
    }
}
// function to genirate aspect ratio
function GetaspectRatioFunc(aspectChosen){
    if(aspectChosen?.toLowerCase()==='square (1:1)'){
        ImageParameter.aspectR = "aspect-square"
       return 'aspect-square'
    }else if(aspectChosen?.toLowerCase()==='landscape (16:9)'){
        ImageParameter.aspectR = "aspect-video"
        return 'aspect-video'
    }else if (aspectChosen?.toLowerCase()==='portrait'){
        ImageParameter.aspectR = "aspect-[5/6]"
        return 'aspect-[5/6]'
    }
}
// function that will return the with and height for the image
function genirateWidthAndHeight(aspectR){
    let ObjStoresHeightAndWidthForImg = {}
    if(aspectR.trim().toLowerCase() === "square (1:1)"){
       ObjStoresHeightAndWidthForImg.width = "1024"
       ObjStoresHeightAndWidthForImg.height = "1024"
       return ObjStoresHeightAndWidthForImg
    }
    if(aspectR.trim().toLowerCase() === "landscape (16:9)"){
       ObjStoresHeightAndWidthForImg.width = "1024"
       ObjStoresHeightAndWidthForImg.height ="768"
       return ObjStoresHeightAndWidthForImg
    }
    if(aspectR.trim().toLowerCase() === "portrait"){
       ObjStoresHeightAndWidthForImg.width = "768"
       ObjStoresHeightAndWidthForImg.height = "1024"
       return ObjStoresHeightAndWidthForImg
    }
}
// hundling the erro if one of the parametre an't including
function checkParametersFunc(){
    let errMsg = ""
    if(textArea.value.trim().length < 5){
        errMsg = "please right valid propmt"
        errorMsgFunc(errMsg)
        return true
    }
    if(!ImageParameter.model){
        errMsg = "select model"
        errorMsgFunc(errMsg)
        return true
    }
    if(!ImageParameter.height){
        errMsg = "select aspect Ratio"
        errorMsgFunc(errMsg)
        return true
    }
    if(!ImageParameter.width){
        errMsg = "select aspect ratio"
        errorMsgFunc(errMsg)
        return true
    }
}
// error message display
function errorMsgFunc(msg){
    errMessage.textContent = msg
    const heightofMessage = errMessage.scrollHeight
    errMainDiv.style.height = heightofMessage + "px"
    setTimeout(()=>{errMainDiv.style.height = 0 + "px"},2000)
}
// toggle hidden from the svgs 
function toggleHiddenSvgsFunc(svgsBtns){
    svgsBtns.forEach(btn=>{
        btn.classList.toggle("hidden")
    })
}
