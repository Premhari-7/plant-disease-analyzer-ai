import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/chatbot-ai", async (req, res) => {
  try {
    console.log("User Question:", req.body.message);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",   // ⭐ NEW MODEL
      messages: [
        {
          role: "system",
          content:
            "You are a plant disease expert. Answer in simple English. Provide Disease, Symptoms, Causes, Treatment, Prevention."
        },
        {
          role: "user",
          content: req.body.message
        }
      ],
    });

    const reply = completion.choices[0].message.content;
    console.log("AI Reply:", reply);

    res.json({ reply });

  } catch (error) {
    console.error("🔥 GROQ ERROR:", error.message);
    res.status(500).json({
      reply: "AI service not responding. Check internet or API key."
    });
  }
});

app.listen(5001, () => {
  console.log("AI Server running on port 5001 !!");
});
