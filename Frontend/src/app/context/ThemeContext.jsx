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
      primary: "bg-white",
      secondary: "bg-zinc-50",
      tertiary: "bg-zinc-100",
      card: "bg-white border border-zinc-200 shadow-sm",
    },
    text: {
      primary: "text-black",
      secondary: "text-zinc-700",
      tertiary: "text-zinc-500",
      accent: "text-black",
    },
    border: {
      primary: "border-zinc-200",
      secondary: "border-zinc-300",
      accent: "border-black",
    },
    button: {
      primary: "bg-black hover:bg-zinc-800 text-white transition-all duration-300 shadow-md",
      secondary: "bg-white border border-zinc-300 hover:bg-zinc-50 text-black transition-all duration-300",
      accent: "bg-zinc-900 hover:bg-zinc-800 text-white transition-all duration-300",
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
