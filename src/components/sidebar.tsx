"use client";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/state/store";
import {
  useDocuments,
  useCreateDocument,
  useRenameDocument,
  useDeleteDocument,
  useUpdateDocumentOrder,
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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable document item component
function SortableDocumentItem({
  doc,
  currentDocId,
  renaming,
  onSelect,
  onRename,
  onDelete,
  onStartRename,
}: {
  doc: { id: string; title: string };
  currentDocId: string | null;
  renaming: string | null;
  onSelect: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onStartRename: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: doc.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "group flex items-center justify-between px-3 py-2 text-sm cursor-grab active:cursor-grabbing",
        currentDocId === doc.id && "bg-background"
      )}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing touch-none"
          aria-label="Drag handle"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-muted-foreground"
          >
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="6" cy="2" r="1" fill="currentColor" />
            <circle cx="10" cy="2" r="1" fill="currentColor" />
            <circle cx="2" cy="6" r="1" fill="currentColor" />
            <circle cx="6" cy="6" r="1" fill="currentColor" />
            <circle cx="10" cy="6" r="1" fill="currentColor" />
            <circle cx="2" cy="10" r="1" fill="currentColor" />
            <circle cx="6" cy="10" r="1" fill="currentColor" />
            <circle cx="10" cy="10" r="1" fill="currentColor" />
          </svg>
        </div>
        <button
          type="button"
          className="truncate text-left flex-1"
          onClick={() => onSelect(doc.id)}
        >
          {renaming === doc.id ? (
            <Input
              defaultValue={doc.title}
              onBlur={(e) => {
                onRename(doc.id, e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onRename(doc.id, (e.target as HTMLInputElement).value);
                }
              }}
              className="w-full px-2 py-1 text-sm"
              autoFocus
            />
          ) : (
            <span className="text-foreground">{doc.title}</span>
          )}
        </button>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          title="Rename"
          onClick={() => onStartRename(doc.id)}
        >
          <PencilSquareIcon className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          title="Delete"
          onClick={() => onDelete(doc.id)}
        >
          <TrashIcon className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </motion.div>
  );
}

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
  const [items, setItems] = useState<string[]>([]);
  
  const { data: docs = [], isLoading } = useDocuments();
  const createDoc = useCreateDocument();
  const renameDoc = useRenameDocument();
  const deleteDoc = useDeleteDocument();
  const updateOrder = useUpdateDocumentOrder();

  // Sync items with docs
  useEffect(() => {
    if (docs.length > 0) {
      setItems(docs.map((d) => d.id));
    }
  }, [docs]);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // Use the full docs list (not filtered) for ordering
      const docIds = docs.map((d) => d.id);
      const oldIndex = docIds.indexOf(active.id as string);
      const newIndex = docIds.indexOf(over.id as string);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(docIds, oldIndex, newIndex);
        setItems(newOrder);
        updateOrder.mutate(newOrder);
      }
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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={filtered.map((d) => d.id)}
                  strategy={verticalListSortingStrategy}
                  disabled={searchQuery.length > 0}
                >
                  <AnimatePresence mode="popLayout">
                    {filtered.map((doc) => (
                      <SortableDocumentItem
                        key={doc.id}
                        doc={doc}
                        currentDocId={currentDocId}
                        renaming={renaming}
                        onSelect={selectDoc}
                        onRename={handleRenameDoc}
                        onDelete={handleDeleteDoc}
                        onStartRename={setRenaming}
                      />
                    ))}
                  </AnimatePresence>
                </SortableContext>
              </DndContext>
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
