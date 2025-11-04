"use client";
import { useMemo } from "react";
import { useStore } from "@/state/store";

export default function PageStyles() {
  const { ui } = useStore();
  const css = useMemo(() => {
    const size = ui.pageSize === "Letter" ? "8.5in 11in" : "A4";
    const orientation = ui.orientation;
    const margin = "20mm";
    return `@media print { @page { size: ${size} ${orientation}; margin: ${margin}; } }`;
  }, [ui.pageSize, ui.orientation]);
  return <style>{css}</style>;
}

