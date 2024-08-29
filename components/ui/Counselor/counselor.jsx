'use client';

import { useEffect, useRef, useState } from 'react';

export default function Counselor() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hi! I\'m your CollegeGenie AI Counselor, here to guide you through your college journey. How can I assist you today?',
        },
    ]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const sentMessageColor = '#EDDCFF';
    const receivedMessageColor = '#4600D1';

    // Mock response function
    const mockResponse = (userMessage) => {
        if (userMessage.toLowerCase().includes('application')) {
            return "It sounds like you're asking about college applications! I can help with that. What specific questions do you have?";
        } else if (userMessage.toLowerCase().includes('financial aid')) {
            return "Financial aid is crucial! You can apply for federal aid through FAFSA. Do you need help with that?";
        } else if (userMessage.toLowerCase().includes('advice')) {
            return "I'm here to give advice! What would you like advice on? College choices, majors, or something else?";
        } else {
            return "That's interesting! Can you tell me more or ask a specific question?";
        }
    };

    const sendMessage = () => {
        if (!message.trim()) return;
        setIsLoading(true);

        setMessages((messages) => [
            ...messages,
            { role: 'user', content: message },
        ]);

        const assistantResponse = mockResponse(message);

        setTimeout(() => {
            setMessages((messages) => [
                ...messages,
                { role: 'assistant', content: assistantResponse },
            ]);
            setIsLoading(false);
        }, 1000);

        setMessage('');
    };

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="space-y-5 max-w-3xl mx-auto text-center">
                <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto sm:text-6xl py-6"
                    style={{
                        backgroundImage: "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)"
                    }}
                >
                    My Genie
                </h1>
            </div>
            <div className="flex flex-col w-[80vw] h-[80vh] p-4 border border-white rounded-lg mt-4">
                <div className="flex flex-col flex-grow p-2 space-y-2 overflow-y-auto">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className="p-3 rounded-xl max-w-xs"
                            style={{
                                backgroundColor:
                                    message.role === 'assistant'
                                        ? receivedMessageColor
                                        : sentMessageColor,
                                alignSelf:
                                    message.role === 'assistant'
                                        ? 'flex-start'
                                        : 'flex-end',
                                color:
                                    message.role === 'assistant'
                                        ? 'white'
                                        : 'black',
                            }}
                        >
                            {message.content}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex mt-4 space-x-2">
                    <input
                        type="text"
                        className="flex-grow p-2 text-white bg-black border-none rounded-lg placeholder-gray-500"
                        placeholder="Type message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading}
                        className="p-2 text-white rounded-lg"
                        style={{ backgroundColor: '#4600D1' }}
                    >
                        {isLoading ? 'Sending..' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
}
