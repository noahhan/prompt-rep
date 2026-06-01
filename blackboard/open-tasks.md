# UX/UI Review for Prompt Vault

Date: 2026-05-31

Reviewer: Gemini CLI perspective, updated after UI changes.

## Current Impression

Prompt Vault now feels more focused and less crowded.

Strong points:

- Overview gives a clear all-prompts card view.
- Categories work as the main left-side navigation.
- The editor has more space because the duplicate Prompts area was removed.
- Markdown and Preview tabs make prompt reading easier.
- Audit is available when needed, but it does not permanently consume screen space.
- The interface is cleaner after reducing icons, boxes, and heavy rounded controls.

## Completed UX Improvements

- Removed the old middle Prompts list.
- Added Overview card view.
- Made category rows expandable by click.
- Removed separate `>` expand buttons.
- Removed category row delete icons.
- Added empty-category state with safe remove action.
- Removed redundant audit status text.
- Added Audit as a tab.
- Added Markdown and Preview tabs.
- Matched Markdown and Preview panel heights.
- Simplified editor tab and icon placement.
- Removed Overview icon and styled Overview like the Categories title level.
- Reduced heavy button styling for Save and Refresh.

## Still Worth Improving

High value:

- Improve mobile editing flow.
- Add keyboard shortcuts for Save, New prompt, Search, and Preview.
- Add favorites or pinned prompts.

Medium value:

- Add bulk actions for export, category move, and cleanup.
- Add compact and comfortable density options.
- Add a clear settings area for storage, import/export, and future sync.

Low value:

- Add theme options after the core workflow is stable.
- Add drag-and-drop later, only if users need it.

## UX Principle

Keep the app quiet and practical.

Do not add decoration unless it improves scanning, decision-making, or editing comfort.
