import React, { useEffect, useState, useRef } from "react";
import { Send, Bot, User, Copy, ThumbsUp, ThumbsDown, MoreVertical, Paperclip, Mic, Image } from "lucide-react";
import { getMessages, sendMessage } from "../apirequest/userApi";

const ChatWindow = ({ chatId, setSelectedChat, addChatToSidebar }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatTitle, setChatTitle] = useState("");
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (chatId) {
                const data = await getMessages(chatId);
                setMessages(data);
                if (data.length > 0) {
                    setChatTitle(data[0].content);
                }
            } else {
                setMessages([]);
                setChatTitle("");
            }
        };
        fetchMessages();
    }, [chatId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || loading) return;

        setLoading(true);
        const userMessage = message;
        setMessage("");

        // Add user message immediately
        const newUserMessage = { sender: "user", content: userMessage };
        setMessages(prev => [...prev, newUserMessage]);

        try {
            const response = await sendMessage(chatId, userMessage);

            let newChatId = chatId;

            if (!chatId) {
                newChatId = response.chatId;
                setSelectedChat(newChatId);
                setChatTitle(userMessage);
                addChatToSidebar({ id: newChatId, title: userMessage });
            }

            // Add AI response
            const aiMessage = { sender: "ai", content: response.reply };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Error sending message:", error);
            // Add error message
            const errorMessage = { sender: "ai", content: "Sorry, I encountered an error. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    return (
        <div className="flex-1 flex flex-col h-full bg-gray-50">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                {chatTitle ? `Chat: ${chatTitle.substring(0, 30)}${chatTitle.length > 30 ? '...' : ''}` : 'New Conversation'}
                            </h2>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-sm text-gray-500">AI Assistant Online</span>
                            </div>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
                            <Bot className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Start a New Conversation</h3>
                        <p className="text-gray-500 mb-6 max-w-md">
                            Ask me anything! I'm here to help with questions, creative tasks, analysis, and more.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                            {[
                                "Help me write a professional email",
                                "Explain a complex topic simply",
                                "Generate creative ideas",
                                "Analyze data or text"
                            ].map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMessage(suggestion)}
                                    className="p-3 text-left bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-sm"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex gap-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.sender === "ai" && (
                                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                )}
                                
                                <div className={`max-w-3xl ${msg.sender === "user" ? "order-1" : ""}`}>
                                    <div
                                        className={`px-4 py-3 rounded-2xl ${
                                            msg.sender === "user"
                                                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white ml-auto"
                                                : "bg-white border border-gray-200 text-gray-900"
                                        }`}
                                    >
                                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                    </div>
                                    
                                    {msg.sender === "ai" && (
                                        <div className="flex items-center gap-2 mt-2 ml-2">
                                            <button
                                                onClick={() => copyToClipboard(msg.content)}
                                                className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                                                title="Copy message"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors">
                                                <ThumbsUp className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors">
                                                <ThumbsDown className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {msg.sender === "user" && (
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {loading && (
                            <div className="flex gap-4 justify-start">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                        <span className="text-sm text-gray-500">AI is thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
                    <div className="flex items-end gap-3">
                        <div className="flex-1 relative">
                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none min-h-[48px] max-h-[120px]"
                                disabled={loading}
                                rows={1}
                            />
                            <div className="absolute right-2 bottom-2 flex items-center gap-1">
                                <button
                                    type="button"
                                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                                    title="Attach file"
                                >
                                    <Paperclip className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                                    title="Voice message"
                                >
                                    <Mic className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={!message.trim() || loading}
                            className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>Press Enter to send, Shift+Enter for new line</span>
                        <span>{message.length}/2000</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;