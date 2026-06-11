import React, { useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { onChatProgress } from "../service/chat.socket";
import {
  FiMessageSquare,
  FiCheck,
  FiSearch,
  FiPlay,
  FiFilter,
  FiZap,
  FiTrendingUp,
  FiPenTool,
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
    const unsubscribe = onChatProgress((data) => {
      setProgress(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getStageColor = () => {
    switch (progress.stage) {
      case "initializing":
        return "from-blue-500 to-blue-600";
      case "processing":
        return "from-cyan-500 to-cyan-600";
      case "thinking":
        return "from-purple-500 to-purple-600";
      case "generating":
        return "from-indigo-500 to-indigo-600";
      case "complete":
        return "from-green-500 to-green-600";
      default:
        return "from-blue-500 to-blue-600";
    }
  };

  const getStageIcon = () => {
    switch (progress.stage) {
      case "initializing":
        return <FiPlay className="text-3xl animate-bounce" />;
      case "processing":
        return <FiSearch className="text-3xl animate-pulse text-cyan-500" />;
      case "thinking":
        return <FiFilter className="text-3xl animate-spin text-purple-500" />;
      case "generating":
        return (
          <FiPenTool className="text-3xl animate-bounce text-indigo-500" />
        );
      case "complete":
        return <FiCheck className="text-3xl text-green-500 animate-bounce" />;
      default:
        return <FiPlay className="text-3xl animate-bounce" />;
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
      className={`flex items-center justify-center p-4 md:p-6 space-y-6 ${theme.bg.secondary} rounded-xl ${theme.border.primary} border`}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center h-12">
            {getStageIcon()}
          </div>
          <div>
            <h3 className={`text-lg font-bold ${theme.text.primary}`}>
              {progress.stage === "initializing" && "Processing Message"}
              {progress.stage === "processing" && "Searching & Analyzing"}
              {progress.stage === "thinking" && "Thinking"}
              {progress.stage === "generating" && "Generating Response"}
              {progress.stage === "complete" && "Complete"}
            </h3>
            <p className={`text-xs ${theme.text.tertiary} mt-1`}>
              Real-time AI processing
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className={`text-xs font-medium ${theme.text.secondary}`}>
              Progress
            </p>
            <p
              className={`text-sm font-bold bg-gradient-to-r ${getStageColor()} bg-clip-text text-transparent`}
            >
              {progress.progress}%
            </p>
          </div>
          <div
            className={`w-full h-2 ${theme.bg.primary} rounded-full overflow-hidden`}
          >
            <div
              className={`h-full bg-gradient-to-r ${getStageColor()} rounded-full transition-all duration-300 ease-out`}
              style={{ width: `${progress.progress}%` }}
            />
          </div>
        </div>

        {/* Stage Indicators */}
        <div className="grid grid-cols-5 gap-1.5">
          {stages.map((stage, index) => {
            const isComplete = progress.progress >= stage.threshold;
            const isActive =
              progress.progress >= stage.threshold - 15 &&
              progress.progress < stage.threshold;
            const Icon = stage.icon;

            return (
              <div
                key={stage.name}
                className={`p-2 rounded-lg text-center transition-all ${
                  isComplete
                    ? theme.isDark
                      ? "bg-green-900 border border-green-700"
                      : "bg-green-100 border border-green-300"
                    : isActive
                      ? theme.isDark
                        ? "bg-purple-900 border border-purple-700"
                        : "bg-purple-100 border border-purple-300"
                      : theme.isDark
                        ? "bg-slate-700 border border-slate-600"
                        : "bg-gray-100 border border-gray-300"
                }`}
              >
                <div className="flex justify-center">
                  <Icon
                    size={16}
                    className={
                      isComplete
                        ? "text-green-400"
                        : isActive
                          ? "text-purple-400 animate-spin"
                          : theme.isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Timing */}
        <div className="flex items-center justify-center gap-2">
          <FiTrendingUp size={14} className={theme.text.tertiary} />
          <p className={`text-xs ${theme.text.tertiary}`}>
            {progress.progress > 0
              ? `${Math.round((Date.now() - progress.timestamp) / 1000)}s elapsed`
              : "Starting..."}
          </p>
        </div>

        {/* Status Message */}
        <p className={`text-xs text-center ${theme.text.secondary}`}>
          {progress.stage === "initializing" && "🚀 Preparing..."}
          {progress.stage === "processing" && "🔍 Analyzing your message..."}
          {progress.stage === "thinking" && "🧠 Processing information..."}
          {progress.stage === "generating" && "✍️ Composing response..."}
          {progress.stage === "complete" && "✅ Done!"}
        </p>
      </div>
    </div>
  );
};
