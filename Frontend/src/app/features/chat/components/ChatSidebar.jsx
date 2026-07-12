import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FiPlus, FiTrash2, FiLogOut, FiHelpCircle } from "react-icons/fi";
import { HiX } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../../auth/hooks/useAuth";

const ChatSidebar = ({ setSidebarOpen }) => {
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout } = useAuth();

  const navigateTo = (path, replace = true) => {
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
    if (location.pathname !== path) {
      navigate(path, { replace });
    }
  };

  const {
    chats,
    handleGetChats,
    handleOpenChat,
    handleSendmessage,
    handleDeleteChat,
  } = useChat();

  useEffect(() => {
    handleGetChats();
  }, [handleGetChats]);

  const openChat = (chatId) => {
    handleOpenChat(chatId, chats);
  };

  const createNewChat = () => {
    handleSendmessage({ message: "Hello!", chatId: null });
  };

  return (
    <div className="w-full h-full bg-transparent flex flex-col overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-extrabold text-2xl tracking-wider text-white">
            DASHBOARD
          </h2>
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 block mt-0.5 font-mono-geist">
            V1.0.4 - CHAT ASSISTANT
          </span>
        </div>
        {setSidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-lg border border-white/10 bg-zinc-900/60 text-white"
          >
            <HiX size={18} />
          </button>
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-6 border-b border-white/5 shrink-0">
        <button
          onClick={createNewChat}
          className="w-full flex items-center justify-center gap-3 bg-violet-600 hover:bg-violet-500 text-white p-3.5 rounded-xl text-sm font-semibold shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_20px_rgba(139,92,246,0.45)] transition-all cursor-pointer"
        >
          <FiPlus size={16} className="stroke-[3]" />
          New Chat
        </button>
      </div>

      {/* Sidebar Navigation Menu */}
      <div className="px-6 py-4 border-b border-white/5 flex flex-col gap-2 shrink-0 bg-white/[0.01]">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
          Navigation Menu
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigateTo("/")}
            className={`flex items-center justify-center gap-1.5 border border-white/5 rounded-lg p-2 text-xs font-semibold transition-all cursor-pointer ${
              location.pathname === "/" ? "bg-white/10 text-white" : "bg-zinc-900/40 text-zinc-400 hover:text-white"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo("/arena")}
            className={`flex items-center justify-center gap-1.5 border border-white/5 rounded-lg p-2 text-xs font-semibold transition-all cursor-pointer ${
              location.pathname === "/arena" || location.pathname === "/battle" ? "bg-white/10 text-white" : "bg-zinc-900/40 text-zinc-400 hover:text-white"
            }`}
          >
            Arena
          </button>
          <button
            onClick={() => navigateTo("/chat")}
            className={`flex items-center justify-center gap-1.5 border border-white/5 rounded-lg p-2 text-xs font-semibold transition-all cursor-pointer ${
              location.pathname === "/chat" ? "bg-white/10 text-white" : "bg-zinc-900/40 text-zinc-400 hover:text-white"
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => navigateTo("/pricing")}
            className={`flex items-center justify-center gap-1.5 border border-white/5 rounded-lg p-2 text-xs font-semibold transition-all cursor-pointer ${
              location.pathname === "/pricing" ? "bg-white/10 text-white" : "bg-zinc-900/40 text-zinc-400 hover:text-white"
            }`}
          >
            Pricing
          </button>
        </div>
      </div>

      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2 px-1">
          Recent Chats
        </span>
        {chats && Object.values(chats).length > 0 ? (
          Object.values(chats).map((chat) => {
            const isActive = currentChatId === chat.id;
            return (
              <div
                key={chat.id}
                className={`p-3 border rounded-xl transition-all group ${
                  isActive
                    ? "bg-white/10 border-violet-500/20"
                    : "border-transparent hover:bg-white/[0.03] hover:border-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    onClick={() => openChat(chat.id)}
                    className="flex-1 cursor-pointer min-w-0"
                  >
                    <p className="text-xs font-semibold text-zinc-200 group-hover:text-white truncate">
                      {chat.title}
                    </p>
                    <p className="text-[9px] text-zinc-500 mt-1 font-semibold font-mono-geist">
                      {chat.lastUpdated}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 text-zinc-500 hover:text-red-400 cursor-pointer shrink-0"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-xs text-zinc-500 italic px-1">
            No chats started yet.
          </p>
        )}
      </div>

      {/* Sidebar Bottom Upgrade Section */}
      <div className="p-6 border-t border-white/5 space-y-4 bg-white/[0.01] shrink-0">
        <button
          onClick={() => navigateTo("/pricing", false)}
          className="w-full flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
        >
          Upgrade Plan
        </button>
        
        <div className="flex flex-col gap-2 pt-2">
          <button className="flex items-center gap-3 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer text-left py-1">
            <FiHelpCircle size={15} /> Help
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-xs font-semibold text-zinc-500 hover:text-red-400 transition-colors cursor-pointer text-left py-1"
          >
            <FiLogOut size={15} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
