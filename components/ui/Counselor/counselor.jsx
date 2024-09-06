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

    const sendMessage = async () => {
        if (!message.trim()) return;  // Don't send empty messages

        const newMessages = [
            ...messages,
            { role: 'user', content: message },
            { role: 'assistant', content: '' },
        ];
        setMessage('');
        setMessages(newMessages);

        try {
            const response = await fetch('/api/collegeCounselor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([...messages, { role: 'user', content: message }]),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const text = decoder.decode(value, { stream: true });
                setMessages((messages) => {
                    let lastMessage = messages[messages.length - 1];
                    let otherMessages = messages.slice(0, messages.length - 1);
                    return [
                        ...otherMessages,
                        { ...lastMessage, content: lastMessage.content + text },
                    ];
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages((messages) => [
                ...messages,
                { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
            ]);
        }
    };

    const resetChat = () => {
        const initialMessage = [
            {
                role: 'assistant',
                content: 'Hi! I\'m your CollegeGenie AI Counselor, here to guide you through your college journey. How can I assist you today?',
            },
        ];
        setMessages(initialMessage);
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

    function parseChatbotText(text) {
        text = text.replace(/\n/g, '<br>');
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        text = text.replace(/_(.*?)_/g, '<em>$1</em>');
        text = text.replace(/`(.*?)`/g, '<code>$1</code>');
        text = text.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');
        return text;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col items-center justify-center flex-grow">
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
                                className="p-3 rounded-xl max-w-2xl"
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
                                dangerouslySetInnerHTML={{ __html: parseChatbotText(message.content) }}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="flex flex-col sm:flex-row mt-4 space-x-0 space-y-2 sm:space-y-0 sm:space-x-2">
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
                            className="flex items-center justify-center gap-x-1 text-lg text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900 px-4 py-2 rounded-lg md:inline-flex"
                        >
                            {isLoading ? 'Sending..' : 'Send'}
                        </button>
                        <button
                            onClick={resetChat}
                            className="flex items-center justify-center gap-x-1 text-lg text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900 px-4 py-2 rounded-lg md:inline-flex"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
