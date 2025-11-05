import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ 
    headers: req.headers,
  });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  return NextResponse.json(documents);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ 
    headers: req.headers,
  });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content, type } = await req.json();

  const document = await db.document.create({
    data: {
      title: title || "Untitled",
      content: content || (type === "latex" 
        ? "\\documentclass{article}\n\\begin{document}\n\n\\end{document}"
        : "# New Document\n\nStart writing markdown…"),
      type: type || "markdown",
      userId: session.user.id,
    },
  });

  return NextResponse.json(document);
}

