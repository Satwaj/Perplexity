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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`${
          theme.isDark
            ? "bg-linear-to-br from-gray-950 via-gray-900 to-gray-950"
            : "bg-linear-to-br from-stone-50 via-stone-100 to-stone-50"
        } rounded-2xl shadow-2xl w-96 ${theme.border.primary} border transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 ${
            theme.isDark
              ? "bg-linear-to-r from-gray-900 to-gray-800 border-gray-700"
              : "bg-linear-to-r from-stone-100 to-stone-50 border-stone-200"
          } ${theme.border.primary} border-b rounded-t-2xl`}
        >
          <h2 className={`text-xl font-bold ${theme.text.primary}`}>
            Profile Details
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg ${
              theme.isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
            } transition-all hover:scale-110`}
          >
            <FiX size={20} className={theme.text.secondary} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* User Avatar and Name */}
          <div className="flex items-center gap-4">
            <div
              className={`w-20 h-20 rounded-full ${
                theme.isDark
                  ? "bg-linear-to-br from-gray-700 to-gray-800 shadow-lg"
                  : "bg-linear-to-br from-stone-300 to-stone-400 shadow-md"
              } flex items-center justify-center ${
                theme.isDark ? "text-gray-50" : "text-stone-900"
              } font-bold text-3xl border-2 ${theme.border.primary}`}
            >
              {user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <p className={`text-lg font-semibold ${theme.text.primary}`}>
                {user?.username || "User"}
              </p>
              <p className={`text-sm ${theme.text.tertiary} mt-1`}>
                {user?.email || "No email"}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className={`h-px ${theme.isDark ? "bg-gray-700" : "bg-stone-300"}`}
          ></div>

          {/* User Details */}
          <div className="space-y-3">
            <div
              className={`p-4 rounded-xl transition-all ${
                theme.isDark
                  ? "bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700"
                  : "bg-stone-100/50 hover:bg-stone-100/80 border border-stone-300"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-lg ${
                    theme.isDark ? "bg-gray-700" : "bg-stone-200"
                  }`}
                >
                  <FiUser size={16} className={theme.text.secondary} />
                </div>
                <span
                  className={`text-xs font-semibold ${theme.text.tertiary} uppercase tracking-wide`}
                >
                  Username
                </span>
              </div>
              <p className={`text-sm font-medium ${theme.text.primary} ml-11`}>
                {user?.username || "N/A"}
              </p>
            </div>

            <div
              className={`p-4 rounded-xl transition-all ${
                theme.isDark
                  ? "bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700"
                  : "bg-stone-100/50 hover:bg-stone-100/80 border border-stone-300"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-lg ${
                    theme.isDark ? "bg-gray-700" : "bg-stone-200"
                  }`}
                >
                  <FiMail size={16} className={theme.text.secondary} />
                </div>
                <span
                  className={`text-xs font-semibold ${theme.text.tertiary} uppercase tracking-wide`}
                >
                  Email
                </span>
              </div>
              <p className={`text-sm font-medium ${theme.text.primary} ml-11`}>
                {user?.email || "N/A"}
              </p>
            </div>

            <div
              className={`p-4 rounded-xl transition-all ${
                theme.isDark
                  ? "bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700"
                  : "bg-stone-100/50 hover:bg-stone-100/80 border border-stone-300"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <FiZap size={16} className="text-yellow-500" />
                </div>
                <span
                  className={`text-xs font-semibold ${theme.text.tertiary} uppercase tracking-wide`}
                >
                  Plan
                </span>
              </div>
              <p className={`text-sm font-medium ${theme.text.primary} ml-11`}>
                Free Plan
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className={`h-px ${theme.isDark ? "bg-gray-700" : "bg-stone-300"}`}
          ></div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => navigate("/pricing")}
              className={`flex-1 px-4 py-3 ${theme.button.primary} text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-95 flex items-center justify-center gap-2 ${
                theme.isDark
                  ? "hover:shadow-gray-900/50"
                  : "hover:shadow-stone-400/50"
              }`}
            >
              <FiZap size={16} />
              Upgrade
            </button>
            <button
              onClick={handleLogoutClick}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all hover:scale-95 flex items-center justify-center gap-2 ${
                theme.isDark
                  ? "bg-red-900/50 hover:bg-red-900 text-red-200 border border-red-800"
                  : "bg-red-100/50 hover:bg-red-200 text-red-700 border border-red-300"
              }`}
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
