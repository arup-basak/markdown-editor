import katex from "katex";

// Lazy load latex.js only when needed in browser environment
let latexjsModule: typeof import("latex.js") | null = null;
async function loadLatexJs() {
  if (typeof window === "undefined") return null;
  if (latexjsModule) return latexjsModule;
  try {
    latexjsModule = await import("latex.js");
    return latexjsModule;
  } catch (e) {
    return null;
  }
}

export function latexToHtml(latex: string): string {
  if (!latex || latex.trim() === "") {
    return '<div class="text-muted-foreground italic">Empty document</div>';
  }

  // For now, use synchronous approach - will be enhanced when latex.js loads
  // The async loading will be handled in the preview component
  return renderMathOnly(latex);
}

export async function latexToHtmlAsync(latex: string): Promise<string> {
  if (!latex || latex.trim() === "") {
    return '<div class="text-muted-foreground italic">Empty document</div>';
  }

  // Only try full LaTeX rendering in browser environment
  if (typeof window === "undefined" || typeof document === "undefined") {
    return renderMathOnly(latex);
  }

  // Try to load and use latex.js in browser environment
  const latexjs = await loadLatexJs();
  if (latexjs) {
    try {
      // Try to parse and render as a full LaTeX document
      const generator = new latexjs.HtmlGenerator({ hyphenate: false });
      latexjs.parse(latex, { generator });
      
      // Convert DOM fragment to HTML string
      const fragment = generator.domFragment();
      const tempDiv = document.createElement("div");
      tempDiv.appendChild(fragment);
      
      // Get styles and scripts HTML
      const stylesAndScripts = generator.stylesAndScripts("");
      const stylesDiv = document.createElement("div");
      stylesDiv.appendChild(stylesAndScripts);
      
      // Combine everything
      const html = stylesDiv.innerHTML + tempDiv.innerHTML;
      
      // Wrap in a container with proper styling
      return `<div class="latex-document max-w-4xl mx-auto p-8">${html}</div>`;
    } catch (error) {
      // If parsing fails (e.g., not a full LaTeX document), fall back to math-only rendering
      console.warn("LaTeX parsing failed, falling back to math-only rendering:", error);
      return renderMathOnly(latex);
    }
  }
  
  // Fall back to math-only rendering
  return renderMathOnly(latex);
}

function renderMathOnly(latex: string): string {
  // First, let's try to find and render math expressions
  const parts: Array<{ type: "text" | "math-inline" | "math-block"; content: string; raw?: string }> = [];
  
  // Mark positions where math exists
  const mathPositions: Array<{ start: number; end: number; type: "inline" | "block"; content: string }> = [];
  
  // Find block math first: $$...$$ or \[...\]
  let match: RegExpExecArray | null;
  const blockRegex = /\$\$([\s\S]*?)\$\$|\\\[([\s\S]*?)\\\]/g;
  blockRegex.lastIndex = 0;
  while ((match = blockRegex.exec(latex)) !== null) {
    mathPositions.push({
      start: match.index,
      end: match.index + match[0].length,
      type: "block",
      content: (match[1] || match[2] || "").trim(),
    });
  }
  
  // Find inline math: $...$ or \(...\)
  // We need to avoid matching $$ as two separate inline math
  const inlineRegex = /\$([^$\n]+?)\$|\\\(([^)]+)\\\)/g;
  inlineRegex.lastIndex = 0;
  while ((match = inlineRegex.exec(latex)) !== null) {
    // Check if this is part of a block math ($$)
    const isBlockMath = mathPositions.some(
      (bm) => match!.index >= bm.start - 1 && match!.index <= bm.start + 1
    );
    if (!isBlockMath) {
      mathPositions.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "inline",
        content: (match[1] || match[2] || "").trim(),
      });
    }
  }
  
  // Sort by position
  mathPositions.sort((a, b) => a.start - b.start);
  
  // Build parts
  let lastIndex = 0;
  for (const mathPos of mathPositions) {
    // Add text before math
    if (mathPos.start > lastIndex) {
      const text = latex.slice(lastIndex, mathPos.start);
      if (text) {
        parts.push({ type: "text", content: text });
      }
    }
    
    // Add math
    try {
      const rendered = katex.renderToString(mathPos.content, {
        throwOnError: false,
        displayMode: mathPos.type === "block",
        strict: false,
      });
      parts.push({
        type: mathPos.type === "block" ? "math-block" : "math-inline",
        content: rendered,
        raw: mathPos.content,
      });
    } catch (error) {
      // Show error
      parts.push({
        type: mathPos.type === "block" ? "math-block" : "math-inline",
        content: `<span class="text-red-500 dark:text-red-400">[Error: ${escapeHtml(mathPos.content)}]</span>`,
        raw: mathPos.content,
      });
    }
    
    lastIndex = mathPos.end;
  }
  
  // Add remaining text
  if (lastIndex < latex.length) {
    const text = latex.slice(lastIndex);
    if (text) {
      parts.push({ type: "text", content: text });
    }
  }
  
  // If no math found, show LaTeX as formatted text
  if (parts.length === 0 || (parts.length === 1 && parts[0].type === "text")) {
    return `<pre class="whitespace-pre-wrap font-mono text-sm leading-relaxed p-4">${formatLatexText(latex)}</pre>`;
  }
  
  // Combine parts
  let html = "";
  for (const part of parts) {
    if (part.type === "text") {
      html += `<div class="whitespace-pre-wrap font-mono text-sm leading-relaxed mb-2">${formatLatexText(part.content)}</div>`;
    } else if (part.type === "math-inline") {
      html += `<span class="inline-block mx-1 align-middle">${part.content}</span>`;
    } else {
      html += `<div class="my-6 text-center overflow-x-auto border-l-2 border-blue-300 dark:border-blue-600 pl-4">${part.content}</div>`;
    }
  }
  
  return html;
}

function formatLatexText(text: string): string {
  // Highlight LaTeX commands and environments
  let formatted = escapeHtml(text);
  
  // Highlight LaTeX commands: \command
  formatted = formatted.replace(/\\([a-zA-Z]+)/g, '<span class="text-blue-600 dark:text-blue-400 font-semibold">\\$1</span>');
  
  // Highlight environments: \begin{...} and \end{...}
  formatted = formatted.replace(/\\begin\{([^}]+)\}/g, '<span class="text-purple-600 dark:text-purple-400">\\begin{$1}</span>');
  formatted = formatted.replace(/\\end\{([^}]+)\}/g, '<span class="text-purple-600 dark:text-purple-400">\\end{$1}</span>');
  
  // Highlight comments: % ...
  formatted = formatted.replace(/(%.*)/g, '<span class="text-gray-500 dark:text-gray-400 italic">$1</span>');
  
  return formatted;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
