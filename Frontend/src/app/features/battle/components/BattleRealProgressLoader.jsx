import React, { useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { onBattleProgress } from "../service/battle.socket";
import {
  FiZap,
  FiCheck,
  FiTarget,
  FiPlay,
  FiTrendingUp,
} from "react-icons/fi";

export const BattleRealProgressLoader = () => {
  const theme = useTheme();
  const [progress, setProgress] = useState({
    stage: "initializing",
    progress: 0,
    message: "🚀 Starting battle...",
    timestamp: Date.now(),
  });

  useEffect(() => {
    const unsubscribe = onBattleProgress((data) => {
      setProgress(data);
    });

    // Simulated fallback progression timer
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev.progress >= 95) return prev;

        let nextProgress = prev.progress + Math.floor(Math.random() * 5) + 2;
        if (nextProgress > 95) nextProgress = 95;

        let nextStage = prev.stage;
        let nextMsg = prev.message;

        if (nextProgress < 20) {
          nextStage = "initializing";
          nextMsg = "🚀 Preparing for battle...";
        } else if (nextProgress < 75) {
          nextStage = "generating";
          nextMsg = "⚡ Both AI models are generating solutions";
        } else {
          nextStage = "judging";
          nextMsg = "⚖️ Judge is evaluating the solutions";
        }

        return {
          ...prev,
          progress: nextProgress,
          stage: nextStage,
          message: nextMsg,
        };
      });
    }, 500);

    return () => {
      unsubscribe();
      clearInterval(timer);
    };
  }, []);

  const getStageColor = () => {
    switch (progress.stage) {
      case "initializing":
        return "from-blue-400 to-indigo-500";
      case "generating":
        return "from-violet-400 to-fuchsia-500";
      case "judging":
        return "from-amber-400 to-orange-500";
      case "complete":
        return "from-emerald-400 to-teal-500";
      default:
        return "from-blue-400 to-indigo-500";
    }
  };

  const getStageIcon = () => {
    switch (progress.stage) {
      case "initializing":
        return <FiPlay className="text-3xl animate-bounce text-indigo-400" />;
      case "generating":
        return <FiZap className="text-3xl animate-pulse text-violet-400" />;
      case "judging":
        return <FiTarget className="text-3xl animate-spin text-amber-400" />;
      case "complete":
        return <FiCheck className="text-3xl text-emerald-400 animate-bounce" />;
      default:
        return <FiPlay className="text-3xl animate-bounce text-indigo-400" />;
    }
  };

  const stages = [
    { name: "Initialize", threshold: 5, icon: FiPlay },
    { name: "Generate", threshold: 60, icon: FiZap },
    { name: "Judge", threshold: 90, icon: FiTarget },
    { name: "Complete", threshold: 100, icon: FiCheck },
  ];

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div
        className="w-full max-w-md p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/[0.06] shadow-2xl space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center h-12">
            {getStageIcon()}
          </div>
          <h2 className="text-xl font-bold text-white">
            {progress.stage === "initializing" && "Starting Battle"}
            {progress.stage === "generating" && "Generating Solutions"}
            {progress.stage === "judging" && "Evaluating Solutions"}
            {progress.stage === "complete" && "Battle Complete"}
          </h2>
          <p className="text-xs text-zinc-550 font-semibold tracking-wider uppercase">
            Real-time AI model competition
          </p>
        </div>

        {/* Main Progress Bar */}
        <div className="space-y-3 bg-zinc-950/40 p-4 rounded-xl border border-white/5">
          <div className="flex justify-between items-center">
            <p className="text-xs font-semibold text-zinc-400">
              Overall Progress
            </p>
            <p
              className={`text-base font-bold bg-gradient-to-r ${getStageColor()} bg-clip-text text-transparent font-mono-geist`}
            >
              {progress.progress}%
            </p>
          </div>
          <div
            className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden shadow-inner"
          >
            <div
              className={`h-full bg-gradient-to-r ${getStageColor()} rounded-full transition-all duration-300 ease-out`}
              style={{ width: `${progress.progress}%` }}
            />
          </div>
        </div>

        {/* Stage Breakdown */}
        <div className="space-y-2.5">
          <p
            className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest"
          >
            Processing Stages
          </p>
          <div className="grid grid-cols-4 gap-2">
            {stages.map((stage, index) => {
              const isComplete = progress.progress >= stage.threshold;
              const isActive =
                progress.progress >= stage.threshold - 20 &&
                progress.progress < stage.threshold;
              const Icon = stage.icon;

              return (
                <div
                  key={stage.name}
                  className={`p-2.5 rounded-xl text-center border transition-all ${
                    isComplete
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : isActive
                        ? "bg-violet-500/10 border-violet-500/20 text-violet-400"
                        : "bg-zinc-950/40 border-white/[0.04] text-zinc-600"
                  }`}
                >
                  <div className="flex justify-center mb-1">
                    <Icon
                      size={18}
                      className={
                        isComplete
                          ? "text-emerald-400"
                          : isActive
                            ? "text-violet-400"
                            : "text-zinc-600"
                      }
                    />
                  </div>
                  <p
                    className="text-[9px] font-bold"
                  >
                    {stage.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Messages */}
        <div className="text-center p-3 bg-zinc-950/40 border border-white/5 rounded-xl">
          <p className="text-xs font-semibold text-zinc-300">
            {progress.stage === "initializing" && "🚀 Preparing for battle..."}
            {progress.stage === "generating" && "⚡ Both AI models are generating solutions"}
            {progress.stage === "judging" && "⚖️ Judge is evaluating the solutions"}
            {progress.stage === "complete" && "🏆 Battle complete! Rendering results..."}
          </p>
        </div>

        {/* Timing Info */}
        <div className="flex justify-center items-center gap-1.5 text-zinc-500 text-[10px] font-semibold">
          <FiTrendingUp size={12} className="text-zinc-650" />
          <span>Elapsed:</span>
          <span className="font-mono-geist text-zinc-400">
            {progress.progress > 0
              ? `${Math.round((Date.now() - progress.timestamp) / 1000)}s`
              : "0s"}
          </span>
        </div>
      </div>
    </div>
  );
};
