import { OpenAI } from "openai";
import { recall } from "./memoryService"; // adjust path if needed

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  const { userPrompt } = req.body;

  // Example: inject memory from a specific tag (you can make this dynamic later)
  const memory = await recall("domains-bosnia");

  const messages = [
    {
      role: "system",
      content: `
You are RevoTech RT, an autonomous SEO strategist powered by GPT-4.
You are tactical, confident, and focused on affiliate site execution.
Memory Context: ${memory || "No active memory found."}
When replying, always act like an SEO operator—not a chatbot.`
    },
    { role: "user", content: userPrompt }
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages
    });

    res.status(200).json({ response: completion.choices[0].message });
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Chat request failed." });
  }
}
