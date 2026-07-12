import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Lock to permanent dark aesthetic theme (isDark = true)
  const isDark = true;

  const toggleTheme = () => {
    // Permanent theme, toggling is disabled
  };

  const theme = {
    isDark,
    toggleTheme,
    bg: {
      primary: "bg-[#09090b]", // Dark charcoal background
      secondary: "bg-[#121214]", // Sleek panel background
      tertiary: "bg-[#1e1e24]", // Dropdown and popup background
      card: "bg-zinc-900/60 backdrop-blur-lg border border-white/[0.06]", // Soft frosted dark panel
    },
    text: {
      primary: "text-[#f4f4f5]", // High-contrast clean off-white
      secondary: "text-[#a1a1aa]", // Soft slate gray
      tertiary: "text-[#71717a]", // Muted gray
      accent: "text-[#8b5cf6]", // Modern violet accent
    },
    border: {
      primary: "border-white/10", // Ultra-thin clean line
      secondary: "border-white/20", // Defined borders
      accent: "border-[#8b5cf6]/30", // Violet accent border
    },
    button: {
      primary: "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white transition-all duration-300 shadow-[0_4px_20px_rgba(139,92,246,0.15)]", // Violet primary
      secondary: "bg-[#18181b] border border-white/10 hover:bg-zinc-800 text-zinc-100 transition-all duration-300",
      accent: "bg-[#06b6d4] hover:bg-[#0891b2] text-white transition-all duration-300", // Cyan secondary accent
    },
  };

  return (
    <ThemeContext.Provider value={{ ...theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
