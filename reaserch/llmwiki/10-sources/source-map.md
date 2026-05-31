# Source Map

## Andrej Karpathy LLM Wiki Gist

URL: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

Date added: 2026-05-31

Main idea:

- Keep a local markdown knowledge base.
- Let LLMs read, write, and improve it.
- Use structure so knowledge can grow over time.

How we use it:

- `llmwiki/` stores prompt-engineering knowledge.
- `90-meta/wiki-instructions.md` tells future LLMs how to update it.
- `40-playbooks/` stores practical task guides for the app.

## OpenAI Prompt Engineering Guide

URL: https://platform.openai.com/docs/guides/prompt-engineering

Main ideas:

- Write clear instructions.
- Provide reference text.
- Split complex tasks into simpler steps.
- Give the model time or structure to reason.
- Use external tools or checks when needed.

## Anthropic Prompt Engineering Docs

URL: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview

Main ideas:

- Use clear task descriptions.
- Use examples.
- Use XML-style tags or delimiters for structure.
- Ask for specific output format.

## Google Gemini Prompting Strategies

URL: https://ai.google.dev/gemini-api/docs/prompting-strategies

Main ideas:

- Give clear instructions and constraints.
- Add examples for desired output.
- Specify output format.
- Break complex tasks into steps.

## Microsoft Azure OpenAI Prompt Engineering Concepts

URL: https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/prompt-engineering

Main ideas:

- Use system messages and examples.
- Add grounding context.
- Be specific about desired output.
- Iterate prompts based on results.
