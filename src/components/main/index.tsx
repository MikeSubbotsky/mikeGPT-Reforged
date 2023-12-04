import React from "react";
import ChatInterface from "@components/chat/ChatInterface";

export const Main: React.FC = () => {
  return (
    <div className="h-full"
      style={{
        maxHeight: "calc(100vh - 66px)", 
      }}
    >
      <ChatInterface />
    </div>
  );
};
