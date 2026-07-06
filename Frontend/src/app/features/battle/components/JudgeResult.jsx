import React from "react";

export const JudgeResult = ({ winner, solution1Score, solution2Score }) => {
  const winnerName = winner === 1 ? "Mistral" : "Groq";
  const winnerScore = winner === 1 ? solution1Score : solution2Score;
  const loserScore = winner === 1 ? solution2Score : solution1Score;
  const diff = Math.abs(solution1Score - solution2Score);

  return (
    <div className="border-2 border-[#1A1C1B] bg-[#F5D3B8] p-3 shadow-[4px_4px_0px_0px_#1A1C1B] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-black uppercase text-[#1A1C1B] tracking-wider w-full select-none">
      <div className="flex items-center gap-2">
        <span>🏆</span>
        <span>
          JUDGE DECISION: <span className="underline underline-offset-2">{winnerName}</span> WINS ({winnerScore} vs {loserScore})
        </span>
      </div>
      <div className="bg-white border border-[#1A1C1B] px-2.5 py-0.5 text-[10px]">
        +{diff.toFixed(1)} Pts Margin
      </div>
    </div>
  );
};
