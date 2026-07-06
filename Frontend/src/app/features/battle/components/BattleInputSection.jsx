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
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
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
          className={`flex items-center gap-4 bg-white px-5 py-3 border-2 border-[#1A1C1B] shadow-[4px_4px_0px_0px_#1A1C1B] focus-within:translate-x-[-2px] focus-within:translate-y-[-2px] focus-within:shadow-[6px_6px_0px_0px_#1A1C1B] transition-all`}
        >
          {/* Left Attachment Icon */}
          <button
            type="button"
            className="p-1 text-[#1A1C1B] hover:bg-[#F1F1EF] transition-colors cursor-pointer shrink-0"
            title="Attach file"
          >
            <FiPaperclip size={20} />
          </button>

          {/* Voice Search Icon */}
          {supported.recognition && (
            <button
              type="button"
              onClick={toggleListening}
              className={`p-1.5 rounded transition-all shrink-0 cursor-pointer ${
                isListening
                  ? "bg-red-500/10 text-red-600 animate-pulse border border-red-500/20"
                  : "text-[#536255] hover:bg-[#F1F1EF] hover:text-[#1A1C1B]"
              }`}
              title={isListening ? "Stop listening" : "Ask with voice"}
            >
              {isListening ? <FiMicOff size={18} /> : <FiMic size={18} />}
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
            className="flex-1 text-[#1A1C1B] placeholder-[#7E7576] text-sm font-semibold outline-none bg-transparent resize-none py-1 h-6 max-h-24 scrollbar-hide"
          />

          {/* Right Action Helpers */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="hidden sm:inline text-[9px] font-black tracking-widest text-[#7E7576]">
              CMD + ENTER TO SEND
            </span>

            {/* Send Button (Neobrutalist diagonal arrow square) */}
            <button
              type="submit"
              disabled={loading || !problem.trim()}
              className={`w-9 h-9 flex items-center justify-center border-2 border-[#1A1C1B] transition-all cursor-pointer font-bold ${
                loading || !problem.trim()
                  ? "bg-[#E2E3E1] text-[#7E7576] cursor-not-allowed"
                  : "bg-[#1A1C1B] text-white hover:bg-[#3C4A3E] active:translate-x-[1px] active:translate-y-[1px]"
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
