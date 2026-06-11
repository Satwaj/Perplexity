import React, { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FiServer, FiZap } from "react-icons/fi";

const RenderInitializing = () => {
  const theme = useTheme();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 ${theme.bg.primary} flex items-center justify-center z-50`}
    >
      <style>{`
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            box-shadow: 0 0 0 30px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        @keyframes float-server {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.05);
          }
        }

        @keyframes pulse-dot {
          0%, 20% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }

        .server-pulse {
          animation: float-server 2.5s ease-in-out infinite;
        }

        .ring-pulse {
          animation: pulse-ring 2s infinite;
        }

        .status-dot {
          display: inline-block;
          animation: pulse-dot 1.5s infinite;
        }
      `}</style>

      <div className="flex flex-col items-center justify-center gap-12">
        {/* Server Icon with Pulse Ring */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="ring-pulse absolute inset-0"></div>
            <div className={`server-pulse text-blue-400`}>
              <FiServer size={64} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center space-y-4">
          <h2 className={`text-3xl font-bold ${theme.text.primary}`}>
            Render Platform
          </h2>
          <p className={`text-lg ${theme.text.secondary} font-medium`}>
            Waking up servers
            <span className="status-dot">.</span>
            <span className="status-dot" style={{ animationDelay: "0.3s" }}>
              .
            </span>
            <span className="status-dot" style={{ animationDelay: "0.6s" }}>
              .
            </span>
          </p>
          <p
            className={`text-sm ${theme.text.secondary} opacity-75 flex items-center justify-center gap-2`}
          >
            <FiZap size={16} className="text-yellow-400" />
            Cold start initialization in progress
          </p>
        </div>

        {/* Info Text */}
        <div
          className={`text-center text-xs ${theme.text.secondary} opacity-60 max-w-xs`}
        >
          Your app is deployed on Render's free tier with automatic sleep. First
          load takes 30-60 seconds.
        </div>
      </div>
    </div>
  );
};

export default RenderInitializing;
