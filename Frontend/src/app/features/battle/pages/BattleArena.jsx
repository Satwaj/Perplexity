import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  BattleInputSection,
  SolutionCard,
  JudgeResult,
  BattleRealProgressLoader,
} from "../components";
import { useBattle } from "../hooks/useBattle";
import { FiTrash2, FiLogOut, FiPlus, FiClock, FiSettings, FiHelpCircle, FiUser, FiGrid } from "react-icons/fi";
import { GiCrossedSwords } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import gsap from "gsap";

const BattleArena = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("history"); 
  const [navOpen, setNavOpen] = useState(false);
  const { handleLogout } = useAuth();
  const user = useSelector((state) => state.auth?.user);

  const navigateTo = (path, replace = true) => {
    if (location.pathname !== path) {
      navigate(path, { replace });
    }
  };
  
  const {
    battles,
    currentBattle,
    loading,
    handleStartBattle,
    handleGetBattles,
    handleOpenBattle,
    handleDeleteBattle,
  } = useBattle();

  const resultsRef = useRef(null);
  const sidebarRef = useRef(null);
  const heroRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Background shape animation refs
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);
  const glow3Ref = useRef(null);
  const glow4Ref = useRef(null);
  const workspaceRef = useRef(null);

  const onStartBattleWithAuth = async (problem) => {
    if (!user) {
      navigateTo("/login", false);
      return;
    }
    await handleStartBattle(problem);
  };

  useEffect(() => {
    if (user) {
      handleGetBattles();
    }
  }, [handleGetBattles, user]);

  // Auto-scroll to end on new battle or loading status change
  useEffect(() => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [currentBattle, loading]);

  // Close sidebar when battle is opened
  useEffect(() => {
    setSidebarOpen(false);
  }, [currentBattle]);

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
  }, [currentBattle]);

  return (
    <div className="h-screen flex flex-row bg-[#09090b] text-white overflow-hidden font-sans relative selection:bg-violet-500/30">
      
      {/* Floating Radial Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div ref={glow1Ref} className="absolute top-24 left-[15%] w-80 h-80 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />
        <div ref={glow2Ref} className="absolute top-80 right-[10%] w-72 h-72 rounded-full bg-cyan-600/5 blur-3xl pointer-events-none" />
        <div ref={glow3Ref} className="absolute bottom-32 left-[20%] w-96 h-96 rounded-full bg-fuchsia-600/3 blur-3xl pointer-events-none" />
        <div ref={glow4Ref} className="absolute bottom-48 right-[18%] w-60 h-60 rounded-full bg-indigo-600/5 blur-2xl pointer-none" />
      </div>

      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] z-0" 
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      />
      
      {/* 1. Left Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed md:static inset-y-0 left-0 w-80 bg-zinc-950/60 backdrop-blur-xl border-r border-white/5 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-extrabold text-2xl tracking-wider text-white">
              DASHBOARD
            </h2>
            <span className="text-[10px] font-bold tracking-widest text-zinc-555 block mt-0.5 font-mono-geist">
              V1.0.4 - ARENA AI
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-lg border border-white/10 bg-zinc-900/60 text-white cursor-pointer"
          >
            <HiX size={18} />
          </button>
        </div>

        {/* New Battle Button */}
        <div className="p-6 border-b border-white/5 shrink-0">
          <button
            onClick={() => {
              if (!user) {
                navigateTo("/login", false);
              } else {
                handleOpenBattle(null);
              }
            }}
            className="w-full flex items-center justify-center gap-3 bg-violet-600 hover:bg-violet-500 text-white p-3.5 rounded-xl text-sm font-semibold shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_20px_rgba(139,92,246,0.45)] transition-all cursor-pointer"
          >
            <FiPlus size={16} className="stroke-[3]" />
            New Battle
          </button>
        </div>

        {/* Navigation / History section */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5">
            {/* History Tab */}
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === "history"
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FiClock size={14} />
              History
            </button>

            {/* Settings Tab */}
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === "settings"
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FiSettings size={14} />
              Settings
            </button>
          </div>

          {/* Conditional Sidebar Content */}
          {activeTab === "history" && (
            <div className="pt-2 space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-550 block mb-2 px-1 font-mono-geist">
                Past Battles
              </span>
              {!user ? (
                <p className="text-xs text-zinc-550 italic px-1">
                  Sign in to view battle history.
                </p>
              ) : battles.length === 0 ? (
                <p className="text-xs text-zinc-550 italic px-1">
                  No battles recorded.
                </p>
              ) : (
                battles.map((battle) => {
                  const isActive = currentBattle?._id === battle._id || currentBattle?.id === battle.id;
                  return (
                    <div
                      key={battle._id || battle.id}
                      className={`p-3 border rounded-xl transition-all group ${
                        isActive
                          ? "bg-white/10 border-violet-500/20"
                          : "border-transparent hover:bg-white/[0.03] hover:border-white/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div
                          onClick={() => handleOpenBattle(battle)}
                          className="flex-1 cursor-pointer min-w-0"
                        >
                          <p className="text-xs font-semibold text-zinc-200 group-hover:text-white truncate">
                            {battle.problem}
                          </p>
                          <p className="text-[9px] text-zinc-550 mt-1 font-semibold font-mono-geist">
                            {new Date(battle.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteBattle(battle._id || battle.id)}
                          className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 text-zinc-550 hover:text-red-400 cursor-pointer shrink-0"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="pt-2 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-550 block px-1 font-mono-geist">
                Preference Config
              </span>
              <div className="p-4 border border-white/5 bg-zinc-900/20 rounded-xl space-y-2">
                <p className="text-xs font-semibold text-white">
                  Theme: <span className="text-violet-400">Dark Aesthetic</span>
                </p>
                <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                  The application theme is set permanently to a high-end dark OS style.
                </p>
              </div>
            </div>
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
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-xs font-semibold text-zinc-500 hover:text-red-400 transition-colors cursor-pointer text-left py-1"
              >
                <FiLogOut size={15} /> Logout
              </button>
            ) : (
              <button
                onClick={() => navigateTo("/login", false)}
                className="flex items-center gap-3 text-xs font-semibold text-violet-400 hover:text-white transition-colors cursor-pointer text-left py-1"
              >
                <FiUser size={15} /> Sign In
              </button>
            )}
          </div>
        </div>
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
        <nav className="h-16 shrink-0 border-b border-white/5 bg-zinc-950/60 backdrop-blur-md flex items-center justify-between px-6 z-30 relative">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg border border-white/10 bg-zinc-900/60 text-white shrink-0 cursor-pointer"
            >
              <HiMenu size={18} />
            </button>
            <span className="font-extrabold text-lg tracking-[0.2em] text-white">
              AI COMPARISON
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Navigation Breadcrumb Shortcuts */}
            <div className="hidden sm:flex items-center gap-3.5 text-[9px] font-bold tracking-widest uppercase text-zinc-550 mr-1 font-mono-geist bg-zinc-900/60 px-3 py-1.5 rounded-xl border border-white/5 select-none">
              <button 
                onClick={() => navigateTo("/")} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <span className="text-zinc-800">/</span>
              <button 
                onClick={() => navigateTo("/arena")} 
                className={`hover:text-white transition-colors cursor-pointer ${location.pathname === "/arena" || location.pathname === "/battle" ? "text-violet-400" : ""}`}
              >
                Arena
              </button>
              <span className="text-zinc-800">/</span>
              <button 
                onClick={() => navigateTo("/chat")} 
                className={`hover:text-white transition-colors cursor-pointer ${location.pathname === "/chat" ? "text-violet-400" : ""}`}
              >
                Chat
              </button>
            </div>

            {/* Floating grid dropdown navigation */}
            <div className="relative">
              <button
                onClick={() => setNavOpen(!navOpen)}
                className={`p-2 rounded-lg border transition-all cursor-pointer shrink-0 flex items-center justify-center ${
                  navOpen 
                    ? "bg-violet-500/15 border-violet-500/30 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]" 
                    : "bg-zinc-900/60 border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
                title="Open Grid Navigation"
              >
                <FiGrid size={16} />
              </button>

              {navOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setNavOpen(false)} 
                  />
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl p-2 flex flex-col gap-1 z-50 animate-fade-in"
                  >
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 px-3 py-1.5 border-b border-white/5 font-mono-geist">
                      System Grid
                    </span>
                    <button
                      onClick={() => { setNavOpen(false); navigateTo("/"); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => { setNavOpen(false); navigateTo("/arena"); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                    >
                      Battle Arena
                    </button>
                    <button
                      onClick={() => { setNavOpen(false); navigateTo("/chat"); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                    >
                      AI Chat Channel
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="h-4 w-px bg-white/10" />

            {/* Profile Section */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 border border-white/10 bg-zinc-900/50 px-3.5 py-1.5 rounded-xl font-semibold text-xs text-zinc-200">
                  <FiUser size={13} className="text-violet-400" />
                  <span className="hidden md:inline">{user.fullname || user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-450 hover:text-red-455 transition-colors cursor-pointer"
                  title="Sign out"
                >
                  <FiLogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo("/login", false)}
                  className="px-3.5 py-1.5 border border-white/10 bg-zinc-900/40 rounded-xl font-semibold text-xs text-zinc-200 hover:bg-zinc-800 transition-all cursor-pointer uppercase tracking-wider"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigateTo("/register", false)}
                  className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold text-xs text-white transition-all cursor-pointer shadow-[0_4px_12px_rgba(139,92,246,0.2)] uppercase tracking-wider"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Workspace Main Area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          
          {/* Scrollable results columns */}
          <div ref={scrollContainerRef} className="p-6 md:p-12 w-full flex-1 overflow-y-auto bg-[#09090b]">
            {!currentBattle ? (
              <div
                ref={heroRef}
                className="max-w-2xl mx-auto flex flex-col justify-center h-full min-h-[50vh] py-10"
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20 w-fit">
                  Query Origin: User
                </span>
                
                <h1 className="text-4xl md:text-5xl font-serif-brutalist font-black text-white leading-[1.15] my-6 tracking-tight text-glow-gradient">
                  Battle Arena: side-by-side comparison.
                </h1>
                
                <div className="w-12 h-0.5 bg-violet-500/50 mb-8 rounded"></div>

                <p className="text-sm md:text-base text-zinc-400 max-w-lg mb-8 leading-relaxed font-semibold">
                  Pit two AI engines side-by-side. Analyze speed, reasoning quality, and formatting accuracy instantly under a high-fidelity verdict.
                </p>

                <button
                  onClick={() => {
                    document.querySelector("textarea")?.focus();
                  }}
                  className="w-fit cursor-pointer bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-[0_4px_15px_rgba(139,92,246,0.25)] transition-all text-xs uppercase tracking-wider"
                >
                  Type Inquiry Below
                </button>
              </div>
            ) : loading ? (
              <div className="h-full min-h-[60vh] flex items-center justify-center">
                <BattleRealProgressLoader />
              </div>
            ) : (
              <div
                ref={resultsRef}
                className="max-w-6xl mx-auto space-y-12"
              >
                {/* Header Inquiry */}
                <div className="space-y-3 pb-6 border-b border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-550">
                    Query Origin: User
                  </span>
                  <h1 className="text-lg md:text-2xl font-semibold text-white leading-tight">
                    {currentBattle.problem}
                  </h1>
                </div>

                {/* Comparative side-by-side grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <SolutionCard
                    aiName="Mistral"
                    solution={currentBattle.solution_1}
                    score={currentBattle.solution_1_score}
                    reasoning={currentBattle.solution_1_reasoning}
                    isWinner={currentBattle.winner === 1}
                  />
                  <SolutionCard
                    aiName="Groq"
                    solution={currentBattle.solution_2}
                    score={currentBattle.solution_2_score}
                    reasoning={currentBattle.solution_2_reasoning}
                    isWinner={currentBattle.winner === 2}
                  />
                </div>

                {/* Judge Box */}
                <div className="pt-4">
                  <JudgeResult
                    winner={currentBattle.winner}
                    solution1Score={currentBattle.solution_1_score}
                    solution2Score={currentBattle.solution_2_score}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Fixed Footer/Input Area */}
          <div className="shrink-0 bg-transparent pt-2">
            {/* Floating Lower Input Area */}
            <div className="w-full max-w-4xl mx-auto px-6 mb-6">
              <BattleInputSection
                onStartBattle={onStartBattleWithAuth}
                loading={loading}
              />
            </div>

            {/* Footer */}
            <footer className="border-t border-white/5 bg-zinc-950/60 py-4 px-6 flex flex-col sm:flex-row items-center justify-between text-[10px] font-semibold tracking-widest text-zinc-555 uppercase gap-2">
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

export default BattleArena;
