import React, { useState, useEffect, useRef } from "react";
import { FiCopy, FiThumbsUp, FiThumbsDown, FiVolume2, FiVolumeX, FiCheck, FiArrowRight } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatProgressLoader } from "./ChatProgressLoader";
import { useVoice } from "../../battle/hooks/useVoice";

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

  // Safe React textarea value state injector
  const handleSuggestionClick = (text) => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.value = text;
      const nativeValueSetter = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        "value"
      ).set;
      nativeValueSetter.call(textarea, text);
      
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      textarea.dispatchEvent(new Event("change", { bubbles: true }));
      textarea.focus();
    }
  };

  const suggestions = [
    "Optimize a recursive Fibonacci generator in Python.",
    "Explain quantum computing in simple terms.",
    "Draft a clean Express.js boilerplate server.",
    "How does socket.io state management operate?"
  ];

  const markdownComponents = {
    h1: ({ node, ...props }) => (
      <h1
        className="text-2xl font-bold text-white mt-5 mb-3"
        {...props}
      />
    ),
    h2: ({ node, ...props }) => (
      <h2
        className="text-xl font-bold text-white mt-4 mb-2.5"
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className="text-lg font-bold text-white mt-3.5 mb-2"
        {...props}
      />
    ),
    p: ({ node, ...props }) => (
      <p className="text-zinc-300 mb-3 leading-relaxed" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul
        className="list-disc list-inside text-zinc-355 space-y-1.5 mb-4 pl-2"
        {...props}
      />
    ),
    ol: ({ node, ...props }) => (
      <ol
        className="list-decimal list-inside text-zinc-355 space-y-1.5 mb-4 pl-2"
        {...props}
      />
    ),
    li: ({ node, ...props }) => (
      <li className="text-zinc-300 mb-0.5" {...props} />
    ),
    code: ({ node, inline, ...props }) =>
      inline ? (
        <code
          className="bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded-lg text-xs font-mono-geist border border-white/[0.04]"
          {...props}
        />
      ) : (
        <code
          className="bg-zinc-950/70 text-zinc-200 block p-4 rounded-xl overflow-x-auto text-xs font-mono-geist border border-white/[0.04] mb-3 scrollbar-hide leading-relaxed"
          {...props}
        />
      ),
    pre: ({ node, ...props }) => (
      <pre
        className="bg-zinc-950/40 rounded-xl overflow-hidden mb-3 scrollbar-hide"
        {...props}
      />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-2 border-violet-500/50 bg-zinc-950/30 pl-4 py-2.5 my-3 rounded-r-xl text-zinc-400 italic font-medium"
        {...props}
      />
    ),
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto mb-4 rounded-xl border border-white/5">
        <table
          className="w-full border-collapse bg-zinc-950/20 text-sm"
          {...props}
        />
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead
        className="bg-zinc-900/60 border-b border-white/5"
        {...props}
      />
    ),
    tbody: ({ node, ...props }) => <tbody {...props} />,
    tr: ({ node, ...props }) => (
      <tr
        className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.01] transition-colors"
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td className="px-4 py-3 text-zinc-300 font-medium" {...props} />
    ),
    th: ({ node, ...props }) => (
      <th
        className="px-4 py-3 text-left font-semibold text-white"
        {...props}
      />
    ),
    a: ({ node, ...props }) => (
      <a className="text-violet-400 hover:text-violet-300 hover:underline underline-offset-4 transition-colors" {...props} />
    ),
    strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />,
    em: ({ node, ...props }) => <em className="italic text-zinc-200" {...props} />,
  };

  if (messages.length === 0) {
    return (
      <div className="h-full max-w-2xl mx-auto flex flex-col justify-center py-10 px-6 select-none">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20 w-fit">
          Chat Mode
        </span>
        
        <h1 className="text-4xl md:text-5xl font-serif-brutalist font-bold text-white leading-[1.15] my-6 tracking-tight text-glow-gradient">
          How can I help you today?
        </h1>
        
        <div className="w-12 h-0.5 bg-violet-500/50 mb-8 rounded"></div>

        <p className="text-sm text-zinc-400 max-w-lg mb-8 leading-relaxed font-semibold">
          Ask questions, analyze concepts, draft code, or brainstorm ideas with the AI Assistant inside a clean, high-fidelity workspace.
        </p>

        {/* Dynamic suggestion grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionClick(sug)}
              className="bg-zinc-900/40 hover:bg-zinc-900/80 border border-white/5 hover:border-violet-500/20 rounded-xl p-4 text-left transition-all text-xs font-semibold text-zinc-400 hover:text-white flex justify-between items-center group cursor-pointer"
            >
              <span className="truncate pr-3">{sug}</span>
              <FiArrowRight size={13} className="text-zinc-600 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>
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
              <div className="flex justify-end gap-3.5 animate-fade-in">
                <div className="max-w-xl">
                  <div className="border border-white/5 bg-zinc-900/60 p-4 rounded-2xl text-zinc-200 text-sm font-medium shadow-md">
                    <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-xl border border-violet-500/20 bg-violet-600/10 flex items-center justify-center font-bold text-xs text-violet-400 shrink-0 select-none">
                  U
                </div>
              </div>
            ) : (
              <div className="flex justify-start gap-3.5 animate-fade-in">
                <div className="w-8 h-8 rounded-xl border border-white/10 bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-300 shrink-0 select-none">
                  A
                </div>
                <div className="max-w-2xl flex-1">
                  <div className="bg-zinc-900/30 border border-white/[0.06] rounded-2xl p-5 space-y-4 shadow-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/5 select-none">
                      <div className="border border-white/10 bg-zinc-800/50 px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wider text-zinc-400">
                        AI ASSISTANT
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* High-visibility Audio Synthesis Button */}
                        {supported.synthesis && (
                          <button
                            onClick={() => {
                              if (isSpeaking) {
                                stopSpeaking();
                              } else {
                                speak(message.text);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer shrink-0 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase ${
                              isSpeaking 
                                ? "bg-violet-500/15 border-violet-500/30 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]" 
                                : "bg-zinc-800/60 border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800"
                            }`}
                            title={isSpeaking ? "Stop speaking" : "Listen to reply"}
                          >
                            {isSpeaking ? (
                              <FiVolumeX size={16} className="text-violet-400" />
                            ) : (
                              <FiVolume2 size={16} />
                            )}
                            <span>{isSpeaking ? "STOP" : "LISTEN"}</span>
                          </button>
                        )}

                        {/* Copy Action Button */}
                        <button
                          onClick={() => handleCopy(message.text, index)}
                          className="p-2 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 text-zinc-550 hover:text-white transition-all cursor-pointer shrink-0"
                          title="Copy reply"
                        >
                          {copiedIndex === index ? (
                            <FiCheck size={15} className="text-emerald-400" />
                          ) : (
                            <FiCopy size={15} />
                          )}
                        </button>

                        {/* Likes/Dislikes Action Buttons */}
                        <button
                          onClick={() => handleLike(index)}
                          className={`p-2 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 transition-all cursor-pointer shrink-0 ${
                            likedMessages.has(index) ? "text-violet-400 bg-violet-500/10 border-violet-500/20" : "text-zinc-500 hover:text-white"
                          }`}
                        >
                          <FiThumbsUp size={14} />
                        </button>
                        
                        <button
                          onClick={() => handleDislike(index)}
                          className={`p-2 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 transition-all cursor-pointer shrink-0 ${
                            dislikedMessages.has(index) ? "text-red-400 bg-red-500/10 border-red-500/20" : "text-zinc-500 hover:text-white"
                          }`}
                        >
                          <FiThumbsDown size={14} />
                        </button>
                      </div>
                    </div>
                    {/* Text Markdown */}
                    <div className="prose prose-sm max-w-none text-zinc-200 text-sm font-medium leading-relaxed">
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
