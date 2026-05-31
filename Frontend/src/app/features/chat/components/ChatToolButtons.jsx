import React from "react";
import {
  FiCode,
  FiEdit,
  FiBook,
  FiBarChart2,
  FiImage,
  FiSearch,
} from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";

const ChatToolButtons = ({ selectedTools, onToolSelect }) => {
  const theme = useTheme();

  const tools = [
    {
      id: "code",
      icon: <FiCode size={24} />,
      label: "Code",
      description: "Write and debug code",
    },
    {
      id: "write",
      icon: <FiEdit size={24} />,
      label: "Write",
      description: "Create content and drafts",
    },
    {
      id: "learn",
      icon: <FiBook size={24} />,
      label: "Learn",
      description: "Explore new topics",
    },
    {
      id: "analyze",
      icon: <FiBarChart2 size={24} />,
      label: "Analyze",
      description: "Analyze data and insights",
    },
    {
      id: "create",
      icon: <FiImage size={24} />,
      label: "Create",
      description: "Generate images and more",
    },
    {
      id: "research",
      icon: <FiSearch size={24} />,
      label: "Research",
      description: "Deep dive into any topic",
    },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onToolSelect(tool.id)}
          className={`p-2 md:p-3 rounded-lg border-2 transition-all transform hover:-translate-y-1 ${
            selectedTools.includes(tool.id)
              ? `${theme.button.primary} border-${theme.isDark ? "gray-700" : "gray-800"} text-white shadow-md`
              : `${theme.bg.secondary} ${theme.border.primary} border-2 ${theme.text.secondary} ${theme.isDark ? "hover:border-gray-600 hover:bg-gray-700" : "hover:border-gray-400 hover:bg-stone-100"}`
          }`}
          title={tool.description}
        >
          <div className="flex flex-col items-center gap-0.5 md:gap-1">
            <span
              className={
                selectedTools.includes(tool.id)
                  ? "text-white"
                  : theme.text.secondary
              }
            >
              {tool.icon}
            </span>
            <span className={`text-xs font-medium ${theme.text.primary}`}>
              {tool.label}
            </span>
            <span
              className={`text-xs hidden md:block ${selectedTools.includes(tool.id) ? "text-white" : theme.text.tertiary}`}
            >
              {tool.description.split(" ")[0]}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChatToolButtons;
