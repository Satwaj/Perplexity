import React, { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";

const Loading = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 ${theme.bg.primary} flex items-center justify-center z-50 transition-opacity duration-500 ${
        !isVisible ? "opacity-0" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            opacity: 0.6;
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
          }
        }

        @keyframes slide-in-1 {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-2 {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes spin-smooth {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .slide-left {
          animation: slide-in-1 0.8s ease-out;
        }

        .slide-right {
          animation: slide-in-2 0.8s ease-out;
        }

        .fade-in-text {
          animation: fade-in 1s ease-out 0.5s both;
        }

        .spin-smooth {
          animation: spin-smooth 18s linear infinite;
        }

        .spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
      `}</style>

      <div className="flex flex-col items-center justify-center gap-8">
        {/* Animated Logo/Icon */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Center floating element */}
          <div
            className="flex items-center justify-center float-animation"
            style={{ zIndex: 10 }}
          >
            <div
              className={`w-24 h-24 rounded-full ${
                theme.isDark ? "bg-gray-800" : "bg-stone-200"
              } flex items-center justify-center pulse-glow`}
              style={{
                boxShadow: theme.isDark
                  ? "0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)"
                  : "0 0 20px rgba(100, 100, 100, 0.3), inset 0 0 20px rgba(100, 100, 100, 0.1)",
              }}
            >
              <span className="text-5xl">🤖</span>
            </div>
          </div>
        </div>

        {/* Text animations */}
        <div className="text-center space-y-3">
          <h1 className={`text-4xl font-bold slide-left ${theme.text.primary}`}>
            Blinkly
          </h1>
          <div className="flex gap-2 justify-center">
            <div
              className={`text-center slide-right ${theme.text.secondary} text-sm font-medium`}
            >
              Initializing AI Assistant
            </div>
            <span
              className={`text-center fade-in-text ${theme.text.secondary} text-sm font-medium`}
            >
              ·
            </span>
            <span
              className={`text-center fade-in-text ${theme.text.secondary} text-sm font-medium`}
              style={{ animationDelay: "0.2s" }}
            >
              ·
            </span>
            <span
              className={`text-center fade-in-text ${theme.text.secondary} text-sm font-medium`}
              style={{ animationDelay: "0.4s" }}
            >
              ·
            </span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          <div
            className={`w-2 h-2 rounded-full ${
              theme.isDark ? "bg-gray-300" : "bg-gray-700"
            }`}
            style={{
              animation: "float 1.5s ease-in-out infinite",
              animationDelay: "0s",
            }}
          ></div>
          <div
            className={`w-2 h-2 rounded-full ${
              theme.isDark ? "bg-gray-300" : "bg-gray-700"
            }`}
            style={{
              animation: "float 1.5s ease-in-out infinite",
              animationDelay: "0.3s",
            }}
          ></div>
          <div
            className={`w-2 h-2 rounded-full ${
              theme.isDark ? "bg-gray-300" : "bg-gray-700"
            }`}
            style={{
              animation: "float 1.5s ease-in-out infinite",
              animationDelay: "0.6s",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
