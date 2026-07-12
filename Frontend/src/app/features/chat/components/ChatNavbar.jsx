import React from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";

const ChatNavbar = ({ setSidebarOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth || {});
  const { handleLogout } = useAuth();

  const navigateTo = (path, replace = true) => {
    if (location.pathname !== path) {
      navigate(path, { replace });
    }
  };

  return (
    <div
      className="w-full h-16 bg-zinc-950/60 border-b border-white/5 backdrop-blur-md flex items-center justify-between px-6 z-30 select-none"
    >
      {/* Left Brand Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-lg border border-white/10 bg-zinc-900/60 text-white shrink-0"
        >
          <HiMenu size={18} />
        </button>
        <span
          onClick={() => navigateTo("/")}
          className="font-extrabold text-lg tracking-[0.2em] text-white cursor-pointer hover:opacity-90 transition-opacity"
        >
          AI COMPARISON
        </span>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-6 text-xs font-semibold tracking-widest text-zinc-400">
          <span
            onClick={() => navigateTo("/")}
            className="cursor-pointer hover:text-white transition-colors"
          >
            HOME
          </span>
          <span
            onClick={() => navigateTo("/arena")}
            className="cursor-pointer hover:text-white transition-colors"
          >
            ARENA
          </span>
          <span
            onClick={() => navigateTo("/chat")}
            className="cursor-pointer text-white border-b-2 border-violet-500 pb-0.5"
          >
            CHAT
          </span>
          <span
            onClick={() => navigateTo("/pricing")}
            className="cursor-pointer hover:text-white transition-colors"
          >
            PRICING
          </span>
        </div>

        <div className="h-4 w-px bg-white/10 hidden sm:block" />

        {/* Profile Section */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-white/10 bg-zinc-900/50 px-3.5 py-1.5 rounded-xl font-semibold text-xs text-zinc-200">
              <FiUser size={13} className="text-violet-400" />
              <span className="hidden md:inline">{user.fullname || user.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Sign out"
            >
              <FiLogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo("/login", false)}
              className="px-3.5 py-1.5 border border-white/10 bg-zinc-900/40 rounded-xl font-semibold text-xs text-zinc-200 hover:bg-zinc-800 transition-all cursor-pointer uppercase tracking-wider"
            >
              Sign In
            </button>
            <button
              onClick={() => navigateTo("/register", false)}
              className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold text-xs text-white transition-all cursor-pointer shadow-[0_4px_12px_rgba(139,92,246,0.2)] uppercase tracking-wider"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatNavbar;
