import React, { useState } from "react";
import { FiLogOut, FiUser, FiGrid } from "react-icons/fi";
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
  const [navOpen, setNavOpen] = useState(false);

  const navigateTo = (path, replace = true) => {
    if (location.pathname !== path) {
      navigate(path, { replace });
    }
  };

  return (
    <div
      className="w-full h-16 bg-zinc-950/60 border-b border-white/5 backdrop-blur-md flex items-center justify-between px-6 z-30 select-none relative"
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
      <div className="flex items-center gap-4">
        {/* Navigation Breadcrumb Shortcuts */}
        <div className="hidden sm:flex items-center gap-3.5 text-[9px] font-bold tracking-widest uppercase text-zinc-550 mr-1 font-mono-geist bg-zinc-900/60 px-3 py-1.5 rounded-xl border border-white/5 select-none">
          <button 
            onClick={() => navigateTo("/")} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="text-zinc-800">/</span>
          <button 
            onClick={() => navigateTo("/arena")} 
            className={`hover:text-white transition-colors cursor-pointer ${location.pathname === "/arena" || location.pathname === "/battle" ? "text-violet-400" : ""}`}
          >
            Arena
          </button>
          <span className="text-zinc-800">/</span>
          <button 
            onClick={() => navigateTo("/chat")} 
            className={`hover:text-white transition-colors cursor-pointer ${location.pathname === "/chat" ? "text-violet-400" : ""}`}
          >
            Chat
          </button>
        </div>

        {/* Floating grid dropdown trigger */}
        <div className="relative">
          <button
            onClick={() => setNavOpen(!navOpen)}
            className={`p-2 rounded-lg border transition-all cursor-pointer shrink-0 flex items-center justify-center ${
              navOpen 
                ? "bg-violet-500/15 border-violet-500/30 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]" 
                : "bg-zinc-900/60 border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
            title="Open Grid Navigation"
          >
            <FiGrid size={16} />
          </button>

          {navOpen && (
            <>
              <div 
                className="fixed inset-0 z-40 bg-transparent" 
                onClick={() => setNavOpen(false)} 
              />
              <div 
                className="absolute right-0 mt-2 w-48 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl p-2 flex flex-col gap-1 z-50 animate-fade-in"
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 px-3 py-1.5 border-b border-white/5 font-mono-geist">
                  System Grid
                </span>
                <button
                  onClick={() => { setNavOpen(false); navigateTo("/"); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  Home
                </button>
                <button
                  onClick={() => { setNavOpen(false); navigateTo("/arena"); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  Battle Arena
                </button>
                <button
                  onClick={() => { setNavOpen(false); navigateTo("/chat"); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  AI Chat Channel
                </button>
              </div>
            </>
          )}
        </div>

        <div className="h-4 w-px bg-white/10" />

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
