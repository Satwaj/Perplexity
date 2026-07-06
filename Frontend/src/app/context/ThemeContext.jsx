import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Lock to permanent light aesthetic theme (isDark = false)
  const isDark = false;

  const toggleTheme = () => {
    // Permanent theme, toggling is disabled
  };

  const theme = {
    isDark,
    toggleTheme,
    bg: {
      primary: "bg-[#F9F9F7]", // Premium warm paper off-white
      secondary: "bg-[#F1F1EF]", // Creamier light gray
      tertiary: "bg-[#E6E6E3]", // Slightly darker cream overlay
      card: "bg-white/80 backdrop-blur-md", // Soft frosted light panel
    },
    text: {
      primary: "text-[#1A1C1B]", // High-contrast warm charcoal
      secondary: "text-[#536255]", // Soft botanical gray-green
      tertiary: "text-[#7E7576]", // Clean muted gray
      accent: "text-[#008080]", // Muted aesthetic teal
    },
    border: {
      primary: "border-[#E2E3E1]", // Clean subtle outline
      secondary: "border-[#CFC4C5]", // Stronger border
      accent: "border-[#008080]/30", // Glow-aligned border
    },
    button: {
      primary: "bg-[#1A1C1B] hover:bg-[#3C4A3E] text-white transition-all duration-300", // Solid charcoal
      secondary: "bg-[#F1F1EF] border border-[#E2E3E1] hover:bg-[#E6E6E3] text-[#1A1C1B] transition-all duration-300",
      accent: "bg-[#008080] hover:bg-[#006666] text-white transition-all duration-300", // Teal primary
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
