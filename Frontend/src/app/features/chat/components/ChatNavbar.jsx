import React, { useState } from "react";
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
      className="w-full h-16 bg-white border-b-2 border-[#1A1C1B] flex items-center justify-between px-6 z-30"
    >
      {/* Left Brand Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-1.5 border-2 border-black bg-white text-black shrink-0"
        >
          <HiMenu size={20} />
        </button>
        <span
          onClick={() => navigateTo("/")}
          className="font-extrabold text-lg tracking-[0.25em] text-[#1A1C1B] uppercase cursor-pointer"
        >
          AI COMPARISON
        </span>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-5 text-xs font-black tracking-widest text-[#536255]">
          <span
            onClick={() => navigateTo("/")}
            className="cursor-pointer hover:text-[#1A1C1B] transition-colors"
          >
            HOME
          </span>
          <span
            onClick={() => navigateTo("/arena")}
            className="cursor-pointer hover:text-[#1A1C1B] transition-colors"
          >
            ARENA
          </span>
          <span
            onClick={() => navigateTo("/chat")}
            className="cursor-pointer text-[#1A1C1B] border-b-2 border-black pb-0.5"
          >
            CHAT
          </span>
          <span
            onClick={() => navigateTo("/pricing")}
            className="cursor-pointer hover:text-[#1A1C1B] transition-colors"
          >
            PRICING
          </span>
        </div>

        <div className="h-6 w-[2px] bg-[#1A1C1B] hidden sm:block" />

        {/* Profile Section */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border-2 border-[#1A1C1B] bg-[#F1F1EF] px-3 py-1.5 font-bold text-xs text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B]">
              <FiUser size={13} className="stroke-[2.5]" />
              <span className="hidden md:inline">{user.fullname || user.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-red-500/10 text-[#7E7576] hover:text-red-600 transition-colors cursor-pointer"
              title="Sign out"
            >
              <FiLogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo("/login", false)}
              className="px-3 py-1.5 border-2 border-black bg-white font-bold text-xs text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] transition-all cursor-pointer uppercase tracking-wider"
            >
              Sign In
            </button>
            <button
              onClick={() => navigateTo("/register", false)}
              className="px-3 py-1.5 border-2 border-black bg-[#F5D3B8] font-bold text-xs text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] transition-all cursor-pointer uppercase tracking-wider"
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
