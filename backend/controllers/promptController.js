const { OpenAI } = require("openai");

const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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"
});


const handlePrompt = async (req, res) => {
  const { prompt } = req.body;

  req.on("close", () => {
    console.log("Client disconnected, stopping AI request.");
    return;
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ response: completion.choices[0].message });
  } catch (error) {
    console.error("Error processing AI request:", error);
    res.status(500).json({ error: "AI request failed." });
  }
};

module.exports = { handlePrompt };