import React from 'react';

interface PromptButtonsProps {
    onSend: (message: string) => void;
}

const PromptButtons: React.FC<PromptButtonsProps> = ({ onSend }) => {
    const prompts = ['Tell me about yourself', 'What made you relocate twice?', 'Can you describe a recent tech project you are proud of?', 'What does lifelong learning mean to you?'];

    return (
        <div className="flex flex-wrap justify-center px-4 py-1 m-1 border-gray-200">
            {prompts.map((prompt, index) => (
                <button 
                    key={index} 
                    onClick={() => onSend(prompt)} 
                    className="bg-white hover:bg-gray-100 text-black text-left text-sm py-2 px-2 m-1 rounded border border-black opacity-80 hover:opacity-100"
                    style={{ flex: '1 0 45%' }} 
                >
                    {prompt}
                </button>
            ))}
        </div>
    );
};

export default PromptButtons;

