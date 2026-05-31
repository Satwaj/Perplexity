import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { MdGavel, MdOutlineQuestionAnswer } from "react-icons/md";

export const BattleInputSection = ({ onStartBattle, loading }) => {
  const theme = useTheme();
  const [problem, setProblem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (problem.trim()) {
      onStartBattle(problem);
      setProblem("");
    }
  };

  const inputText = theme.isDark ? "text-white" : "text-slate-900";
  const placeholderText = theme.isDark
    ? "placeholder-slate-400"
    : "placeholder-slate-500";
  const iconColor = theme.isDark ? "text-slate-400" : "text-gray-600";
  const inputBg = theme.isDark ? "bg-slate-700" : "bg-white";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-4">
        <div className="flex gap-4 items-end">
          {/* Input Container */}
          <div className="flex-1 relative">
            <div
              className={`flex items-start gap-3 ${inputBg} px-6 py-5 rounded-xl border-2 ${theme.isDark ? "border-slate-600" : "border-gray-300"} focus-within:${theme.isDark ? "border-slate-500" : "border-gray-500"} transition-all`}
            >
              <MdOutlineQuestionAnswer
                className={`text-3xl mt-2 flex-shrink-0 ${iconColor}`}
              />
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="What's your question? Ask anything..."
                className={`flex-1 resize-none text-base font-medium focus:outline-none bg-transparent ${inputText} ${placeholderText}`}
                rows="3"
                disabled={loading}
              />
            </div>
          </div>

          {/* Battle Button */}
          <button
            type="submit"
            disabled={loading || !problem.trim()}
            className={`flex items-center justify-center gap-2 px-7 py-5 rounded-xl font-bold text-white transition-all flex-shrink-0 shadow-lg hover:shadow-xl transform hover:scale-105 ${
              loading || !problem.trim()
                ? "bg-gray-800 cursor-not-allowed opacity-100"
                : "bg-black hover:bg-black"
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline text-base font-semibold">
                  Battling...
                </span>
              </>
            ) : (
              <>
                <MdGavel className="text-xl" />
                <span className="hidden sm:inline text-base">Battle</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
