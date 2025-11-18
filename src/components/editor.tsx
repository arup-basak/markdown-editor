"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { EditorView, keymap } from "@codemirror/view";
import { useStore } from "@/state/store";
import { useDocument, useUpdateDocumentContent } from "@/lib/queries";
import { updateDocument } from "@/lib/actions";
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
  const { currentDocId, ui, localContent, setLocalContent } = useStore();
  const { data: doc } = useDocument(currentDocId);
  const updateContent = useUpdateDocumentContent();
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local content with document content when document changes
  useEffect(() => {
    if (!currentDocId) {
      setLocalContent("");
    } else if (doc?.content !== undefined) {
      setLocalContent(doc.content);
    }
  }, [doc?.id, currentDocId, setLocalContent]); // Only sync when document ID changes (switching documents)

  // Debounced save
  const handleContentChange = (value: string) => {
    setLocalContent(value);
    if (!currentDocId) return;
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set new timeout for debounced save
    saveTimeoutRef.current = setTimeout(() => {
      updateContent.mutate({ id: currentDocId, content: value });
    }, 2000);
  };

  // Save immediately on blur
  const handleBlur = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
    if (currentDocId && localContent !== doc?.content) {
      updateContent.mutate({ id: currentDocId, content: localContent });
    }
  };

  // Save on beforeunload
  useEffect(() => {
    const onBeforeUnload = () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      if (currentDocId && localContent !== doc?.content) {
        // Call server action directly (fire-and-forget for beforeunload)
        updateDocument(currentDocId, { content: localContent }).catch(() => {
          // Ignore errors during unload
        });
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [currentDocId, localContent, doc?.content]);

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
        value={localContent}
        height="100%"
        basicSetup={{ lineNumbers: true }}
        extensions={[
          markdown(),
          linkAutocomplete,
          clickableLinks,
          keymap.of(completionKeymap),
        ]}
        theme={ui.theme === "dark" ? "dark" : "light"}
        onChange={handleContentChange}
        onBlur={handleBlur}
        className={className}
      />
    </motion.div>
  );
}
