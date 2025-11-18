"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/state/store";
import { useDocument } from "@/lib/queries";
import { markdownToHtml } from "@/lib/markdown";
import { motion } from "motion/react";

export default function Preview({
  onHtml,
}: {
  onHtml: (html: string) => void;
}) {
  const { currentDocId, ui, localContent } = useStore();
  const { data: doc } = useDocument(currentDocId);
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let active = true;
    const render = async () => {
      // Use localContent for real-time updates while typing, fall back to doc.content
      // localContent is synced with doc.content when document changes, so it's always current
      const raw = currentDocId && localContent !== undefined ? localContent : (doc?.content || "");
      const result = await markdownToHtml(raw, { theme: ui.theme });
      if (!active) return;
      setHtml(result);
      onHtml(result);
    };
    render();
    return () => {
      active = false;
    };
  }, [localContent, doc?.content, currentDocId, ui.theme, onHtml]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`prose prose-zinc mx-auto h-full w-full overflow-auto px-8 py-6 dark:prose-invert ${
        ui.fontFamily === "serif"
          ? "font-serif"
          : ui.fontFamily === "mono"
          ? "font-mono"
          : "font-sans"
      }`}
    >
      {doc ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : null}
    </motion.div>
  );
}
