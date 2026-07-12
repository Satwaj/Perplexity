import React, { useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { onChatProgress } from "../service/chat.socket";
import {
  FiMessageSquare,
  FiCheck,
  FiSearch,
  FiPlay,
  FiFilter,
  FiPenTool,
  FiTrendingUp,
} from "react-icons/fi";

export const ChatProgressLoader = () => {
  const theme = useTheme();
  const [progress, setProgress] = useState({
    stage: "initializing",
    progress: 0,
    message: "Starting chat...",
    timestamp: Date.now(),
  });

  useEffect(() => {
    // 1. Subscribe to real socket events if available
    const unsubscribe = onChatProgress((data) => {
      setProgress(data);
    });

    // 2. Set up a smooth fallback generator that increments status steps up to 95%
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev.progress >= 95) return prev;
        
        let nextProgress = prev.progress + Math.floor(Math.random() * 6) + 3;
        if (nextProgress > 95) nextProgress = 95;
        
        let nextStage = prev.stage;
        let nextMsg = prev.message;
        
        if (nextProgress < 20) {
          nextStage = "initializing";
          nextMsg = "🚀 Preparing chat context...";
        } else if (nextProgress < 50) {
          nextStage = "processing";
          nextMsg = "🔍 Analyzing prompt logic...";
        } else if (nextProgress < 80) {
          nextStage = "thinking";
          nextMsg = "🧠 Formulating optimal explanation...";
        } else {
          nextStage = "generating";
          nextMsg = "✍️ Composing response stream...";
        }
        
        return {
          ...prev,
          progress: nextProgress,
          stage: nextStage,
          message: nextMsg,
        };
      });
    }, 400);

    return () => {
      unsubscribe();
      clearInterval(timer);
    };
  }, []);

  const getStageColor = () => {
    switch (progress.stage) {
      case "initializing":
        return "from-blue-400 to-indigo-500";
      case "processing":
        return "from-cyan-400 to-teal-500";
      case "thinking":
        return "from-purple-400 to-fuchsia-500";
      case "generating":
        return "from-violet-400 to-indigo-500";
      case "complete":
        return "from-emerald-400 to-emerald-600";
      default:
        return "from-blue-400 to-indigo-500";
    }
  };

  const getStageIcon = () => {
    switch (progress.stage) {
      case "initializing":
        return <FiPlay className="text-2xl animate-bounce text-indigo-400" />;
      case "processing":
        return <FiSearch className="text-2xl animate-pulse text-cyan-400" />;
      case "thinking":
        return <FiFilter className="text-2xl animate-spin text-purple-400" />;
      case "generating":
        return <FiPenTool className="text-2xl animate-bounce text-violet-400" />;
      case "complete":
        return <FiCheck className="text-2xl text-emerald-400 animate-bounce" />;
      default:
        return <FiPlay className="text-2xl animate-bounce text-indigo-400" />;
    }
  };

  const stages = [
    { name: "Init", threshold: 10, icon: FiPlay },
    { name: "Process", threshold: 40, icon: FiSearch },
    { name: "Think", threshold: 70, icon: FiFilter },
    { name: "Generate", threshold: 90, icon: FiPenTool },
    { name: "Complete", threshold: 100, icon: FiCheck },
  ];

  return (
    <div
      className="flex items-center justify-center p-6 bg-zinc-900/60 backdrop-blur-xl border border-white/[0.06] rounded-2xl shadow-xl w-full max-w-lg mx-auto animate-fade-in"
    >
      <div className="w-full space-y-5">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center h-10">
            {getStageIcon()}
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-space">
              {progress.stage === "initializing" && "Processing Message"}
              {progress.stage === "processing" && "Searching & Analyzing"}
              {progress.stage === "thinking" && "Thinking"}
              {progress.stage === "generating" && "Generating Response"}
              {progress.stage === "complete" && "Complete"}
            </h3>
            <p className="text-[10px] font-semibold text-zinc-550 uppercase tracking-wider mt-0.5">
              Real-time AI processing
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3 bg-zinc-950/40 p-4 rounded-xl border border-white/5">
          <div className="flex justify-between items-center">
            <p className="text-xs font-semibold text-zinc-400">
              Progress
            </p>
            <p
              className={`text-sm font-bold bg-gradient-to-r ${getStageColor()} bg-clip-text text-transparent font-mono-geist`}
            >
              {progress.progress}%
            </p>
          </div>
          <div
            className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden"
          >
            <div
              className={`h-full bg-gradient-to-r ${getStageColor()} rounded-full transition-all duration-300 ease-out`}
              style={{ width: `${progress.progress}%` }}
            />
          </div>
        </div>

        {/* Stage Indicators */}
        <div className="grid grid-cols-5 gap-2">
          {stages.map((stage, index) => {
            const isComplete = progress.progress >= stage.threshold;
            const isActive =
              progress.progress >= stage.threshold - 15 &&
              progress.progress < stage.threshold;
            const Icon = stage.icon;

            return (
              <div
                key={stage.name}
                className={`p-2 rounded-xl text-center border transition-all ${
                  isComplete
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : isActive
                      ? "bg-violet-500/10 border-violet-500/20 text-violet-400"
                      : "bg-zinc-950/40 border-white/[0.04] text-zinc-650"
                }`}
              >
                <div className="flex justify-center mb-1">
                  <Icon
                    size={14}
                    className={
                      isComplete
                        ? "text-emerald-400"
                        : isActive
                          ? "text-violet-400"
                          : "text-zinc-650"
                    }
                  />
                </div>
                <p className="text-[9px] font-bold tracking-tight">{stage.name}</p>
              </div>
            );
          })}
        </div>

        {/* Status Message & Timing */}
        <div className="flex flex-col items-center gap-2 pt-2 border-t border-white/5 select-none">
          <p className="text-xs text-zinc-350 font-semibold">
            {progress.stage === "initializing" && "🚀 Preparing..."}
            {progress.stage === "processing" && "🔍 Analyzing your message..."}
            {progress.stage === "thinking" && "🧠 Processing information..."}
            {progress.stage === "generating" && "✍️ Composing response..."}
            {progress.stage === "complete" && "Done!"}
          </p>
          
          <div className="flex items-center justify-center gap-1.5 text-zinc-550 text-[10px] font-semibold">
            <FiTrendingUp size={12} className="text-zinc-650" />
            <span>Elapsed:</span>
            <span className="font-mono-geist text-zinc-450">
              {progress.progress > 0
                ? `${Math.round((Date.now() - progress.timestamp) / 1000)}s`
                : "0s"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
