import React, { useState, useEffect, useRef } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatNavbar from "./ChatNavbar";
import ChatMessageArea from "./ChatMessageArea";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import gsap from "gsap";

const ChatInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get messages from Redux store
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const chats = useSelector((state) => state.chat.chats);

  // Background shape animation refs
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);
  const glow3Ref = useRef(null);
  const glow4Ref = useRef(null);
  const workspaceRef = useRef(null);

  // Close sidebar when navigating to a new chat on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [currentChatId]);

  // Floating background shapes animation loops & mouse parallax
  useEffect(() => {
    gsap.to(glow1Ref.current, {
      x: "random(-30, 30)",
      y: "random(-20, 20)",
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(glow2Ref.current, {
      x: "random(-20, 20)",
      y: "random(-30, 30)",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(glow3Ref.current, {
      x: "random(-25, 25)",
      y: "random(-25, 25)",
      scale: "random(0.95, 1.1)",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(glow4Ref.current, {
      x: "random(-15, 15)",
      y: "random(-35, 35)",
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 35;
      const yPos = (clientY / window.innerHeight - 0.5) * 35;

      gsap.to([glow1Ref.current, glow2Ref.current], {
        x: `+=${xPos * 0.3}`,
        y: `+=${yPos * 0.3}`,
        overwrite: "auto",
        duration: 1.2,
        ease: "power1.out"
      });

      gsap.to([glow3Ref.current, glow4Ref.current], {
        x: `-=${xPos * 0.2}`,
        y: `-=${yPos * 0.2}`,
        overwrite: "auto",
        duration: 1.2,
        ease: "power1.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Entrance stagger for workspace components
  useEffect(() => {
    if (workspaceRef.current) {
      gsap.fromTo(
        workspaceRef.current.children,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );
    }
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
    <div className="flex h-screen w-screen overflow-hidden bg-[#09090b] font-sans selection:bg-violet-500/30 relative">
      
      {/* Floating Radial Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div ref={glow1Ref} className="absolute top-24 left-[15%] w-80 h-80 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />
        <div ref={glow2Ref} className="absolute top-80 right-[10%] w-72 h-72 rounded-full bg-cyan-600/5 blur-3xl pointer-none" />
        <div ref={glow3Ref} className="absolute bottom-32 left-[20%] w-96 h-96 rounded-full bg-fuchsia-600/3 blur-3xl pointer-none" />
        <div ref={glow4Ref} className="absolute bottom-48 right-[18%] w-60 h-60 rounded-full bg-indigo-600/5 blur-2xl pointer-none" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] z-0" 
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      />
      
      {/* 1. Left Sidebar Area */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-80 h-full bg-zinc-950/60 backdrop-blur-xl border-r border-white/5 z-50 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ChatSidebar setSidebarOpen={setSidebarOpen} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. Right Side Workspace Area */}
      <div ref={workspaceRef} className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Top Navbar */}
        <ChatNavbar setSidebarOpen={setSidebarOpen} />

        {/* Workspace Main Area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          
          {/* Scrollable results columns */}
          <div className="flex-1 overflow-y-auto bg-[#09090b]">
            <ChatMessageArea messages={formattedMessages} />
          </div>

          {/* Fixed Footer/Input Area */}
          <div className="shrink-0 bg-transparent pt-2">
            {/* Floating Lower Input Area */}
            <div className="w-full max-w-4xl mx-auto px-6 mb-6">
              <ChatInput />
            </div>

            {/* Footer */}
            <footer className="border-t border-white/5 bg-zinc-950/60 py-4 px-6 flex flex-col sm:flex-row items-center justify-between text-[10px] font-semibold tracking-widest text-zinc-550 uppercase gap-2">
              <span>© 2026 ARCHITECTURAL AI. ALL RIGHTS RESERVED.</span>
              <div className="flex items-center gap-6">
                <span className="cursor-pointer hover:text-white transition-colors">PRIVACY POLICY</span>
                <span className="cursor-pointer hover:text-white transition-colors">TERMS OF SERVICE</span>
              </div>
            </footer>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ChatInterface;
