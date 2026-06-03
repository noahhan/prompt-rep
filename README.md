# Prompt Vault

Prompt Vault is a local-first prompt repository.

It helps users save, edit, organize, audit, preview, import, and export prompts. It works offline and stores data in the browser by default.

## Current Features

- Save and edit prompts.
- Organize prompts by category and tags.
- Use reusable `{placeholder}` variables.
- Search prompts from the left sidebar.
- See all prompts in the Overview card view.
- Expand categories and select prompts inside each category.
- Edit prompt body in Markdown mode.
- Read prompt body in Preview mode.
- Run safety audit from the Audit tab.
- See safety score, risk factors, quality factors, checks, suggestions, placeholders, and export warning.
- Configure audit risk rules from `data/audit-rules.json`.
- Keep version history for each prompt.
- Import and export JSON or Markdown.
- Use 17 starter prompts based on the prompt-engineering research folder.
- Store prompts in IndexedDB with a localStorage fallback.
- Run offline with no backend.

## Run

Open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/index.html
```

Current local test link:

```text
http://127.0.0.1:8000/index.html
```

## Starter Prompt Library

The starter library lives in `data/prompts.json`.

It currently includes 17 prompts across:

- Prompt Engineering
- Business
- Research
- Coding
- Writing
- Data
- Analysis

Existing local users receive the starter prompts once through a merge step. This does not overwrite saved local prompts.

## Notes

- No network or backend is required.
- Data stays in the current browser profile until exported or cleared.
- IndexedDB is the main local store. localStorage is kept as a fallback for this version.
- JSON exports preserve history. Markdown exports are portable summaries of the current prompts.
- When served locally, the app can load starter prompts from `data/prompts.json`.
- Audit risk rules are stored in `data/audit-rules.json`.
- Template metadata is stored in `data/templates.json`.
- For Git sync later, export JSON and replace `data/prompts.json` with the exported prompt data.

## Public Repository Safety

The GitHub repository is public.

Never commit:

- `.env`
- GitHub tokens
- API keys
- private prompt data
- screenshots that include secrets
