# Open Tasks

## Urgent (Security)

- Revoke GitHub token in `.env` immediately at GitHub → Settings → Personal access tokens. Not committed to git, but must be rotated as a precaution.
- Delete or replace `.env` with a comment-only template after revoking.

## High Priority

- Remove dead backwards-compat aliases from `audit-core.js`: `qualityPenalties`, `qualityChecks`, `qualityPenaltyTotal`. Clean up matching fallback reads in `app.js` lines 588–627.
- Make `loadDataFileIfEmpty()` return a `changed` flag so `initApp()` does not call `saveState()` on every page load when nothing changed.
- When splitting `app.js`: group the 16 top-level `let` variables into a single state object.
- When splitting `app.js`: convert to ES modules (`type="module"`) to replace `window` globals.
- Add IndexedDB migration plan for larger prompt libraries.
- Add better persistent storage plan for larger prompt libraries.
- Add Git sync plan or command workflow.

## Medium Priority

- Add more LLM Wiki examples.
- Add more safety audit rules.
- Improve mobile editor workflow.
- Move safety audit rules into configurable data instead of hardcoded regex rules.
- Add optional online sync plan that is safe for a public repository.
- Create a simple centralized state update pattern to reduce direct global mutation.

## Low Priority

- Add theme options.
- Add keyboard shortcuts.
- Add prompt favorite/star feature.
- Add build/lint/test tooling when the app starts to grow beyond static files.
- Add bulk actions for export, category move, and cleanup.
- Split `app.js` into smaller modules later, when the user wants it or the file becomes harder to maintain.
