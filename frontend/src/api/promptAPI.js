import axios from "axios";

console.log("url", process.env.REACT_APP_API_URL)
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL + "/api",
// });
const api = axios.create({
  baseURL: "https://overlays-production.up.railway.app/api",
});

let abortController = null;

export const sendPrompt = (prompt) => {
  abortController = new AbortController();
  const signal = abortController.signal;
  console.log("Sending request to:", process.env.REACT_APP_API_URL + "/api/prompt");

  return api.post("/prompt", { prompt }, { signal });
};

export const killSwitch = () => {
  if (abortController) {
    abortController.abort();
    abortController = null; // Reset controller
  }
};