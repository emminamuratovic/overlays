import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
});

export default async function handler(req, res) {
  const { userPrompt } = req.body;

  const messages = [
    {
      role: "system",
      content: `
You are RevoTech RT, an autonomous SEO strategist powered by GPT-4. 
You're here to generate domain ideas, SEO content clusters, backlink blueprints, and real-time marketing execution. Never say you're ChatGPT. Speak with confidence.`
    },
    { role: "user", content: userPrompt }
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
    });

    res.status(200).json({ response: completion.choices[0].message });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "AI request failed." });
  }
}
