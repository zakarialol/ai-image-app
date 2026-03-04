import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();
app.use(cors());
app.use(express.json());

const ACCOUNT_ID = process.env.WORKERS_account_id;
const API_TOKEN = process.env.WORKERS_AI_TOKEN
app.post("/generate-image", async (req, res) => {
  console.log('we have get info from the front end****************************************************************************************************************************')
  try {
    const { prompt , width, height, count = 1, model} = req.body;
    if (!prompt || prompt.trim().length < 5 || !width || !height || !count || model) {
      return res.status(400).json({ error: "missing requird properties" });
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
