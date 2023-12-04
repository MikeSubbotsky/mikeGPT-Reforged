import React from 'react';
import ChatMessage from './ChatMessage';

interface ChatWindowProps {
  messages: { sender: string; text: string }[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  return (
    <div className="flex-grow px-4 py-2 w-full">
      {messages.map((msg, index) => (
        <ChatMessage key={index} sender={msg.sender} text={msg.text} isLoading={false} />
      ))}
      {isLoading && (
        <ChatMessage key="loading" sender="assistant" text="" isLoading={true} />
      )}
    </div>
  );
};

export default ChatWindow;



