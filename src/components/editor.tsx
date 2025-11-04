"use client";
import { useEffect, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { useStore } from "@/state/store";
import { motion } from "framer-motion";

export default function Editor() {
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
      }`}
    >
      <CodeMirror
        value={doc.content}
        height="100%"
        basicSetup={{ lineNumbers: true }}
        extensions={[markdown()]}
        theme={ui.theme === "dark" ? "dark" : "light"}
        onChange={(value) => updateContent(doc.id, value)}
        onBlur={() => saveNow(doc.id)}
      />
    </motion.div>
  );
}
