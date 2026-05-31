# Prompt Vault

Prompt Vault is a local, offline prompt repository. It stores prompts in browser `localStorage`, supports editing, category/tag organization, reusable `{placeholder}` variables, safety auditing, JSON/Markdown import and export, executive summaries, and restorable version history.

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
