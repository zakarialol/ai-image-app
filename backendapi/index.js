import express from "express";
import cors from "cors";
import "dotenv/config";
console.log('maybe we are good mybe not')
const app = express();
app.use(cors())
app.use(express.json());
app.post("/hello", async (req, res) => {
    console.log("message send from front end:", req.body);
  
    try {
        const { message } = req.body;
        console.log(message)
          if (!message) {
              return res.status(400).json({ error: "Prompt is required" });
          }
        res.json({
            answer:`${message} you're too good zakaria`,
        });
          
    } catch (error){
      console.error("error:", error);
      res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});