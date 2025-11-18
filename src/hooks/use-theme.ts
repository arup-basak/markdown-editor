"use client";

import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize from localStorage or system preference
  useEffect(() => {
    // Check localStorage first
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      const darkMode = stored === "true";
      setIsDarkMode(darkMode);
      updateDarkModeClass(darkMode);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      updateDarkModeClass(prefersDark);
    }
  }, []);

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    updateDarkModeClass(checked);
    localStorage.setItem("darkMode", checked.toString());
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
}

function updateDarkModeClass(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

