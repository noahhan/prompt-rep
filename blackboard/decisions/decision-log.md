# Decision Log

## 2026-05-31: Use text worklogs only

Decision:

- Keep worklogs as `.txt` only.

Reason:

- Easier for people to read.

## 2026-05-31: Keep app local-first

Decision:

- Keep Prompt Vault offline-first.
- Add online support later through Git sync or backend.

Reason:

- Offline use was a core requirement.
- Public repo needs careful secret handling.

## 2026-05-31: Add LLM Wiki

Decision:

- Use `reaserch/llmwiki/` as the knowledge base.

Reason:

- Prompt engineering knowledge will grow over time.
- Agents need a shared knowledge source.

## 2026-05-31: Add Agent Blackboard

Decision:

- Use `blackboard/` for agent collaboration.

Reason:

- Different agents need one shared place for context, notes, tasks, and decisions.
