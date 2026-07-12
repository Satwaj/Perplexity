import React, { useState } from "react";
import { FiPaperclip, FiMic, FiArrowUp } from "react-icons/fi";
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
      <div className="border border-white/10 bg-zinc-900/70 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3 focus-within:border-violet-500/50 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all">
        {/* Left attachment options */}
        <div className="flex items-center gap-1 px-1 shrink-0 text-zinc-400">
          <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors hover:text-white cursor-pointer">
            <FiPaperclip size={18} />
          </button>
          <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors hover:text-white cursor-pointer">
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
          className="flex-1 bg-transparent border-none outline-none resize-none text-white placeholder-zinc-555 font-semibold text-sm py-1.5 scrollbar-hide max-h-24 align-middle"
        />

        {/* Actions info + Submit button */}
        <div className="flex items-center gap-4 shrink-0 select-none">
          <span className="hidden sm:inline text-[9px] font-semibold font-mono-geist tracking-widest text-zinc-550">
            ENTER TO SEND
          </span>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="cursor-pointer shrink-0 w-9 h-9 bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center rounded-xl shadow-[0_4px_10px_rgba(139,92,246,0.2)] hover:scale-[1.05] active:scale-[0.95] transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
          >
            <FiArrowUp size={16} className="stroke-[2.8]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
