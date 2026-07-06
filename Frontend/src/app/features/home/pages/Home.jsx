import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";
import { FiUser, FiLogOut, FiTrendingUp, FiCpu, FiMessageSquare, FiCompass, FiShield } from "react-icons/fi";
import { GiCrossedSwords } from "react-icons/gi";
import gsap from "gsap";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth || {});
  const { handleLogout } = useAuth();

  const navigateTo = (path, replace = true) => {
    if (location.pathname !== path) {
      navigate(path, { replace });
    }
  };
  
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const statsRef = useRef(null);

  // Refs for floating shapes
  const shape1Ref = useRef(null);
  const shape2Ref = useRef(null);
  const shape3Ref = useRef(null);
  const shape4Ref = useRef(null);

  // Refs for counters
  const battleCounterRef = useRef(null);
  const latencyCounterRef = useRef(null);
  const accuracyCounterRef = useRef(null);

  useEffect(() => {
    // 1. Entrance animation for Hero text
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" }
      );
    }

    // 2. Entrance animation for Action Choice Cards
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.3 }
      );
    }

    // 3. Stats section slide-in
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.6 }
      );
    }

    // 4. GSAP Counter Count-up Animations
    const counterObj = { battles: 0, latency: 0.0, accuracy: 0.0 };
    gsap.to(counterObj, {
      battles: 14854,
      latency: 0.84,
      accuracy: 99.2,
      duration: 2.2,
      ease: "power3.out",
      delay: 0.7,
      onUpdate: () => {
        if (battleCounterRef.current) {
          battleCounterRef.current.innerText = Math.floor(counterObj.battles).toLocaleString();
        }
        if (latencyCounterRef.current) {
          latencyCounterRef.current.innerText = counterObj.latency.toFixed(2) + "s";
        }
        if (accuracyCounterRef.current) {
          accuracyCounterRef.current.innerText = counterObj.accuracy.toFixed(1) + "%";
        }
      }
    });

    // 5. Floating background shapes animation loops (constant drift)
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

    // Mouse movement parallax effect on background shapes
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to([shape1Ref.current, shape2Ref.current], {
        x: `+=${xPos * 0.4}`,
        y: `+=${yPos * 0.4}`,
        overwrite: "auto",
        duration: 1,
        ease: "power1.out"
      });

      gsap.to([shape3Ref.current, shape4Ref.current], {
        x: `-=${xPos * 0.3}`,
        y: `-=${yPos * 0.3}`,
        overwrite: "auto",
        duration: 1,
        ease: "power1.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#1A1C1B] flex flex-col font-sans relative selection:bg-[#F5D3B8] overflow-x-hidden">
      {/* 1. Scrolling Marquee Header Ticker */}
      <div className="w-full bg-[#1A1C1B] text-[#F9F9F7] py-2 overflow-hidden border-b-2 border-[#1A1C1B] select-none z-20 shrink-0">
        <div className="whitespace-nowrap flex gap-12 font-black uppercase text-[10px] tracking-[0.25em] animate-marquee">
          <span>BATTLE ARENA • COMPARE MODELS • REAL-TIME BENCHMARKS • MISTRALAI • GROQ • LLAMA3 • GEMINI • CHAT ROOMS</span>
          <span>BATTLE ARENA • COMPARE MODELS • REAL-TIME BENCHMARKS • MISTRALAI • GROQ • LLAMA3 • GEMINI • CHAT ROOMS</span>
        </div>
      </div>

      {/* CSS Styles for marquee animation */}
      <style>{`
        @keyframes marquee-drift {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee-drift 22s infinite linear;
          width: max-content;
        }
      `}</style>

      {/* Floating Neobrutalist Geometric Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Shape 1: Neobrutalist Star/Asterisk */}
        <div
          ref={shape1Ref}
          className="absolute top-24 left-[10%] text-6xl text-[#F5D3B8]/40 select-none hidden md:block"
        >
          ✦
        </div>
        {/* Shape 2: Solid Grid Card Block */}
        <div
          ref={shape2Ref}
          className="absolute top-80 right-[8%] w-16 h-16 bg-[#008080]/5 border-2 border-[#1A1C1B]/10 shadow-[4px_4px_0px_0px_rgba(26,28,27,0.05)] hidden md:block"
        />
        {/* Shape 3: Doughnut Circle */}
        <div
          ref={shape3Ref}
          className="absolute bottom-32 left-[12%] w-24 h-24 rounded-full border-4 border-dashed border-[#C5A880]/20 hidden md:block"
        />
        {/* Shape 4: Cross */}
        <div
          ref={shape4Ref}
          className="absolute bottom-40 right-[15%] text-7xl text-[#1A1C1B]/5 font-serif select-none hidden md:block"
        >
          ✖
        </div>
      </div>

      {/* Neobrutalist background grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-0" 
        style={{
          backgroundImage: "radial-gradient(#1A1C1B 1.5px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* 2. Top Navbar */}
      <nav className="h-16 shrink-0 border-b-2 border-[#1A1C1B] bg-white flex items-center justify-between px-6 md:px-12 z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <span
            onClick={() => navigateTo("/")}
            className="font-extrabold text-lg tracking-[0.25em] text-[#1A1C1B] uppercase cursor-pointer"
          >
            ARENA AI
          </span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-black tracking-widest text-[#536255]">
          <span
            onClick={() => navigateTo("/")}
            className="cursor-pointer text-[#1A1C1B] border-b-2 border-black pb-1 hover:text-[#1A1C1B] transition-colors"
          >
            HOME
          </span>
          <span
            onClick={() => navigateTo("/arena")}
            className="cursor-pointer hover:text-[#1A1C1B] transition-colors"
          >
            ARENA
          </span>
          <span
            onClick={() => navigateTo("/chat")}
            className="cursor-pointer hover:text-[#1A1C1B] transition-colors"
          >
            CHAT
          </span>
          <span
            onClick={() => navigateTo("/pricing")}
            className="cursor-pointer hover:text-[#1A1C1B] transition-colors"
          >
            PRICING
          </span>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border-2 border-[#1A1C1B] bg-[#F1F1EF] px-3 py-1.5 font-bold text-xs text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B]">
                <FiUser size={13} className="stroke-[2.5]" />
                <span className="hidden sm:inline">{user.fullname || user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-500/10 text-[#7E7576] hover:text-red-600 transition-colors cursor-pointer"
                title="Sign out"
              >
                <FiLogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo("/login", false)}
                className="px-3.5 py-1.5 border-2 border-black bg-white font-bold text-xs text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] transition-all cursor-pointer uppercase tracking-wider"
              >
                Sign In
              </button>
              <button
                onClick={() => navigateTo("/register", false)}
                className="px-3.5 py-1.5 border-2 border-black bg-[#F5D3B8] font-bold text-xs text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] transition-all cursor-pointer uppercase tracking-wider"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* 3. Hero & Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col justify-center items-center w-full z-10">
        <div ref={heroRef} className="text-center space-y-6 max-w-3xl mb-16">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#008080] bg-[#008080]/10 px-3 py-1.5 border border-[#008080]/20">
            SYSTEM GRID V1.0.4
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-brutalist font-black text-[#1A1C1B] tracking-tight leading-[1.05] mt-4">
            COMPARE MODELS <br className="hidden sm:inline" />
            <span className="bg-[#F5D3B8] px-2.5 py-0.5 inline-block border-2 border-[#1A1C1B] shadow-[4px_4px_0px_0px_#1A1C1B] rotate-[-1deg] mt-2">
              SIDE-BY-SIDE
            </span>
          </h1>
          <p className="text-sm md:text-base text-[#536255] font-semibold max-w-xl mx-auto leading-relaxed mt-4">
            Run real-time side-by-side LLM benchmark battles with automatic evaluation, or open single-model conversational channels with deep tooling integrations.
          </p>
        </div>

        {/* 4. Action Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl"
        >
          {/* Card A: Battle Arena */}
          <div
            onClick={() => navigateTo("/arena", false)}
            className="group cursor-pointer bg-[#F5D3B8]/20 border-2 border-[#1A1C1B] p-8 shadow-[8px_8px_0px_0px_#1A1C1B] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#1A1C1B] hover:bg-[#F5D3B8]/30 transition-all flex flex-col justify-between min-h-[340px]"
          >
            <div className="space-y-4">
              <div className="inline-flex p-3 bg-[#F5D3B8] border-2 border-[#1A1C1B] text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B]">
                <GiCrossedSwords size={24} className="group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif-brutalist font-black text-[#1A1C1B]">
                BATTLE ARENA
              </h3>
              <p className="text-xs text-[#536255] font-semibold leading-relaxed">
                Compare two models simultaneously (Mistral & Groq) with side-by-side solutions. An automated judge computes relative performance scores, reasons about strengths, and awards verdicts.
              </p>
            </div>
            
            <div className="mt-8 border-t border-[#1A1C1B]/20 pt-5 flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#1A1C1B]">
              <span>Launch Battle Grid</span>
              <span className="transform group-hover:translate-x-1.5 transition-transform">↗</span>
            </div>
          </div>

          {/* Card B: Chat Hub */}
          <div
            onClick={() => navigateTo("/chat", false)}
            className="group cursor-pointer bg-white border-2 border-[#1A1C1B] p-8 shadow-[8px_8px_0px_0px_#1A1C1B] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#1A1C1B] hover:bg-neutral-50 transition-all flex flex-col justify-between min-h-[340px]"
          >
            <div className="space-y-4">
              <div className="inline-flex p-3 bg-teal-100 border-2 border-[#1A1C1B] text-[#008080] shadow-[2px_2px_0px_0px_#1A1C1B]">
                <FiMessageSquare size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif-brutalist font-black text-[#1A1C1B]">
                AI CHAT CHANNEL
              </h3>
              <p className="text-xs text-[#536255] font-semibold leading-relaxed">
                Connect directly with specialized agents for extended sessions. Featuring persistent chat history, tools integrations (internet lookup, file ingestion), and voice reading capabilities.
              </p>
            </div>

            <div className="mt-8 border-t border-[#1A1C1B]/20 pt-5 flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#008080]">
              <span>Enter Chatroom</span>
              <span className="transform group-hover:translate-x-1.5 transition-transform">↗</span>
            </div>
          </div>
        </div>

        {/* 5. Live Counters Section */}
        <div
          ref={statsRef}
          className="w-full max-w-4xl mt-16 p-6 border-2 border-[#1A1C1B] bg-white shadow-[6px_6px_0px_0px_#1A1C1B] grid grid-cols-3 gap-4 text-center"
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-[#7E7576] mb-1">
              BATTLES COMPLETED
            </p>
            <p
              ref={battleCounterRef}
              className="text-xl md:text-3xl font-serif-brutalist font-black text-[#1A1C1B]"
            >
              0
            </p>
          </div>
          <div className="border-x-2 border-[#1A1C1B]">
            <p className="text-[10px] font-black uppercase tracking-wider text-[#7E7576] mb-1">
              AVG LATENCY
            </p>
            <p
              ref={latencyCounterRef}
              className="text-xl md:text-3xl font-serif-brutalist font-black text-[#008080]"
            >
              0.00s
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-[#7E7576] mb-1">
              INTELLIGENCE ACCURACY
            </p>
            <p
              ref={accuracyCounterRef}
              className="text-xl md:text-3xl font-serif-brutalist font-black text-[#1A1C1B]"
            >
              0.0%
            </p>
          </div>
        </div>
      </main>

      {/* 6. Footer */}
      <footer className="border-t-2 border-[#1A1C1B] bg-white py-6 px-12 flex flex-col md:flex-row items-center justify-between text-[10px] font-black tracking-widest text-[#536255] uppercase gap-4 mt-auto">
        <span>© 2026 ARENA AI SYSTEMS. ALL RIGHTS RESERVED.</span>
        <div className="flex items-center gap-8">
          <span className="cursor-pointer hover:underline" onClick={() => navigateTo("/pricing", false)}>PRICING</span>
          <span className="cursor-pointer hover:underline">TERMS OF SERVICE</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
