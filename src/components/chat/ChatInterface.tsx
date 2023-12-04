import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import PromptButtons from './PromptButtons';
import InputWindow from './InputWindow';
import BotDescription from './BotDescription';
import axios from 'axios';


const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // const mockResponse = {
    //     assistantMessage: Math.random() < 0.5 ? "Hi! Short Text" : "Early Life and Chess Career:I was born in Moscow on May 7, 1997, into a family where my father was a businessman and my mother a psychiatrist. My journey in chess began at the tender age of 4, marking the start of what would become a significant part of my early life. I embarked on a professional chess career as a child, achieving notable successes in various competitions. Some of my key achievements include securing the 4th place in the Moscow Championship Under 8 and the 6th place in the Russian Championship Under 12. I participated in numerous international tournaments during my childhood. At the age of 12, I earned the title of Candidate Master, and my current FIDE rating stands at 2012. However, at 14, I faced a pivotal decision between continuing my path as a professional chess player and pursuing a more conventional life, ultimately choosing the latter.",
    //     newThreadId: "thread_YRRw1BF65SRIBMlvObyL7pT8"
    //   };
  
    const sendMessage = async (message: string) => {
    setIsLoading(true);
    setMessages([...messages, { sender: 'user', text: message }]);
      try {
        const response = await axios.post('/api/chat', { message, threadId });
        console.log('Interface response: ', response.data);
        const { assistantMessage, newThreadId } = response.data;
        if (newThreadId) setThreadId(newThreadId); // Update threadId if it's new
        setMessages(currentMessages => [...currentMessages, { sender: 'assistant', text: assistantMessage }]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error sending message:', error);
        setIsLoading(false);
      }
        // Mock response

        // Simulate delay like an actual API request
        // setTimeout(() => {
        //     console.log('Interface response: ', mockResponse);
        //     const { assistantMessage, newThreadId } = mockResponse;
        //     if (newThreadId) setThreadId(newThreadId);
        //     setMessages(currentMessages => [...currentMessages, { sender: 'assistant', text: assistantMessage }]);
        //   }, 2000);
    };

    return (
        <div className='w-full min-h-full flex flex-col'>
            <div className="flex-grow overflow-auto bg-gray-100 bg-opacity-40 rounded-md mx-auto w-full min-w-lg md:min-w-xl lg:min-w-2xl xl:min-w-3xl max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                {messages.length === 0 ? (
                    <BotDescription />
                ) : (
                    <ChatWindow messages={messages} isLoading={isLoading} />
                )}
            </div>
            {messages.length === 0 && (
                <div className="mx-auto w-full min-w-lg bg-gray-100 bg-opacity-40 rounded-md md:min-w-xl lg:min-w-2xl xl:min-w-3xl max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                    <PromptButtons onSend={sendMessage} />
                </div>
            )}
            <div className="sticky bottom-0 left-0 right-0 rounded-md mx-auto w-full min-w-lg md:min-w-xl lg:min-w-2xl xl:min-w-3xl max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                <InputWindow onSend={sendMessage} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default ChatInterface;
