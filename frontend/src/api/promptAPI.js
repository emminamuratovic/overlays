import axios from "axios";

console.log("url", process.env.REACT_APP_API_URL)
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL + "/api",
// });
const api = axios.create({
  baseURL: "https://overlays-production.up.railway.app/api",
    // baseURL: "http://localhost:5000/api",
});

let abortController = null;

export const sendPrompt = (messages) => {
  abortController = new AbortController();
  const signal = abortController.signal;
  console.log("Sending request to:", process.env.REACT_APP_API_URL + "/api/prompt");

  return api.post("/prompt", { messages }, { signal });
};

export const killSwitch = () => {
  if (abortController) {
    abortController.abort();
    abortController = null; // Reset controller
  }
};