import React, { useState } from "react";
import { FiLogOut, FiUser, FiMessageSquare, FiGrid } from "react-icons/fi";
import { GiCrossedSwords } from "react-icons/gi";
import { HiMenu } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";

const ChatNavbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth || {});
  const { handleLogout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const navigateTo = (path, replace = true) => {
    if (location.pathname !== path) {
      navigate(path, { replace });
    }
  };

  return (
    <nav
      className="w-full h-16 bg-zinc-950/60 border-b border-white/5 backdrop-blur-md flex items-center justify-between px-6 z-30 select-none relative"
    >
      {/* Left Brand Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-lg border border-white/10 bg-zinc-900/60 text-white shrink-0 cursor-pointer"
        >
          <HiMenu size={18} />
        </button>
        <span
          onClick={() => navigateTo("/")}
          className="font-extrabold text-lg tracking-[0.2em] text-white cursor-pointer hover:opacity-90 transition-opacity font-serif-brutalist uppercase"
        >
          AI COMPARISON
        </span>
      </div>

      {/* Center Navigation: Premium Floating Glass Capsule */}
      <div className="hidden md:flex items-center bg-zinc-900/65 border border-white/10 p-1 rounded-full backdrop-blur-xl relative">
        <button
          onClick={() => navigateTo("/")}
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            location.pathname === "/"
              ? "bg-violet-600 text-white shadow-md shadow-violet-500/15"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => navigateTo("/arena")}
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            location.pathname === "/arena" || location.pathname === "/battle"
              ? "bg-violet-600 text-white shadow-md shadow-violet-500/15"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Arena
        </button>
        <button
          onClick={() => navigateTo("/chat")}
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            location.pathname === "/chat"
              ? "bg-violet-600 text-white shadow-md shadow-violet-500/15"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => navigateTo("/pricing")}
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            location.pathname === "/pricing"
              ? "bg-violet-600 text-white shadow-md shadow-violet-500/15"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Pricing
        </button>
      </div>

      {/* Right Side - Actions & Profile Dropdown */}
      <div className="flex items-center gap-4">
        <div className="relative">
          {user ? (
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 border border-white/10 bg-zinc-900/50 hover:bg-zinc-800/80 px-3.5 py-1.5 rounded-xl font-semibold text-xs text-zinc-200 transition-all cursor-pointer select-none"
            >
              <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-[10px] text-white font-bold uppercase shrink-0">
                {user.fullname ? user.fullname[0] : user.username[0]}
              </div>
              <span className="hidden sm:inline truncate max-w-[100px] font-semibold">{user.fullname || user.username}</span>
            </button>
          ) : (
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="p-2 rounded-xl border border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer flex items-center justify-center shrink-0"
              title="Profile Menu"
            >
              <FiUser size={16} />
            </button>
          )}

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setProfileOpen(false)} />
              
              <div className="absolute right-0 mt-2 w-56 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2.5 flex flex-col gap-1.5 z-50 animate-fade-in">
                {user ? (
                  <>
                    <div className="px-3 py-2 border-b border-white/5 mb-1">
                      <p className="text-xs font-bold text-white truncate">{user.fullname || user.username}</p>
                      <p className="text-[10px] text-zinc-500 font-mono-geist truncate mt-0.5">{user.email}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <FiUser size={14} className="text-violet-400 shrink-0" />
                      Profile Details
                    </button>
                    
                    <button
                      onClick={() => { setProfileOpen(false); navigateTo("/arena"); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <GiCrossedSwords size={14} className="text-violet-400 shrink-0" />
                      Battle Arena
                    </button>
                    
                    <button
                      onClick={() => { setProfileOpen(false); navigateTo("/chat"); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <FiMessageSquare size={14} className="text-violet-400 shrink-0" />
                      AI Chat Channel
                    </button>

                    <button
                      onClick={() => { setProfileOpen(false); navigateTo("/pricing"); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2 border-t border-white/5 mt-1 pt-2"
                    >
                      <FiGrid size={14} className="text-emerald-400 shrink-0" />
                      Upgrade Plan
                    </button>
                    
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer flex items-center gap-2 mt-0.5"
                    >
                      <FiLogOut size={14} />
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-1.5 border-b border-white/5 mb-1 text-[9px] font-bold text-zinc-550 uppercase tracking-widest font-mono-geist">
                      Guest Account
                    </div>
                    <button
                      onClick={() => { setProfileOpen(false); navigateTo("/login", false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => { setProfileOpen(false); navigateTo("/register", false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 transition-all cursor-pointer flex items-center justify-center mt-1"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ChatNavbar;
