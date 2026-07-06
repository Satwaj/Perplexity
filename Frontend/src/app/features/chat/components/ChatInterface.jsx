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
  const shape1Ref = useRef(null);
  const shape2Ref = useRef(null);
  const shape3Ref = useRef(null);
  const shape4Ref = useRef(null);
  const workspaceRef = useRef(null);

  // Close sidebar when navigating to a new chat on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [currentChatId]);

  // Floating background shapes animation loops & mouse parallax
  useEffect(() => {
    gsap.to(shape1Ref.current, {
      x: "random(-20, 20)",
      y: "random(-30, 30)",
      rotation: 360,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(shape2Ref.current, {
      x: "random(-30, 30)",
      y: "random(-20, 20)",
      rotation: -360,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(shape3Ref.current, {
      x: "random(-25, 25)",
      y: "random(-25, 25)",
      scale: "random(0.9, 1.15)",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(shape4Ref.current, {
      x: "random(-15, 15)",
      y: "random(-35, 35)",
      rotation: 180,
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 35;
      const yPos = (clientY / window.innerHeight - 0.5) * 35;

      gsap.to([shape1Ref.current, shape2Ref.current], {
        x: `+=${xPos * 0.4}`,
        y: `+=${yPos * 0.4}`,
        overwrite: "auto",
        duration: 1.2,
        ease: "power1.out"
      });

      gsap.to([shape3Ref.current, shape4Ref.current], {
        x: `-=${xPos * 0.3}`,
        y: `-=${yPos * 0.3}`,
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
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
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
    <div className="flex h-screen w-screen overflow-hidden bg-[#F9F9F7] font-sans selection:bg-[#F5D3B8] relative">
      
      {/* Floating Neobrutalist Geometric Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div ref={shape1Ref} className="absolute top-24 left-[15%] text-6xl text-[#F5D3B8]/30 select-none hidden md:block">✦</div>
        <div ref={shape2Ref} className="absolute top-80 right-[10%] w-12 h-12 bg-[#008080]/5 border border-[#1A1C1B]/10 shadow-[3px_3px_0px_0px_rgba(26,28,27,0.03)] hidden md:block" />
        <div ref={shape3Ref} className="absolute bottom-32 left-[20%] w-20 h-20 rounded-full border-2 border-dashed border-[#C5A880]/15 hidden md:block" />
        <div ref={shape4Ref} className="absolute bottom-48 right-[18%] text-7xl text-[#1A1C1B]/5 font-serif select-none hidden md:block">✖</div>
      </div>

      {/* Neobrutalist background grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0" 
        style={{
          backgroundImage: "radial-gradient(#1A1C1B 1.5px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      />
      
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
      <div ref={workspaceRef} className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
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
