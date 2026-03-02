import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();
app.use(cors());
app.use(express.json());

const ACCOUNT_ID = process.env.WORKERS_account_id;
const API_TOKEN = process.env.WORKERS_AI_TOKEN
console.log(ACCOUNT_ID,"account id ")
console.log(API_TOKEN,"api token")
app.post("/generate-image", async (req, res) => {
  console.log('we have get info from the front end****************************************************************************************************************************')
  try {
    const { prompt , width, height, count, model} = req.body;
    console.log(typeof width)
    console.log(typeof height)
    console.log(typeof count)
    console.log(prompt,"prompt*****************")
    console.log(width,"width*****************")
    console.log(height,"height*****************")
    console.log(count,"count*****************")
    console.log(model,"count*****************")
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    const images = await Promise.all(Array.from({length:count},async(_,i)=>{
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${model}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt:`${prompt}, variation ${i+1}` , 
          width: width ,
          height: height}),
        }
      );
        const buffer = await response.arrayBuffer()
        const base64img = Buffer.from(buffer).toString("base64")
        // console.log(resultfromApi)
          return base64img;
    }))
        res.setHeader("Content-Type","application/json");
        res.json({
          images: images
        })

      }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Image generation failed" });
      }
})
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
