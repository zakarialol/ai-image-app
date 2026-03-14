import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static("public"))
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "../public")));
const ACCOUNT_ID = process.env.WORKERS_account_id;
const API_TOKEN = process.env.WORKERS_AI_TOKEN
const PORT = process.env.PORT || 3000
app.post("/generate-image", async (req, res) => {
  try {
    const { prompt , width, height, count = 1, model} = req.body;
    if (!prompt || prompt.trim().length < 5 || !width || !height || !count || !model) {
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
        res.status(500).json({ error: "Image generation failed" });
      }
})
app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});
