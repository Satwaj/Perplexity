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
    <div className="w-full h-full bg-[#F1F1EF] flex flex-col overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-6 border-b-2 border-[#1A1C1B] flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-extrabold text-2xl tracking-wider text-[#1A1C1B]">
            DASHBOARD
          </h2>
          <span className="text-[10px] font-bold tracking-widest text-[#7E7576] block mt-0.5">
            V1.0.4 - CHAT ASSISTANT
          </span>
        </div>
        {setSidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000] text-black"
          >
            <HiX size={18} />
          </button>
        )}
      </div>

      {/* New Chat Peach Button */}
      <div className="p-6 border-b-2 border-[#1A1C1B] shrink-0">
        <button
          onClick={createNewChat}
          className="w-full flex items-center justify-center gap-3 border-2 border-[#1A1C1B] bg-[#F5D3B8] p-3 text-sm font-black text-[#1A1C1B] shadow-[4px_4px_0px_0px_#1A1C1B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1A1C1B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1A1C1B] transition-all cursor-pointer"
        >
          <FiPlus size={16} className="stroke-[3]" />
          New Chat
        </button>
      </div>

      {/* Sidebar Navigation Menu (Visible in Mobile and Web View) */}
      <div className="px-6 py-4 border-b-2 border-[#1A1C1B] flex flex-col gap-2 shrink-0 bg-white/30">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#7E7576] block mb-1">
          Navigation Menu
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigateTo("/")}
            className={`flex items-center justify-center gap-1.5 border-2 border-[#1A1C1B] p-2 text-xs font-bold transition-all shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] cursor-pointer ${
              location.pathname === "/" ? "bg-[#1A1C1B] text-white" : "bg-white text-[#1A1C1B] hover:bg-neutral-50"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo("/arena")}
            className={`flex items-center justify-center gap-1.5 border-2 border-[#1A1C1B] p-2 text-xs font-bold transition-all shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] cursor-pointer ${
              location.pathname === "/arena" || location.pathname === "/battle" ? "bg-[#1A1C1B] text-white" : "bg-white text-[#1A1C1B] hover:bg-neutral-50"
            }`}
          >
            Arena
          </button>
          <button
            onClick={() => navigateTo("/chat")}
            className={`flex items-center justify-center gap-1.5 border-2 border-[#1A1C1B] p-2 text-xs font-bold transition-all shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] cursor-pointer ${
              location.pathname === "/chat" ? "bg-[#1A1C1B] text-white" : "bg-white text-[#1A1C1B] hover:bg-neutral-50"
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => navigateTo("/pricing")}
            className={`flex items-center justify-center gap-1.5 border-2 border-[#1A1C1B] p-2 text-xs font-bold transition-all shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] cursor-pointer ${
              location.pathname === "/pricing" ? "bg-[#1A1C1B] text-white" : "bg-white text-[#1A1C1B] hover:bg-neutral-50"
            }`}
          >
            Pricing
          </button>
        </div>
      </div>

      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#7E7576] block mb-3 px-1">
          Recent Chats
        </span>
        {chats && Object.values(chats).length > 0 ? (
          Object.values(chats).map((chat) => {
            const isActive = currentChatId === chat.id;
            return (
              <div
                key={chat.id}
                className={`p-3 border-2 transition-all group ${
                  isActive
                    ? "bg-white border-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B]"
                    : "border-transparent hover:bg-white/40 hover:border-[#1A1C1B]/30"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    onClick={() => openChat(chat.id)}
                    className="flex-1 cursor-pointer min-w-0"
                  >
                    <p className="text-xs font-extrabold text-[#1A1C1B] truncate">
                      {chat.title}
                    </p>
                    <p className="text-[9px] text-[#7E7576] mt-1 font-bold">
                      {chat.lastUpdated}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 text-[#7E7576] hover:text-red-600 cursor-pointer shrink-0"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-xs text-[#7E7576] italic px-1">
            No chats started yet.
          </p>
        )}
      </div>

      {/* Sidebar Bottom Upgrade Section */}
      <div className="p-6 border-t-2 border-[#1A1C1B] space-y-4 bg-white/20 shrink-0">
        <button
          onClick={() => navigateTo("/pricing", false)}
          className="w-full flex items-center justify-center border-2 border-[#1A1C1B] bg-[#1A1C1B] text-white p-3 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#C5A880] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#C5A880] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#C5A880] transition-all cursor-pointer"
        >
          Upgrade Plan
        </button>
        
        <div className="flex flex-col gap-2.5 pt-2">
          <button className="flex items-center gap-3 text-xs font-bold text-[#536255] hover:text-[#1A1C1B] transition-colors cursor-pointer text-left">
            <FiHelpCircle size={15} /> Help
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-xs font-bold text-[#7E7576] hover:text-red-600 transition-colors cursor-pointer text-left"
          >
            <FiLogOut size={15} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
