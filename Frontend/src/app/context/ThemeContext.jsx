import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = {
    isDark,
    toggleTheme,
    bg: {
      primary: isDark ? "bg-black" : "bg-stone-50",
      secondary: isDark ? "bg-gray-950" : "bg-stone-100",
      tertiary: isDark ? "bg-gray-900" : "bg-stone-200",
    },
    text: {
      primary: isDark ? "text-white" : "text-gray-900",
      secondary: isDark ? "text-gray-200" : "text-gray-700",
      tertiary: isDark ? "text-gray-400" : "text-gray-600",
    },
    border: {
      primary: isDark ? "border-gray-800" : "border-gray-200",
      secondary: isDark ? "border-gray-700" : "border-gray-100",
    },
    button: {
      primary: isDark
        ? "bg-gray-800 hover:bg-gray-700"
        : "bg-gray-800 hover:bg-gray-900",
      secondary: isDark
        ? "bg-gray-900 hover:bg-gray-800"
        : "bg-stone-100 border border-gray-200 hover:bg-stone-200",
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
