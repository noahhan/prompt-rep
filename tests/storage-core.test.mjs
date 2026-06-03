import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

async function loadStorageCore() {
  const source = await readFile(new URL("../storage-core.js", import.meta.url), "utf8");
  const values = new Map();
  const context = {
    window: {
      localStorage: {
        getItem: (key) => values.get(key) || null,
        setItem: (key, value) => values.set(key, String(value))
      }
    }
  };
  context.globalThis = context.window;
  vm.createContext(context);
  vm.runInContext(source, context);
  return { storage: context.window.PromptVaultStorage, values };
}

test("storage core normalizes malformed state", async () => {
  const { storage } = await loadStorageCore();

  assert.equal(JSON.stringify(storage.normalizeState({ categories: ["A", "", "B"], prompts: "bad" })), JSON.stringify({
    categories: ["A", "B"],
    prompts: []
  }));
});

test("storage core reads and writes local fallback state", async () => {
  const { storage, values } = await loadStorageCore();
  const state = {
    categories: ["Research"],
    prompts: [{ id: "p1", title: "Research", body: "Use {topic}." }]
  };

  await storage.saveState({ backend: "localStorage" }, state, "prompt-vault:v1");
  assert.equal(JSON.stringify(storage.readLocalState("prompt-vault:v1")), JSON.stringify(state));
  assert.equal(values.has("prompt-vault:v1"), true);
});
