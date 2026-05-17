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
      primary: isDark ? "bg-gray-900" : "bg-gray-50",
      secondary: isDark ? "bg-gray-800" : "bg-white",
      tertiary: isDark ? "bg-gray-700" : "bg-gray-100",
    },
    text: {
      primary: isDark ? "text-gray-50" : "text-gray-900",
      secondary: isDark ? "text-gray-300" : "text-gray-700",
      tertiary: isDark ? "text-gray-400" : "text-gray-600",
    },
    border: {
      primary: isDark ? "border-gray-700" : "border-gray-200",
      secondary: isDark ? "border-gray-600" : "border-gray-100",
    },
    button: {
      primary: isDark
        ? "bg-gray-700 hover:bg-gray-600"
        : "bg-gray-800 hover:bg-gray-900",
      secondary: isDark
        ? "bg-gray-700 hover:bg-gray-600"
        : "bg-white border border-gray-200 hover:bg-gray-100",
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
