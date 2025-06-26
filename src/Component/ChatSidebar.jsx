import React, { useState } from "react";
import { Plus, MessageCircle, Search, Settings, User, Moon, Sun, Menu, X } from "lucide-react";

const ChatSidebar = ({ onSelectChat, chats }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleNewChat = () => {
        onSelectChat(null);
    };

    const filteredChats = chats.filter(chat =>
        chat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {!isCollapsed && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed md:relative z-30 h-full bg-white border-r border-gray-200 
                transition-all duration-300 ease-in-out flex flex-col
                ${isCollapsed ? '-translate-x-full md:translate-x-0 md:w-16' : 'translate-x-0 w-80'}
            `}>
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        {!isCollapsed && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <h1 className="text-xl font-bold text-gray-900">ChatApp</h1>
                            </div>
                        )}
                        <button
                            onClick={toggleSidebar}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
                        </button>
                    </div>

                    {!isCollapsed && (
                        <>
                            {/* New Chat Button */}
                            <button
                                onClick={handleNewChat}
                                className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <Plus className="w-5 h-5" />
                                <span className="font-medium">New Chat</span>
                            </button>

                            {/* Search Bar */}
                            <div className="relative mt-4">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto p-2">
                    {!isCollapsed && (
                        <>
                            <div className="px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Recent Chats ({filteredChats.length})
                            </div>
                            <div className="space-y-1">
                                {filteredChats.length > 0 ? (
                                    [...filteredChats].reverse().map((chat) => (
                                        <button
                                            key={chat.id}
                                            onClick={() => onSelectChat(chat.id)}
                                            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-200"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <MessageCircle className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-600">
                                                        {chat.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Click to continue
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                        <p className="text-sm">No conversations yet</p>
                                        <p className="text-xs mt-1">Start a new chat to begin</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200">
                    {!isCollapsed ? (
                        <div className="space-y-2">
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                <Settings className="w-4 h-4" />
                                <span className="text-sm">Settings</span>
                            </button>
                            <button 
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                <span className="text-sm">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                            </button>
                            <div className="flex items-center gap-3 px-3 py-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">User</p>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <span className="text-xs text-gray-500">Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <button className="w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                <Settings className="w-4 h-4 mx-auto" />
                            </button>
                            <button className="w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                <User className="w-4 h-4 mx-auto" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatSidebar;