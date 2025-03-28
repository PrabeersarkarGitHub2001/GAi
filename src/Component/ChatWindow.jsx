import React, { useEffect, useState } from "react";
import { Box, TextField, Button, List, ListItem, Typography, CircularProgress } from "@mui/material";
import { getMessages, sendMessage } from "../apirequest/userApi";

const ChatWindow = ({ chatId, setSelectedChat, addChatToSidebar }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatTitle, setChatTitle] = useState(""); // Store first prompt as chat title

    useEffect(() => {
        const fetchMessages = async () => {
            if (chatId) {
                const data = await getMessages(chatId);
                setMessages(data);
                if (data.length > 0) {
                    setChatTitle(data[0].content); // Set first message as title
                }
            } else {
                setMessages([]);
                setChatTitle(""); // Reset chat title for a new chat
            }
        };
        fetchMessages();
    }, [chatId]);

    const handleSendMessage = async () => {
        if (!message.trim() || loading) return;

        setLoading(true);
        const response = await sendMessage(chatId, message);

        let newChatId = chatId;

        if (!chatId) {
            newChatId = response.chatId;
            setSelectedChat(newChatId);
            setChatTitle(message); // Use first message as title
            addChatToSidebar({ id: newChatId, title: message });
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", content: message },
            { sender: "ai", content: response.reply },
        ]);

        setMessage("");
        setLoading(false);
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 3, display: "flex", flexDirection: "column", height: "80vh" }}>
            <List sx={{ flexGrow: 1, overflowY: "auto", padding: 1 }}>
                {messages.length === 0 ? (
                    <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
                        Start a new conversation...
                    </Typography>
                ) : (
                    messages.map((msg, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                                display: "flex",
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: msg.sender === "user" ? "#1976D2" : "#424242",
                                    color: "white",
                                    padding: "12px",
                                    borderRadius: "12px",
                                    maxWidth: "75%",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    fontSize: "1rem",
                                    lineHeight: "1.5",
                                    boxShadow: 2,
                                }}
                            >
                                <Typography variant="body1">{msg.content}</Typography>
                            </Box>
                        </ListItem>
                    ))
                )}
            </List>
            <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={loading}>
                    {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Send"}
                </Button>
            </Box>
        </Box>
    );
};

export default ChatWindow;
