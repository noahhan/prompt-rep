# Prompt Vault Blackboard

_Last updated: 2026-06-01_

This file is the root summary for important project status.

For detailed collaboration notes, use the `blackboard/` folder.

## Current Status

Prompt Vault is now a usable local-first prompt repository.

Main user flow:

1. Open the app.
2. Use Overview to see all prompts as cards.
3. Use Categories to expand a category and select a prompt.
4. Edit the prompt in Markdown mode.
5. Check the rendered Preview.
6. Use the Audit tab when safety or quality review is needed.
7. Save, export, import, or restore history when needed.

## Completed Critical Fixes

The earlier critical issues were fixed on 2026-05-31:

- `render()` no longer writes to `localStorage` on normal read-only renders.
- Search and sort no longer trigger unnecessary storage writes.
- Import skips exact duplicate prompts.
- Multi-prompt import selects the first imported prompt correctly.
- Markdown import handles headings and code fences more safely.
- Safety score ring changes by risk level.
- New prompts stay as drafts until saved.
- Unsaved edits are protected before switching prompts.
- Category creation uses an inline form instead of browser `prompt()`.
- Empty categories can be removed safely.
- Import/export safety uses in-app notices.
- Unsaved edit navigation uses an in-app modal instead of browser `confirm()`.

## Current UI Decisions

- The middle Prompts area was removed to give the editor more room.
- Overview is a top-level left menu title, same level as Categories.
- Categories expand by clicking the category row.
- Separate expand arrows and category delete icons were removed.
- Audit is an editor tab, not a permanent large side area.
- Markdown and Preview use equal panel height.
- The interface should stay clean: fewer icons, fewer boxes, less heavy rounding.

## Current Starter Library

The app now includes 17 starter prompts from the research knowledge base.

Categories:

- Prompt Engineering
- Business
- Research
- Coding
- Writing
- Data
- Analysis

Existing local users receive these starter prompts once. Saved local prompts are not overwritten.

## Current Risks

High priority:

- State is still mostly global and mutable.
- `localStorage` is fine for now, but IndexedDB is better for larger libraries.
- Online sync is not built yet.

Medium priority:

- Audit rules are useful but still hardcoded.
- Mobile editing can be improved.
- Public repository safety must stay strict. Never commit `.env`, tokens, or secrets.

## Next Good Steps

1. Add a safer data layer plan: IndexedDB first, optional sync later.
2. Add configurable audit rules.
3. Improve mobile editor flow.
4. Create a clear Git sync or online sync design before implementation.
5. Defer `app.js` module split until the app grows more or the user asks for it.
