"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Doc } from "@/state/store";
import {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
} from "@/lib/actions";

const DOCUMENTS_QUERY_KEY = ["documents"] as const;
const DOCUMENT_QUERY_KEY = (id: string) => ["document", id] as const;

// Hook to fetch all documents
export function useDocuments() {
  return useQuery({
    queryKey: DOCUMENTS_QUERY_KEY,
    queryFn: getDocuments,
  });
}

// Hook to fetch a single document
export function useDocument(id: string | null) {
  return useQuery({
    queryKey: DOCUMENT_QUERY_KEY(id!),
    queryFn: () => getDocument(id!),
    enabled: !!id,
  });
}

// Hook to create a document
export function useCreateDocument() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ title, content }: { title?: string; content?: string }) =>
      createDocument(title, content),
    onSuccess: (newDoc) => {
      // Invalidate and refetch documents list
      queryClient.invalidateQueries({ queryKey: DOCUMENTS_QUERY_KEY });
      // Set the new document in cache
      queryClient.setQueryData(DOCUMENT_QUERY_KEY(newDoc.id), newDoc);
    },
  });
}

// Hook to update document title
export function useRenameDocument() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      updateDocument(id, { title }),
    onSuccess: (updatedDoc) => {
      // Update the document in cache
      queryClient.setQueryData(DOCUMENT_QUERY_KEY(updatedDoc.id), updatedDoc);
      // Invalidate documents list to update the title
      queryClient.invalidateQueries({ queryKey: DOCUMENTS_QUERY_KEY });
    },
  });
}

// Hook to update document content (with optimistic updates)
export function useUpdateDocumentContent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      updateDocument(id, { content }),
    onMutate: async ({ id, content }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: DOCUMENT_QUERY_KEY(id) });
      await queryClient.cancelQueries({ queryKey: DOCUMENTS_QUERY_KEY });
      
      // Snapshot previous values
      const previousDoc = queryClient.getQueryData<Doc>(DOCUMENT_QUERY_KEY(id));
      const previousDocs = queryClient.getQueryData<Doc[]>(DOCUMENTS_QUERY_KEY);
      
      // Optimistically update
      if (previousDoc) {
        queryClient.setQueryData<Doc>(DOCUMENT_QUERY_KEY(id), {
          ...previousDoc,
          content,
          updatedAt: new Date().toISOString(),
        });
      }
      
      if (previousDocs) {
        queryClient.setQueryData<Doc[]>(
          DOCUMENTS_QUERY_KEY,
          previousDocs.map((d) =>
            d.id === id ? { ...d, content, updatedAt: new Date().toISOString() } : d
          )
        );
      }
      
      return { previousDoc, previousDocs };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousDoc) {
        queryClient.setQueryData(DOCUMENT_QUERY_KEY(_variables.id), context.previousDoc);
      }
      if (context?.previousDocs) {
        queryClient.setQueryData(DOCUMENTS_QUERY_KEY, context.previousDocs);
      }
    },
    onSuccess: (updatedDoc) => {
      // Update with server response
      queryClient.setQueryData(DOCUMENT_QUERY_KEY(updatedDoc.id), updatedDoc);
      queryClient.invalidateQueries({ queryKey: DOCUMENTS_QUERY_KEY });
    },
  });
}

// Hook to delete a document
export function useDeleteDocument() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: (_data, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: DOCUMENT_QUERY_KEY(id) });
      // Invalidate documents list
      queryClient.invalidateQueries({ queryKey: DOCUMENTS_QUERY_KEY });
    },
  });
}

