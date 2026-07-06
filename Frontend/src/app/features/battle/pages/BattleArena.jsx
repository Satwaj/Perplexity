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
import { FiTrash2, FiLogOut, FiPlus, FiClock, FiSettings, FiHelpCircle, FiUser } from "react-icons/fi";
import { GiCrossedSwords } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import gsap from "gsap";

const BattleArena = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("history"); // history or settings
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
  const shape1Ref = useRef(null);
  const shape2Ref = useRef(null);
  const shape3Ref = useRef(null);
  const shape4Ref = useRef(null);
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

  // Instant display without GSAP animation delays
  useEffect(() => {
    // Initial hero render done instantly by React
  }, [currentBattle]);

  // Instant display of battle results when loaded
  useEffect(() => {
    // Battle results render instantly by React
  }, [currentBattle, loading]);

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
  }, [currentBattle]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="h-screen flex flex-row bg-[#F9F9F7] text-[#1A1C1B] overflow-hidden font-sans relative">
      
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
      
      {/* 1. Left Sidebar (Neobrutalist layout from screenshot) */}
      <aside
        ref={sidebarRef}
        className={`fixed md:static inset-y-0 left-0 w-80 bg-[#F1F1EF] border-r-2 border-[#1A1C1B] flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b-2 border-[#1A1C1B] flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-extrabold text-2xl tracking-wider text-[#1A1C1B]">
              DASHBOARD
            </h2>
            <span className="text-[10px] font-bold tracking-widest text-[#7E7576] block mt-0.5">
              V1.0.4 - ARENA AI
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000] text-black"
          >
            <HiX size={18} />
          </button>
        </div>

        {/* New Chat Button (Peach button matching screenshot) */}
        <div className="p-6 border-b-2 border-[#1A1C1B] shrink-0">
          <button
            onClick={() => {
              if (!user) {
                navigateTo("/login", false);
              } else {
                handleOpenBattle(null);
              }
            }}
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
              onClick={() => {
                setSidebarOpen(false);
                navigateTo("/");
              }}
              className={`flex items-center justify-center gap-1.5 border-2 border-[#1A1C1B] p-2 text-xs font-bold transition-all shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] cursor-pointer ${
                location.pathname === "/" ? "bg-[#1A1C1B] text-white" : "bg-white text-[#1A1C1B] hover:bg-neutral-50"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setSidebarOpen(false);
                navigateTo("/arena");
              }}
              className={`flex items-center justify-center gap-1.5 border-2 border-[#1A1C1B] p-2 text-xs font-bold transition-all shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] cursor-pointer ${
                location.pathname === "/arena" || location.pathname === "/battle" ? "bg-[#1A1C1B] text-white" : "bg-white text-[#1A1C1B] hover:bg-neutral-50"
              }`}
            >
              Arena
            </button>
            <button
              onClick={() => {
                setSidebarOpen(false);
                navigateTo("/chat");
              }}
              className={`flex items-center justify-center gap-1.5 border-2 border-[#1A1C1B] p-2 text-xs font-bold transition-all shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] cursor-pointer ${
                location.pathname === "/chat" ? "bg-[#1A1C1B] text-white" : "bg-white text-[#1A1C1B] hover:bg-neutral-50"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => {
                setSidebarOpen(false);
                navigateTo("/pricing");
              }}
              className={`flex items-center justify-center gap-1.5 border-2 border-[#1A1C1B] p-2 text-xs font-bold transition-all shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] cursor-pointer ${
                location.pathname === "/pricing" ? "bg-[#1A1C1B] text-white" : "bg-white text-[#1A1C1B] hover:bg-neutral-50"
              }`}
            >
              Pricing
            </button>
          </div>
        </div>

        {/* Navigation / History section */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-3">
            {/* History Tab */}
            <button
              onClick={() => setActiveTab("history")}
              className={`w-full flex items-center gap-3 text-sm font-bold p-2.5 transition-colors border-2 ${
                activeTab === "history"
                  ? "bg-white border-[#1A1C1B] text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B]"
                  : "border-transparent text-[#536255] hover:text-[#1A1C1B]"
              }`}
            >
              <FiClock size={16} className="stroke-[2.5]" />
              History
            </button>

            {/* Settings Tab */}
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 text-sm font-bold p-2.5 transition-colors border-2 ${
                activeTab === "settings"
                  ? "bg-white border-[#1A1C1B] text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B]"
                  : "border-transparent text-[#536255] hover:text-[#1A1C1B]"
              }`}
            >
              <FiSettings size={16} className="stroke-[2.5]" />
              Settings
            </button>
          </div>

          {/* Conditional Sidebar Content */}
          {activeTab === "history" && (
            <div className="pt-4 border-t border-[#1A1C1B]/20 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#7E7576] block mb-3 px-1">
                Past Battles
              </span>
              {!user ? (
                <p className="text-xs text-[#7E7576] italic px-1">
                  Sign in to view battle history.
                </p>
              ) : battles.length === 0 ? (
                <p className="text-xs text-[#7E7576] italic px-1">
                  No battles recorded.
                </p>
              ) : (
                battles.map((battle) => {
                  const isActive = currentBattle?._id === battle._id || currentBattle?.id === battle.id;
                  return (
                    <div
                      key={battle._id || battle.id}
                      className={`p-3 border-2 transition-all group ${
                        isActive
                          ? "bg-white border-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B]"
                          : "border-transparent hover:bg-white/40 hover:border-[#1A1C1B]/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div
                          onClick={() => handleOpenBattle(battle)}
                          className="flex-1 cursor-pointer min-w-0"
                        >
                          <p className="text-xs font-extrabold text-[#1A1C1B] truncate">
                            {battle.problem}
                          </p>
                          <p className="text-[9px] text-[#7E7576] mt-1 font-bold">
                            {new Date(battle.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteBattle(battle._id || battle.id)}
                          className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 text-[#7E7576] hover:text-red-600 cursor-pointer shrink-0"
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
            <div className="pt-4 border-t border-[#1A1C1B]/20 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#7E7576] block px-1">
                Preference Config
              </span>
              <div className="p-3 border-2 border-[#1A1C1B] bg-white space-y-2.5">
                <p className="text-xs font-bold text-[#1A1C1B]">
                  Theme: <span className="text-[#008080]">Light Aesthetic</span>
                </p>
                <p className="text-[10px] text-[#7E7576] font-medium leading-relaxed">
                  The application theme is locked permanently to Neobrutalist cream paper design.
                </p>
              </div>
            </div>
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
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-xs font-bold text-[#7E7576] hover:text-red-600 transition-colors cursor-pointer text-left"
              >
                <FiLogOut size={15} /> Logout
              </button>
            ) : (
              <button
                onClick={() => navigateTo("/login", false)}
                className="flex items-center gap-3 text-xs font-bold text-[#008080] hover:text-[#1A1C1B] transition-colors cursor-pointer text-left"
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
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. Right Side Workspace Area */}
      <div ref={workspaceRef} className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Top Navbar */}
        <nav className="h-16 shrink-0 border-b-2 border-[#1A1C1B] bg-white flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1.5 border-2 border-black bg-white text-black"
            >
              <HiMenu size={20} />
            </button>
            <span className="font-extrabold text-lg tracking-[0.25em] text-[#1A1C1B] uppercase">
              AI COMPARISON
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-5 text-xs font-black tracking-widest text-[#536255]">
              <span className="cursor-pointer hover:text-[#1A1C1B] transition-colors" onClick={() => navigateTo("/")}>HOME</span>
              <span className="cursor-pointer hover:text-[#1A1C1B] transition-colors text-[#1A1C1B] border-b-2 border-black pb-0.5">ARENA</span>
              <span className="cursor-pointer hover:text-[#1A1C1B] transition-colors" onClick={() => navigateTo("/chat")}>CHAT</span>
              <span className="cursor-pointer hover:text-[#1A1C1B] transition-colors" onClick={() => navigateTo("/pricing")}>PRICING</span>
            </div>
            
            <div className="h-6 w-[2px] bg-[#1A1C1B] hidden sm:block" />

            {/* Profile Section */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 border-2 border-[#1A1C1B] bg-[#F1F1EF] px-3 py-1.5 font-bold text-xs text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B]">
                  <FiUser size={13} className="stroke-[2.5]" />
                  <span className="hidden md:inline">{user.fullname || user.username}</span>
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
                  className="px-3 py-1.5 border-2 border-black bg-white font-bold text-xs text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] transition-all cursor-pointer uppercase tracking-wider"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigateTo("/register", false)}
                  className="px-3 py-1.5 border-2 border-black bg-[#F5D3B8] font-bold text-xs text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] transition-all cursor-pointer uppercase tracking-wider"
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
          <div ref={scrollContainerRef} className="p-6 md:p-12 w-full flex-1 overflow-y-auto animate-scroll">
            {!currentBattle ? (
              <div
                ref={heroRef}
                className="max-w-2xl mx-auto flex flex-col justify-center h-full min-h-[50vh] py-10"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-[#008080] bg-[#008080]/10 px-2.5 py-1 border border-[#008080]/20 w-fit">
                  Query Origin: User
                </span>
                
                <h1 className="text-4xl md:text-6xl font-serif-brutalist font-bold text-[#1A1C1B] leading-[1.1] my-6 tracking-tight">
                  Battle Arena: side-by-side comparison.
                </h1>
                
                <div className="w-20 border-b-2 border-black mb-8"></div>

                <p className="text-base text-[#536255] max-w-lg mb-8 leading-relaxed font-semibold">
                  Pit two AI engines side-by-side. Analyze speed, reasoning quality, and formatting accuracy instantly under a neobrutalist verdict.
                </p>

                <button
                  onClick={() => {
                    document.querySelector("textarea")?.focus();
                  }}
                  className="w-fit cursor-pointer border-2 border-[#1A1C1B] bg-[#1A1C1B] text-white font-extrabold px-8 py-3.5 shadow-[4px_4px_0px_0px_#C5A880] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#C5A880] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#C5A880] transition-all text-sm uppercase tracking-wider"
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
                <div className="space-y-2 pb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#7E7576]">
                    Query Origin: User
                  </span>
                  <h1 className="text-lg md:text-2xl font-serif-brutalist font-bold text-[#1A1C1B] leading-tight">
                    {currentBattle.problem}
                  </h1>
                  <div className="w-20 border-b-2 border-black mt-4"></div>
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

          {/* Fixed Footer/Input Area (Non-scrollable) */}
          <div className="shrink-0 bg-[#F9F9F7] pt-2">
            {/* Floating Lower Input Area */}
            <div className="w-full max-w-4xl mx-auto px-6 mb-6">
              <BattleInputSection
                onStartBattle={onStartBattleWithAuth}
                loading={loading}
              />
            </div>

            {/* Neobrutalist Footer (from screenshot) */}
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

export default BattleArena;
