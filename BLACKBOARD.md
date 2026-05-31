# Prompt Vault — Critical Issues Blackboard

_Last updated: 2026-05-31_

## Implementation Status

2026-05-31 UI/UX pass:

- Fixed #1, #2, #3, #4, and #5.
- Kept #6 and #7 open because category cleanup needs a small UI design decision.
- Added detailed test note at `blackboard/notes/2026-05-31-ui-ux-test.md`.

---

## #1 CRITICAL — `saveState()` fires on every render, including read-only operations

**File:** `app.js:98–101`, `app.js:153–159`

**Problem:**
`render()` unconditionally calls `saveState()`. Every search keystroke, every category/tag filter click, every sort change — all trigger a full `JSON.stringify(state)` + `localStorage.setItem`. With a large prompt library this causes noticeable input lag and needlessly wears down localStorage write quotas.

**Root cause:**
```js
function render() {
  saveState();          // ← always runs, even for read-only renders
  renderCategories();
  ...
}
```

**Fix:**
Remove `saveState()` from `render()`. Call it explicitly only in mutating functions:
- `saveCurrentPrompt` ✓
- `createPrompt` ✓
- `deletePrompt` ✓
- `restoreVersion` ✓
- `mergePrompts` (inside `importFile`) ✓

```js
function render() {
  // NO saveState() here
  renderCategories();
  renderTags();
  renderPromptList();
  renderEditor();
  renderIcons();
}
```

---

## #2 CRITICAL — Import silently creates duplicates with no dedup check

**File:** `app.js:454–472`

**Problem:**
`mergePrompts()` always generates a new `crypto.randomUUID()` for every imported item — even if the exact same file is imported twice. Users who re-import a backup or accidentally import the same export twice will end up with duplicated prompts and no warning.

**Root cause:**
```js
function mergePrompts(prompts) {
  prompts.forEach((item) => {
    const prompt = {
      id: crypto.randomUUID(),   // ← always new, never checks for existing
      ...
    };
    state.prompts.unshift(prompt);
    selectedId = prompt.id;      // ← also broken for multi-item imports (see #3)
  });
}
```

**Fix — option A (simple):** Check for title+body collision before inserting:
```js
const isDuplicate = state.prompts.some(
  (p) => p.title === prompt.title && p.body === prompt.body
);
if (!isDuplicate) {
  state.prompts.unshift(prompt);
}
```

**Fix — option B (preserve original IDs from JSON export):**
When importing JSON (not Markdown), reuse the original `item.id` if it doesn't already exist in state:
```js
const id = (file.name.endsWith('.json') && item.id && !state.prompts.find(p => p.id === item.id))
  ? item.id
  : crypto.randomUUID();
```

---

## #3 HIGH — `selectedId` ends up pointing to the last-processed import item, not the first

**File:** `app.js:469`

**Problem:**
`mergePrompts` calls `state.prompts.unshift(prompt)` (adds to front) but also sets `selectedId = prompt.id` on every iteration. After the loop ends, `selectedId` is the *last* item processed — but because `unshift` was used, that item ends up at the *bottom* of the imported batch. The user sees the wrong prompt selected after a multi-item import.

**Fix:**
Capture the first imported ID and set `selectedId` once after the loop:
```js
function mergePrompts(prompts) {
  let firstId = null;
  prompts.forEach((item) => {
    const prompt = { ... };
    ensureCategory(prompt.category);
    state.prompts.unshift(prompt);
    if (!firstId) firstId = prompt.id;
  });
  if (firstId) selectedId = firstId;
}
```

---

## #4 HIGH — Score ring border is always teal regardless of risk level

**File:** `styles.css:660–679`, `app.js:262–270`

**Problem:**
The circular score ring is the most visually prominent element in the Safety Audit panel. Its border is hardcoded to `var(--accent-soft)` (teal/green) even when the audit level is "medium" or "high". The badge and sidebar accent correctly turn amber/red, but the ring stays green — giving a false sense of safety.

**Fix — CSS:** Add risk-level classes to the ring and style them:
```css
.score-ring.medium { border-color: var(--amber-soft); }
.score-ring.high   { border-color: var(--red-soft); }
```

**Fix — JS in `renderAudit`:**
```js
els.auditScore.parentElement.className = `score-ring ${audit.level === 'low' ? '' : audit.level}`;
```

---

## #5 HIGH — Markdown import regex silently drops executive summary on mismatch

**File:** `app.js:481`

**Problem:**
```js
const summary = (block.match(/## Executive summary\s+([\s\S]*?)\s+## Prompt/) || [null, ""])[1]?.trim();
```
This regex requires both `## Executive summary` AND `## Prompt` sections to be present and in that exact order. If a Markdown block has extra whitespace, a typo in the heading, or no `## Prompt` section, the summary silently becomes `""`. The prompt body also relies on a similar fence:
```js
const body = (block.match(/```text\s+([\s\S]*?)```/) || [null, block])[1]?.trim();
```
If the code fence language tag is missing or wrong, the entire raw block becomes the body.

**Fix:** Make headings case-insensitive and allow the `## Prompt` anchor to be optional:
```js
const summary = (block.match(/##\s+executive summary\s+([\s\S]*?)(?=\n##|$)/i) || [null, ""])[1]?.trim();
const body = (block.match(/```(?:text)?\s+([\s\S]*?)```/i) || [null, block])[1]?.trim();
```

---

## #6 MEDIUM — No way to delete categories once created

**File:** `app.js:384–390`, `app.js:162–177`

**Problem:**
Categories can be added via the sidebar "+" button or by typing a new name in the editor's category dropdown. But there is no delete path. Over time, misspelled or unused categories accumulate in the sidebar and the dropdown. The only way to clean up is to manually export JSON, edit the `categories` array, and re-import.

**Fix:** Add a delete button next to each non-"All" category in the sidebar. Only show the button when no prompts use that category (or warn and offer to reassign).

---

## #7 MEDIUM — `addCategory` uses browser's native `prompt()` dialog

**File:** `app.js:384–390`

**Problem:**
```js
function addCategory() {
  const category = prompt("Category name");
  ...
}
```
The native `prompt()` dialog is visually jarring (OS-native modal, no styling), blocks the thread, and cannot be dismissed gracefully on mobile. It is inconsistent with the app's own UI patterns.

**Fix:** Replace with an inline input that appears in the sidebar below the "+" button (toggle visibility), or reuse the existing `categoryCustomInput` pattern already present in the editor.

---

## Summary Table

| # | Severity | Problem | Effort to Fix |
|---|----------|---------|---------------|
| 1 | Critical | `saveState()` on every render (performance) | Low |
| 2 | Critical | Import creates silent duplicates | Low–Medium |
| 3 | High | Wrong prompt selected after multi-item import | Low |
| 4 | High | Score ring color ignores risk level | Low |
| 5 | High | Markdown import regex silently drops summary | Low |
| 6 | Medium | No category deletion | Medium |
| 7 | Medium | `addCategory` uses browser `prompt()` | Medium |
