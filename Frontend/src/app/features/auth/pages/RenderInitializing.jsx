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
      className="fixed inset-0 bg-[#F9F9F7] flex items-center justify-center z-50"
    >
      <style>{`
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 128, 128, 0.4);
          }
          70% {
            box-shadow: 0 0 0 30px rgba(0, 128, 128, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 128, 128, 0);
          }
        }

        @keyframes float-server {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-12px) scale(1.03);
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
          border-radius: 50%;
        }

        .status-dot {
          display: inline-block;
          animation: pulse-dot 1.5s infinite;
        }
      `}</style>

      <div className="flex flex-col items-center justify-center gap-10 max-w-md px-6 text-center">
        {/* Server Icon with Pulse Ring */}
        <div className="relative w-20 h-20 mb-2">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="ring-pulse absolute inset-0 border border-[#008080]/30"></div>
            <div className="server-pulse text-[#008080]">
              <FiServer size={48} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight text-[#1A1C1B]">
            Arena Platform
          </h2>
          <p className="text-sm font-medium text-[#536255]">
            Waking up server instances
            <span className="status-dot">.</span>
            <span className="status-dot" style={{ animationDelay: "0.3s" }}>
              .
            </span>
            <span className="status-dot" style={{ animationDelay: "0.6s" }}>
              .
            </span>
          </p>
          <p
            className="text-xs text-[#7E7576] flex items-center justify-center gap-2"
          >
            <FiZap size={14} className="text-[#C5A880]" />
            Initializing battle engines (can take 30-40s)
          </p>
        </div>

        {/* Info Text */}
        <div className="text-xs text-[#7E7576]/80 leading-relaxed border-t border-[#E2E3E1] pt-6 mt-2 max-w-xs">
          The service is hosted on a free tier. If the app has been idle, please wait a moment while the server spins back up.
        </div>
      </div>
    </div>
  );
};

export default RenderInitializing;
