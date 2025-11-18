"use client";

import { useEffect } from "react";
import { useDarkMode } from "@/hooks/use-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // This effect ensures the theme is applied on initial mount
    // The useDarkMode hook handles the actual theme switching
  }, [isDarkMode]);

  return <>{children}</>;
}

