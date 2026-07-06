import React, { useState, useEffect, useRef } from "react";
import { FiCopy, FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { GiSwordman } from "react-icons/gi";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatProgressLoader } from "./ChatProgressLoader";
import { useVoice } from "../../battle/hooks/useVoice";

// Add arena promotion animation
const arenaPromotionStyles = `
  @keyframes slide-in-out {
    0% { transform: translateX(-100%); opacity: 0; }
    10% { transform: translateX(0); opacity: 1; }
    90% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }
  .arena-slide {
    animation: slide-in-out 5s ease-in-out infinite;
  }
  @keyframes pulse-subtle {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  .arena-icon-pulse {
    animation: pulse-subtle 2s ease-in-out infinite;
  }
`;

const ChatMessageArea = ({ messages = [] }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [likedMessages, setLikedMessages] = useState(new Set());
  const [dislikedMessages, setDislikedMessages] = useState(new Set());
  const isLoading = useSelector((state) => state.chat.isLoading);
  const { speak, isSpeaking, stopSpeaking, supported } = useVoice();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleLike = (index) => {
    const newLiked = new Set(likedMessages);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
      setDislikedMessages((prev) => {
        const newDisliked = new Set(prev);
        newDisliked.delete(index);
        return newDisliked;
      });
    }
    setLikedMessages(newLiked);
  };

  const handleDislike = (index) => {
    const newDisliked = new Set(dislikedMessages);
    if (newDisliked.has(index)) {
      newDisliked.delete(index);
    } else {
      newDisliked.add(index);
      setLikedMessages((prev) => {
        const newLiked = new Set(prev);
        newLiked.delete(index);
        return newLiked;
      });
    }
    setDislikedMessages(newDisliked);
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
          className={`${theme.isDark ? "bg-gray-800" : "bg-gray-200"} ${theme.isDark ? "text-gray-100" : "text-gray-800"} px-2 py-1 rounded text-sm font-mono`}
          {...props}
        />
      ) : (
        <code
          className={`${theme.isDark ? "bg-gray-800" : "bg-gray-100"} ${theme.text.primary} block p-3 rounded-lg overflow-x-auto text-sm font-mono mb-2 scrollbar-hide`}
          {...props}
        />
      ),
    pre: ({ node, ...props }) => (
      <pre
        className={`${theme.isDark ? "bg-gray-800" : "bg-gray-100"} p-3 rounded-lg overflow-x-auto mb-2 scrollbar-hide`}
        {...props}
      />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        className={`${theme.isDark ? "border-l-gray-600 bg-gray-900" : "border-l-gray-400 bg-gray-50"} border-l-4 pl-4 py-2 my-2 rounded`}
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
      <a className="text-gray-300 hover:underline" {...props} />
    ),
    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
    em: ({ node, ...props }) => <em className="italic" {...props} />,
  };

  if (messages.length === 0) {
    return (
      <div className="h-full max-w-2xl mx-auto flex flex-col justify-center py-10 px-6">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#008080] bg-[#008080]/10 px-2.5 py-1 border border-[#008080]/20 w-fit">
          Chat Mode
        </span>
        
        <h1 className="text-4xl md:text-6xl font-serif-brutalist font-bold text-[#1A1C1B] leading-[1.1] my-6 tracking-tight">
          How can I help you today?
        </h1>
        
        <div className="w-20 border-b-2 border-black mb-8"></div>

        <p className="text-base text-[#536255] max-w-lg mb-8 leading-relaxed font-semibold">
          Ask questions, analyze concepts, draft code, or brainstorm ideas with the AI Assistant inside a clean neobrutalist frame.
        </p>

        <button
          onClick={() => {
            document.querySelector("textarea")?.focus();
          }}
          className="w-fit cursor-pointer border-2 border-[#1A1C1B] bg-[#1A1C1B] text-white font-extrabold px-8 py-3.5 shadow-[4px_4px_0px_0px_#C5A880] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#C5A880] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#C5A880] transition-all text-sm uppercase tracking-wider"
        >
          Type Message Below
        </button>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 md:px-6 py-6 md:py-10 scrollbar-hide"
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {messages.map((message, index) => (
          <div key={index}>
            {message.sender === "user" ? (
              /* User Message */
              <div className="flex justify-end gap-3 animate-fade-in">
                <div className="max-w-xl">
                  <div className="border-2 border-[#1A1C1B] bg-[#F1F1EF] p-4 text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B] text-sm font-semibold">
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-black bg-[#C5A880] flex items-center justify-center font-bold text-xs text-[#1A1C1B] shrink-0">
                  U
                </div>
              </div>
            ) : (
              /* Assistant Message */
              <div className="flex justify-start gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-full border-2 border-black bg-[#1A1C1B] flex items-center justify-center font-bold text-xs text-white shrink-0">
                  A
                </div>
                <div className="max-w-2xl flex-1">
                  <div className="card-brutalist bg-white p-5 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b-2 border-[#1A1C1B]">
                      <div className="border-2 border-[#1A1C1B] bg-[#F1F1EF] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#1A1C1B]">
                        AI ASSISTANT
                      </div>
                      {supported.synthesis && (
                        <button
                          onClick={() => {
                            if (isSpeaking) {
                              stopSpeaking();
                            } else {
                              speak(message.text);
                            }
                          }}
                          className={`p-1.5 border-2 border-transparent hover:border-[#1A1C1B] hover:bg-[#F1F1EF] transition-all cursor-pointer shrink-0 ${
                            isSpeaking ? "bg-[#008080]/15 text-[#008080]" : "text-[#536255] hover:text-[#1A1C1B]"
                          }`}
                          title={isSpeaking ? "Stop speaking" : "Speak answer"}
                        >
                          <span className="text-base select-none">🔊</span>
                        </button>
                      )}
                    </div>
                    {/* Text Markdown */}
                    <div className="prose prose-sm max-w-none text-[#1A1C1B] text-sm font-semibold">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Show Progress Loader When Loading */}
        {isLoading && <ChatProgressLoader />}
      </div>
    </div>
  );
};

export default ChatMessageArea;
