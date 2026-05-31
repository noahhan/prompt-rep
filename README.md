# Prompt Vault

Prompt Vault is a repository to manage, store, and share prompts for improving AI outcomes.

It is a local, offline prompt repository. It stores prompts in browser `localStorage`, supports editing, category/tag organization, reusable `{placeholder}` variables, safety auditing, JSON/Markdown import and export, executive summaries, and restorable version history.

## Run

Open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

- No network or backend is required.
- Data stays in the current browser profile until exported or cleared.
- JSON exports preserve history. Markdown exports are portable summaries of the current prompts.
- When served locally, the app can load starter prompts from `data/prompts.json`.
- Template metadata is stored in `data/templates.json`.
- For Git sync later, export JSON and replace `data/prompts.json` with the exported prompt data.
