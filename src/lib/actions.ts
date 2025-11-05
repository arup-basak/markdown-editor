"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import type { Doc } from "@/state/store";

async function getSession() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function getDocuments(): Promise<Doc[]> {
  const session = await getSession();

  const documents = await db.document.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      versions: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  return documents;
}

export async function getDocument(id: string): Promise<Doc> {
  const session = await getSession();

  const document = await db.document.findFirst({
    where: { id, userId: session.user.id },
    include: {
      versions: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  if (!document) {
    throw new Error("Not found");
  }

  return document;
}

export async function createDocument(title?: string, content?: string): Promise<Doc> {
  const session = await getSession();

  const document = await db.document.create({
    data: {
      title: title || "Untitled",
      content: content || "# New Document\n\nStart writing markdown…",
      userId: session.user.id,
    },
    include: {
      versions: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  revalidatePath("/");
  return document;
}

export async function updateDocument(
  id: string,
  data: { title?: string; content?: string }
): Promise<Doc> {
  const session = await getSession();

  const existing = await db.document.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!existing) {
    throw new Error("Not found");
  }

  const updateData: { title?: string; content?: string; updatedAt: Date } = {
    updatedAt: new Date(),
  };

  if (data.title !== undefined) updateData.title = data.title;
  if (data.content !== undefined) {
    updateData.content = data.content;
    // Create version
    await db.documentVersion.create({
      data: {
        documentId: id,
        content: data.content,
      },
    });
  }

  const document = await db.document.update({
    where: { id },
    data: updateData,
    include: {
      versions: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  revalidatePath("/");
  return document;
}

export async function deleteDocument(id: string): Promise<void> {
  const session = await getSession();

  const existing = await db.document.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!existing) {
    throw new Error("Not found");
  }

  await db.document.delete({ where: { id } });
  revalidatePath("/");
}

