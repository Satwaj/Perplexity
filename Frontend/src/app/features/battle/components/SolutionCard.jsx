import React, { useMemo } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { ReactMarkdown } from "../utils/markdown.utils.jsx";
import { FiVolume2, FiVolumeX, FiCpu, FiServer, FiActivity, FiZap, FiClock } from "react-icons/fi";
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

  // Dynamic Telemetry calculation based on content
  const telemetry = useMemo(() => {
    const chars = solution ? solution.length : 0;
    const estimatedTokens = Math.max(12, Math.floor(chars / 3.8));
    
    // Simulate model speed profiles
    const tokSpeed = aiName === "Mistral" 
      ? Math.floor(Math.random() * 15) + 115  
      : Math.floor(Math.random() * 40) + 335; 

    const latency = estimatedTokens / tokSpeed;
    
    return {
      tokens: estimatedTokens,
      speed: tokSpeed,
      latency: latency.toFixed(2),
    };
  }, [solution, aiName]);

  return (
    <div
      className="card-brutalist flex flex-col h-full bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 space-y-5 hover:border-violet-500/20 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* Model Tag/Badge */}
          <div className="border border-white/10 bg-zinc-800/50 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase text-zinc-300">
            {aiName === "Mistral" ? "MODEL MISTRAL" : "MODEL GROQ"}
          </div>
          {isWinner && (
            <span className="border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
              🏆 WINNER
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
              className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer shrink-0 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase ${
                isSpeaking 
                  ? "bg-violet-500/15 border-violet-500/30 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]" 
                  : "bg-zinc-800/60 border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800"
              }`}
              title={isSpeaking ? "Stop reading" : "Read solution aloud"}
            >
              {isSpeaking ? <FiVolumeX size={16} className="text-violet-400" /> : <FiVolume2 size={16} />}
              <span>{isSpeaking ? "STOP" : "LISTEN"}</span>
            </button>
          )}
          
          {/* Score Badge */}
          <div className="border border-white/10 bg-zinc-800/80 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-200">
            SCORE: <span className="text-violet-400 font-bold">{score}</span>/10
          </div>
        </div>
      </div>

      {/* Dynamic Diagnostic Telemetry Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-zinc-950/40 border border-white/[0.04] p-2.5 rounded-xl flex flex-col items-center justify-center font-mono-geist text-[10px] text-zinc-400 select-none">
          <FiZap className="text-amber-400/80 mb-1" size={12} />
          <span className="text-zinc-550 text-[9px] uppercase tracking-wider">Speed</span>
          <span className="font-bold text-zinc-250 mt-0.5">{telemetry.speed} t/s</span>
        </div>

        <div className="bg-zinc-950/40 border border-white/[0.04] p-2.5 rounded-xl flex flex-col items-center justify-center font-mono-geist text-[10px] text-zinc-400 select-none">
          <FiActivity className="text-violet-450 mb-1" size={12} />
          <span className="text-zinc-550 text-[9px] uppercase tracking-wider">Tokens</span>
          <span className="font-bold text-zinc-250 mt-0.5">{telemetry.tokens} t</span>
        </div>

        <div className="bg-zinc-950/40 border border-white/[0.04] p-2.5 rounded-xl flex flex-col items-center justify-center font-mono-geist text-[10px] text-zinc-400 select-none">
          <FiClock className="text-cyan-405 mb-1" size={12} />
          <span className="text-zinc-550 text-[9px] uppercase tracking-wider">Time</span>
          <span className="font-bold text-zinc-250 mt-0.5">{telemetry.latency}s</span>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold tracking-tight text-white">
          {aiName === "Mistral" ? "Sophisticated Analysis" : "Technical Translation"}
        </h3>
        {aiName === "Mistral" ? (
          <FiCpu size={18} className="text-violet-400 stroke-[2]" />
        ) : (
          <FiServer size={18} className="text-cyan-400 stroke-[2]" />
        )}
      </div>

      {/* Solution Markdown */}
      <div className="space-y-2 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Solution Content
        </p>
        <div
          className="text-zinc-200 text-sm leading-relaxed prose-sm max-h-96 overflow-y-auto pr-2 font-medium"
        >
          <ReactMarkdown content={solution} />
        </div>
      </div>

      {/* Reasoning */}
      <div className="space-y-2 pt-4 border-t border-white/5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Judge's Reasoning
        </p>
        <p className="text-zinc-400 text-xs leading-relaxed italic bg-zinc-950/40 p-4 border-l-2 border-violet-500/50 rounded-r-xl font-medium">
          {reasoning}
        </p>
      </div>
    </div>
  );
};
