export function exportToPDFClient() {
  if (typeof window !== "undefined") {
    window.print();
  }
}

export async function exportToDOCXFromHtml(html: string, filename = "document.docx") {
  // html-docx-js exports default as a UMD; import dynamically on client
  const mod: any = await import("html-docx-js/dist/html-docx");
  const blob: Blob = mod.asBlob(html);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}