import React, { useState } from "react";
import { FiPaperclip, FiMic } from "react-icons/fi";
import { useChat } from "../hooks/useChat";
import { useSelector } from "react-redux";

const ChatInput = () => {
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const { handleSendmessage } = useChat();
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      handleSendmessage({ message, chatId: currentChatId });
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full">
      {/* Floating horizontal input bar */}
      <div className="border-2 border-[#1A1C1B] bg-white p-3 shadow-[4px_4px_0px_0px_#1A1C1B] flex items-center gap-3">
        {/* Left attachment options */}
        <div className="flex items-center gap-1.5 px-1 shrink-0 text-[#7E7576]">
          <button className="p-1.5 hover:bg-[#F1F1EF] transition-colors rounded-none hover:text-[#1A1C1B] cursor-pointer">
            <FiPaperclip size={18} />
          </button>
          <button className="p-1.5 hover:bg-[#F1F1EF] transition-colors rounded-none hover:text-[#1A1C1B] cursor-pointer">
            <FiMic size={18} />
          </button>
        </div>

        {/* Input Textarea */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask AI anything..."
          rows={1}
          className="flex-1 bg-transparent border-none outline-none resize-none text-[#1A1C1B] placeholder-[#7E7576] font-semibold text-sm py-1.5 scrollbar-hide max-h-24 align-middle"
        />

        {/* Actions info + Submit button */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden sm:inline text-[9px] font-black tracking-widest text-[#7E7576] uppercase">
            CMD + ENTER
          </span>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="cursor-pointer shrink-0 w-10 h-10 border-2 border-[#1A1C1B] bg-[#1A1C1B] text-white flex items-center justify-center shadow-[2px_2px_0px_0px_#C5A880] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#C5A880] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#C5A880] transition-all disabled:opacity-50 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[2px_2px_0px_0px_#C5A880]"
          >
            <span className="text-xl font-bold">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
