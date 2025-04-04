import React, { useEffect, useState } from "react";
import TopPromptInput from "../components/TopPromptInput";
import ChatDisplay from "../components/ChatDisplay";
import { killSwitch, sendPrompt } from "../api/promptAPI";

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

  const reverseMessagePairs = (messages) => {
    const reversed = [];
    for (let i = messages.length - 1; i > 0; i -= 2) {
      const current = messages[i];
      const previous = messages[i - 1];
  
      // Ensure the messages are in the correct order: Assistant, then Me
      if (previous.role === 'Assistant' && current.role === 'Me') {
        reversed.push(previous, current);
      } else if (previous.role === 'Me' && current.role === 'Assistant') {
        reversed.push(current, previous);
      } else {
        // In case there's an odd one out or wrong pattern
        reversed.push(current);
      }
    }
  
    // Handle any leftover single message
    if (messages.length % 2 !== 0) {
      reversed.push(messages[0]);
    }
  
    return reversed;
  }

  const onSubmit = async (prompt) => {
    setKilled(false);
    try {
      const currentConv = [...conversation, {role: "Me", msg: prompt}]; 
      let historyConv = [];
      currentConv.map((person, index) => {
          const role = person.role === "Me" ? "user" : "assistant"
          historyConv.push({role, content: person.msg})
      })
      const response = await sendPrompt(historyConv);
      let newConv = [ ...conversation, {role: "Assistant", msg: response.data.response.content}, {role: "Me", msg: prompt}];
      setConversation(newConv);
    } catch {
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
          <ChatDisplay conversation={reverseMessagePairs(conversation)} />
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