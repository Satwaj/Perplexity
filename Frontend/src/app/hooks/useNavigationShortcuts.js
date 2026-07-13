import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useNavigationShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in input, textarea, or contentEditable element
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable)
      ) {
        return;
      }

      // Check for Alt key combinations
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        let path = null;
        const key = e.key.toLowerCase();

        if (key === "h" || key === "1") {
          path = "/";
        } else if (key === "a" || key === "2") {
          path = "/arena";
        } else if (key === "c" || key === "3") {
          path = "/chat";
        }

        if (path) {
          e.preventDefault();
          navigate(path);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
};
