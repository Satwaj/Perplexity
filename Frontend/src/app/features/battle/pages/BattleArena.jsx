import React, { useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router";
import { BattleInputSection, SolutionCard, JudgeResult } from "../components";
import { useBattle } from "../hooks/useBattle";
import { FiTrash2 } from "react-icons/fi";

const BattleArena = () => {
  const theme = useTheme();
  const navigate = useNavigate();
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
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const bgColor = theme.isDark ? "bg-slate-900" : "bg-white";
  const sidebarColor = theme.isDark ? "bg-slate-900" : "bg-white";
  const accentColor = theme.isDark ? "bg-slate-800" : "bg-white";
  const accentBorder = theme.isDark ? "border-slate-700" : "border-gray-200";

  return (
    <div className={`h-screen flex ${bgColor} transition-colors duration-200`}>
      {/* Sidebar */}
      <div
        className={`w-72 ${sidebarColor} ${theme.isDark ? "border-slate-700" : "border-gray-200"} border-r flex flex-col overflow-hidden`}
      >
        {/* Greeting & New Battle */}
        <div
          className={`p-8 space-y-6 ${theme.isDark ? "border-slate-700" : "border-gray-200"} border-b flex-shrink-0`}
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
          className={`p-6 ${theme.isDark ? "border-slate-700" : "border-gray-200"} border-t flex-shrink-0`}
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Input Area */}
        <div
          className={`${theme.isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"} border-b p-8 flex-shrink-0 shadow-sm`}
        >
          <BattleInputSection
            onStartBattle={handleStartBattle}
            loading={loading}
          />
        </div>

        {/* Results Area */}
        <div
          className={`flex-1 overflow-y-auto p-12 ${theme.isDark ? "bg-slate-900" : "bg-white"}`}
        >
          {!currentBattle ? (
            <div className="h-full flex items-center justify-center">
              <div
                className={`text-center space-y-6 max-w-lg ${accentColor} ${accentBorder} border rounded-2xl p-12`}
              >
                <div className="space-y-2">
                  <p className="text-5xl mb-4">⚔️</p>
                  <h3
                    className={`text-2xl font-bold ${theme.isDark ? "text-white" : "text-slate-900"}`}
                  >
                    Welcome to Arena Battle
                  </h3>
                  <p
                    className={`${theme.isDark ? "text-slate-300" : "text-slate-700"} text-base leading-relaxed`}
                  >
                    Compare two powerful AI models head-to-head and see which
                    one provides the best solution to your question.
                  </p>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex gap-3">
                    <span className="text-lg text-gray-700">✓</span>
                    <p
                      className={`text-sm ${theme.isDark ? "text-slate-300" : "text-slate-700"}`}
                    >
                      <span className="font-semibold">Ask anything</span> -
                      Enter your question or problem
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg text-gray-700">✓</span>
                    <p
                      className={`text-sm ${theme.isDark ? "text-slate-300" : "text-slate-700"}`}
                    >
                      <span className="font-semibold">Watch the battle</span> -
                      Two AI models compete for the best answer
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg text-gray-700">✓</span>
                    <p
                      className={`text-sm ${theme.isDark ? "text-slate-300" : "text-slate-700"}`}
                    >
                      <span className="font-semibold">See the verdict</span> -
                      Judge scores and reasoning
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    document.querySelector("textarea")?.focus();
                  }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all mt-6 ${
                    theme.isDark
                      ? "bg-slate-800 hover:bg-slate-700 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                  }`}
                >
                  Start Your First Battle
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
            <div className="w-full mx-auto space-y-10 px-4">
              {/* Problem */}
              <div className="space-y-3">
                <p
                  className={`text-xs font-bold ${theme.isDark ? "text-gray-400" : "text-gray-700"} uppercase tracking-widest`}
                >
                  Question
                </p>
                <p
                  className={`text-xl font-semibold ${theme.isDark ? "text-white" : "text-slate-900"} leading-relaxed`}
                >
                  {currentBattle.problem}
                </p>
              </div>

              {/* Solutions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
