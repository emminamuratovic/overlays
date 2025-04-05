import { useState, useEffect } from 'react';

export default function JarvisDashboard() {
  const [userPrompt, setUserPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userPrompt })
    });

    const data = await res.json();
    streamText(data.response?.content || "⚠️ No response received.");
  };

  const streamText = (text) => {
    let i = 0;
    setAiResponse("");
    const interval = setInterval(() => {
      setAiResponse((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 20);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-6">
      <h1 className="text-4xl mb-4 border-b pb-2 border-green-500">RevoTech RT: Jarvis Command Deck</h1>

      <section className="mb-8">
        <h2 className="text-2xl border-b border-green-700 pb-1 mb-2">🧠 Core Status</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>🛡️ Mode: <span className="text-green-300">Jarvis Tactical</span></li>
          <li>🧠 AI Engine: <span className="text-green-300">GPT-4</span></li>
          <li>💾 Memory: <span className="text-green-300">MongoDB Connected</span></li>
          <li>📡 Domain Ops: <span className="text-green-300">Scanning Active</span></li>
          <li>📝 Content Engine: <span className="text-green-300">Live</span></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl border-b border-green-700 pb-1 mb-2">💬 Command Console</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="w-full bg-white text-black p-3 rounded"
            placeholder="> Type your command here..."
          />
          <button
            type="submit"
            className="mt-2 bg-green-600 hover:bg-green-700 text-black px-4 py-2 rounded"
          >
            Execute
          </button>
        </form>
        {aiResponse && (
          <div className="bg-green-950 p-4 rounded shadow-md whitespace-pre-wrap text-green-300">
            <strong className="text-pink-400">🤖 RevoTech:</strong>
            <p className="mt-2">{aiResponse}</p>
          </div>
        )}
      </section>
    </div>
  );
}
