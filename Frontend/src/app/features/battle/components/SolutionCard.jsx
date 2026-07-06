import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import { ReactMarkdown } from "../utils/markdown.utils.jsx";
import { FiVolume2, FiVolumeX, FiCpu, FiServer } from "react-icons/fi";
import { useVoice } from "../hooks/useVoice";

export const SolutionCard = ({
  aiName,
  solution,
  score,
  reasoning,
  isWinner,
}) => {
  const theme = useTheme();
  const { speak, isSpeaking, stopSpeaking, supported } = useVoice();

  return (
    <div
      className="card-brutalist flex flex-col h-full bg-white p-6 space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-[#1A1C1B]">
        <div className="flex items-center gap-3">
          {/* Model Tag/Badge */}
          <div className="border-2 border-[#1A1C1B] bg-[#F1F1EF] px-3 py-1 text-xs font-black tracking-wider uppercase text-[#1A1C1B]">
            {aiName === "Mistral" ? "MODEL MISTRAL" : "MODEL GROQ"}
          </div>
          {isWinner && (
            <span className="border-2 border-[#1A1C1B] bg-[#F5D3B8] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#1A1C1B]">
              ⭐ WINNER
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {supported.synthesis && (
            <button
              type="button"
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                } else {
                  speak(solution);
                }
              }}
              className={`p-2 border-2 border-transparent hover:border-[#1A1C1B] hover:bg-[#F1F1EF] transition-all cursor-pointer shrink-0 ${
                isSpeaking ? "bg-[#008080]/15 text-[#008080]" : "text-[#536255] hover:text-[#1A1C1B]"
              }`}
              title={isSpeaking ? "Stop reading" : "Read solution aloud"}
            >
              {isSpeaking ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
            </button>
          )}
          
          {/* Score Badge */}
          <div className="border-2 border-[#1A1C1B] bg-white px-2.5 py-1 text-xs font-black text-[#1A1C1B]">
            SCORE: {score}/10
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-extrabold tracking-tight text-[#1A1C1B]">
          {aiName === "Mistral" ? "Sophisticated Analysis" : "Technical Translation"}
        </h3>
        {aiName === "Mistral" ? (
          <FiCpu size={18} className="text-[#1A1C1B] stroke-[2.5]" />
        ) : (
          <FiServer size={18} className="text-[#1A1C1B] stroke-[2.5]" />
        )}
      </div>

      {/* Solution Markdown */}
      <div className="space-y-2 flex-1">
        <p className="text-[10px] font-black uppercase tracking-wider text-[#7E7576]">
          Solution Content
        </p>
        <div
          className="text-[#1A1C1B] text-sm leading-relaxed prose-sm max-h-96 overflow-y-auto pr-2 font-medium"
        >
          <ReactMarkdown content={solution} />
        </div>
      </div>

      {/* Reasoning */}
      <div className="space-y-2 pt-4 border-t-2 border-[#1A1C1B]">
        <p className="text-[10px] font-black uppercase tracking-wider text-[#7E7576]">
          Judge's Reasoning
        </p>
        <p className="text-[#536255] text-xs leading-relaxed italic bg-[#F1F1EF] p-4 border-2 border-[#1A1C1B] font-semibold">
          {reasoning}
        </p>
      </div>
    </div>
  );
};
