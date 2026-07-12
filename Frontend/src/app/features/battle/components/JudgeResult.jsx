import React from "react";

export const JudgeResult = ({ winner, solution1Score, solution2Score }) => {
  const winnerName = winner === 1 ? "Mistral" : "Groq";
  const winnerScore = winner === 1 ? solution1Score : solution2Score;
  const loserScore = winner === 1 ? solution2Score : solution1Score;
  const diff = Math.abs(solution1Score - solution2Score);

  return (
    <div className="border border-white/10 bg-zinc-900/60 backdrop-blur-md p-4 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold uppercase text-zinc-300 tracking-wider w-full select-none">
      <div className="flex items-center gap-2">
        <span className="text-sm">🏆</span>
        <span>
          JUDGE DECISION: <span className="text-violet-400 font-bold underline underline-offset-4 decoration-violet-500/50">{winnerName}</span> WINS ({winnerScore} vs {loserScore})
        </span>
      </div>
      <div className="bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 text-[10px] font-bold text-violet-400 rounded-full">
        +{diff.toFixed(1)} Pts Margin
      </div>
    </div>
  );
};
