import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import { ReactMarkdown } from "../utils/markdown.utils.jsx";

export const SolutionCard = ({
  aiName,
  solution,
  score,
  reasoning,
  isWinner,
}) => {
  const theme = useTheme();

  const bgCard = theme.isDark ? "bg-slate-800" : "bg-white";
  const borderColor = theme.isDark ? "border-gray-700" : "border-gray-200";
  const headerBg = theme.isDark ? "bg-slate-700" : "bg-gray-100";

  return (
    <div
      className={`${bgCard} ${borderColor} border rounded-lg p-6 space-y-5 flex flex-col`}
    >
      {/* Header */}
      <div className={`${headerBg} -mx-6 -mt-6 px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3
              className={`text-lg font-bold ${theme.isDark ? "text-white" : "text-slate-900"}`}
            >
              {aiName}
            </h3>
            {isWinner && <span className="text-lg">⭐</span>}
          </div>
          <div className="text-lg font-bold text-gray-600">{score}/10</div>
        </div>
      </div>

      {/* Solution */}
      <div className="space-y-2 flex-1">
        <p
          className={`text-xs font-bold uppercase tracking-widest ${theme.isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          Solution
        </p>
        <div
          className={`${theme.isDark ? "text-slate-300" : "text-slate-700"} text-sm leading-relaxed prose-sm max-h-96 overflow-y-auto`}
        >
          <ReactMarkdown content={solution} />
        </div>
      </div>

      {/* Reasoning */}
      <div className={`space-y-2 pt-4 ${borderColor} border-t`}>
        <p
          className={`text-xs font-bold uppercase tracking-widest ${theme.isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          Reasoning
        </p>
        <p
          className={`${theme.isDark ? "text-slate-300" : "text-slate-700"} text-sm leading-relaxed`}
        >
          {reasoning}
        </p>
      </div>
    </div>
  );
};
