import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { html, options } = await req.json();
    let chromium: any = null;
    try {
      chromium = (await import("playwright")).chromium;
    } catch {
      return new Response(JSON.stringify({ error: "playwright_not_available" }), { status: 501 });
    }
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    const pdf = await page.pdf({
      format: options?.pageSize || "A4",
      landscape: options?.orientation === "landscape",
      printBackground: true,
      margin: options?.margins || { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
    });
    await browser.close();
    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=export.pdf",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "failed", message: (e as Error).message }), { status: 500 });
  }
}