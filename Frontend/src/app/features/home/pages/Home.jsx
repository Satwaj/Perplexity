import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";
import { FiUser, FiLogOut, FiCpu, FiMessageSquare, FiTrendingUp, FiLayers, FiShield, FiMic, FiArrowRight } from "react-icons/fi";
import { GiCrossedSwords } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import gsap from "gsap";

// High-fidelity vector logos for brand items
const MistralLogo = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 10H20L12 2Z" fill="#F97316" />
    <path d="M4 14L12 22L20 14H4Z" fill="#EA580C" />
  </svg>
);

const GroqLogo = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#22D3EE" strokeWidth="2" />
    <circle cx="12" cy="12" r="5" stroke="#06B6D4" strokeWidth="2" />
    <path d="M12 3V21M3 12H21" stroke="#22D3EE" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

const LlamaLogo = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 18V6H8L12 11.5L16 6H20V18" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GeminiLogo = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill="#60A5FA" />
  </svg>
);

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth || {});
  const { handleLogout } = useAuth();

  const navigateTo = (path, replace = true) => {
    if (location.pathname !== path) {
      navigate(path, { replace });
    }
  };
  
  // Animation Refs
  const mainWrapperRef = useRef(null);
  const heroRef = useRef(null);
  const playgroundRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const modelDirRef = useRef(null);

  // Background glow refs
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);
  const glow3Ref = useRef(null);

  // Stats Counters Refs
  const battleCounterRef = useRef(null);
  const latencyCounterRef = useRef(null);
  const throughputCounterRef = useRef(null);

  // Interactive Playground Simulation State
  const [simStep, setSimStep] = useState(0); 
  const [simQuery, setSimQuery] = useState("");
  const targetQuery = "Optimize a recursive Fibonacci generator in Python.";
  
  const simMistralCode = `def fib(n, memo={}):\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = fib(n-1) + fib(n-2)\n    return memo[n]`;
  const simGroqCode = `def fib(n):\n    if n <= 1: return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b`;

  const [mistralText, setMistralText] = useState("");
  const [groqText, setGroqText] = useState("");

  // Reusable 3D Tilt Hover Animation
  const handleCardMouseMove = (e) => {
    const cardEl = e.currentTarget;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 10; 
    const angleY = (x - xc) / 10; 

    gsap.to(cardEl, {
      rotateX: angleX,
      rotateY: angleY,
      scale: 1.02,
      borderColor: "rgba(139, 92, 246, 0.25)",
      boxShadow: "0 25px 45px rgba(0, 0, 0, 0.55), 0 0 25px rgba(139, 92, 246, 0.04)",
      ease: "power2.out",
      duration: 0.3
    });
  };

  const handleCardMouseLeave = (e) => {
    const cardEl = e.currentTarget;
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      borderColor: "rgba(255, 255, 255, 0.06)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      ease: "power2.out",
      duration: 0.5
    });
  };

  // Simulated typing and rendering loop for playground
  useEffect(() => {
    let active = true;
    const runSimulation = async () => {
      while (active) {
        setSimStep(0);
        setSimQuery("");
        setMistralText("");
        setGroqText("");
        await new Promise((r) => setTimeout(r, 800));
        
        let typed = "";
        for (let i = 0; i < targetQuery.length; i++) {
          if (!active) return;
          typed += targetQuery[i];
          setSimQuery(typed);
          await new Promise((r) => setTimeout(r, 40));
        }
        
        await new Promise((r) => setTimeout(r, 1000));
        if (!active) return;

        setSimStep(1);
        let mText = "";
        let gText = "";
        const maxLen = Math.max(simMistralCode.length, simGroqCode.length);
        
        for (let i = 0; i < maxLen; i += 3) {
          if (!active) return;
          if (i < simMistralCode.length) {
            mText += simMistralCode.substring(i, i + 3);
            setMistralText(mText);
          }
          if (i < simGroqCode.length) {
            gText += simGroqCode.substring(i, i + 3);
            setGroqText(gText);
          }
          await new Promise((r) => setTimeout(r, 20));
        }

        await new Promise((r) => setTimeout(r, 800));
        if (!active) return;

        setSimStep(2);
        await new Promise((r) => setTimeout(r, 1500));
        if (!active) return;

        setSimStep(3);
        await new Promise((r) => setTimeout(r, 4000));
      }
    };
    
    runSimulation();
    return () => {
      active = false;
    };
  }, []);

  // Entrance & drift animations
  useEffect(() => {
    // Initial Page Load Slide Reveal
    gsap.fromTo(
      mainWrapperRef.current,
      { opacity: 0, scale: 0.99 },
      { opacity: 1, scale: 1, duration: 1, ease: "power4.out" }
    );

    // Staggered Hero text reveal
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );
    }

    if (playgroundRef.current) {
      gsap.fromTo(
        playgroundRef.current,
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power4.out", delay: 0.25 }
      );
    }

    // Staggered card reveals for features and directory
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.querySelectorAll(".card-element"),
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.4 }
      );
    }

    if (modelDirRef.current) {
      gsap.fromTo(
        modelDirRef.current.querySelectorAll(".card-element"),
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.5 }
      );
    }

    // Counters Count-up Animations
    const counterObj = { battles: 0, latency: 0.0, throughput: 0 };
    gsap.to(counterObj, {
      battles: 28450,
      latency: 0.74,
      throughput: 1250,
      duration: 2.2,
      ease: "power3.out",
      delay: 0.4,
      onUpdate: () => {
        if (battleCounterRef.current) {
          battleCounterRef.current.innerText = Math.floor(counterObj.battles).toLocaleString();
        }
        if (latencyCounterRef.current) {
          latencyCounterRef.current.innerText = counterObj.latency.toFixed(2) + "s";
        }
        if (throughputCounterRef.current) {
          throughputCounterRef.current.innerText = Math.floor(counterObj.throughput).toLocaleString() + " t/s";
        }
      }
    });

    // Constant drift of glows
    gsap.to(glow1Ref.current, {
      x: "random(-40, 40)",
      y: "random(-30, 30)",
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(glow2Ref.current, {
      x: "random(-30, 30)",
      y: "random(-40, 40)",
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(glow3Ref.current, {
      x: "random(-35, 35)",
      y: "random(-35, 35)",
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Parallax effect on background glow spots
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 45;
      const yPos = (clientY / window.innerHeight - 0.5) * 45;

      gsap.to(glow1Ref.current, {
        x: `+=${xPos * 0.3}`,
        y: `+=${yPos * 0.3}`,
        overwrite: "auto",
        duration: 1.2,
        ease: "power1.out"
      });

      gsap.to([glow2Ref.current, glow3Ref.current], {
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

  // Model directory list data
  const models = [
    {
      name: "Mistral 8x7B",
      desc: "Mixture of Experts high-reasoning logic core.",
      latency: "0.84s",
      speed: "142 t/s",
      icon: MistralLogo,
      badge: "REASONING",
      color: "border-orange-500/20 text-orange-400 bg-orange-500/5",
    },
    {
      name: "Groq Llama 3",
      desc: "Instant language generator powered by LPU architecture.",
      latency: "0.35s",
      speed: "342 t/s",
      icon: GroqLogo,
      badge: "SPEED CORE",
      color: "border-cyan-500/20 text-cyan-400 bg-cyan-500/5",
    },
    {
      name: "Meta Llama 3",
      desc: "High-performance versatile coding and chat agent.",
      latency: "0.62s",
      speed: "215 t/s",
      icon: LlamaLogo,
      badge: "BALANCED",
      color: "border-purple-500/20 text-purple-400 bg-purple-500/5",
    },
    {
      name: "Gemini 1.5 Pro",
      desc: "Multi-modal model with exceptionally high token windows.",
      latency: "0.92s",
      speed: "135 t/s",
      icon: GeminiLogo,
      badge: "MULTIMODAL",
      color: "border-blue-500/20 text-blue-400 bg-blue-500/5",
    },
  ];

  return (
    <div 
      ref={mainWrapperRef}
      className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans relative selection:bg-violet-500/30 overflow-x-hidden opacity-0"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          ref={glow1Ref}
          className="absolute top-24 left-[10%] w-[35vw] h-[35vw] rounded-full bg-violet-600/5 blur-[120px]"
        />
        <div
          ref={glow2Ref}
          className="absolute top-96 right-[8%] w-[30vw] h-[30vw] rounded-full bg-indigo-600/5 blur-[100px]"
        />
        <div
          ref={glow3Ref}
          className="absolute bottom-40 left-[12%] w-[40vw] h-[40vw] rounded-full bg-fuchsia-600/3 blur-[140px]"
        />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.07] z-0" 
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* 2. Top Navbar */}
      <nav className="h-16 shrink-0 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-6 md:px-12 z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg border border-white/10 bg-zinc-900/60 text-white shrink-0 cursor-pointer"
          >
            {menuOpen ? <HiX size={18} /> : <HiMenu size={18} />}
          </button>
          <span
            onClick={() => navigateTo("/")}
            className="font-extrabold text-lg tracking-[0.2em] text-white cursor-pointer uppercase"
          >
            ARENA AI
          </span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest text-zinc-400">
          <span
            onClick={() => navigateTo("/")}
            className="cursor-pointer text-white border-b-2 border-violet-500 pb-1"
          >
            HOME
          </span>
          <span
            onClick={() => navigateTo("/arena")}
            className="cursor-pointer hover:text-white transition-colors"
          >
            ARENA
          </span>
          <span
            onClick={() => navigateTo("/chat")}
            className="cursor-pointer hover:text-white transition-colors"
          >
            CHAT
          </span>
          <span
            onClick={() => navigateTo("/pricing")}
            className="cursor-pointer hover:text-white transition-colors"
          >
            PRICING
          </span>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border border-white/10 bg-zinc-900/50 px-3.5 py-1.5 rounded-xl font-semibold text-xs text-zinc-200">
                <FiUser size={13} className="text-violet-400" />
                <span className="hidden sm:inline">{user.fullname || user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                title="Sign out"
              >
                <FiLogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo("/login", false)}
                className="px-4 py-2 border border-white/10 bg-zinc-900/40 rounded-xl font-semibold text-xs text-zinc-200 hover:bg-zinc-800 transition-all cursor-pointer uppercase tracking-wider"
              >
                Sign In
              </button>
              <button
                onClick={() => navigateTo("/register", false)}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold text-xs text-white transition-all cursor-pointer shadow-[0_4px_12px_rgba(139,92,246,0.2)] uppercase tracking-wider"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-zinc-950/95 border-b border-white/[0.08] z-40 p-4 md:hidden shadow-2xl flex flex-col gap-2.5 backdrop-blur-lg">
          <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 px-1 mb-1">
            Navigation Menu
          </span>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigateTo("/");
            }}
            className={`w-full text-left border border-white/5 rounded-xl p-3 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              location.pathname === "/" ? "bg-violet-600 text-white" : "bg-zinc-900/60 text-zinc-300"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigateTo("/arena");
            }}
            className={`w-full text-left border border-white/5 rounded-xl p-3 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              location.pathname === "/arena" || location.pathname === "/battle" ? "bg-violet-600 text-white" : "bg-zinc-900/60 text-zinc-300"
            }`}
          >
            Arena
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigateTo("/chat");
            }}
            className={`w-full text-left border border-white/5 rounded-xl p-3 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              location.pathname === "/chat" ? "bg-violet-600 text-white" : "bg-zinc-900/60 text-zinc-300"
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigateTo("/pricing");
            }}
            className={`w-full text-left border border-white/5 rounded-xl p-3 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              location.pathname === "/pricing" ? "bg-violet-600 text-white" : "bg-zinc-900/60 text-zinc-300"
            }`}
          >
            Pricing
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-32 z-10 relative">
        
        {/* SECTION 1: HERO */}
        <section ref={heroRef} className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="flex justify-center animate-fade-in">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-3.5 py-1.5 rounded-full border border-violet-500/20">
              V2.0 THE AI OPERATING SYSTEM
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-brutalist font-black text-white tracking-tight leading-[1.05] mt-4 text-glow-gradient">
            Benchmark and Chat. <br className="hidden sm:inline" />
            <span className="text-violet-gradient mt-2 inline-block">
              In One Unified Grid
            </span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 font-semibold max-w-xl mx-auto leading-relaxed mt-5">
            Pit specialized LLM engines side-by-side with real-time socket evaluating judges, or deploy dedicated persistent conversation channels with audio synthesis tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => navigateTo("/arena", false)}
              className="px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.45)] transition-all cursor-pointer text-xs uppercase tracking-wider"
            >
              Launch Battle Arena
            </button>
            <button
              onClick={() => navigateTo("/chat", false)}
              className="px-8 py-3.5 bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-zinc-200 rounded-xl font-semibold transition-all cursor-pointer text-xs uppercase tracking-wider"
            >
              Enter Chat Channel
            </button>
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE SIMULATION PLAYGROUND */}
        <section ref={playgroundRef} className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase font-space">Live Battle Simulator</h2>
            <p className="text-xs text-zinc-500 font-medium">Watch the comparison system evaluation cycle in action below.</p>
          </div>
          
          {/* Simulated Workspace Console */}
          <div className="w-full bg-zinc-950/80 border border-white/15 rounded-2xl overflow-hidden shadow-2xl relative">
            
            {/* Console Header Bar */}
            <div className="bg-zinc-900/90 px-5 py-3.5 border-b border-white/5 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="text-[10px] text-zinc-550 font-mono-geist ml-3">battle_grid_session.py</span>
              </div>
              <span className="text-[10px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20 font-semibold uppercase tracking-wider">
                Simulation
              </span>
            </div>

            {/* Console Workspace body */}
            <div className="p-6 md:p-8 space-y-6 font-mono-geist text-xs text-zinc-300">
              
              {/* 1. Input Box Area */}
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-zinc-550 uppercase tracking-widest block">User Query Input:</span>
                <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 flex items-center justify-between text-zinc-200">
                  <span className={`${simStep === 0 ? "typing-cursor text-violet-400 font-bold" : "text-white"}`}>
                    {simQuery || "Waiting to initialize..."}
                  </span>
                  <span className="text-[10px] text-zinc-600 shrink-0 hidden sm:inline">CTRL+ENTER</span>
                </div>
              </div>

              {/* 2. Side by Side Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Mistral Model Pane */}
                <div className={`bg-zinc-900/50 border rounded-xl p-5 space-y-4 transition-all duration-300 ${simStep === 1 ? "border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.1)]" : "border-white/5"}`}>
                  <div className="flex items-center justify-between pb-3 border-b border-white/5 select-none">
                    <div className="flex items-center gap-2">
                      <MistralLogo className="w-4 h-4" />
                      <span className="text-[10px] font-bold text-zinc-300">MISTRAL AI</span>
                    </div>
                    <span className={`text-[10px] ${simStep >= 2 ? "text-violet-400 font-bold" : "text-zinc-600 animate-pulse"}`}>
                      {simStep === 0 && "Pending Query"}
                      {simStep === 1 && "Generating..."}
                      {simStep >= 2 && "Score: 9.2/10"}
                    </span>
                  </div>
                  <pre className="text-[10px] leading-relaxed text-zinc-450 overflow-x-auto select-all max-h-36 py-1 scrollbar-hide">
                    <code>{mistralText || "# Code output streams here..."}</code>
                  </pre>
                </div>

                {/* Groq Model Pane */}
                <div className={`bg-zinc-900/50 border rounded-xl p-5 space-y-4 transition-all duration-300 ${simStep === 1 ? "border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]" : "border-white/5"}`}>
                  <div className="flex items-center justify-between pb-3 border-b border-white/5 select-none">
                    <div className="flex items-center gap-2">
                      <GroqLogo className="w-4 h-4" />
                      <span className="text-[10px] font-bold text-zinc-300">GROQ LPU</span>
                    </div>
                    <span className={`text-[10px] ${simStep >= 2 ? "text-cyan-400 font-bold" : "text-zinc-600 animate-pulse"}`}>
                      {simStep === 0 && "Pending Query"}
                      {simStep === 1 && "Generating..."}
                      {simStep >= 2 && "Score: 9.8/10"}
                    </span>
                  </div>
                  <pre className="text-[10px] leading-relaxed text-zinc-450 overflow-x-auto select-all max-h-36 py-1 scrollbar-hide">
                    <code>{groqText || "# Code output streams here..."}</code>
                  </pre>
                </div>
              </div>

              {/* 3. Judge Verdict Block */}
              <div className={`transition-all duration-500 overflow-hidden ${simStep === 3 ? "max-h-24 opacity-100 mt-4" : "max-h-0 opacity-0 pointer-events-none"}`}>
                <div className="border border-white/10 bg-zinc-900 p-4 rounded-xl flex items-center justify-between gap-3 text-zinc-300 font-semibold uppercase tracking-wider text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🏆</span>
                    <span>
                      JUDGE DECISION: <span className="text-cyan-400 font-bold">Groq</span> WINS (9.8 vs 9.2)
                    </span>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full text-[9px] font-bold text-cyan-400 animate-pulse">
                    Groq compiled 2.4x faster
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3: FEATURES GRID */}
        <section ref={featuresRef} className="space-y-12">
          <div className="text-center space-y-3 max-w-lg mx-auto">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-3.5 py-1.5 rounded-full border border-violet-500/20">
              SERVICE ADVANTAGES
            </span>
            <h2 className="text-3xl md:text-4xl font-serif-brutalist font-black text-white tracking-tight">
              A Platform Built For Intelligence
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-semibold">
              Get clean, optimized comparisons and persistent chat configurations out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="card-element card-brutalist p-6 rounded-2xl flex flex-col justify-between bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] shadow-lg hover:border-violet-500/20 transition-all group"
            >
              <div>
                <div className="inline-flex p-3 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300">
                  <FiLayers size={18} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Dual Battle Arena</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                  Pit Groq and Mistral side-by-side. Compare speeds, response code formats, and structure differences.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="card-element card-brutalist p-6 rounded-2xl flex flex-col justify-between bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] shadow-lg hover:border-indigo-500/20 transition-all group"
            >
              <div>
                <div className="inline-flex p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300">
                  <FiCpu size={18} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Automated Evaluator</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                  An automated judge evaluates code snippets, computes speed differentials, and renders verdicts.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="card-element card-brutalist p-6 rounded-2xl flex flex-col justify-between bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] shadow-lg hover:border-cyan-500/20 transition-all group"
            >
              <div>
                <div className="inline-flex p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300">
                  <FiMessageSquare size={18} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Persistent Agents</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                  Create persistent chat sessions, save historical threads, and switch models on the fly.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="card-element card-brutalist p-6 rounded-2xl flex flex-col justify-between bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] shadow-lg hover:border-emerald-500/20 transition-all group"
            >
              <div>
                <div className="inline-flex p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300">
                  <FiMic size={18} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Voice & Ingest Tools</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                  Ask questions using speech input and synthesis, or upload text files for context ingestion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PERFORMANCE MONITOR */}
        <section ref={statsRef} className="space-y-12">
          <div className="text-center space-y-3 max-w-lg mx-auto">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/20">
              PLATFORM TELEMETRY
            </span>
            <h2 className="text-3xl md:text-4xl font-serif-brutalist font-black text-white tracking-tight">
              Real-time Ingress Monitor
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-semibold">
              Live statistics showing platform battle metrics and average response speeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Stat 1 */}
            <div className="bg-zinc-900/30 border border-white/[0.06] p-8 rounded-2xl text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 blur-2xl rounded-full" />
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Battles Evaluated
              </p>
              <p
                ref={battleCounterRef}
                className="text-3xl md:text-4xl font-mono-geist font-bold text-white relative z-10"
              >
                0
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-zinc-900/30 border border-white/[0.06] p-8 rounded-2xl text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-2xl rounded-full" />
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Avg Latency
              </p>
              <p
                ref={latencyCounterRef}
                className="text-3xl md:text-4xl font-mono-geist font-bold text-cyan-400 relative z-10"
              >
                0.00s
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-zinc-900/30 border border-white/[0.06] p-8 rounded-2xl text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-500/5 blur-2xl rounded-full" />
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Global Throughput
              </p>
              <p
                ref={throughputCounterRef}
                className="text-3xl md:text-4xl font-mono-geist font-bold text-violet-400 relative z-10"
              >
                0 t/s
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: MODEL DIRECTORY SHOWCASE */}
        <section ref={modelDirRef} className="space-y-12">
          <div className="text-center space-y-3 max-w-lg mx-auto">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-3.5 py-1.5 rounded-full border border-violet-500/20">
              MODEL DIRECTORY
            </span>
            <h2 className="text-3xl md:text-4xl font-serif-brutalist font-black text-white tracking-tight">
              Supported LLM Ecosystem
            </h2>
            <p className="text-xs text-zinc-400 font-semibold leading-relaxed">
              Explore capabilities, latency tolerances, and throughput metrics for active models.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {models.map((model, idx) => {
              const Icon = model.icon;
              return (
                <div 
                  key={idx}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="card-element card-brutalist p-6 rounded-2xl flex flex-col justify-between bg-zinc-900/40 border border-white/[0.06] shadow-xl hover:border-violet-500/20 transition-all duration-300 hover:translate-y-[-2px] group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-zinc-950/60 rounded-xl border border-white/5 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border tracking-wider ${model.color}`}>
                        {model.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors">
                        {model.name}
                      </h3>
                      <p className="text-[11px] text-zinc-450 font-medium leading-relaxed mt-1">
                        {model.desc}
                      </p>
                    </div>

                    <div className="h-px bg-white/5 my-2" />

                    <div className="space-y-1.5 font-mono-geist text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-zinc-550">LATENCY limit:</span>
                        <span className="text-zinc-300 font-semibold">{model.latency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-550">THROUGHPUT:</span>
                        <span className="text-zinc-300 font-semibold">{model.speed}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* 6. Footer */}
      <footer className="border-t border-white/[0.06] bg-zinc-950/60 py-6 px-12 flex flex-col md:flex-row items-center justify-between text-[10px] font-semibold tracking-widest text-zinc-500 uppercase gap-4 mt-auto">
        <span>© 2026 ARENA AI SYSTEMS. ALL RIGHTS RESERVED.</span>
        <div className="flex items-center gap-8 font-bold">
          <span className="cursor-pointer hover:text-white transition-colors" onClick={() => navigateTo("/pricing", false)}>PRICING</span>
          <span className="cursor-pointer hover:text-white transition-colors">TERMS OF SERVICE</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
