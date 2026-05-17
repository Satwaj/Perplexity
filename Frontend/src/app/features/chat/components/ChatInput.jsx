import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import ChatToolButtons from "./ChatToolButtons";
import { useTheme } from "../../../context/ThemeContext";
import { useChat } from "../hooks/useChat";
import { useSelector } from "react-redux";

const ChatInput = ({ onSendMessage }) => {
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const { handleSendmessage } = useChat();

  const [message, setMessage] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);
  const theme = useTheme();

  const handleSendMessage = () => {
    if (message.trim()) {
      // Send message to your backend API
      handleSendmessage({ message, chatId: currentChatId });
      setMessage("");
      setSelectedTools([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToolSelect = (tool) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool],
    );
  };

  return (
    <div
      className={`px-6 py-6 ${theme.bg.primary} ${theme.border.primary} border-t transition-colors duration-200`}
    >
      {/* Tool Buttons */}
      <ChatToolButtons
        selectedTools={selectedTools}
        onToolSelect={handleToolSelect}
      />

      {/* Input Section */}
      <div className="mt-4 space-y-3">
        <div
          className={`flex items-end gap-3 p-3 ${theme.bg.secondary} rounded-xl ${theme.border.primary} border focus-within:${theme.border.primary === "border-gray-200" ? "focus-within:border-gray-400" : "focus-within:border-gray-500"} focus-within:shadow-md transition-all`}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything..."
            rows="1"
            className={`flex-1 ${theme.bg.secondary} outline-none ${theme.text.primary} placeholder-${theme.isDark ? "gray-500" : "gray-400"} resize-none font-medium`}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`flex-shrink-0 w-10 h-10 rounded-lg ${theme.button.primary} text-white flex items-center justify-center disabled:opacity-50 transition-all hover:shadow-md`}
          >
            <FiSend size={18} />
          </button>
        </div>

        {/* Model Selector */}
        <div className="flex justify-between items-center px-2">
          <select
            className={`px-3 py-1 ${theme.bg.secondary} ${theme.border.primary} border rounded-lg text-sm ${theme.text.secondary} cursor-pointer transition-colors`}
          >
            <option>Sonnet 4.6</option>
            <option>Claude 3 Opus</option>
            <option>GPT-4</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
