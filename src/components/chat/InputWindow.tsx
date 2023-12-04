import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface InputWindowProps {
    onSend: (message: string) => void;
    isLoading: boolean;
}

const InputWindow: React.FC<InputWindowProps> = ({ onSend, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!isLoading && input.trim() !== '') {
            onSend(input);
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSend();
        }
    };

    return (
        <div className="flex flex-col border-gray-200">
            <div className="p-4 pb-1 flex">
                <div className="flex flex-grow shadow appearance-none border rounded text-gray-700 leading-tight focus-within:shadow-outline">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full px-3 py-2 focus:outline-none"
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything..."
                    />
                    <button 
                        onClick={handleSend} 
                        disabled={isLoading}
                        className={`bg-purple-400 ${!isLoading ? 'hover:bg-purple-600' : 'opacity-50 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded-r`}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>
            <p className="w-full text-center px-4 pb-1 text-xs text-gray-900">
                Mike can make up some information. Consider asking the real Mike.
            </p>
        </div>
    );
};

export default InputWindow;


