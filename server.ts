import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // AI Route to generate a greeting or story about the character
  app.get("/api/narrative", async (req, res) => {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const prompt = `Write a very short, poetic 2-sentence description of an anime girl with silver hair and blue eyes standing in a moonlit cherry blossom garden at night. Make it sound like a Ghibli movie narration.`;
      
      const result = await model.generateContent(prompt);
      res.json({ text: result.response.text() });
    } catch (error) {
      console.error(error);
      res.status(500).json({ text: "The moon shines silently over the blossoms..." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
