import { List, ListItem, ListItemText, Drawer, Typography, Button, Box, Divider } from "@mui/material";

const ChatSidebar = ({ onSelectChat, chats }) => {
    
    const handleNewChat = () => {
        onSelectChat(null);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 280,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 280,
                    backgroundColor: "#1E1E1E",
                    color: "#FFFFFF",
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                },
            }}
        >
            {/* Top Section */}
            <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleNewChat}
                    sx={{
                        borderRadius: 2,
                        fontWeight: "bold",
                        padding: "10px",
                        textTransform: "none",
                        fontSize: "1rem",
                    }}
                >
                    + New Chat
                </Button>
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        paddingY: 1,
                        fontSize: "1.2rem",
                    }}
                >
                    My Chats
                </Typography>
                <Divider sx={{ backgroundColor: "#444" }} />
            </Box>

            {/* Chat List */}
            <List sx={{ flexGrow: 1, overflowY: "auto" }}>
                {[...chats].reverse().map((chat) => (
                    <ListItem
                        button
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        sx={{
                            borderRadius: 2,
                            "&:hover": { backgroundColor: "#333" },
                            margin: "4px 8px",
                        }}
                    >
                        <ListItemText primary={chat.title} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default ChatSidebar;
