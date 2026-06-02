# Online Support Plan

Prompt Vault is local now. That is good for privacy and offline use.

To support online use, we should add sync as an optional layer.

## Option 1: Git Sync

Best first step.

How it works:

- Keep prompts as JSON or Markdown files.
- Use Git for history.
- Use GitHub, GitLab, or a private Git server for sync.

Pros:

- Simple.
- Good version history.
- Easy backup.
- Works offline first.

Cons:

- Not ideal for non-technical users.
- Conflict handling needs care.

## Option 2: Small Backend

How it works:

- Add an API server.
- Store prompts in SQLite or Postgres.
- Add login.
- Sync from browser to server.

Pros:

- Better for normal users.
- Can support teams.

Cons:

- More work.
- Needs hosting.
- Needs authentication and security.

## Option 3: Local First Database

How it works:

- Use a local-first sync library.
- Data works offline.
- Sync happens when online.

Pros:

- Best user experience.
- Keeps offline support.

Cons:

- More complex.

## Recommendation

Start with safer local storage before sync.

Keep online support optional. The offline app should continue working without login or network.

Immediate local-first step:

1. Review `blackboard/decisions/indexeddb-migration-plan.md`.
2. Keep JSON export/import as backup.
3. Migrate browser storage from `localStorage` to IndexedDB.
4. Keep `localStorage` fallback for one app version.

After local storage is stable, consider Git sync or file-based backup.

Possible sync implementation:

1. Export prompts to `data/prompts.json`.
2. Save prompt versions to files.
3. Commit changes with Git.
4. Use the worklog hook after commits.
5. Later add real cloud sync if needed.

Safety rule:

- Never put GitHub tokens or API keys in frontend code.
- Never commit `.env`.
- For public repositories, assume all committed files are visible to everyone.
