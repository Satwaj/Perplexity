import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FiPaperclip, FiArrowUpRight, FiMic, FiMicOff } from "react-icons/fi";
import { useVoice } from "../hooks/useVoice";

export const BattleInputSection = ({ onStartBattle, loading }) => {
  const theme = useTheme();
  const [problem, setProblem] = useState("");
  const { isListening, startListening, stopListening, supported } = useVoice();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (problem.trim() && !loading) {
      onStartBattle(problem);
      setProblem("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((text) => {
        setProblem((prev) => (prev ? `${prev} ${text}` : text));
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div
          className={`flex items-center gap-4 bg-zinc-900/70 backdrop-blur-md px-5 py-3.5 border border-white/10 rounded-2xl shadow-xl focus-within:border-violet-500/50 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all`}
        >
          {/* Left Attachment Icon */}
          <button
            type="button"
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer shrink-0"
            title="Attach file"
          >
            <FiPaperclip size={18} />
          </button>

          {/* Voice Search Icon */}
          {supported.recognition && (
            <button
              type="button"
              onClick={toggleListening}
              className={`p-1.5 rounded-lg transition-all shrink-0 cursor-pointer ${
                isListening
                  ? "bg-red-500/10 text-red-400 animate-pulse border border-red-500/20"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
              title={isListening ? "Stop listening" : "Ask with voice"}
            >
              {isListening ? <FiMicOff size={16} /> : <FiMic size={16} />}
            </button>
          )}

          {/* Central Input Textarea */}
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your inquiry..."
            rows="1"
            disabled={loading}
            className="flex-1 text-white placeholder-zinc-500 text-sm font-medium outline-none bg-transparent resize-none py-1 h-6 max-h-24 scrollbar-hide"
          />

          {/* Right Action Helpers */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="hidden sm:inline text-[9px] font-semibold font-mono-geist tracking-widest text-zinc-550">
              ENTER TO SEND
            </span>

            {/* Send Button */}
            <button
              type="submit"
              disabled={loading || !problem.trim()}
              className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer font-bold ${
                loading || !problem.trim()
                  ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                  : "bg-violet-600 text-white hover:bg-violet-500 hover:scale-[1.05] active:scale-[0.95]"
              }`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiArrowUpRight size={18} className="stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
