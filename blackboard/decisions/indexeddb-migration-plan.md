# IndexedDB Migration Plan

Date: 2026-06-02

Status: Implemented on 2026-06-03.

## Goal

Move Prompt Vault from `localStorage` to IndexedDB without losing current user prompts.

Keep the app offline-first.

## Why

`localStorage` is simple and works now, but it has limits:

- Small storage size.
- Synchronous writes can block the UI.
- No indexes for larger prompt libraries.
- Harder future migration path.

IndexedDB is better for larger local data.

## Current Data

Current key:

- `prompt-vault:v1`

Current shape:

```json
{
  "categories": [],
  "prompts": []
}
```

Prompt shape:

- `id`
- `title`
- `category`
- `tags`
- `summary`
- `body`
- `createdAt`
- `updatedAt`
- `history`

Starter library key:

- `prompt-vault:starter-library-version`

## Target IndexedDB Shape

Database name:

- `prompt-vault`

Database version:

- `1`

Object stores:

- `metadata`
- `categories`
- `prompts`

### `metadata`

Use for app-level values:

- `schemaVersion`
- `starterLibraryVersion`
- `migratedFromLocalStorageAt`
- `lastExportReminderAt`

### `categories`

Key:

- category name

Fields:

- `name`
- `createdAt`
- `updatedAt`

### `prompts`

Key:

- `id`

Indexes:

- `category`
- `updatedAt`
- `title`

Fields:

- Same as current prompt shape.

## Migration Rule

On app load:

1. Open IndexedDB.
2. Check `metadata.schemaVersion`.
3. If IndexedDB has prompts, use IndexedDB.
4. If IndexedDB is empty and `localStorage` has `prompt-vault:v1`, copy data into IndexedDB.
5. After successful copy, keep `localStorage` as fallback for one app version.
6. Set `metadata.migratedFromLocalStorageAt`.
7. Continue using IndexedDB as the source of truth.

Do not delete `localStorage` during the first migration release.

## Backup Rule

Keep JSON export/import.

Reason:

- Human-readable backup.
- Easy move between browsers.
- Safe recovery if IndexedDB data is damaged.

Recommended UI copy:

```text
JSON backup includes all saved prompts and history.
Keep one backup before storage migration.
```

## Failure Handling

If IndexedDB open fails:

- Fall back to `localStorage`.
- Show an in-app warning.
- Keep export working.

If migration fails:

- Do not modify `localStorage`.
- Show an in-app warning.
- Ask user to export JSON backup before retrying.

If imported data is invalid:

- Do not write partial data.
- Show import error notice.

## Implementation Steps

1. Add `storage-core.js`. Done.
2. Add small IndexedDB wrapper. Done:
   - `openDatabase`
   - `readIndexedState`
   - `writeIndexedState`
   - `readMetadata`
   - `writeMetadata`
3. Add migration from `localStorage`. Done.
4. Keep current `state` shape in memory. Done.
5. Replace `loadState()` and `saveState()` internals only. Done.
6. Keep existing UI behavior unchanged. Done.
7. Add tests for migration helpers where possible. Done for normalization and local fallback.
8. Run browser test:
   - first load with only `localStorage`
   - reload after migration
   - save prompt
   - import/export
   - empty category remove

## Do Not Do Yet

- Do not add online sync.
- Do not remove JSON export.
- Do not delete `localStorage` immediately after migration.
- Do not split `app.js` only for this migration.

## Success Criteria

- Existing saved prompts appear after migration.
- Prompt history remains.
- Categories remain.
- Starter prompts still merge once.
- Export JSON still includes all prompts and history.
- App still works offline.
- If IndexedDB fails, user can still export current data.
