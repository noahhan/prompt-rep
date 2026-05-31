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

## 2026-05-31: Use Overview plus expandable Categories

Decision:

- Use Overview as the all-prompts card view.
- Use expandable Categories as the main prompt navigation.
- Remove the duplicate middle Prompts area.

Reason:

- The editor needs more space.
- Duplicate lists made the workflow feel redundant.
- Overview and Categories are easier to understand as top-level left menu sections.

## 2026-05-31: Put Audit inside editor tabs

Decision:

- Keep Audit as an editor tab.
- Do not show the audit area as permanent large space.

Reason:

- Prompt writing needs broad space.
- Audit is important, but it is not needed for every editing moment.

## 2026-05-31: Add starter prompt library

Decision:

- Add 17 starter prompts from the research knowledge base.
- Merge starter prompts once for existing local users.

Reason:

- New users need useful examples immediately.
- Existing users should not lose local saved prompts.
