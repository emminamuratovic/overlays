import React, { useEffect, useState } from "react";
import TopPromptInput from "../components/TopPromptInput";
import ChatDisplay from "../components/ChatDisplay";
import { killSwitch } from "../api/promptAPI";

const Chat = () => {
  const [conversation, setConversation] = useState([]);
  const [killed, setKilled] = useState(false);

  useEffect(() => {
    const savedConversation = localStorage.getItem("chatConversation");
    if (savedConversation) {
      try {
        setConversation(JSON.parse(savedConversation)); 
      } catch (error) {
        console.error("Error parsing saved conversation:", error);
        setConversation([]); // Reset if corrupted
      }
    }
  }, []);

  useEffect(() => {
    if (conversation.length > 0) {
      localStorage.setItem("chatConversation", JSON.stringify(conversation));
    }
  }, [conversation]);

  const handleKillSwitch = () => {
    console.log("Killing all AI processes...");
    killSwitch();
    setKilled(true);
    setConversation([{ role: "System", msg: "🚨 AI request was canceled. Restarting chat..." }]);
  };

  const handleReset = () => {
    setConversation([]);
    localStorage.removeItem("chatConversation");
    setKilled(false);
  };

  const onSubmit = async (data) => {
    setKilled(false);

    if (data !== "AbortError") {
      let newConv = [data, ...conversation];
      setConversation(newConv);
    } else {
      console.log("Request was aborted");
      setKilled(true);
      setConversation([[{ role: "System", msg: "🚨 AI request was canceled. Restarting chat..." }]]);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <TopPromptInput onSubmit={onSubmit} />
        <div className="flex-1 overflow-y-auto p-2 border border-gray-300 rounded-lg">
          <ChatDisplay conversation={conversation} />
          {killed && <p className="text-red-500 text-sm mt-2">🚨 AI request was canceled.</p>}
        </div>
      </div>
      <div className="sticky bottom-0 bg-white p-4 border-t flex justify-between">
        <button
          onClick={handleKillSwitch}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Kill Switch
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>
    </>
  )
}

export default Chat;