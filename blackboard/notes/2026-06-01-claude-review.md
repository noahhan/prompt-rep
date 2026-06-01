# Claude Code Review Note

Date: 2026-06-01

Reviewer: Claude Code (full file review)

---

## What I Checked

Read all project files:
`app.js`, `audit-core.js`, `import-core.js`, `index.html`, `styles.css`,
`data/prompts.json`, `tests/`, `scripts/`, `.env`, `.gitignore`, `blackboard/`

---

## SECURITY — Must Fix Now

### `.env` contains a live GitHub Personal Access Token

File: `.env`

```text
GITHUB_ACCESS_TOKEN = [REDACTED]
```

The token was never committed to git (`.gitignore` blocks it — good).
But it exists on disk in a local file. Anyone with access to this machine can read it.

**Action required:** Revoke the token immediately at GitHub → Settings → Personal access tokens.
Generate a new one only when needed. Do not store tokens in `.env` files in project directories.
Use `~/.ssh/` or a credential manager instead.

---

## Code Quality — High Priority

### Backwards compatibility aliases in `audit-core.js` are dead weight

File: `audit-core.js:141-151`, `app.js:588-627`

`audit-core.js` returns duplicate keys in every audit result:
```js
qualityPenalties: structurePenalties,     // alias of structurePenalties
qualityPenaltyTotal: structurePenaltyTotal, // alias of structurePenaltyTotal
qualityChecks: structureChecks,           // alias of structureChecks
```

`app.js` still reads both names with fallbacks:
```js
const structurePenaltyTotal = audit.breakdown.structurePenaltyTotal ?? audit.breakdown.qualityPenaltyTotal;
const structurePenalties = audit.breakdown.structurePenalties || audit.breakdown.qualityPenalties || [];
const checks = (audit.structureChecks || audit.qualityChecks)
```

The rename from `quality*` to `structure*` happened but was never cleaned up.
Every audit result carries dead duplicate data. Fix: remove the `quality*` aliases from
`audit-core.js` and the fallback reads from `app.js`.

---

## Architecture — Medium Priority

### `window` globals for module communication is fragile

Files: `audit-core.js:157`, `import-core.js:50`, `app.js:85-86`

The three files communicate via `window.PromptVaultAudit` and `window.PromptVaultImport`.
This works today because `index.html` loads them in the right order (audit → import → app).
But it breaks silently if the order changes, and it cannot be tested with Node.js without a shim.

Better: convert all three to ES modules using `type="module"` in `index.html`.
```html
<script type="module" src="./app.js"></script>
```
Then use standard `import` / `export` between files. This makes load order explicit and
enables Node.js test imports.

Note: this change also enables `async/await` at the top level for `initApp()`.

### `initApp()` writes to localStorage on every page load

File: `app.js:1271-1275`

```js
async function initApp() {
  await loadDataFileIfEmpty();
  saveState();   // ← runs even if nothing changed
  render();
}
```

If the user already has saved data and `loadDataFileIfEmpty` skips (returns early),
`saveState()` still writes the unchanged state to localStorage. This is a wasted write on every load.

Fix: only call `saveState()` after `loadDataFileIfEmpty()` if state was actually modified.
`loadDataFileIfEmpty` can return a boolean `changed` value.

### 12 top-level mutable `let` variables share one flat scope

File: `app.js:88-103`

```js
let state = ...
let selectedId = ...
let selectedCategory = ...
let selectedTag = ...
let selectedVersionIndex = ...
let pendingImportPrompts = ...
let pendingDeletePromptId = ...
let draftPrompt = ...
let hasUnsavedChanges = ...
let categoryFormOpen = ...
let activeEditorTab = ...
let activeBodyView = ...
let workspaceView = ...
let noticeTimer = ...
let pendingDiscardAction = ...
const expandedCategories = ...
```

Any function in the file can read and write all of these at any time.
This is manageable now but will cause hard-to-track bugs as the app grows.

When `app.js` is split into modules (already in open-tasks), group these into
a single `appState` object and pass it explicitly to functions that need it.

---

## What is Now Solid (Since Last Review)

The earlier critical issues I raised were all fixed. Good work:

- `saveState()` is only called in mutation paths, not in `render()` ✓
- Import has `promptKey` dedup — checks both existing and in-file duplicates ✓
- Import preview modal shows what will be added vs skipped before committing ✓
- First imported prompt is correctly selected after multi-item import ✓
- Score ring color now matches audit level ✓
- Category creation uses inline form, not browser `prompt()` ✓
- Empty categories can be deleted safely ✓
- New prompts are drafts until saved — no phantom saves ✓
- Unsaved changes modal protects work before switching prompts ✓
- `audit-core.js` and `import-core.js` are separate, testable modules ✓
- Test files exist for both core modules ✓
- Markdown preview renderer with tables, lists, headings, code blocks ✓
- Export warns if unsaved changes exist ✓
- Import blocked if unsaved changes exist ✓

---

## Recommended Next Actions

1. **Now:** Revoke the GitHub token in `.env`. Delete the `.env` file or replace with a comment-only template.
2. **Soon:** Remove `quality*` alias properties from `audit-core.js` and clean up fallback reads in `app.js`.
3. **When splitting `app.js`:** Convert to ES modules to remove `window` globals.
4. **When splitting `app.js`:** Group the 16 top-level `let` variables into a single state object.
5. **Small fix:** Make `loadDataFileIfEmpty` return `changed: boolean` so `initApp` only saves when needed.
