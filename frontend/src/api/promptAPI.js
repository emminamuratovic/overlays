import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const sendPrompt = (prompt) => {
  return api.post("/prompt", { prompt });
};