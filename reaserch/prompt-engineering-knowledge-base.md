# Prompt Engineering Knowledge Base

This document summarizes prompt-engineering patterns that should be available offline inside Prompt Vault. The goal is practical guidance: help a user choose the right prompt structure for the task they actually want to complete.

## Core Principles

1. Be explicit about the task.
   - State the objective, context, constraints, and success criteria.
   - Put important instructions early and avoid mixing unrelated goals.

2. Give the model a useful role or persona.
   - Persona helps when the task requires domain judgment, tone, or review criteria.
   - Example: `You are a senior product strategist reviewing a launch plan for risks and tradeoffs.`

3. Provide context and delimiters.
   - Put source material between clear boundaries such as triple quotes or XML-style tags.
   - This reduces ambiguity between instructions and user-provided content.

4. Use reusable variables.
   - Prompt Vault should encourage placeholders like `{audience}`, `{source_text}`, `{tone}`, `{format}`, `{constraints}`, and `{examples}`.

5. Ask for a specific output format.
   - Define sections, bullet rules, tables, JSON shape, Markdown headings, or schemas.
   - This is especially useful for extraction, automation, and repeatable workflows.

6. Use examples when the desired behavior is hard to describe.
   - Few-shot examples help with classification, style transfer, extraction, and formatting.
   - Keep examples representative and avoid conflicting labels or formats.

7. For complex reasoning, request an approach without requiring hidden chain-of-thought.
   - Prefer: `Think through the problem privately, then return the answer with a concise rationale and key assumptions.`
   - Avoid asking the model to reveal exhaustive private reasoning. Use a visible checklist, plan, or verification summary instead.

8. Add verification instructions.
   - Ask the model to check constraints, cite uncertainty, list assumptions, or validate output against a rubric.
   - This is useful for safety audits, data extraction, code review, and executive summaries.

## Pattern Library

### Persona

Use when the task benefits from expertise, tone, or judgment.

Template:

```text
You are a {role}. Your job is to {task_goal} for {audience}.
Use the following criteria: {criteria}.
```

### Context Block

Use when source material is long or could be confused with instructions.

Template:

```text
Task: {task}

Context:
"""
{source_text}
"""

Use only the context above unless you clearly label outside assumptions.
```

### Few-Shot Examples

Use for classification, extraction, tone matching, or custom formats.

Template:

```text
Follow these examples.

Example 1
Input: {example_input_1}
Output: {example_output_1}

Example 2
Input: {example_input_2}
Output: {example_output_2}

Now process:
{new_input}
```

### Output Format

Use whenever the result will be compared, copied, parsed, or reused.

Template:

```text
Return the answer in this format:

## Summary
- {summary_rule}

## Details
- {detail_rule}

## Next actions
- {action_rule}
```

### Stepwise Plan

Use for multi-step work, but ask for concise visible reasoning.

Template:

```text
First, identify the best approach. Then complete the task.
Return:
1. Final answer
2. Key assumptions
3. Concise rationale
4. Checks performed
```

### Rubric / Evaluation

Use for review, audit, ranking, or quality control.

Template:

```text
Evaluate {item} using this rubric:
- Correctness: {correctness_definition}
- Completeness: {completeness_definition}
- Safety: {safety_definition}
- Clarity: {clarity_definition}

Return findings ordered by severity.
```

### Safety Boundary

Use when prompts touch private data, code execution, policy, credentials, or destructive changes.

Template:

```text
Before answering, check for sensitive data, unsafe instructions, or missing authorization.
If there is risk, explain the risk and provide a safer alternative.
```

## Task Playbooks

### Executive Summary

Recommended patterns:
- Persona
- Context block
- Output format
- Verification checklist

Useful placeholders:
- `{audience}`
- `{source_notes}`
- `{decision_context}`
- `{desired_length}`

### Code Review

Recommended patterns:
- Persona
- Rubric
- Severity ordering
- Safety boundary

Useful placeholders:
- `{language}`
- `{diff}`
- `{file_path}`
- `{risk_tolerance}`

### Research Synthesis

Recommended patterns:
- Context block
- Evidence table
- Uncertainty labeling
- Output format

Useful placeholders:
- `{research_question}`
- `{sources}`
- `{scope}`
- `{time_period}`

### Data Extraction

Recommended patterns:
- Few-shot examples
- Strict output schema
- Delimiters
- Validation rules

Useful placeholders:
- `{source_text}`
- `{schema}`
- `{examples}`
- `{empty_value_rule}`

### Writing / Editing

Recommended patterns:
- Persona
- Audience and tone
- Examples
- Revision constraints

Useful placeholders:
- `{audience}`
- `{tone}`
- `{draft}`
- `{style_reference}`

## Sources

- OpenAI Prompt Engineering Guide: https://platform.openai.com/docs/guides/prompt-engineering
- Anthropic Prompt Engineering Overview: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Anthropic Chain-of-Thought Guidance: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought
- Google Gemini Prompting Strategies: https://ai.google.dev/gemini-api/docs/prompting-strategies
- Microsoft Azure OpenAI Prompt Engineering Concepts: https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/prompt-engineering
