# Initial Perspectives

Date: 2026-05-31

## Product

Prompt Vault should help users not only save prompts, but choose better prompts for each task.

## UX

Earlier idea:

- Better empty state
- More visible guide section
- Better mobile editor navigation

Current update:

- The prompt guide section was removed later.
- Useful guidance now lives in starter prompts and the LLM Wiki.
- Mobile editor navigation is still a good future improvement.

## Prompt Engineering

The LLM Wiki is now the knowledge base.

Important patterns:

- Persona
- Context block
- Few-shot
- Output format
- Concise reasoning
- Safety check

## Security

The repository is public.

Rules:

- Do not commit `.env`.
- Do not print tokens.
- Scan before pushing.

## Engineering

The app is still local-first.

Good next technical step:

- Plan safer browser storage with IndexedDB.
- Later add Git sync or optional online sync.
