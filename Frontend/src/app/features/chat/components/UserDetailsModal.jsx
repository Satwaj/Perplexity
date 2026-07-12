import React from "react";
import { FiX, FiMail, FiUser, FiZap, FiLogOut } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  if (!isOpen) return null;

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md select-none"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900/95 backdrop-blur-2xl border border-white/[0.06] rounded-2xl shadow-2xl w-96 transition-all overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-950/20"
        >
          <h2 className="text-lg font-bold text-white">
            Profile Details
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white transition-all hover:scale-105"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* User Avatar and Name */}
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl bg-violet-600/10 border border-violet-500/20 shadow-md flex items-center justify-center text-violet-400 font-bold text-2xl"
            >
              {user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-white truncate">
                {user?.username || "User"}
              </p>
              <p className="text-xs text-zinc-450 mt-0.5 truncate">
                {user?.email || "No email"}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5"></div>

          {/* User Details */}
          <div className="space-y-3">
            <div
              className="p-3.5 rounded-xl transition-all bg-zinc-950/40 border border-white/[0.04] hover:border-white/[0.08]"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <div className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400">
                  <FiUser size={14} />
                </div>
                <span
                  className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest"
                >
                  Username
                </span>
              </div>
              <p className="text-sm font-semibold text-zinc-200 ml-10">
                {user?.username || "N/A"}
              </p>
            </div>

            <div
              className="p-3.5 rounded-xl transition-all bg-zinc-950/40 border border-white/[0.04] hover:border-white/[0.08]"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <div className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400">
                  <FiMail size={14} />
                </div>
                <span
                  className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest"
                >
                  Email
                </span>
              </div>
              <p className="text-sm font-semibold text-zinc-200 ml-10">
                {user?.email || "N/A"}
              </p>
            </div>

            <div
              className="p-3.5 rounded-xl transition-all bg-zinc-950/40 border border-white/[0.04] hover:border-white/[0.08]"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <div className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-500">
                  <FiZap size={14} />
                </div>
                <span
                  className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest"
                >
                  Plan
                </span>
              </div>
              <p className="text-sm font-semibold text-zinc-200 ml-10">
                Free Plan
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5"></div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                navigate("/pricing");
                onClose();
              }}
              className="flex-1 px-4 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold transition-all hover:shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:scale-[1.02] flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <FiZap size={14} />
              Upgrade
            </button>
            <button
              onClick={handleLogoutClick}
              className="flex-1 px-4 py-3 rounded-xl font-semibold transition-all hover:bg-red-500/10 text-red-400 border border-red-500/20 hover:scale-[1.02] flex items-center justify-center gap-2 text-xs uppercase tracking-wider bg-transparent"
            >
              <FiLogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
