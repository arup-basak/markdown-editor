"use client";
import { useStore } from "@/state/store";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { exportToDOCXFromHtml, exportToPDFClient } from "@/lib/export";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
        <Select value={ui.pageSize} onValueChange={(value) => setPageSize(value as any)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A4">A4</SelectItem>
            <SelectItem value="Letter">Letter</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ui.orientation} onValueChange={(value) => setOrientation(value as any)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portrait">Portrait</SelectItem>
            <SelectItem value="landscape">Landscape</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ui.fontFamily} onValueChange={(value) => setFontFamily(value as any)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
            <SelectItem value="mono">Mono</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ui.theme} onValueChange={(value) => setTheme(value as any)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="sepia">Sepia</SelectItem>
          </SelectContent>
        </Select>
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

