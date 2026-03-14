import { ImageParameter } from "./state.js";
import { imgHolderDiv,textArea,errorMsgFunc,genirateFunc } from "./ui.js";
import { genirateBtn } from "./main.js";
export async function generate() {
  genirateBtn.disabled = true
  try{
    const res = await fetch("/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt:textArea.value,
        model:ImageParameter.model.trim(),
        count : ImageParameter.count,
        width: ImageParameter.width,
        height: ImageParameter.height,
      })
    });
    if(!res.ok){
      errorMsgFunc("something went wrong please try again")
      throw new Error("something went wrong please try again")
    }
    genirateFunc()
    const data = await res.json()
    if (!data.success || !data.images || !data.images.length) {
      throw new Error("Image generation failed on server");
    }
    genirateHtmlForImgsFunc(data)
  }catch(err){
    console.log(err)
  }finally{
    genirateBtn.disabled = false
  }
  // function to create the elements 
}
//function to genirate html for imgs 
function genirateHtmlForImgsFunc(data){
  // let imgsDiv = document.createElement('div')
  let html = ""
  data.images.forEach(base64img =>{
    html += `<div class= "relative ${ImageParameter.aspectR} max-w-[300px]">
                <img class = "w-full h-full" src="data:image/png;base64,${base64img}">
                <a class ="absolute right-1 bottom-1 text-white" href="data:image/png;base64,${base64img}" download = "image.png">
                    <svg class = "w-[22px] h-[22px] p-[2px] bg-firstClr rounded-md" viewBox="0 0 24 24" stroke="currentColor"  fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>`
  })
  imgHolderDiv.innerHTML = html
}
