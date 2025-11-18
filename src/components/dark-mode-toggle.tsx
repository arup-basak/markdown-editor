"use client";

import { useDarkMode } from "@/hooks/use-theme";
import * as Switch from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <Switch.Root checked={isDarkMode} onCheckedChange={toggleDarkMode}>
        <Switch.Thumb>
          {isDarkMode ? (
            <Moon className="h-3 w-3" />
          ) : (
            <Sun className="h-3 w-3" />
          )}
        </Switch.Thumb>
      </Switch.Root>
    </div>
  );
}
