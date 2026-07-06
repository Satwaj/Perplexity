import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("history"); // history or settings
  const { handleLogout } = useAuth();
  const user = useSelector((state) => state.auth?.user);
  
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

  useEffect(() => {
    handleGetBattles();
  }, [handleGetBattles]);

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

  // GSAP animation for initial hero state
  useEffect(() => {
    if (!currentBattle && heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" }
      );
    }
  }, [currentBattle]);

  // GSAP animation for battle results when loaded
  useEffect(() => {
    if (currentBattle && !loading && resultsRef.current) {
      gsap.fromTo(
        resultsRef.current.children,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, [currentBattle, loading]);

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
            onClick={() => handleOpenBattle(null)}
            className="w-full flex items-center justify-center gap-3 border-2 border-[#1A1C1B] bg-[#F5D3B8] p-3 text-sm font-black text-[#1A1C1B] shadow-[4px_4px_0px_0px_#1A1C1B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1A1C1B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1A1C1B] transition-all cursor-pointer"
          >
            <FiPlus size={16} className="stroke-[3]" />
            New Chat
          </button>
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
              {battles.length === 0 ? (
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
            onClick={() => navigate("/pricing")}
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
              <span className="cursor-pointer hover:text-[#1A1C1B] transition-colors">CHATS</span>
              <span className="cursor-pointer hover:text-[#1A1C1B] transition-colors">ANALYTICS</span>
              <span className="cursor-pointer hover:text-[#1A1C1B] transition-colors" onClick={() => navigate("/pricing")}>MODELS</span>
            </div>
            
            <div className="h-6 w-[2px] bg-[#1A1C1B] hidden sm:block" />

            {/* Profile Avatar Badge */}
            {user && (
              <div className="flex items-center gap-2 border-2 border-[#1A1C1B] bg-[#F1F1EF] px-3 py-1.5 font-bold text-xs text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B]">
                <FiUser size={13} className="stroke-[2.5]" />
                <span className="hidden md:inline">{user.fullname || user.username}</span>
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
                onStartBattle={handleStartBattle}
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
