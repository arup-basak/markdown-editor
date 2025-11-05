declare module "latex.js" {
  export class HtmlGenerator {
    constructor(options?: { hyphenate?: boolean });
    domFragment(): DocumentFragment;
    stylesAndScripts(baseURL?: string): DocumentFragment;
  }
  export function parse(latex: string, options: { generator: HtmlGenerator }): void;
}

