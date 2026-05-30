import React from "react";
import ChatSidebar from "./ChatSidebar";
import ChatNavbar from "./ChatNavbar";
import ChatMessageArea from "./ChatMessageArea";
import ChatInput from "./ChatInput";
import { useTheme } from "../../../context/ThemeContext";
import { useSelector } from "react-redux";

const ChatInterface = () => {
  const theme = useTheme();

  // Get messages from Redux store
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const chats = useSelector((state) => state.chat.chats);

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
      className={`flex h-screen ${theme.bg.primary} transition-colors duration-200`}
    >
      {/* Sidebar */}
      <ChatSidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <ChatNavbar />

        {/* Messages - Pass messages from Redux */}
        <ChatMessageArea messages={formattedMessages} />

        {/* Input - Pass hasMessages flag */}
        <ChatInput hasMessages={messages.length > 0} />
      </div>
    </div>
  );
};

export default ChatInterface;
