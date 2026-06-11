import React, { useState } from "react";
import {
  FiArrowUp,
  FiGlobe,
  FiVolume2,
  FiUser,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import UserDetailsModal from "./UserDetailsModal";
import blinklyLogo from "../../../../assets/blinkly-logo.svg";

const ChatNavbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth || {});
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <div
      className={`w-full h-16 ${theme.bg.primary} ${theme.border.primary} border-b flex items-center justify-between px-6 transition-colors duration-200`}
    >
      {/* Left Side - Blinkly Logo and Brand */}
      <div className="flex items-center gap-4">
        <img
          src={blinklyLogo}
          alt="Blinkly Logo"
          className="w-10 h-10 rounded-lg"
        />
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 ${theme.bg.secondary} ${theme.border.primary} border rounded-full transition-colors duration-200`}
        >
          <span className="text-lg">⚡</span>
          <span className={`text-sm font-medium ${theme.text.secondary}`}>
            Free Plan - Upgrade for more usage
          </span>
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/pricing")}
          className={`px-4 py-2 ${theme.button.primary} text-white rounded-lg font-medium transition-all hover:shadow-md hover:scale-95 flex items-center gap-2`}
        >
          <FiArrowUp size={16} />
          Upgrade to Pro
        </button>
        <button
          className={`w-9 h-9 rounded-lg ${theme.border.primary} border ${theme.text.tertiary} hover:${theme.bg.tertiary} flex items-center justify-center transition-colors`}
        >
          <FiGlobe size={18} />
        </button>
        <button
          className={`w-9 h-9 rounded-lg ${theme.border.primary} border ${theme.text.tertiary} hover:${theme.bg.tertiary} flex items-center justify-center transition-colors`}
        >
          <FiVolume2 size={18} />
        </button>
        <button
          onClick={() => setShowUserModal(true)}
          className={`w-9 h-9 rounded-lg ${theme.border.primary} border ${theme.text.tertiary} hover:${theme.bg.tertiary} flex items-center justify-center transition-colors hover:scale-95`}
          title="View profile"
        >
          <FiUser size={18} />
        </button>
        {/* Theme Toggle Button */}
        <button
          onClick={theme.toggleTheme}
          className={`w-9 h-9 rounded-lg ${theme.border.primary} border ${theme.text.secondary} hover:${theme.bg.tertiary} flex items-center justify-center transition-colors ml-2`}
          title="Toggle dark mode"
        >
          {theme.isDark ? <FiSun size={18} /> : <FiMoon size={18} />}

          {/* User Details Modal */}
          <UserDetailsModal
            isOpen={showUserModal}
            onClose={() => setShowUserModal(false)}
            user={user}
          />
        </button>
      </div>
    </div>
  );
};

export default ChatNavbar;
