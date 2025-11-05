"use client";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/state/store";
import { markdownToHtml } from "@/lib/markdown";
import { latexToHtmlAsync } from "@/lib/latex";
import { motion } from "motion/react";

export default function Preview({
  onHtml,
}: {
  onHtml: (html: string) => void;
}) {
  const { docs, currentDocId, ui } = useStore();
  const doc = useMemo(
    () => docs.find((d) => d.id === currentDocId) || null,
    [docs, currentDocId]
  );
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    if (!doc) {
      setHtml("");
      return;
    }

    let active = true;
    const render = async () => {
      const raw = doc.content || "";
      let result: string;
      try {
        if (doc.type === "latex") {
          result = await latexToHtmlAsync(raw);
        } else {
          result = await markdownToHtml(raw, { theme: ui.theme });
        }
      } catch (error) {
        console.error("Error rendering document:", error);
        result = '<div class="text-red-500">Error rendering document</div>';
      }
      
      if (!active) return;
      setHtml(result);
      // Call onHtml in a separate microtask to avoid state update during render
      Promise.resolve().then(() => {
        if (active) {
          onHtml(result);
        }
      });
    };
    
    render();
    return () => {
      active = false;
    };
  }, [doc?.content, doc?.type, ui.theme, onHtml, doc]);

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
