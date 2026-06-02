# Open Tasks

This list keeps only tasks that are worth tracking now.

## Urgent

- Revoke the GitHub token that was found in local `.env`.

Reason:

- It was not committed, but it was exposed to a local review note before being redacted.
- This must be done in GitHub by the token owner.

## Necessary Next

- Create an IndexedDB migration plan for larger prompt libraries.
- Keep JSON export/import as the human-readable backup path.
- Decide how `localStorage` data will migrate without losing current prompts.

Reason:

- Current `localStorage` is fine for small use.
- Larger prompt libraries need safer browser storage.
- Planning first lowers the risk of data loss.

## Useful After Storage

- Move audit rules into a configurable data file.
- Add more audit rules only after the current rule structure is configurable.
- Improve mobile editor workflow.

Reason:

- Audit rules will change over time.
- Mobile editing is useful, but desktop/local use is already good enough for now.

## Optional Later

- Add Git sync or online sync.
- Add keyboard shortcuts.
- Add favorite/star prompts.
- Add bulk actions.
- Add theme options.
- Add build/lint tooling.

Reason:

- These are useful, but not required for the current local-first version.

## Deferred

- Split `app.js` into smaller modules.
- Convert scripts to ES modules.
- Group top-level mutable state into one state object.

Reason:

- These are engineering cleanup tasks.
- The user decided they are not necessary right now.
- Revisit when the app grows or becomes hard to maintain.

## Removed From Active Tasks

- Remove old audit `quality*` aliases: done.
- Stop unchanged startup `localStorage` writes: done.
- Replace native alerts/confirms with in-app UI: done.
