"use client";
import { useEffect, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { EditorView, keymap } from "@codemirror/view";
import { useStore } from "@/state/store";
import { motion } from "framer-motion";

// Hyperlink autocomplete provider
const linkAutocomplete = autocompletion({
  override: [
    (context) => {
      const word = context.matchBefore(/\[([^\]]*)$/);
      if (!word) return null;
      return {
        from: word.from,
        options: [
          { label: "https://", type: "text", info: "External link" },
          { label: "http://", type: "text", info: "External link" },
          { label: "mailto:", type: "text", info: "Email link" },
          { label: "#", type: "text", info: "Anchor link" },
        ],
      };
    },
    (context) => {
      const word = context.matchBefore(/\(([^)]*)$/);
      if (!word) return null;
      const before = context.state.doc.sliceString(Math.max(0, word.from - 10), word.from);
      if (before.includes("](")) {
        return {
          from: word.from,
          options: [
            { label: "https://example.com", type: "text", info: "Complete URL" },
            { label: "http://example.com", type: "text", info: "Complete URL" },
            { label: "mailto:example@email.com", type: "text", info: "Email link" },
            { label: "#anchor", type: "text", info: "Anchor link" },
          ],
        };
      }
      return null;
    },
  ],
});

// Clickable links extension
const clickableLinks = EditorView.domEventHandlers({
  click(event, view) {
    const pos = view.posAtCoords({ x: event.clientX, y: event.clientY });
    if (pos === null) return false;
    
    const line = view.state.doc.lineAt(pos);
    const text = line.text;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(text)) !== null) {
      const start = line.from + match.index;
      const end = line.from + match.index + match[0].length;
      if (pos >= start && pos <= end) {
        const url = match[2];
        if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")) {
          window.open(url, "_blank", "noopener,noreferrer");
          return true;
        }
      }
    }
    return false;
  },
});

export default function Editor({ className }: { className?: string }) {
  const { docs, currentDocId, updateContent, saveNow, ui } = useStore();
  const doc = useMemo(() => docs.find((d) => d.id === currentDocId) || null, [docs, currentDocId]);

  useEffect(() => {
    const onBeforeUnload = () => {
      if (doc) saveNow(doc.id);
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [doc, saveNow]);

  if (!doc) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 text-sm text-muted-foreground"
      >
        No document selected.
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`h-full w-full overflow-auto ${
        ui.fontFamily === "mono" ? "font-mono" : ui.fontFamily === "serif" ? "font-serif" : "font-sans"
      } ${className || ""}`}
    >
      <CodeMirror
        value={doc.content}
        height="100%"
        basicSetup={{ lineNumbers: true }}
        extensions={[
          ...(doc.type === "markdown" ? [markdown(), linkAutocomplete, clickableLinks] : []),
          keymap.of(completionKeymap),
        ]}
        theme={ui.theme === "dark" ? "dark" : "light"}
        onChange={(value) => updateContent(doc.id, value)}
        onBlur={() => saveNow(doc.id)}
        className={className}
      />
    </motion.div>
  );
}
