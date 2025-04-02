// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const handlePrompt = async (req, res) => {
  const { prompt } = req.body;

  // Example call to GPT-4 (this will be implemented later)
  // const completion = await openai.createChatCompletion({
  //   model: "gpt-4",
  //   messages: [{ role: "user", content: prompt }],
  // });

  // Return dummy response for now
  res.json({
    response: "This is a dummy response for the prompt: " + prompt.prompt,
  });
};

module.exports = { handlePrompt };