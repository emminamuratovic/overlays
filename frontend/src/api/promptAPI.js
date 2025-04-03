import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

let abortController = null;

export const sendPrompt = (prompt) => {
  abortController = new AbortController();
  const signal = abortController.signal;

  return api.post("/prompt", { prompt }, { signal });
};

export const killSwitch = () => {
  if (abortController) {
    abortController.abort();
    abortController = null; // Reset controller
  }
};