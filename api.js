console.log('hello am inside the api.js')
const inputValue = document.querySelector("[data-inputArea='inputArea']")
import { ImageParameter } from "./state.js";

export async function generate() {
  const res = await fetch("http://localhost:3000/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: "superpank",
      model:ImageParameter.model,
      count : ImageParameter.count,
      width: ImageParameter.width,
      height: ImageParameter.height,
    })
  });
  const data = await res.json()
  console.log(data,"result return from the server")
  // functio to create the elements 
  genirateHtmlForImgsFunc(data)
}
//function to genirate html for imgs 

function genirateHtmlForImgsFunc(data){
  let imgsDiv = document.createElement('div')
  let html = ""
  data.images.forEach(base64img =>{
    html += `<div>
              <img src="data:image/png;base64,${base64img}">
            </div>`
  })
  console.log(html,'this the result of the html *****####***')
  imgsDiv.insertAdjacentHTML('afterbegin',html)
  document.body.append(imgsDiv)
}
