import React from "react";
import { useTheme } from "../../../context/ThemeContext";

export const JudgeResult = ({ winner, solution1Score, solution2Score }) => {
  const theme = useTheme();
  const winnerName = winner === 1 ? "Mistral" : "Groq";
  const diff = Math.abs(solution1Score - solution2Score);

  return (
    <div
      className="card-brutalist bg-white p-6 space-y-6"
    >
      {/* Header */}
      <div className="pb-4 border-b-2 border-[#1A1C1B]">
        <h3 className="text-lg font-black uppercase tracking-wider text-[#1A1C1B]">
          Judge's Verdict
        </h3>
      </div>

      {/* Winner Banner */}
      <div className="bg-[#F5D3B8] p-4.5 border-2 border-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B] flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-[#1A1C1B]/70 mb-1">
            DECISION WINNER
          </p>
          <p className="text-2xl font-black uppercase text-[#1A1C1B]">
            {winnerName}
          </p>
        </div>
        <div className="border-2 border-[#1A1C1B] bg-white px-3 py-1 text-xs font-black text-[#1A1C1B]">
          VERDICT SIGNED
        </div>
      </div>

      {/* Score Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mistral Score */}
        <div className="bg-[#F1F1EF] p-4.5 space-y-3 border-2 border-[#1A1C1B]">
          <p className="text-xs font-black uppercase tracking-wider text-[#1A1C1B]">
            MISTRAL MODEL PERFORMANCE
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-[#1A1C1B]">
              {solution1Score}
            </span>
            <span className="text-xs font-black text-[#7E7576]">
              / 10.0
            </span>
          </div>
          <div className="w-full h-3 bg-white border-2 border-[#1A1C1B] overflow-hidden">
            <div
              className="h-full bg-[#1A1C1B] transition-all duration-500"
              style={{ width: `${(solution1Score / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Groq Score */}
        <div className="bg-[#F1F1EF] p-4.5 space-y-3 border-2 border-[#1A1C1B]">
          <p className="text-xs font-black uppercase tracking-wider text-[#1A1C1B]">
            GROQ MODEL PERFORMANCE
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-[#1A1C1B]">
              {solution2Score}
            </span>
            <span className="text-xs font-black text-[#7E7576]">
              / 10.0
            </span>
          </div>
          <div className="w-full h-3 bg-white border-2 border-[#1A1C1B] overflow-hidden">
            <div
              className="h-full bg-[#1A1C1B] transition-all duration-500"
              style={{ width: `${(solution2Score / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Difference */}
      <div className="bg-white p-4 border-2 border-[#1A1C1B] text-center">
        <p className="text-[10px] font-black uppercase tracking-wider text-[#7E7576] mb-1">
          Margin of Victory
        </p>
        <p className="text-base font-black text-[#1A1C1B]">
          {diff.toFixed(1)} <span className="text-xs font-bold text-[#536255]">POINTS DIFFERENTIAL</span>
        </p>
      </div>
    </div>
  );
};
