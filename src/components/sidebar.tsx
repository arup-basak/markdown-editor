"use client";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/state/store";
import {
  useDocuments,
  useCreateDocument,
  useRenameDocument,
  useDeleteDocument,
} from "@/lib/queries";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const {
    currentDocId,
    selectDoc,
    searchQuery,
    setSearchQuery,
    ui,
    setSidebarCollapsed,
  } = useStore();
  const [renaming, setRenaming] = useState<string | null>(null);
  
  const { data: docs = [], isLoading } = useDocuments();
  const createDoc = useCreateDocument();
  const renameDoc = useRenameDocument();
  const deleteDoc = useDeleteDocument();

  // Set initial document selection when documents load
  useEffect(() => {
    if (docs.length > 0 && !currentDocId) {
      selectDoc(docs[0].id);
    }
  }, [docs, currentDocId, selectDoc]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return docs.filter((d) => d.title.toLowerCase().includes(q));
  }, [docs, searchQuery]);

  const handleCreateDoc = async () => {
    const result = await createDoc.mutateAsync({});
    if (result) {
      selectDoc(result.id);
    }
  };

  const handleRenameDoc = async (id: string, title: string) => {
    await renameDoc.mutateAsync({ id, title });
    setRenaming(null);
  };

  const handleDeleteDoc = async (id: string) => {
    await deleteDoc.mutateAsync(id);
    // Select another document if the deleted one was selected
    if (currentDocId === id) {
      const remainingDocs = docs.filter((d) => d.id !== id);
      selectDoc(remainingDocs[0]?.id ?? null);
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: ui.sidebarCollapsed ? 48 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex h-screen flex-col border-r border-border bg-muted/50"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setSidebarCollapsed(!ui.sidebarCollapsed)}
        className="absolute -right-3 top-4 z-10 h-6 w-6 rounded-full border border-border bg-background shadow-sm"
        title={ui.sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {ui.sidebarCollapsed ? (
          <ChevronRightIcon className="h-4 w-4" />
        ) : (
          <ChevronLeftIcon className="h-4 w-4" />
        )}
      </Button>

      {!ui.sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col flex-1 overflow-hidden"
        >
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
              onClick={handleCreateDoc}
              disabled={createDoc.isPending}
              title="New Document"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-sm text-muted-foreground">Loading...</div>
            ) : (
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
                          handleRenameDoc(doc.id, e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleRenameDoc(doc.id, (e.target as HTMLInputElement).value);
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
                      onClick={() => handleDeleteDoc(doc.id)}
                      disabled={deleteDoc.isPending}
                    >
                      <TrashIcon className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      )}

      {ui.sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center py-3 gap-2"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleCreateDoc}
            disabled={createDoc.isPending}
            title="New Document"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </motion.aside>
  );
}
