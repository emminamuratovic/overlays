import { useState, useEffect } from 'react';

export default function JarvisDashboard() {
  const [userPrompt, setUserPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [models, setModels] = useState([]);
  const [memoryLog, setMemoryLog] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPrompt })
    });

    const data = await res.json();
    streamResponse(data.response?.content || "No response received.");
    setMemoryLog(prev => [...prev, { prompt: userPrompt, response: data.response?.content }]);
  };

  const streamResponse = (text) => {
    let i = 0;
    setAiResponse("");
    const interval = setInterval(() => {
      setAiResponse(prev => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 20);
  };

  const fetchModels = async () => {
    const res = await fetch("/api/models");
    const data = await res.json();
    setModels(data.models || []);
  };

  const startVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      setUserPrompt(event.results[0][0].transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
  };

  return (
    <div className="w-screen h-screen bg-black text-green-400 font-mono p-6 overflow-y-scroll">
      <h1 className="text-4xl mb-4 border-b pb-2 border-green-500">RevoTech RT: Jarvis Command Deck</h1>

      <section className="mb-8">
        <h2 className="text-2xl border-b border-green-700 pb-1 mb-2">🧠 Core Status</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Mode: <span className="text-green-300">Jarvis Tactical</span></li>
          <li>AI Engine: <span className="text-green-300">GPT-4</span></li>
          <li>Memory: <span className="text-green-300">MongoDB Connected</span></li>
          <li>Domain Ops: <span className="text-green-300">Scanning Active</span></li>
          <li>Content Engine: <span className="text-green-300">Live</span></li>
        </ul>
      </section>

      {/* Additional UI sections omitted for brevity */}
    </div>
  );
}
