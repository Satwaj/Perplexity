import React, { useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { onBattleProgress } from "../service/battle.socket";
import {
  FiZap,
  FiCheck,
  FiTarget,
  FiPlay,
  FiCpu,
  FiServer,
  FiTrendingUp,
  FiAward,
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

    return () => {
      unsubscribe();
    };
  }, []);

  const getStageColor = () => {
    switch (progress.stage) {
      case "initializing":
        return "from-blue-500 to-blue-600";
      case "generating":
        return "from-purple-500 to-purple-600";
      case "judging":
        return "from-orange-500 to-orange-600";
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
      case "generating":
        return <FiZap className="text-3xl animate-pulse text-purple-500" />;
      case "judging":
        return <FiTarget className="text-3xl animate-spin text-orange-500" />;
      case "complete":
        return <FiCheck className="text-3xl text-green-500 animate-bounce" />;
      default:
        return <FiPlay className="text-3xl animate-bounce" />;
    }
  };

  const stages = [
    { name: "Initialize", threshold: 5, icon: FiPlay },
    { name: "Generate", threshold: 60, icon: FiZap },
    { name: "Judge", threshold: 90, icon: FiTarget },
    { name: "Complete", threshold: 100, icon: FiCheck },
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className={`w-full max-w-lg mx-auto p-8 rounded-xl ${theme.bg.secondary} ${theme.border.primary} border space-y-8`}
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center h-16">
            {getStageIcon()}
          </div>
          <h2 className={`text-2xl font-bold ${theme.text.primary}`}>
            {progress.stage === "initializing" && "Starting Battle"}
            {progress.stage === "generating" && "Generating Solutions"}
            {progress.stage === "judging" && "Evaluating Solutions"}
            {progress.stage === "complete" && "Battle Complete"}
          </h2>
          <p className={`text-sm ${theme.text.tertiary}`}>
            Real-time AI model competition
          </p>
        </div>

        {/* Main Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className={`text-sm font-medium ${theme.text.secondary}`}>
              Overall Progress
            </p>
            <p
              className={`text-lg font-bold bg-gradient-to-r ${getStageColor()} bg-clip-text text-transparent`}
            >
              {progress.progress}%
            </p>
          </div>
          <div
            className={`w-full h-3 ${theme.bg.primary} rounded-full overflow-hidden shadow-sm`}
          >
            <div
              className={`h-full bg-gradient-to-r ${getStageColor()} rounded-full transition-all duration-300 ease-out`}
              style={{ width: `${progress.progress}%` }}
            />
          </div>
        </div>

        {/* Stage Breakdown */}
        <div className="space-y-3">
          <p
            className={`text-xs font-bold ${theme.text.tertiary} uppercase tracking-widest`}
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
                  className={`p-3 rounded-lg text-center transition-all ${
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
                  <div className="flex justify-center mb-1">
                    <Icon
                      size={20}
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
                  <p
                    className={`text-xs font-semibold ${
                      isComplete || isActive
                        ? "text-white"
                        : theme.text.tertiary
                    }`}
                  >
                    {stage.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>



        {/* Timing Info */}
        <div
          className={`text-center p-3 ${theme.bg.primary} rounded-lg border ${theme.border.primary}`}
        >
          <p className={`text-xs ${theme.text.tertiary}`}>
            <FiTrendingUp className="inline mr-2" size={14} />
            Elapsed:{" "}
            {progress.progress > 0
              ? `${Math.round((Date.now() - progress.timestamp) / 1000)}s`
              : "Starting..."}
          </p>
        </div>

        {/* Status Messages */}
        <div className={`text-center p-3 ${theme.bg.primary} rounded-lg`}>
          <p className={`text-sm font-medium ${theme.text.secondary}`}>
            {progress.stage === "initializing" && "🚀 Preparing for battle..."}
            {progress.stage === "generating" &&
              "⚡ Both AI models are generating solutions"}
            {progress.stage === "judging" &&
              "⚖️ Judge is evaluating the solutions"}
            {progress.stage === "complete" &&
              "🏆 Battle complete! Rendering results..."}
          </p>
        </div>
      </div>
    </div>
  );
};
