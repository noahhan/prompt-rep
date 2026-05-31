import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

async function loadImportCore() {
  const source = await readFile(new URL("../import-core.js", import.meta.url), "utf8");
  const context = { window: {} };
  context.globalThis = context.window;
  vm.createContext(context);
  vm.runInContext(source, context);
  return context.window.PromptVaultImport;
}

test("import core parses markdown prompt summary and body", async () => {
  const importCore = await loadImportCore();
  const markdown = `# Research helper

- Category: Research
- Tags: synthesis, evidence

## Executive summary

Use for source-based answers.

## Prompt

\`\`\`
Answer {question} using {sources}.
\`\`\`
`;

  const [prompt] = importCore.parseMarkdownPrompts(markdown);

  assert.equal(prompt.title, "Research helper");
  assert.equal(prompt.category, "Research");
  assert.equal(prompt.summary, "Use for source-based answers.");
  assert.equal(prompt.body, "Answer {question} using {sources}.");
  assert.deepEqual(Array.from(prompt.tags), ["synthesis", "evidence"]);
});

test("import core creates stable duplicate keys from title and body", async () => {
  const importCore = await loadImportCore();

  assert.equal(
    importCore.promptKey({ title: "  My Prompt ", body: "Body" }),
    importCore.promptKey({ title: "my prompt", body: "Body" })
  );
});
