"use client";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/state/store";
import { MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const { docs, currentDocId, load, selectDoc, createDoc, renameDoc, deleteDoc, searchQuery, setSearchQuery } =
    useStore();
  const [renaming, setRenaming] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return docs.filter((d) => d.title.toLowerCase().includes(q));
  }, [docs, searchQuery]);

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-muted/50">
      <div className="flex items-center gap-2 p-3">
        <div className="relative w-full">
          <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="w-full pl-7"
            placeholder="Search documents"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          type="button"
          size="icon"
          onClick={() => createDoc()}
          title="New Document"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filtered.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "group flex items-center justify-between px-3 py-2 text-sm",
                currentDocId === doc.id && "bg-background"
              )}
            >
              <button
                type="button"
                className="truncate text-left flex-1"
                onClick={() => selectDoc(doc.id)}
              >
                {renaming === doc.id ? (
                  <Input
                    defaultValue={doc.title}
                    onBlur={(e) => {
                      renameDoc(doc.id, e.target.value);
                      setRenaming(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        renameDoc(doc.id, (e.target as HTMLInputElement).value);
                        setRenaming(null);
                      }
                    }}
                    className="w-full px-2 py-1 text-sm"
                    autoFocus
                  />
                ) : (
                  <span className="text-foreground">{doc.title}</span>
                )}
              </button>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  title="Rename"
                  onClick={() => setRenaming(doc.id)}
                >
                  <PencilSquareIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  title="Delete"
                  onClick={() => deleteDoc(doc.id)}
                >
                  <TrashIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </aside>
  );
}
