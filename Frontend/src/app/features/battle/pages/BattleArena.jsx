import React, { useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router";
import { BattleInputSection, SolutionCard, JudgeResult } from "../components";
import { useBattle } from "../hooks/useBattle";
import { FiTrash2 } from "react-icons/fi";
import { GiCrossedSwords } from "react-icons/gi";
import { MdLightbulb, MdEmojiEvents } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";

const BattleArena = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    battles,
    currentBattle,
    loading,
    handleStartBattle,
    handleGetBattles,
    handleOpenBattle,
    handleDeleteBattle,
  } = useBattle();

  useEffect(() => {
    handleGetBattles();
  }, [handleGetBattles]);

  // Close sidebar when battle is opened
  useEffect(() => {
    setSidebarOpen(false);
  }, [currentBattle]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  };

  const bgColor = theme.isDark ? "bg-slate-900" : "bg-white";
  const sidebarColor = theme.isDark ? "bg-slate-900" : "bg-white";

  return (
    <div
      className={`h-screen flex ${bgColor} transition-colors duration-200 relative`}
    >
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static w-72 h-screen md:h-auto ${sidebarColor} ${theme.isDark ? "border-slate-700" : "border-gray-200"} border-r flex flex-col overflow-hidden transition-transform duration-300 z-40 md:z-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close Button - Mobile Only */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg"
        >
          <HiX
            size={24}
            className={theme.isDark ? "text-white" : "text-black"}
          />
        </button>
        {/* Greeting & New Battle */}
        <div
          className={`p-8 pt-16 md:pt-8 space-y-6 ${theme.isDark ? "border-slate-700" : "border-gray-200"} border-b shrink-0`}
        >
          <div className="space-y-2">
            <p
              className={`text-sm font-medium ${theme.isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              {getGreeting()}
            </p>
            <h2
              className={`text-3xl font-bold ${theme.isDark ? "text-white" : "text-slate-900"}`}
            >
              Arena Battle
            </h2>
            <p
              className={`text-sm ${theme.isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              Compare AI models side by side
            </p>
          </div>
          <button
            onClick={() => {
              handleOpenBattle(null);
            }}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              theme.isDark
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-800 hover:bg-gray-900 text-white"
            }`}
          >
            + New Battle
          </button>
        </div>

        {/* Battle History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          <p
            className={`text-xs font-bold ${theme.isDark ? "text-gray-500" : "text-gray-600"} uppercase tracking-widest px-2 mb-4`}
          >
            Battle History
          </p>
          {battles.length === 0 ? (
            <p
              className={`text-sm ${theme.isDark ? "text-slate-500" : "text-slate-500"} px-2 py-8 text-center`}
            >
              No battles yet. Start your first battle!
            </p>
          ) : (
            battles.map((battle) => (
              <div
                key={battle._id || battle.id}
                className={`p-3 rounded-lg transition-all group ${
                  currentBattle?._id === battle._id ||
                  currentBattle?.id === battle.id
                    ? theme.isDark
                      ? "bg-slate-700 shadow-md border border-slate-600"
                      : "bg-gray-100 shadow-md border border-gray-300"
                    : theme.isDark
                      ? "hover:bg-slate-700"
                      : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    onClick={() => handleOpenBattle(battle)}
                    className="flex-1 cursor-pointer"
                  >
                    <p
                      className={`text-sm font-medium ${theme.isDark ? "text-white" : "text-slate-900"} truncate`}
                    >
                      {battle.problem.substring(0, 30)}...
                    </p>
                    <p
                      className={`text-xs ${theme.isDark ? "text-slate-400" : "text-slate-600"} mt-1`}
                    >
                      {new Date(battle.createdAt).toLocaleDateString()} ·{" "}
                      {new Date(battle.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteBattle(battle._id || battle.id)}
                    className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                      theme.isDark
                        ? "hover:bg-red-900 hover:bg-opacity-30 text-red-400"
                        : "hover:bg-red-100 text-red-600"
                    }`}
                    title="Delete battle"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Back to Chat */}
        <div
          className={`p-6 ${theme.isDark ? "border-slate-700" : "border-gray-200"} border-t shrink-0`}
        >
          <button
            onClick={() => navigate("/")}
            className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              theme.isDark
                ? "hover:bg-slate-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            ← Back to Chat
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <HiMenu
              size={24}
              className={theme.isDark ? "text-white" : "text-black"}
            />
          </button>
          <h1
            className={`font-bold ${theme.isDark ? "text-white" : "text-black"}`}
          >
            AI Model Arena
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
        {/* Input Area */}
        <div
          className={`${theme.isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"} border-b p-4 md:p-8 shrink-0 shadow-sm`}
        >
          <BattleInputSection
            onStartBattle={handleStartBattle}
            loading={loading}
          />
        </div>

        {/* Results Area */}
        <div
          className={`flex-1 overflow-y-auto p-4 md:p-12 ${theme.isDark ? "bg-slate-900" : "bg-white"}`}
        >
          {!currentBattle ? (
            <div className="h-full flex items-center justify-center bg-white p-4 md:p-6">
              <div className="w-full max-w-2xl">
                {/* Greeting */}
                <p className="text-xs md:text-sm font-semibold text-black mb-2">
                  {getGreeting()}, Satwaj
                </p>

                {/* Hero */}
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-black mb-2 md:mb-3">
                  Battle Arena
                </h1>
                <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-8">
                  Pit two AI models against each other and judge the winner
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="p-3 md:p-4 bg-stone-100 rounded-lg border border-gray-300">
                    <h3 className="font-bold text-black mb-1 text-xs md:text-sm">
                      Ask Anything
                    </h3>
                    <p className="text-xs text-gray-700">Enter your question</p>
                  </div>
                  <div className="p-3 md:p-4 bg-stone-100 rounded-lg border border-gray-300">
                    <h3 className="font-bold text-black mb-1 text-xs md:text-sm">
                      Watch Battle
                    </h3>
                    <p className="text-xs text-gray-700">Models compete</p>
                  </div>
                  <div className="p-3 md:p-4 bg-stone-100 rounded-lg border border-gray-300">
                    <h3 className="font-bold text-black mb-1 text-xs md:text-sm">
                      Judge Winner
                    </h3>
                    <p className="text-xs text-gray-700">See the verdict</p>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    document.querySelector("textarea")?.focus();
                  }}
                  className="w-full py-3 md:py-3 px-4 md:px-6 bg-black hover:bg-gray-800 text-white font-bold rounded-lg transition-all text-sm md:text-base"
                >
                  Start Battle
                </button>
              </div>
            </div>
          ) : loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="space-y-4 text-center">
                <div
                  className={`w-10 h-10 border-3 ${theme.isDark ? "border-slate-700 border-t-gray-400" : "border-gray-200 border-t-gray-800"} rounded-full animate-spin mx-auto`}
                ></div>
                <div className="space-y-1">
                  <p
                    className={`font-semibold ${theme.isDark ? "text-white" : "text-slate-900"}`}
                  >
                    Battle in progress...
                  </p>
                  <p
                    className={`text-sm ${theme.isDark ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Gathering solutions from AI models
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full mx-auto space-y-6 md:space-y-10 px-2 md:px-4">
              {/* Problem */}
              <div className="space-y-2 md:space-y-3">
                <p
                  className={`text-xs font-bold ${theme.isDark ? "text-gray-400" : "text-gray-700"} uppercase tracking-widest`}
                >
                  Question
                </p>
                <p
                  className={`text-lg md:text-xl font-semibold ${theme.isDark ? "text-white" : "text-slate-900"} leading-relaxed`}
                >
                  {currentBattle.problem}
                </p>
              </div>

              {/* Solutions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
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

              {/* Judge Result */}
              <JudgeResult
                winner={currentBattle.winner}
                solution1Score={currentBattle.solution_1_score}
                solution2Score={currentBattle.solution_2_score}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BattleArena;
