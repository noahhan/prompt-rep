(function attachImportCore(root) {
  function normalizeTags(value) {
    return String(value || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .filter((tag, index, list) => list.indexOf(tag) === index);
  }

  function promptKey(prompt) {
    return `${String(prompt.title || "").trim().toLowerCase()}::${String(prompt.body || "").trim()}`;
  }

  function normalizePrompt(item, now = new Date().toISOString()) {
    return {
      id: item.id || crypto.randomUUID(),
      title: item.title || "Imported prompt",
      category: item.category || "Imported",
      tags: Array.isArray(item.tags) ? item.tags : normalizeTags(item.tags),
      summary: item.summary || "",
      body: item.body || item.prompt || "",
      createdAt: item.createdAt || now,
      updatedAt: item.updatedAt || now,
      history: Array.isArray(item.history) ? item.history : []
    };
  }

  function parseImportText(text, filename) {
    if (filename.endsWith(".json")) {
      const imported = JSON.parse(text);
      return Array.isArray(imported.prompts) ? imported.prompts : Array.isArray(imported) ? imported : [];
    }
    return parseMarkdownPrompts(text);
  }

  function parseMarkdownPrompts(text) {
    return String(text || "")
      .split(/\n---\n/g)
      .map((block) => {
        const title = (block.match(/^#\s+(.+)$/m) || [null, "Imported prompt"])[1];
        const category = (block.match(/^- Category:\s*(.+)$/im) || [null, "Imported"])[1];
        const tags = (block.match(/^- Tags:\s*(.+)$/im) || [null, ""])[1];
        const summary = (block.match(/##\s+executive summary\s+([\s\S]*?)(?=\n##|$)/i) || [null, ""])[1]?.trim();
        const body = (block.match(/```(?:text)?\s+([\s\S]*?)```/i) || [null, block])[1]?.trim();
        return { title, category, tags: normalizeTags(tags), summary, body };
      })
      .filter((prompt) => prompt.body);
  }

  root.PromptVaultImport = {
    normalizeTags,
    normalizePrompt,
    parseImportText,
    parseMarkdownPrompts,
    promptKey
  };
})(typeof window !== "undefined" ? window : globalThis);
