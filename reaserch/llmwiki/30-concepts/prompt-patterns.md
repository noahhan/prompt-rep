# Prompt Patterns

## Persona

What it is:

- Give the model a role.
- Example: `You are a senior product manager.`

Use when:

- Tone matters.
- Expert judgment matters.
- Review criteria matter.

Do not overuse when:

- The task is simple extraction or formatting.

Template:

```text
You are a {role}. Help {audience} complete {task}.
Use these criteria: {criteria}.
```

## Context Block

What it is:

- Put source material in a clear block.

Use when:

- The model must use specific notes, text, or data.
- You want to reduce confusion between instruction and content.

Template:

```text
Task: {task}

Context:
"""
{source_text}
"""

Use only the context above unless you label outside assumptions.
```

## Few-Shot

What it is:

- Give examples of input and output.

Use when:

- You need a special style.
- You need classification.
- You need strict extraction.

Template:

```text
Example 1
Input: {example_input}
Output: {example_output}

Now process:
{new_input}
```

## Output Format

What it is:

- Tell the model exactly how to return the answer.

Use when:

- The result will be copied.
- The result will be parsed.
- The result must be easy to compare.

Template:

```text
Return:
## Summary
- ...

## Details
- ...

## Next actions
- ...
```

## Concise Reasoning

What it is:

- Ask the model to think privately and show only useful rationale.

Use when:

- The task is complex.
- You need confidence and assumptions.

Template:

```text
Think privately. Return:
1. Final answer
2. Key assumptions
3. Concise rationale
4. Checks performed
```

## Safety Check

What it is:

- Ask the model to detect risk before answering.

Use when:

- The prompt touches private data.
- The task touches credentials.
- The task could be destructive.
- The task is security-related.

Template:

```text
Before answering, check for sensitive data, unsafe instructions, or missing authorization.
If there is risk, explain it and give a safer option.
```
