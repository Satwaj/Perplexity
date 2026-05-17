import React from "react";
import { FiCopy, FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatMessageArea = ({ messages = [] }) => {
  const theme = useTheme();

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Custom markdown components for styling
  const markdownComponents = {
    h1: ({ node, ...props }) => (
      <h1
        className={`text-2xl font-bold ${theme.text.primary} mt-4 mb-2`}
        {...props}
      />
    ),
    h2: ({ node, ...props }) => (
      <h2
        className={`text-xl font-bold ${theme.text.primary} mt-3 mb-2`}
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className={`text-lg font-bold ${theme.text.primary} mt-2 mb-1`}
        {...props}
      />
    ),
    p: ({ node, ...props }) => (
      <p className={`${theme.text.secondary} mb-2`} {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul
        className={`list-disc list-inside ${theme.text.secondary} mb-2`}
        {...props}
      />
    ),
    ol: ({ node, ...props }) => (
      <ol
        className={`list-decimal list-inside ${theme.text.secondary} mb-2`}
        {...props}
      />
    ),
    li: ({ node, ...props }) => (
      <li className={`${theme.text.secondary} mb-1`} {...props} />
    ),
    code: ({ node, inline, ...props }) =>
      inline ? (
        <code
          className={`${theme.isDark ? "bg-gray-600" : "bg-gray-200"} ${theme.isDark ? "text-blue-400" : "text-blue-600"} px-2 py-1 rounded text-sm font-mono`}
          {...props}
        />
      ) : (
        <code
          className={`${theme.isDark ? "bg-gray-800" : "bg-gray-100"} ${theme.text.primary} block p-3 rounded-lg overflow-x-auto text-sm font-mono mb-2`}
          {...props}
        />
      ),
    pre: ({ node, ...props }) => (
      <pre
        className={`${theme.isDark ? "bg-gray-800" : "bg-gray-100"} p-3 rounded-lg overflow-x-auto mb-2`}
        {...props}
      />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        className={`${theme.isDark ? "border-l-blue-400 bg-gray-800" : "border-l-blue-500 bg-blue-50"} border-l-4 pl-4 py-2 my-2 rounded`}
        {...props}
      />
    ),
    table: ({ node, ...props }) => (
      <table
        className={`w-full border-collapse ${theme.isDark ? "bg-gray-800" : "bg-white"} rounded-lg overflow-hidden my-2 border ${theme.isDark ? "border-gray-700" : "border-gray-200"}`}
        {...props}
      />
    ),
    thead: ({ node, ...props }) => (
      <thead
        className={`${theme.isDark ? "bg-gray-700" : "bg-gray-200"}`}
        {...props}
      />
    ),
    tbody: ({ node, ...props }) => <tbody {...props} />,
    tr: ({ node, ...props }) => (
      <tr
        className={`border-b ${theme.isDark ? "border-gray-700" : "border-gray-200"}`}
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td className={`px-4 py-2 ${theme.text.secondary}`} {...props} />
    ),
    th: ({ node, ...props }) => (
      <th
        className={`px-4 py-2 text-left font-bold ${theme.text.primary}`}
        {...props}
      />
    ),
    a: ({ node, ...props }) => (
      <a className="text-blue-500 hover:underline" {...props} />
    ),
    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
    em: ({ node, ...props }) => <em className="italic" {...props} />,
  };

  if (messages.length === 0) {
    return (
      <div
        className={`flex-1 flex flex-col items-center justify-center px-6 py-12 transition-colors duration-200`}
      >
        <div className="text-center max-w-2xl">
          <h1 className={`text-5xl font-bold ${theme.text.primary} mb-4`}>
            Good Evening,{" "}
            <span
              className={
                theme.isDark
                  ? "text-blue-400"
                  : "bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
              }
            >
              Satwaj
            </span>
          </h1>
          <p className={`text-xl ${theme.text.secondary}`}>
            How can I help you today?
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 overflow-y-auto px-6 py-8 transition-colors duration-200`}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-4 animate-fade-in ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar */}
            {message.sender === "assistant" && (
              <div className="flex-shrink-0">
                <div
                  className={`w-9 h-9 rounded-full ${theme.isDark ? "bg-gray-700" : "bg-gray-300"} flex items-center justify-center ${theme.isDark ? "text-gray-50" : "text-gray-900"} font-bold text-lg`}
                >
                  🤖
                </div>
              </div>
            )}

            {/* Message */}
            <div
              className={`max-w-2xl ${message.sender === "user" ? "order-2" : ""}`}
            >
              <div
                className={`px-4 py-3 rounded-2xl transition-colors duration-200 ${
                  message.sender === "user"
                    ? theme.isDark
                      ? "bg-blue-600 text-gray-50"
                      : "bg-gray-800 text-white"
                    : theme.isDark
                      ? "bg-gray-700 text-gray-50"
                      : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.sender === "assistant" ? (
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm font-medium">{message.text}</p>
                )}
              </div>

              {/* Actions */}
              {message.sender === "assistant" && (
                <div className="flex gap-2 mt-2 opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopy(message.text)}
                    className={`p-1.5 rounded-lg ${theme.text.tertiary} transition-colors ${theme.isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                    title="Copy"
                  >
                    <FiCopy size={16} />
                  </button>
                  <button
                    className={`p-1.5 rounded-lg ${theme.text.tertiary} transition-colors ${theme.isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                    title="Like"
                  >
                    <FiThumbsUp size={16} />
                  </button>
                  <button
                    className={`p-1.5 rounded-lg ${theme.text.tertiary} transition-colors ${theme.isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                    title="Dislike"
                  >
                    <FiThumbsDown size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* User Avatar */}
            {message.sender === "user" && (
              <div className="flex-shrink-0">
                <div
                  className={`w-9 h-9 rounded-full ${theme.isDark ? "bg-blue-600" : "bg-gray-700"} flex items-center justify-center ${theme.isDark ? "text-gray-50" : "text-white"} font-bold text-sm`}
                >
                  S
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessageArea;
