"use client";
import { useStore } from "@/state/store";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { exportToDOCXFromHtml, exportToPDFClient } from "@/lib/export";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Check } from "lucide-react";

type TopBarProps = {
  currentHtml: string;
};

export default function TopBar({ currentHtml }: TopBarProps) {
  const { ui, setTheme, setPageSize, setOrientation, setFontFamily } = useStore();

  const fontFamilyClass = useMemo(() => {
    if (ui.fontFamily === "serif") return "font-serif";
    if (ui.fontFamily === "mono") return "font-mono";
    return "font-sans";
  }, [ui.fontFamily]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`flex items-center gap-3 border-b border-border bg-background p-2 ${fontFamilyClass}`}
    >
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-8 w-auto rounded-full px-3">
              <span className="font-medium">{ui.pageSize}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[120px]">
            {["A4", "Letter"].map((size) => (
              <DropdownMenuItem
                key={size}
                onSelect={() => setPageSize(size as any)}
                className="flex items-center justify-between"
              >
                <span>{size}</span>
                {ui.pageSize === size && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-8 w-auto rounded-full px-3">
              <span className="font-medium capitalize">{ui.orientation}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[140px]">
            {["portrait", "landscape"].map((orientation) => (
              <DropdownMenuItem
                key={orientation}
                onSelect={() => setOrientation(orientation as any)}
                className="flex items-center justify-between"
              >
                <span className="capitalize">{orientation}</span>
                {ui.orientation === orientation && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-8 w-auto rounded-full px-3">
              <span className="font-medium capitalize">{ui.fontFamily}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[140px]">
            {["system", "serif", "mono"].map((font) => (
              <DropdownMenuItem
                key={font}
                onSelect={() => setFontFamily(font as any)}
                className="flex items-center justify-between"
              >
                <span className="capitalize">{font}</span>
                {ui.fontFamily === font && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-8 w-auto rounded-full px-3">
              <span className="font-medium capitalize">{ui.theme}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[120px]">
            {["light", "dark", "sepia"].map((theme) => (
              <DropdownMenuItem
                key={theme}
                onSelect={() => setTheme(theme as any)}
                className="flex items-center justify-between"
              >
                <span className="capitalize">{theme}</span>
                {ui.theme === theme && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button
          type="button"
          onClick={() => exportToPDFClient()}
        >
          Export PDF
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => exportToDOCXFromHtml(currentHtml)}
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-1" /> DOCX
        </Button>
      </div>
    </motion.header>
  );
}

