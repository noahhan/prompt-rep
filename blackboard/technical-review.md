## Technical Review: Prompt Vault (Structural Perspective)

**Original review date:** 2026-05-31

**Updated:** 2026-06-04

**Reviewer:** Gemini CLI, reviewed against current project state

### Current Status

Prompt Vault is now a stronger local-first app.

Completed improvements:

- Read-only renders no longer write to storage.
- Import has duplicate protection.
- Markdown import is safer.
- New prompts are draft-first.
- The UI has Overview, expandable Categories, editor tabs, Preview, Audit, History, tooltips, and prompt body copy.
- The app includes a 17-prompt starter library.
- Import/export and unsaved-change flows use in-app UI instead of browser-native dialogs.
- Deprecated audit `quality*` aliases were removed.
- Startup no longer writes unchanged existing state.
- IndexedDB is now the main local storage.
- Existing `localStorage` prompts migrate into IndexedDB on load.
- `localStorage` remains only as a fallback for this version.

### Overall Assessment

Prompt Vault is a usable local-first prompt repository.

The largest previous storage risk is now mostly resolved by `storage-core.js`.

The remaining risks are mainly maintainability risks:

- `app.js` is still large.
- UI rendering and application state are still tightly coupled.
- Audit rules are still hardcoded.
- There is no build or module system.

These are real risks for future growth, but they are not all urgent for the current local-first version.

### Current Risk Review

#### 1. Global Mutable State Management

**Status:** Still true.

**Observation:**

The app still keeps the main application state in global mutable variables in `app.js`.

Examples:

- `state`
- `selectedId`
- `selectedCategory`
- `activeEditorTab`
- `workspaceView`

**Risk:**

This is acceptable for the current app size, but it will become harder to debug as the app grows.

**Recommendation:**

Defer a full state-management rewrite.

When the app grows, introduce a small local store with clear update functions before adding bigger features.

#### 2. Broad Direct DOM Rendering

**Status:** Still true.

**Observation:**

`render()` still updates many UI areas together:

- categories
- tags
- overview
- editor
- tabs
- icons

Several render functions also write HTML through `innerHTML`.

**Risk:**

This can make future UI changes more fragile.

**Recommendation:**

Do not rewrite the full UI now.

If a future feature touches one area heavily, extract that area first. Good first candidates:

- overview rendering
- category rendering
- editor rendering

#### 3. Browser Storage

**Status:** Mostly resolved.

**Original issue:**

The app used `localStorage` as the main database.

**Current state:**

The app now uses IndexedDB as the main local store.

`localStorage` is still written as a fallback for this version.

**Remaining risk:**

The app still writes the whole prompt state on save.

This is acceptable for now, but very large prompt libraries may need per-prompt writes later.

**Recommendation:**

Keep current storage.

Next storage improvement, only if needed:

- write one changed prompt instead of rewriting all prompts
- add a manual backup reminder
- keep JSON export as the human-readable recovery path

#### 4. Monolithic `app.js`

**Status:** Still true, intentionally deferred.

**Observation:**

`app.js` remains the largest and most coupled file.

Some logic has already been moved out:

- `audit-core.js`
- `import-core.js`
- `storage-core.js`

**Risk:**

More features will make `app.js` harder to navigate.

**Recommendation:**

Do not split `app.js` only for style.

Split only when a concrete feature needs it.

Practical next split:

- move audit rules/config out first
- then consider `render-categories.js`, `render-overview.js`, or `editor-actions.js`

#### 5. Error Handling

**Status:** Improved, but not complete.

**Observation:**

Many important flows now use `showNotice()` and modals.

Examples:

- import errors
- export warnings
- storage warnings
- copy errors
- unsaved changes
- delete confirmation

**Remaining risk:**

There is no central error logger.

Some lower-level failures still only show a short message.

**Recommendation:**

Keep the current approach for local-first use.

If online sync is added, add clearer error states and retry messages.

#### 6. Hardcoded Audit Rules

**Status:** Still true.

**Observation:**

Audit rules are still hardcoded in `audit-core.js`.

**Risk:**

Changing audit logic requires code changes.

Users cannot tune rules for their own workflow.

**Recommendation:**

This is the best next engineering task.

Move audit rule data into a small config file, for example:

- `data/audit-rules.json`

Keep the scoring code in `audit-core.js`.

This gives better maintainability without a large refactor.

#### 7. Build System and Module System

**Status:** Still deferred.

**Observation:**

The app is still plain HTML, CSS, and JavaScript loaded by script tags.

**Risk:**

This limits dependency management and build-time checks.

**Recommendation:**

Do not add a build system yet.

The current static app is easy to run offline.

Add build tooling only if one of these becomes true:

- the app needs more third-party libraries
- modules become hard to manage through script tags
- automated bundling/minification becomes important
- online deployment requires a build step

### Necessary Tasks

Current necessary tasks:

1. Keep JSON export/import as the backup path.
2. Move audit rules into a configurable data file.
3. Test IndexedDB migration with real user browser data.

### Deferred Tasks

These are useful, but not necessary now:

- Split `app.js`.
- Add a frontend framework.
- Add a build system.
- Add online sync.
- Add advanced state management.

### Recommended Next Step

Implement configurable audit rules.

Reason:

- It directly addresses a current technical risk.
- It is small enough to do safely.
- It improves the Audit tab without changing the whole app architecture.
