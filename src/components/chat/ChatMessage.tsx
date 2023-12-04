import LottieAnimation from '@components/loadingAnimation/LottieAnimation';
import React, { useState, useEffect } from 'react';

interface ChatMessageProps {
  sender: string;
  text: string;
  isLoading: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, isLoading }) => {
  const [displayedText, setDisplayedText] = useState('');
  const isUser = sender === 'user';
  const typingSpeed = 10; // Adjust typing speed as needed

  useEffect(() => {
    if (isLoading && !isUser) {
      // Show animation while loading
      setDisplayedText('');
    } else if (!isUser && text) {
      // Begin typing the assistant's message
      setDisplayedText('');
      let currentChar = 0;
      const typeText = () => {
        if (currentChar < text.length) {
          setDisplayedText((prev) => prev + text[currentChar]);
          currentChar++;
          setTimeout(typeText, typingSpeed);
        }
      };
      typeText();
    } else {
      // For user, display the text immediately
      setDisplayedText(text);
    }
  }, [text, isUser, isLoading]);

  return (
    <div className={`flex flex-col my-2 mx-2 ${isUser ? 'items-end' : 'items-start'}`}>
      <div className={`p-3 rounded-lg ${isUser ? 'bg-purple-200' : 'bg-blue-200'} text-black ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`font-bold text-lg mb-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {isUser ? 'You' : 'Mike'}
        </div>
        <div>
          {isLoading && !isUser ? (
            <LottieAnimation animationPath="/animations/loading-butterfly-animation.json" />
          ) : (
            displayedText
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;





  




