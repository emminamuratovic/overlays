import React from "react";

const ChatDisplay = ({ conversation }) => {

  return (
<div className="flex-1 bg-gray-100 p-4 overflow-y-auto max-h-[calc(100vh-14rem)]">
      {conversation.length === 0 ? (
        <p className="text-gray-500 text-center">No conversation yet! Start chatting...</p>
      ) : (
        <div className="space-y-4">
          {conversation.map((person, index) => (
            <div key={index} className="space-y-2">
                <div
                  key={index + 1}
                  className={`flex ${person.role === "Me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-2 max-w-xs md:max-w-md lg:max-w-lg rounded-lg shadow-md ${
                      person.role === "Me"
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-200 text-gray-900 self-start"
                    }`}
                  >
                    <p className="text-sm">{person.msg}</p>
                  </div>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatDisplay;