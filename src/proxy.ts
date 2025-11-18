import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ 
      headers: request.headers,
    });

    // Allow access to auth routes and API auth routes
    if (request.nextUrl.pathname.startsWith("/api/auth") || request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }

    // Redirect to login if not authenticated
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch {
    // If auth check fails, redirect to login
    if (request.nextUrl.pathname.startsWith("/api/auth") || request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/api((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};

