const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const handlePrompt = async (req, res) => {
  const { messages } = req.body;

  req.on("close", () => {
    console.log("Client disconnected, stopping AI request.");
    return;
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages
    });

    res.json({ response: completion.choices[0].message });
  } catch (error) {
    console.error("Error processing AI request:", error);
    res.status(500).json({ error: "AI request failed." });
  }
};

module.exports = { handlePrompt };