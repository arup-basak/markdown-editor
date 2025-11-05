import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";

export type MarkdownOptions = {
  theme: "light" | "dark" | "sepia";
};

const themeMap: Record<MarkdownOptions["theme"], string> = {
  light: "light-plus",
  dark: "github-dark",
  sepia: "material-theme-lighter",
};

export async function markdownToHtml(markdown: string, options: MarkdownOptions) {
  const theme = themeMap[options.theme];
  const processor = unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings as any, {
      behavior: "append",
      properties: { className: ["heading-link"] },
    } as any)
    .use(rehypePrettyCode as any, {
      theme,
      keepBackground: false,
    } as any)
    .use(rehypeKatex)
    .use(rehypeStringify, { allowDangerousHtml: true });

  const file = await processor.process(markdown);
  return String(file.value);
}