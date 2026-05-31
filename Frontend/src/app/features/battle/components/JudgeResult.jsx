import React from "react";
import { useTheme } from "../../../context/ThemeContext";

export const JudgeResult = ({ winner, solution1Score, solution2Score }) => {
  const theme = useTheme();
  const winnerName = winner === 1 ? "Mistral" : "Groq";
  const diff = Math.abs(solution1Score - solution2Score);

  const bgCard = theme.isDark ? "bg-slate-800" : "bg-white";
  const borderColor = theme.isDark ? "border-gray-700" : "border-gray-200";
  const headerBg = theme.isDark ? "bg-slate-700" : "bg-gray-100";
  const statsBg = theme.isDark ? "bg-slate-900" : "bg-gray-50";

  return (
    <div
      className={`${bgCard} ${borderColor} border rounded-lg p-6 space-y-6 shadow-sm`}
    >
      {/* Header */}
      <div className="pb-4 border-b border-current border-opacity-10">
        <h3
          className={`text-xl font-bold ${theme.isDark ? "text-white" : "text-slate-900"}`}
        >
          ⚖️ Judge's Verdict
        </h3>
      </div>

      {/* Winner */}
      <div className={`${headerBg} rounded-lg p-4`}>
        <p
          className={`text-xs font-bold uppercase tracking-widest ${theme.isDark ? "text-slate-400" : "text-slate-600"} mb-2`}
        >
          Winner
        </p>
        <p
          className={`text-2xl font-bold ${theme.isDark ? "text-white" : "text-slate-900"}`}
        >
          {winnerName}
        </p>
      </div>

      {/* Score Comparison */}
      <div className="grid grid-cols-2 gap-6">
        <div className={`${statsBg} rounded-lg p-4 space-y-3`}>
          <p
            className={`text-sm font-bold uppercase tracking-wide ${theme.isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            Mistral
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-3xl font-bold ${theme.isDark ? "text-white" : "text-slate-900"}`}
            >
              {solution1Score}
            </span>
            <span
              className={`text-xs ${theme.isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              /10
            </span>
          </div>
          <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-800 transition-all duration-300"
              style={{ width: `${(solution1Score / 10) * 100}%` }}
            />
          </div>
        </div>

        <div className={`${statsBg} rounded-lg p-4 space-y-3`}>
          <p
            className={`text-sm font-bold uppercase tracking-wide ${theme.isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            Groq
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-3xl font-bold ${theme.isDark ? "text-white" : "text-slate-900"}`}
            >
              {solution2Score}
            </span>
            <span
              className={`text-xs ${theme.isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              /10
            </span>
          </div>
          <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-700 transition-all duration-300"
              style={{ width: `${(solution2Score / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Difference */}
      <div className={`${headerBg} rounded-lg p-4 text-center`}>
        <p
          className={`text-xs font-bold uppercase tracking-widest ${theme.isDark ? "text-slate-400" : "text-slate-600"} mb-1`}
        >
          Difference
        </p>
        <p
          className={`text-lg font-bold ${theme.isDark ? "text-white" : "text-slate-900"}`}
        >
          {diff.toFixed(1)} <span className="text-xs font-semibold">pts</span>
        </p>
      </div>
    </div>
  );
};
