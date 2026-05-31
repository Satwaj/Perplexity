import React from "react";
import { useTheme } from "../../../context/ThemeContext";

export const BattleLoadingState = () => {
  const theme = useTheme();

  return (
    <div className="w-full space-y-6">
      {/* Loading Header */}
      <div className="text-center space-y-3 py-8">
        <div className="flex justify-center gap-4">
          <div
            className="text-4xl animate-bounce"
            style={{ animationDelay: "0s" }}
          >
            🧠
          </div>
          <div
            className="text-4xl animate-bounce"
            style={{ animationDelay: "0.2s" }}
          >
            ⚔️
          </div>
          <div
            className="text-4xl animate-bounce"
            style={{ animationDelay: "0.4s" }}
          >
            🤖
          </div>
        </div>
        <h2 className={`text-2xl font-bold ${theme.text.primary}`}>
          Battle in Progress
        </h2>
        <p className={`${theme.text.tertiary}`}>
          Two AIs are fighting for the best answer...
        </p>
      </div>

      {/* AI Processing Cards */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "Mistral", emoji: "🧠" },
          { name: "Groq", emoji: "🤖" },
        ].map((ai) => (
          <div
            key={ai.name}
            className={`${theme.bg.secondary} ${theme.border.primary} border rounded-lg p-6 space-y-4`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{ai.emoji}</span>
              <div>
                <p className={`font-bold ${theme.text.primary}`}>{ai.name}</p>
                <p className={`text-sm ${theme.text.tertiary}`}>Thinking...</p>
              </div>
            </div>

            {/* Animated Loading Bar */}
            <div className="space-y-2">
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 h-full rounded-full"
                  style={{
                    width: "100%",
                    animation: "shimmer 2s infinite",
                  }}
                />
              </div>
              <p className={`text-xs ${theme.text.tertiary} text-center`}>
                Generating solution...
              </p>
            </div>

            {/* Typing Indicator */}
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  style={{
                    animation: `bounce 1.4s infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Text */}
      <div className={`text-center p-4 ${theme.bg.secondary} rounded-lg`}>
        <p className={`text-sm ${theme.text.tertiary}`}>
          ✨ The judge is analyzing both solutions...
        </p>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
