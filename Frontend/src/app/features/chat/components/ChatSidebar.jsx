import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  FiPlus,
  FiMessageSquare,
  FiFolder,
  FiBox,
  FiTool,
  FiSettings,
  FiChevronRight,
  FiTrash2,
  FiZap,
} from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import { useChat } from "../hooks/useChat";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import UserDetailsModal from "./UserDetailsModal";

const ChatSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const { user } = useSelector((state) => state.auth || {});
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    chats,
    handleGetChats,
    handleOpenChat,
    handleSendmessage,
    handleDeleteChat,
  } = useChat();

  useEffect(() => {
    // Fetch chats when component mounts
    handleGetChats();
  }, []);

  const openChat = (chatId) => {
    handleOpenChat(chatId, chats);
  };

  const createNewChat = () => {
    handleSendmessage({ message: "Hello!", chatId: null });
  };

  const navigationItems = [
    { icon: <FiMessageSquare size={20} />, label: "Chats" },
    { icon: <FiFolder size={20} />, label: "Projects" },
    { icon: <FiBox size={20} />, label: "Artifacts" },
    { icon: <FiTool size={20} />, label: "Tools" },
    { icon: <FiSettings size={20} />, label: "Settings" },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-screen ${theme.bg.primary} ${theme.border.primary} border-r flex flex-col transition-all duration-300 relative overflow-y-auto scrollbar-hide`}
    >
      {/* Header */}
      <div
        className={`p-5 ${theme.border.primary} border-b transition-colors duration-200`}
      >
        <div className="flex items-center gap-3 mb-3">
          <img
            src="/blinkly-logo.svg"
            alt="Blinkly Logo"
            className="w-8 h-8 rounded-lg"
          />
          {!isCollapsed && (
            <h2 className={`text-lg font-bold ${theme.text.primary}`}>
              Blinkly
            </h2>
          )}
        </div>
        <button
          onClick={createNewChat}
          className={`w-full px-3 py-2 ${theme.button.primary} cursor-pointer hover:scale-95 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:shadow-md`}
        >
          <FiPlus size={18} />
          {!isCollapsed && <span>New Chat</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        {navigationItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center gap-3 px-3 py-2 ${theme.text.secondary} rounded-lg transition-colors ${theme.isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
          >
            <span className={theme.text.tertiary}>{item.icon}</span>
            {!isCollapsed && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </a>
        ))}
      </nav>

      {/* Recent Chats */}
      {!isCollapsed && (
        <div
          className={`px-3 py-4 ${theme.border.primary} border-t max-h-64 overflow-y-auto transition-colors duration-200 scrollbar-hide`}
        >
          <h3
            className={`text-xs font-semibold ${theme.text.tertiary} uppercase mb-3 px-2`}
          >
            Recent Chats
          </h3>
          <div className="space-y-2">
            {chats && Object.values(chats).length > 0 ? (
              Object.values(chats).map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center gap-2 px-2 py-2 cursor-pointer text-sm rounded-lg transition-colors group ${
                    currentChatId === chat.id
                      ? theme.isDark
                        ? "bg-gray-800 border-l-2 border-l-gray-500"
                        : "bg-gray-200 border-l-2 border-l-gray-600"
                      : theme.isDark
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-200"
                  }`}
                >
                  <button
                    onClick={() => openChat(chat.id)}
                    className="flex-1 text-left"
                  >
                    <p
                      className={`${theme.text.secondary} truncate font-medium`}
                    >
                      {chat.title}
                    </p>
                    <p className={`text-xs ${theme.text.tertiary}`}>
                      {chat.lastUpdated}
                    </p>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                      theme.isDark ? "hover:bg-gray-600" : "hover:bg-black-500"
                    }`}
                    title="Delete chat"
                  >
                    <FiTrash2 size={16} className="text-red-500" />
                  </button>
                </div>
              ))
            ) : (
              <p className={`text-xs ${theme.text.tertiary} px-2`}>
                No chats yet. Start a conversation!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Upgrade to Pro */}
      {!isCollapsed && (
        <div
          className={`mx-3 mb-3 p-4 ${theme.bg.secondary} ${theme.border.primary} border rounded-lg cursor-pointer hover:scale-95 transition-all`}
          onClick={() => navigate("/pricing")}
        >
          <div className="flex items-start gap-3">
            <FiZap className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
            <div className="flex-1">
              <p className={`text-sm font-bold ${theme.text.primary}`}>
                Upgrade to Pro
              </p>
              <p className={`text-xs ${theme.text.tertiary} mt-1`}>
                Unlock unlimited chats & features
              </p>
            </div>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div
        className={`p-3 ${theme.border.primary} border-t transition-colors duration-200`}
      >
        <button
          onClick={() => setShowUserModal(true)}
          className={`w-full flex items-center gap-3 px-2 py-2 ${theme.isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"} rounded-lg cursor-pointer transition-colors`}
        >
          <div
            className={`w-9 h-9 rounded-full ${theme.isDark ? "bg-gray-700" : "bg-gray-300"} flex items-center justify-center ${theme.isDark ? "text-gray-50" : "text-gray-900"} font-bold text-sm`}
          >
            {user?.email?.[0]?.toUpperCase() || "S"}
          </div>
          {!isCollapsed && (
            <div className="flex-1 text-left">
              <p className={`text-sm font-medium ${theme.text.primary}`}>
                {user?.email?.split("@")[0] || "User"}
              </p>
              <p className={`text-xs ${theme.text.tertiary}`}>Free Plan</p>
            </div>
          )}
        </button>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        user={user}
      />

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 ${theme.isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-700 hover:bg-gray-800"} text-white rounded-full flex items-center justify-center transition-all shadow-lg`}
      >
        <FiChevronRight size={14} className={isCollapsed ? "rotate-180" : ""} />
      </button>
    </div>
  );
};

export default ChatSidebar;
