import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { getChats } from "../apirequest/userApi";

const ChatApp = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);

    const addChatToSidebar = (newChat) => {
        setChats((prevChats) => [...prevChats, newChat]);
    };
    useEffect(() => {
        const fetchChats = async () => {
            const data = await getChats();
            setChats(data);
        };
        fetchChats();
    }, []);
    return (
        <Box sx={{ display: "flex" }}>
            <ChatSidebar
                onSelectChat={setSelectedChat}
                chats={chats}
                setChats={setChats}
            // addChatToSidebar={addChatToSidebar} 
            />
            <ChatWindow
                chatId={selectedChat}
                setSelectedChat={setSelectedChat}
                addChatToSidebar={addChatToSidebar}
            />
        </Box>
    );
};

export default ChatApp;
