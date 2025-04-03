import React, { useState } from "react";
import { sendPrompt } from '../api/promptAPI';  


const TopPromptInput = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPrompt({ prompt });
      onSubmit([{role: "Assistant", msg: response.data.response.content}, {role: "Me", msg: prompt}])
    } catch (err) {
      console.error(err);
      onSubmit("AbortError")
    }
    setPrompt("")
  };

  return (
    <div className="p-4 bg-gray-100">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="p-2 w-full border rounded"
          placeholder="Enter your prompt"
        />
      </form>
    </div>
  );
};

export default TopPromptInput;