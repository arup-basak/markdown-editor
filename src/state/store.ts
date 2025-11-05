"use client";
import { create } from "zustand";

export type DocVersion = { id: string; createdAt: Date | string; content: string };
export type DocType = "markdown" | "latex";
export type Doc = {
  id: string;
  title: string;
  content: string;
  type: DocType;
  createdAt: Date | string;
  updatedAt: Date | string;
  versions: DocVersion[];
};

type Theme = "light" | "dark" | "sepia";
type PageSize = "A4" | "Letter";
type Orientation = "portrait" | "landscape";

type UIState = {
  theme: Theme;
  pageSize: PageSize;
  orientation: Orientation;
  fontFamily: "system" | "serif" | "mono";
};

type Store = {
  docs: Doc[];
  currentDocId: string | null;
  ui: UIState;
  searchQuery: string;
  setTheme: (t: Theme) => void;
  setPageSize: (s: PageSize) => void;
  setOrientation: (o: Orientation) => void;
  setFontFamily: (f: UIState["fontFamily"]) => void;
  setSearchQuery: (q: string) => void;
  load: () => Promise<void>;
  selectDoc: (id: string) => void;
  createDoc: (type?: DocType) => Promise<void>;
  renameDoc: (id: string, title: string) => Promise<void>;
  deleteDoc: (id: string) => Promise<void>;
  updateContent: (id: string, content: string) => void;
  saveNow: (id: string) => Promise<void>;
};

export const useStore = create<Store>((set, get) => ({
  docs: [],
  currentDocId: null,
  ui: {
    theme: "light",
    pageSize: "A4",
    orientation: "portrait",
    fontFamily: "system",
  },
  searchQuery: "",
  setTheme: (t) => set((s) => ({ ui: { ...s.ui, theme: t } })),
  setPageSize: (p) => set((s) => ({ ui: { ...s.ui, pageSize: p } })),
  setOrientation: (o) => set((s) => ({ ui: { ...s.ui, orientation: o } })),
  setFontFamily: (f) => set((s) => ({ ui: { ...s.ui, fontFamily: f } })),
  setSearchQuery: (q) => set({ searchQuery: q }),
  load: async () => {
    try {
      const res = await fetch("/api/documents");
      if (!res.ok) throw new Error("Failed to load documents");
      const docs = await res.json();
      set({ docs, currentDocId: docs[0]?.id ?? null });
    } catch (error) {
      console.error("Failed to load documents:", error);
    }
  },
  selectDoc: (id) => set({ currentDocId: id }),
  createDoc: async (type: DocType = "markdown") => {
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: "Untitled",
          type,
          content: type === "latex" 
            ? "\\documentclass{article}\n\\begin{document}\n\n\\end{document}"
            : "# New Document\n\nStart writing markdown…"
        }),
      });
      if (!res.ok) throw new Error("Failed to create document");
      const doc = await res.json();
      set((s) => ({ docs: [doc, ...s.docs], currentDocId: doc.id }));
    } catch (error) {
      console.error("Failed to create document:", error);
    }
  },
  renameDoc: async (id, title) => {
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error("Failed to rename document");
      const doc = await res.json();
      set((s) => ({
        docs: s.docs.map((d) => (d.id === id ? doc : d)),
      }));
    } catch (error) {
      console.error("Failed to rename document:", error);
    }
  },
  deleteDoc: async (id) => {
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete document");
      set((s) => ({
        docs: s.docs.filter((d) => d.id !== id),
        currentDocId: s.currentDocId === id ? s.docs[1]?.id ?? null : s.currentDocId,
      }));
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  },
  updateContent: (id, content) => {
    set((s) => ({
      docs: s.docs.map((d) => (d.id === id ? { ...d, content } : d)),
    }));
    const save = async () => {
      try {
        const res = await fetch(`/api/documents/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
        if (!res.ok) throw new Error("Failed to save document");
        const doc = await res.json();
        set((s) => ({ docs: s.docs.map((d) => (d.id === id ? doc : d)) }));
      } catch (error) {
        console.error("Failed to save document:", error);
      }
    };
    scheduleIdleSave(id, save);
  },
  saveNow: async (id) => {
    const current = get().docs.find((d) => d.id === id);
    if (!current) return;
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: current.content }),
      });
      if (!res.ok) throw new Error("Failed to save document");
      const doc = await res.json();
      set((s) => ({ docs: s.docs.map((d) => (d.id === id ? doc : d)) }));
    } catch (error) {
      console.error("Failed to save document:", error);
    }
  },
}));

let idleTimer: ReturnType<typeof setTimeout> | null = null;
function scheduleIdleSave(id: string, fn: () => Promise<void>) {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    fn().catch(() => {});
    idleTimer = null;
  }, 2000);
}
