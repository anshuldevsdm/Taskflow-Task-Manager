import { useEffect } from "react";

export const useKeyboardShortcuts = ({ onEscape, onSearchShortcut }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onEscape?.();

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onSearchShortcut?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onEscape, onSearchShortcut]);
};
