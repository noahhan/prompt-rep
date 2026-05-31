# LLM Wiki Log

## [2026-05-31] setup | LLM Wiki created

Created first wiki structure:

- Raw and source folders
- Concept pages
- Task playbooks
- Meta instructions
- Index
- Log

Reason:

- The app needs a maintained prompt-engineering knowledge base.
- The wiki should grow over time instead of only using one-time research notes.

## [2026-05-31] source | Karpathy LLM Wiki pattern

Added design ideas from Andrej Karpathy's LLM Wiki gist.

Useful ideas:

- Raw sources should be immutable.
- The wiki should be a persistent markdown layer.
- The LLM should maintain summaries, links, contradictions, and updates.
- `index.md` helps navigation.
- `log.md` gives a timeline.

## [2026-05-31] app | Starter prompt library created

Used the wiki concepts and playbooks to create the first app starter library.

Result:

- 17 starter prompts added to `data/prompts.json`.
- Categories include prompt engineering, business, research, coding, writing, data, and analysis.
- Existing local users receive starter prompts once through a merge step.
