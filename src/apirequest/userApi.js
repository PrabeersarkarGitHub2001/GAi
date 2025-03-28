import axios from "axios";
import Cookies from "js-cookie";
import { userCookie } from "./config";
const API_URL = "http://localhost:5000/api/chat";

export const getChats = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: { Authorization: `Bearer ${Cookies.get(userCookie)}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching chats:", error);
        return [];
    }
};

export const getMessages = async (chatId) => {
    try {
        const response = await axios.get(`${API_URL}/message/${chatId}`, {
            headers: { Authorization: `Bearer ${Cookies.get(userCookie)}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
};

export const sendMessage = async (chatId, message) => {
    try {
        const response = await axios.post(API_URL, { chatId, message }, {
            headers: { Authorization: `Bearer ${Cookies.get(userCookie)}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        return { reply: "Error occurred" };
    }
};
// export const createChat = async (userId, firstMessage) => {
//     try {
//         const response = await axios.post(`${API_URL}/chat`, { userId, title: firstMessage }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
//         return response.data;
//     } catch (error) {
//         console.error("Error creating chat:", error);
//         return null;
//     }
// };

console.log("Hello woprld")

let str="Hello world"
console.log(str.trim())