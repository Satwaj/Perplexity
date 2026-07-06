import React, { useState, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatNavbar from "./ChatNavbar";
import ChatMessageArea from "./ChatMessageArea";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";

const ChatInterface = () => {
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
    <div className="flex h-screen w-screen overflow-hidden bg-[#F9F9F7] font-sans selection:bg-[#F5D3B8]">
      
      {/* 1. Left Sidebar Area */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-80 h-full bg-[#F1F1EF] border-r-2 border-[#1A1C1B] z-50 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ChatSidebar setSidebarOpen={setSidebarOpen} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. Right Side Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Top Navbar */}
        <ChatNavbar setSidebarOpen={setSidebarOpen} />

        {/* Workspace Main Area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          
          {/* Scrollable results columns */}
          <div className="flex-1 overflow-y-auto bg-[#F9F9F7]">
            <ChatMessageArea messages={formattedMessages} />
          </div>

          {/* Fixed Footer/Input Area (Non-scrollable) */}
          <div className="shrink-0 bg-[#F9F9F7] pt-2">
            {/* Floating Lower Input Area */}
            <div className="w-full max-w-4xl mx-auto px-6 mb-6">
              <ChatInput />
            </div>

            {/* Neobrutalist Footer */}
            <footer className="border-t-2 border-[#1A1C1B] bg-white py-4 px-6 flex flex-col sm:flex-row items-center justify-between text-[10px] font-black tracking-widest text-[#536255] uppercase gap-2">
              <span>© 2026 ARCHITECTURAL AI. ALL RIGHTS RESERVED.</span>
              <div className="flex items-center gap-6">
                <span className="cursor-pointer hover:underline">PRIVACY POLICY</span>
                <span className="cursor-pointer hover:underline">TERMS OF SERVICE</span>
              </div>
            </footer>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ChatInterface;
