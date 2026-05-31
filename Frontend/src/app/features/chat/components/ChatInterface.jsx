import React, { useState, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatNavbar from "./ChatNavbar";
import ChatMessageArea from "./ChatMessageArea";
import ChatInput from "./ChatInput";
import { useTheme } from "../../../context/ThemeContext";
import { useSelector } from "react-redux";
import { HiMenu, HiX } from "react-icons/hi";

const ChatInterface = () => {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get messages from Redux store
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const chats = useSelector((state) => state.chat.chats);

  // Close sidebar when navigating to a new chat on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [currentChatId]);

  // Get current chat by ID (chats is an object, not array)
  const currentChat = chats?.[currentChatId];
  const messages = currentChat?.messages || [];

  // Format and sort messages for ChatMessageArea
  // Messages are displayed with OLDEST at TOP, NEWEST at BOTTOM (natural chat order)
  const formattedMessages = messages
    .map((msg) => ({
      id: msg._id || Math.random(),
      text: msg.content,
      sender: msg.role === "user" ? "user" : "assistant",
      timestamp: msg.timestamp || new Date(),
    }))
    .sort((a, b) => {
      // Sort by timestamp: oldest first (0) to newest (end)
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeA - timeB;
    });

  return (
    <div
      className={`flex h-screen ${theme.bg.primary} transition-colors duration-200 relative`}
    >
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile Responsive */}
      <div
        className={`fixed md:static w-72 h-screen md:h-auto ${theme.bg.primary} flex flex-col overflow-hidden transition-transform duration-300 z-40 md:z-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close Button - Mobile Only */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg z-50"
        >
          <HiX
            size={24}
            className={theme.isDark ? "text-white" : "text-black"}
          />
        </button>
        <ChatSidebar />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Mobile Header - Menu + Title */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-slate-700">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <HiMenu
              size={24}
              className={theme.isDark ? "text-white" : "text-black"}
            />
          </button>
          <h1
            className={`font-bold text-sm ${theme.isDark ? "text-white" : "text-black"}`}
          >
            Blinkly AI
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Navbar - Desktop Only (Hide on Mobile) */}
        <div className="hidden md:block">
          <ChatNavbar />
        </div>

        {/* Messages - Pass messages from Redux */}
        <ChatMessageArea messages={formattedMessages} />

        {/* Input - Pass hasMessages flag */}
        <ChatInput hasMessages={messages.length > 0} />
      </div>
    </div>
  );
};

export default ChatInterface;
