import React, { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { getChats } from "../apirequest/userApi";

const ChatApp = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const addChatToSidebar = (newChat) => {
        setChats((prevChats) => [...prevChats, newChat]);
    };

    useEffect(() => {
        const fetchChats = async () => {
            try {
                setIsLoading(true);
                const data = await getChats();
                setChats(data);
            } catch (error) {
                console.error("Error fetching chats:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchChats();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your conversations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
            <ChatSidebar
                onSelectChat={setSelectedChat}
                chats={chats}
                setChats={setChats}
            />
            <ChatWindow
                chatId={selectedChat}
                setSelectedChat={setSelectedChat}
                addChatToSidebar={addChatToSidebar}
            />
        </div>
    );
};

export default ChatApp;