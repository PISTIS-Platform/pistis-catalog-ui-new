import { marked } from 'marked'

export function configureMarked() {
  function preprocessText(apiText: string) {
    // Minimal preprocessing to ensure bullet points are correctly parsed
    return apiText
      .replace(/(\n|^)\s*-\s+/g, '\n\n- ') // Ensure blank lines before bullet points
      .replace(/\n{2,}/g, '\n\n') // Normalize multiple blank lines
      .trim() // Remove leading/trailing spaces
  }

  // Custom marked.js options
  marked.setOptions({
    breaks: false, // Treat single newlines as <br>
    gfm: true, // Enable GitHub Flavored Markdown
  })

  const defaultHeadingTokenizer = marked.getDefaults().tokenizer?.heading
  marked.use({
    tokenizer: {
      heading(src: string) {
        if (src.endsWith('-') || src.endsWith('=')) {
          return undefined
        }

        return defaultHeadingTokenizer?.(src)
      },
      del: () => undefined,
      code: () => undefined,
    },
  }, {
    hooks: {
      preprocess: preprocessText,
    },
  })
}
