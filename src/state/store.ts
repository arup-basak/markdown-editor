"use client";
import { create } from "zustand";

export type DocVersion = { id: string; createdAt: Date | string; content: string };
export type Doc = {
  id: string;
  title: string;
  content: string;
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
  sidebarCollapsed: boolean;
};

type Store = {
  currentDocId: string | null;
  ui: UIState;
  searchQuery: string;
  setTheme: (t: Theme) => void;
  setPageSize: (s: PageSize) => void;
  setOrientation: (o: Orientation) => void;
  setFontFamily: (f: UIState["fontFamily"]) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSearchQuery: (q: string) => void;
  selectDoc: (id: string) => void;
};

export const useStore = create<Store>((set) => ({
  currentDocId: null,
  ui: {
    theme: "light",
    pageSize: "A4",
    orientation: "portrait",
    fontFamily: "system",
    sidebarCollapsed: false,
  },
  searchQuery: "",
  setTheme: (t) => set((s) => ({ ui: { ...s.ui, theme: t } })),
  setPageSize: (p) => set((s) => ({ ui: { ...s.ui, pageSize: p } })),
  setOrientation: (o) => set((s) => ({ ui: { ...s.ui, orientation: o } })),
  setFontFamily: (f) => set((s) => ({ ui: { ...s.ui, fontFamily: f } })),
  setSidebarCollapsed: (collapsed) => set((s) => ({ ui: { ...s.ui, sidebarCollapsed: collapsed } })),
  setSearchQuery: (q) => set({ searchQuery: q }),
  selectDoc: (id) => set({ currentDocId: id }),
}));
