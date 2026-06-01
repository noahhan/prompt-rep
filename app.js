const STORAGE_KEY = "prompt-vault:v1";
const STARTER_LIBRARY_KEY = "prompt-vault:starter-library-version";
const STARTER_LIBRARY_VERSION = "2026-05-31-prompt-engineering-library";

const icons = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>',
  layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 18 6-6-6-6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-5"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 20h14"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></svg>',
  "file-text": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/></svg>',
  database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
  "wifi-off": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m2 2 20 20"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M5 13a10 10 0 0 1 5-2.7M14 10.4A10 10 0 0 1 19 13"/><path d="M2 8.8a15 15 0 0 1 6.3-3M12 5a15 15 0 0 1 10 3.8"/><path d="M12 20h.01"/></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 16h6v6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 8h-6V2"/></svg>'
};

const els = {
  categoryList: document.querySelector("#categoryList"),
  tagList: document.querySelector("#tagList"),
  overviewButton: document.querySelector("#overviewButton"),
  overviewCount: document.querySelector("#overviewCount"),
  overviewPanel: document.querySelector("#overviewPanel"),
  overviewStats: document.querySelector("#overviewStats"),
  overviewList: document.querySelector("#overviewList"),
  searchInput: document.querySelector("#searchInput"),
  editorColumn: document.querySelector(".editor-column"),
  editorEmptyState: document.querySelector("#editorEmptyState"),
  form: document.querySelector("#promptForm"),
  titleInput: document.querySelector("#titleInput"),
  editorStatus: document.querySelector("#editorStatus"),
  categorySelect: document.querySelector("#categorySelect"),
  categoryCustomInput: document.querySelector("#categoryCustomInput"),
  tagsInput: document.querySelector("#tagsInput"),
  summaryInput: document.querySelector("#summaryInput"),
  bodyInput: document.querySelector("#bodyInput"),
  bodyViewButtons: document.querySelectorAll("[data-body-view]"),
  bodyMarkdownPanel: document.querySelector("#bodyMarkdownPanel"),
  bodyPreviewPanel: document.querySelector("#bodyPreviewPanel"),
  placeholderList: document.querySelector("#placeholderList"),
  auditScore: document.querySelector("#auditScore"),
  auditBreakdown: document.querySelector("#auditBreakdown"),
  auditDetails: document.querySelector("#auditDetails"),
  auditFindings: document.querySelector("#auditFindings"),
  refreshAuditButton: document.querySelector("#refreshAuditButton"),
  historyList: document.querySelector("#historyList"),
  restoreButton: document.querySelector("#restoreButton"),
  storageStatus: document.querySelector("#storageStatus"),
  newPromptButton: document.querySelector("#newPromptButton"),
  addCategoryButton: document.querySelector("#addCategoryButton"),
  categoryForm: document.querySelector("#categoryForm"),
  categoryNameInput: document.querySelector("#categoryNameInput"),
  cancelCategoryButton: document.querySelector("#cancelCategoryButton"),
  duplicateButton: document.querySelector("#duplicateButton"),
  deleteButton: document.querySelector("#deleteButton"),
  importButton: document.querySelector("#importButton"),
  importFile: document.querySelector("#importFile"),
  exportJsonButton: document.querySelector("#exportJsonButton"),
  exportMdButton: document.querySelector("#exportMdButton"),
  importPreviewModal: document.querySelector("#importPreviewModal"),
  importPreviewBody: document.querySelector("#importPreviewBody"),
  confirmImportButton: document.querySelector("#confirmImportButton"),
  cancelImportButton: document.querySelector("#cancelImportButton"),
  cancelImportTextButton: document.querySelector("#cancelImportTextButton"),
  deletePromptModal: document.querySelector("#deletePromptModal"),
  deletePromptName: document.querySelector("#deletePromptName"),
  confirmDeleteButton: document.querySelector("#confirmDeleteButton"),
  cancelDeleteButton: document.querySelector("#cancelDeleteButton"),
  cancelDeleteTextButton: document.querySelector("#cancelDeleteTextButton"),
  appNotice: document.querySelector("#appNotice"),
  editorTabButtons: document.querySelectorAll("[data-editor-tab]"),
  promptTabPanel: document.querySelector("#promptTabPanel"),
  auditTabPanel: document.querySelector("#auditTabPanel"),
  historyTabPanel: document.querySelector("#historyTabPanel")
};

const { auditPrompt, getPlaceholders } = window.PromptVaultAudit;
const importCore = window.PromptVaultImport;

let state = loadState() || makeSeedState();
let selectedId = state.prompts[0]?.id || null;
let selectedCategory = state.prompts[0]?.category || state.categories[0] || null;
let selectedTag = null;
let selectedVersionIndex = null;
let pendingImportPrompts = [];
let pendingDeletePromptId = null;
let draftPrompt = null;
let hasUnsavedChanges = false;
let categoryFormOpen = false;
let activeEditorTab = "prompt";
let activeBodyView = "markdown";
let workspaceView = "editor";
let noticeTimer = null;
const expandedCategories = new Set([state.prompts[0]?.category].filter(Boolean));

function makeSeedState() {
  const now = new Date().toISOString();
  return {
    categories: ["Writing", "Research", "Coding", "Business"],
    prompts: [
      {
        id: crypto.randomUUID(),
        title: "Executive summary builder",
        category: "Business",
        tags: ["summary", "strategy"],
        summary: "Turns long notes into a concise executive summary with decisions and risks.",
        body: "Create an executive summary for {audience} from the notes below. Include context, key findings, risks, recommended next actions, and open questions.\n\nNotes:\n{source_notes}",
        createdAt: now,
        updatedAt: now,
        history: []
      },
      {
        id: crypto.randomUUID(),
        title: "Safe code review",
        category: "Coding",
        tags: ["review", "security"],
        summary: "Reviews a code diff for correctness, safety, regressions, and missing tests.",
        body: "Review this {language} change. Prioritize security issues, data loss, regressions, and missing tests. Return findings first with file and line references.\n\nDiff:\n{diff}",
        createdAt: now,
        updatedAt: now,
        history: []
      }
    ]
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      categories: Array.isArray(parsed.categories) ? parsed.categories : [],
      prompts: Array.isArray(parsed.prompts) ? parsed.prompts : []
    };
  } catch {
    return null;
  }
}

async function loadDataFileIfEmpty() {
  try {
    const response = await fetch("./data/prompts.json", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    const prompts = Array.isArray(data.prompts) ? data.prompts : [];
    if (!prompts.length) return;
    if (localStorage.getItem(STORAGE_KEY)) {
      if (localStorage.getItem(STARTER_LIBRARY_KEY) === STARTER_LIBRARY_VERSION) return;
      mergeStarterLibrary(data);
      localStorage.setItem(STARTER_LIBRARY_KEY, STARTER_LIBRARY_VERSION);
      return;
    }
    state = {
      categories: Array.isArray(data.categories) ? data.categories : [...new Set(prompts.map((prompt) => prompt.category).filter(Boolean))],
      prompts
    };
    selectedId = state.prompts[0]?.id || null;
    selectedCategory = state.prompts[0]?.category || state.categories[0] || null;
    localStorage.setItem(STARTER_LIBRARY_KEY, STARTER_LIBRARY_VERSION);
  } catch {
    // Direct file opening cannot fetch local JSON. Seed data is used instead.
  }
}

function mergeStarterLibrary(data) {
  const prompts = Array.isArray(data.prompts) ? data.prompts : [];
  const categories = Array.isArray(data.categories) ? data.categories : [];
  const existingIds = new Set(state.prompts.map((prompt) => prompt.id));
  const existingKeys = new Set(state.prompts.map(promptKey));
  categories.forEach(ensureCategory);
  prompts.forEach((item) => {
    const prompt = normalizePrompt(item, item.createdAt || new Date().toISOString());
    if (existingIds.has(prompt.id) || existingKeys.has(promptKey(prompt))) return;
    state.prompts.push(prompt);
    existingIds.add(prompt.id);
    existingKeys.add(promptKey(prompt));
  });
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateStorageStatus();
}

function updateStorageStatus() {
  els.storageStatus.textContent = `${state.prompts.length} saved prompts`;
}

function normalizeTags(value) {
  return importCore.normalizeTags(value);
}

function getSelectedPrompt() {
  if (selectedId === "__draft__") return draftPrompt;
  return state.prompts.find((prompt) => prompt.id === selectedId) || null;
}

function renderIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((node) => {
    const name = node.dataset.icon;
    if (icons[name]) node.innerHTML = icons[name];
  });
}

function render() {
  updateStorageStatus();
  renderCategories();
  renderTags();
  renderOverview();
  renderEditor();
  renderWorkspaceView();
  renderEditorTabs();
  renderPromptBodyTabs();
  renderIcons();
}

function renderWorkspaceView() {
  els.overviewPanel.hidden = workspaceView !== "overview";
  els.editorColumn.hidden = workspaceView !== "editor";
  els.overviewButton.classList.toggle("active", workspaceView === "overview");
}

function renderEditorTabs() {
  const panels = {
    prompt: els.promptTabPanel,
    audit: els.auditTabPanel,
    history: els.historyTabPanel
  };
  els.editorTabButtons.forEach((button) => {
    const isActive = button.dataset.editorTab === activeEditorTab;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  Object.entries(panels).forEach(([name, panel]) => {
    panel.hidden = name !== activeEditorTab;
  });
}

function renderCategories() {
  const counts = new Map();
  state.prompts.filter(matchesSearchAndTag).forEach((prompt) => counts.set(prompt.category, (counts.get(prompt.category) || 0) + 1));
  const categories = state.categories.filter(Boolean).sort();
  const editableCategories = state.categories.filter(Boolean).sort();
  els.categoryForm.hidden = !categoryFormOpen;
  els.categoryList.innerHTML = categories
    .map((category) => {
      const count = counts.get(category) || 0;
      const isExpanded = expandedCategories.has(category);
      const categoryPrompts = getPromptsForCategory(category);
      const promptLinks = isExpanded && categoryPrompts.length
        ? `<div class="category-children">
            ${categoryPrompts
              .map((prompt) => `<button class="category-prompt ${prompt.id === selectedId ? "active" : ""}" type="button" data-prompt-id="${prompt.id}">
                <span>${escapeHtml(prompt.title || "Untitled prompt")}</span>
              </button>`)
              .join("")}
          </div>`
        : "";
      return `<div class="category-node">
        <div class="nav-row">
          <button class="nav-item ${category === selectedCategory ? "active" : ""}" type="button" data-category="${escapeHtml(category)}">
            <span>${escapeHtml(category)}</span>
            <span>${count}</span>
          </button>
        </div>
        ${promptLinks}
      </div>`;
    })
    .join("");
  els.categorySelect.innerHTML = [
    ...editableCategories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`),
    '<option value="__new__">+ Add new category...</option>'
  ].join("");
  const selectedPrompt = getSelectedPrompt();
  const currentCategory = els.categoryCustomInput.hidden ? els.categorySelect.value : els.categoryCustomInput.value;
  setCategoryControlValue(hasPendingEditorChanges() ? currentCategory : selectedPrompt?.category);
}

function renderOverview() {
  const prompts = state.prompts.filter(matchesSearchAndTag).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  const highRisk = prompts.filter((prompt) => auditPrompt(prompt).level === "high").length;
  const variableCount = prompts.reduce((sum, prompt) => sum + getPlaceholders(prompt.body).length, 0);
  const categoryCount = new Set(prompts.map((prompt) => prompt.category).filter(Boolean)).size;
  els.overviewCount.textContent = prompts.length;
  els.overviewStats.innerHTML = `
    <span><strong>${prompts.length}</strong> prompts</span>
    <span><strong>${categoryCount}</strong> categories</span>
    <span><strong>${variableCount}</strong> variables</span>
    <span><strong>${highRisk}</strong> high risk</span>
  `;
  els.overviewList.innerHTML = prompts.length
    ? prompts.map(renderOverviewCard).join("")
    : document.querySelector("#emptyStateTemplate").innerHTML;
}

function renderOverviewCard(prompt) {
  const audit = auditPrompt(prompt);
  const risk = audit.level === "low" ? "Low" : audit.level === "medium" ? "Med" : "High";
  const placeholderCount = getPlaceholders(prompt.body).length;
  const summary = prompt.summary || prompt.body || "No summary yet.";
  const tags = prompt.tags.length ? prompt.tags.map((tag) => `<span class="mini-tag">${escapeHtml(tag)}</span>`).join("") : '<span class="mini-tag muted-tag">No tags</span>';
  return `<button class="overview-card ${audit.level} ${prompt.id === selectedId ? "active" : ""}" type="button" data-prompt-id="${prompt.id}">
    <div class="overview-card-main">
      <div class="card-topline">
        <span class="category-pill"><span class="category-dot ${audit.level}"></span>${escapeHtml(prompt.category || "Uncategorized")}</span>
        <span class="risk ${audit.level}">${risk} risk</span>
      </div>
      <div class="card-title-row">
        <h4>${escapeHtml(prompt.title || "Untitled prompt")}</h4>
        <span class="updated-time">${formatDate(prompt.updatedAt)}</span>
      </div>
      <p>${escapeHtml(summary)}</p>
      <div class="card-metrics" aria-label="Prompt metadata">
        <span><strong>${audit.score}</strong> audit</span>
        <span><strong>${placeholderCount}</strong> variables</span>
        <span><strong>${prompt.history.length}</strong> versions</span>
      </div>
      <div class="card-footer">
        <div class="tag-row">${tags}</div>
        <span class="variable-count">{ } ${placeholderCount}</span>
      </div>
    </div>
  </button>`;
}

function getPromptsForCategory(category) {
  const prompts = (category ? state.prompts.filter((prompt) => prompt.category === category) : state.prompts).filter(matchesSearchAndTag);
  return [...prompts].sort((a, b) => a.title.localeCompare(b.title));
}

function renderTags() {
  const tags = [...new Set(state.prompts.flatMap((prompt) => prompt.tags))].sort();
  els.tagList.innerHTML = tags.length
    ? tags.map((tag) => `<button class="tag ${tag === selectedTag ? "active" : ""}" type="button" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`).join("")
    : '<span class="tag">No tags yet</span>';
}

function matchesSearchAndTag(prompt) {
  const query = els.searchInput.value.trim().toLowerCase();
  const inTag = !selectedTag || prompt.tags.includes(selectedTag);
  const haystack = `${prompt.title} ${prompt.category} ${prompt.tags.join(" ")} ${prompt.summary} ${prompt.body}`.toLowerCase();
  return inTag && (!query || haystack.includes(query));
}

function getFilteredPrompts() {
  return getPromptsForCategory(selectedCategory).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

function selectFirstVisiblePrompt() {
  const [firstPrompt] = getFilteredPrompts();
  selectedId = firstPrompt?.id || null;
  selectedVersionIndex = null;
}

function renderEditor() {
  const prompt = getSelectedPrompt();
  if (!prompt) {
    els.form.hidden = true;
    renderEditorEmptyState();
    return;
  }
  els.form.hidden = false;
  els.editorEmptyState.hidden = true;
  els.form.querySelectorAll("input, textarea, select, button").forEach((node) => (node.disabled = false));
  const isDraft = selectedId === "__draft__";
  els.titleInput.value = prompt.title;
  els.editorStatus.textContent = isDraft ? "Draft - not saved yet" : "Saved prompt";
  els.duplicateButton.disabled = isDraft;
  els.deleteButton.title = isDraft ? "Discard draft" : "Delete prompt";
  els.deleteButton.setAttribute("aria-label", isDraft ? "Discard draft" : "Delete prompt");
  setCategoryControlValue(prompt.category);
  els.tagsInput.value = prompt.tags.join(", ");
  els.summaryInput.value = prompt.summary;
  els.bodyInput.value = prompt.body;
  renderPromptPreview(prompt.body);
  renderPlaceholders(prompt);
  renderAudit(prompt);
  renderHistory(prompt);
}

function renderEditorEmptyState() {
  const category = selectedCategory || "this category";
  const hasEmptyCategory = selectedCategory && !state.prompts.some((prompt) => prompt.category === selectedCategory);
  els.editorEmptyState.hidden = false;
  els.editorEmptyState.innerHTML = `
    <span data-icon="file-text"></span>
    <h3>No prompts in ${escapeHtml(category)}</h3>
    <p>Create a prompt here, or remove this empty category.</p>
    <div class="empty-actions">
      <button class="text-action primary" type="button" data-empty-new-prompt>New prompt</button>
      ${hasEmptyCategory ? `<button class="text-action danger" type="button" data-remove-empty-category="${escapeHtml(selectedCategory)}">Remove empty category</button>` : ""}
    </div>
  `;
}

function renderPlaceholders(prompt) {
  const placeholders = getPlaceholders(prompt.body);
  els.placeholderList.innerHTML = placeholders.length
    ? placeholders.map((name) => `<span class="placeholder-chip">{${escapeHtml(name)}}</span>`).join("")
    : '<span class="placeholder-chip">No variables</span>';
}

function renderPromptPreview(markdown) {
  const html = renderPromptMarkdown(markdown);
  els.bodyPreviewPanel.innerHTML = html || '<p class="preview-empty">No prompt body yet.</p>';
}

function renderPromptBodyTabs() {
  els.bodyViewButtons.forEach((button) => {
    const isActive = button.dataset.bodyView === activeBodyView;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  els.bodyMarkdownPanel.hidden = activeBodyView !== "markdown";
  els.bodyPreviewPanel.hidden = activeBodyView !== "preview";
  if (activeBodyView === "preview") renderPromptPreview(els.bodyInput.value);
}

function renderPromptMarkdown(markdown) {
  const lines = String(markdown || "").split(/\r?\n/);
  const blocks = [];
  let paragraph = [];
  let list = [];
  let code = [];
  let inCode = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(`<p>${formatInlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    blocks.push(`<ul>${list.map((item) => `<li>${formatInlineMarkdown(item)}</li>`).join("")}</ul>`);
    list = [];
  };
  const flushCode = () => {
    blocks.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
    code = [];
  };
  const flushTextBlocks = () => {
    flushParagraph();
    flushList();
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim().startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }
    if (isMarkdownTableStart(lines, index)) {
      flushTextBlocks();
      const table = collectMarkdownTable(lines, index);
      blocks.push(renderMarkdownTable(table.rows));
      index = table.endIndex;
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length + 2;
      blocks.push(`<h${level}>${formatInlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }
    const listItem = line.match(/^\s*[-*]\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      list.push(listItem[1]);
      continue;
    }
    flushList();
    paragraph.push(line.trim());
  }
  if (inCode) flushCode();
  flushParagraph();
  flushList();
  return blocks.join("");
}

function isMarkdownTableStart(lines, index) {
  return isMarkdownTableRow(lines[index]) && isMarkdownTableDivider(lines[index + 1]);
}

function collectMarkdownTable(lines, startIndex) {
  const rows = [parseMarkdownTableRow(lines[startIndex])];
  let index = startIndex + 2;
  while (index < lines.length && isMarkdownTableRow(lines[index])) {
    rows.push(parseMarkdownTableRow(lines[index]));
    index += 1;
  }
  return { rows, endIndex: index - 1 };
}

function isMarkdownTableRow(line) {
  const trimmed = String(line || "").trim();
  return trimmed.startsWith("|") && trimmed.endsWith("|") && trimmed.split("|").length > 3;
}

function isMarkdownTableDivider(line) {
  if (!isMarkdownTableRow(line)) return false;
  return parseMarkdownTableRow(line).every((cell) => /^:?-{3,}:?$/.test(cell.trim()));
}

function parseMarkdownTableRow(line) {
  return String(line || "")
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderMarkdownTable(rows) {
  if (!rows.length) return "";
  const [header, ...body] = rows;
  return `
    <div class="preview-table-wrap">
      <table>
        <thead><tr>${header.map((cell) => `<th>${formatInlineMarkdown(cell)}</th>`).join("")}</tr></thead>
        <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${formatInlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function formatInlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function renderAudit(prompt) {
  const audit = auditPrompt(prompt);
  els.auditScore.textContent = audit.score;
  els.auditScore.parentElement.className = `score-ring ${audit.level}`;
  renderAuditBreakdown(audit);
  renderAuditDetails(audit);
  els.auditFindings.innerHTML = audit.findings.length
    ? audit.findings.map((finding) => `<li class="${finding.level === "high" ? "high" : finding.level === "medium" ? "warn" : ""}">${escapeHtml(finding.message)}</li>`).join("")
    : "<li>No safety findings detected.</li>";
}

function getEditorPromptDraft() {
  return {
    title: els.titleInput.value,
    category: getEditorCategory(),
    tags: normalizeTags(els.tagsInput.value),
    summary: els.summaryInput.value,
    body: els.bodyInput.value
  };
}

function refreshAuditFromEditor() {
  renderAudit(getEditorPromptDraft());
  renderIcons();
}

function renderAuditBreakdown(audit) {
  const riskPenaltyText = audit.breakdown.riskPenaltyTotal ? `-${audit.breakdown.riskPenaltyTotal}` : "0";
  const structurePenaltyTotal = audit.breakdown.structurePenaltyTotal ?? audit.breakdown.qualityPenaltyTotal;
  const structurePenalties = audit.breakdown.structurePenalties || audit.breakdown.qualityPenalties || [];
  const structurePenaltyText = structurePenaltyTotal ? `-${structurePenaltyTotal}` : "0";
  const riskDetails = audit.breakdown.riskPenalties.length
    ? audit.breakdown.riskPenalties.map((penalty) => `<span>${escapeHtml(penalty.id)} -${penalty.points} ${escapeHtml(penalty.label)}</span>`).join("")
    : "<span>No risk penalty</span>";
  const structureDetails = structurePenalties.length
    ? structurePenalties.map((penalty) => `<span>${escapeHtml(penalty.id)} -${penalty.points} ${escapeHtml(penalty.label)}</span>`).join("")
    : "<span>No structure penalty</span>";
  els.auditBreakdown.innerHTML = `
    <div class="score-card">
      <span>Base</span>
      <strong>${audit.breakdown.base}</strong>
      <small>Starting score</small>
    </div>
    <div class="score-card ${audit.breakdown.riskPenaltyTotal ? "warn" : ""}">
      <span>Risk penalty</span>
      <strong>${riskPenaltyText}</strong>
      <small>${riskDetails}</small>
    </div>
    <div class="score-card ${structurePenaltyTotal ? "warn" : ""}">
      <span>Structure penalty</span>
      <strong>${structurePenaltyText}</strong>
      <small>${structureDetails}</small>
    </div>
    <div class="score-card final ${audit.level}">
      <span>Final</span>
      <strong>${audit.breakdown.final}</strong>
      <small>${audit.level} risk level</small>
    </div>
  `;
}

function renderAuditDetails(audit) {
  const riskFactors = (audit.riskChecks || audit.breakdown.riskPenalties)
    .map((factor) => `<li class="${factor.status === "review" || (factor.level === "high" && factor.points) ? "review" : ""}"><strong><b class="factor-id">${escapeHtml(factor.id)}</b>${escapeHtml(factor.label)}</strong><span>${factor.points ? `-${factor.points}` : "0"} points - ${escapeHtml(factor.detail)}</span></li>`)
    .join("");
  const checks = (audit.structureChecks || audit.qualityChecks)
    .map((check) => `<li class="${check.status}"><strong><b class="factor-id">${escapeHtml(check.id)}</b>${escapeHtml(check.label)}</strong><span>${check.points ? `-${check.points}` : "0"} points - ${escapeHtml(check.detail)}</span></li>`)
    .join("");
  const suggestions = audit.suggestions.map((suggestion) => `<li>${escapeHtml(suggestion)}</li>`).join("");
  const placeholders = audit.placeholders.length
    ? audit.placeholders.map((name) => `<span class="placeholder-chip">{${escapeHtml(name)}}</span>`).join("")
    : '<span class="placeholder-chip">No variables</span>';
  els.auditDetails.innerHTML = `
    <section>
      <h4>Risk factors</h4>
      <ul class="audit-checks">${riskFactors}</ul>
    </section>
    <section>
      <h4>Structure factors</h4>
      <ul class="audit-checks">${checks}</ul>
    </section>
    <section>
      <h4>Suggestions</h4>
      <ul class="suggestion-list">${suggestions}</ul>
    </section>
    <section>
      <h4>Placeholders</h4>
      <div class="placeholder-list">${placeholders}</div>
    </section>
    <section>
      <h4>Export</h4>
      <p class="${audit.level === "high" ? "export-warning high" : "export-warning"}">${escapeHtml(audit.exportWarning)}</p>
    </section>
  `;
}

function renderHistory(prompt) {
  els.restoreButton.disabled = selectedVersionIndex === null;
  els.historyList.innerHTML = prompt.history.length
    ? prompt.history
        .map((item, index) => `<button class="history-item ${index === selectedVersionIndex ? "active" : ""}" type="button" data-version-index="${index}">
          <strong>${escapeHtml(item.title || "Untitled prompt")}</strong>
          <span>${formatDate(item.updatedAt)} · ${escapeHtml(item.summary || "No summary")}</span>
        </button>`)
        .join("")
    : '<div class="history-item"><strong>No earlier versions</strong><span>Each save stores a restorable snapshot.</span></div>';
}

function createPrompt() {
  if (!confirmPendingEditorChanges()) return;
  const now = new Date().toISOString();
  draftPrompt = {
    id: "__draft__",
    title: "Untitled prompt",
    category: selectedCategory || state.categories[0] || "Writing",
    tags: [],
    summary: "",
    body: "Use this prompt for {task}.\n\nContext:\n{context}\n\nOutput format:\n{format}",
    createdAt: now,
    updatedAt: now,
    history: []
  };
  selectedId = "__draft__";
  selectedVersionIndex = null;
  selectedTag = null;
  workspaceView = "editor";
  activeEditorTab = "prompt";
  hasUnsavedChanges = false;
  render();
  els.titleInput.focus();
  els.titleInput.select();
}

function saveCurrentPrompt(event) {
  event.preventDefault();
  const prompt = getSelectedPrompt();
  if (!prompt) return;
  const isDraft = selectedId === "__draft__";
  if (!isDraft) {
    const snapshot = { ...prompt, history: undefined };
    prompt.history = [snapshot, ...prompt.history].slice(0, 30);
  }
  prompt.title = els.titleInput.value.trim() || "Untitled prompt";
  prompt.category = getEditorCategory();
  prompt.tags = normalizeTags(els.tagsInput.value);
  prompt.summary = els.summaryInput.value.trim();
  prompt.body = els.bodyInput.value;
  prompt.updatedAt = new Date().toISOString();
  if (isDraft) {
    prompt.id = crypto.randomUUID();
    prompt.createdAt = prompt.updatedAt;
    prompt.history = [];
    state.prompts.unshift(prompt);
    selectedId = prompt.id;
    draftPrompt = null;
  }
  hasUnsavedChanges = false;
  ensureCategory(prompt.category);
  selectedCategory = prompt.category;
  workspaceView = "editor";
  if (selectedTag && !prompt.tags.includes(selectedTag)) selectedTag = null;
  selectedVersionIndex = null;
  saveState();
  render();
}

function duplicatePrompt() {
  if (!confirmPendingEditorChanges()) return;
  const prompt = getSelectedPrompt();
  if (!prompt || selectedId === "__draft__") return;
  const now = new Date().toISOString();
  const copy = {
    ...structuredClone(prompt),
    id: crypto.randomUUID(),
    title: `${prompt.title} copy`,
    createdAt: now,
    updatedAt: now,
    history: []
  };
  state.prompts.unshift(copy);
  selectedId = copy.id;
  selectedVersionIndex = null;
  workspaceView = "editor";
  activeEditorTab = "prompt";
  saveState();
  render();
}

function deletePrompt() {
  const prompt = getSelectedPrompt();
  if (!prompt) return;
  if (selectedId === "__draft__") {
    draftPrompt = null;
    selectedId = state.prompts[0]?.id || null;
    selectedVersionIndex = null;
    hasUnsavedChanges = false;
    render();
    return;
  }
  openDeletePromptModal(prompt);
}

function openDeletePromptModal(prompt) {
  pendingDeletePromptId = prompt.id;
  els.deletePromptName.textContent = prompt.title || "Untitled prompt";
  els.deletePromptModal.hidden = false;
  renderIcons(els.deletePromptModal);
  els.confirmDeleteButton.focus();
}

function closeDeletePromptModal() {
  pendingDeletePromptId = null;
  els.deletePromptModal.hidden = true;
}

function confirmDeletePrompt() {
  if (!pendingDeletePromptId) return;
  state.prompts = state.prompts.filter((item) => item.id !== pendingDeletePromptId);
  selectedId = state.prompts[0]?.id || null;
  selectedVersionIndex = null;
  pendingDeletePromptId = null;
  els.deletePromptModal.hidden = true;
  saveState();
  render();
}

function restoreVersion() {
  if (!confirmPendingEditorChanges()) return;
  const prompt = getSelectedPrompt();
  if (!prompt || selectedVersionIndex === null) return;
  const version = prompt.history[selectedVersionIndex];
  if (!version) return;
  const current = { ...prompt, history: undefined };
  prompt.history = [current, ...prompt.history].slice(0, 30);
  Object.assign(prompt, {
    title: version.title,
    category: version.category,
    tags: version.tags || [],
    summary: version.summary || "",
    body: version.body || "",
    updatedAt: new Date().toISOString()
  });
  ensureCategory(prompt.category);
  selectedVersionIndex = null;
  hasUnsavedChanges = false;
  saveState();
  render();
}

function markEditorDirty() {
  if (selectedId === "__draft__") {
    els.editorStatus.textContent = "Draft - not saved yet";
    return;
  }
  hasUnsavedChanges = true;
  els.editorStatus.textContent = "Unsaved changes";
}

function hasPendingEditorChanges() {
  return selectedId === "__draft__" || hasUnsavedChanges;
}

function confirmPendingEditorChanges() {
  if (!hasPendingEditorChanges()) return true;
  return confirm("You have unsaved changes. Continue and discard them?");
}

function showNotice(message, type = "success") {
  if (!els.appNotice) return;
  if (noticeTimer) clearTimeout(noticeTimer);
  els.appNotice.textContent = message;
  els.appNotice.className = `app-notice ${type}`;
  els.appNotice.hidden = false;
  noticeTimer = setTimeout(() => {
    els.appNotice.hidden = true;
  }, 4200);
}

function ensureCategory(category) {
  if (category && !state.categories.includes(category)) state.categories.push(category);
}

function getEditorCategory() {
  if (els.categorySelect.value === "__new__") {
    return els.categoryCustomInput.value.trim() || "Uncategorized";
  }
  return els.categorySelect.value || "Uncategorized";
}

function setCategoryControlValue(category) {
  const normalizedCategory = category || "Uncategorized";
  const hasCategory = state.categories.includes(normalizedCategory);
  els.categorySelect.value = hasCategory ? normalizedCategory : "__new__";
  els.categoryCustomInput.hidden = hasCategory;
  els.categoryCustomInput.value = hasCategory ? "" : normalizedCategory;
}

function addCategory() {
  if (!confirmPendingEditorChanges()) return;
  draftPrompt = null;
  hasUnsavedChanges = false;
  categoryFormOpen = true;
  render();
  els.categoryNameInput.focus();
}

function closeCategoryForm() {
  categoryFormOpen = false;
  els.categoryNameInput.value = "";
  renderCategories();
  renderIcons();
}

function saveNewCategory(event) {
  event.preventDefault();
  const category = els.categoryNameInput.value.trim();
  if (!category) {
    els.categoryNameInput.focus();
    return;
  }
  ensureCategory(category);
  selectedCategory = category;
  selectedTag = null;
  selectFirstVisiblePrompt();
  categoryFormOpen = false;
  els.categoryNameInput.value = "";
  saveState();
  render();
}

function getDefaultCategory() {
  return state.prompts[0]?.category || state.categories[0] || null;
}

function removeEmptyCategory(category) {
  if (!category) return;
  if (state.prompts.some((prompt) => prompt.category === category)) return;
  state.categories = state.categories.filter((item) => item !== category);
  expandedCategories.delete(category);
  const fallbackPrompt = state.prompts[0] || null;
  selectedId = fallbackPrompt?.id || null;
  selectedCategory = fallbackPrompt?.category || getDefaultCategory();
  selectedVersionIndex = null;
  workspaceView = selectedId ? "editor" : "overview";
  saveState();
  render();
}

function exportJson() {
  if (hasPendingEditorChanges()) {
    showNotice("Save your current prompt before export. Unsaved changes are not included in backups.", "warn");
    return;
  }
  downloadFile(`prompt-vault-${dateStamp()}.json`, JSON.stringify(state, null, 2), "application/json");
  showNotice("JSON backup downloaded. Keep it somewhere safe.", "success");
}

function exportMarkdown() {
  if (hasPendingEditorChanges()) {
    showNotice("Save your current prompt before export. Unsaved changes are not included in backups.", "warn");
    return;
  }
  const md = state.prompts
    .map((prompt) => {
      const audit = auditPrompt(prompt);
      return `# ${prompt.title}

- Category: ${prompt.category || "Uncategorized"}
- Tags: ${prompt.tags.join(", ") || "None"}
- Updated: ${prompt.updatedAt}
- Audit score: ${audit.score}

## Executive summary

${prompt.summary || "No summary"}

## Prompt

\`\`\`text
${prompt.body}
\`\`\`
`;
    })
    .join("\n---\n\n");
  downloadFile(`prompt-vault-${dateStamp()}.md`, md, "text/markdown");
  showNotice("Markdown export downloaded. JSON is better for full backup and history.", "success");
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function importFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      pendingImportPrompts = parseImportText(String(reader.result || ""), file.name);
      showImportPreview(file.name, pendingImportPrompts);
    } catch (error) {
      showNotice(`Import failed: ${error.message}`, "warn");
    }
  };
  reader.readAsText(file);
}

function parseImportText(text, filename) {
  return importCore.parseImportText(text, filename);
}

function showImportPreview(filename, prompts) {
  if (!prompts.length) {
    showNotice("No prompts found in this file.", "warn");
    return;
  }
  const analysis = analyzeImportPrompts(prompts);
  const categories = [...new Set(prompts.map((prompt) => prompt.category || "Imported"))];
  const highRisk = prompts.filter((prompt) => auditPrompt(normalizePrompt(prompt)).level === "high").length;
  els.importPreviewBody.innerHTML = `
    <div class="preview-grid">
      <span><strong>${prompts.length}</strong> prompts</span>
      <span><strong>${categories.length}</strong> categories</span>
      <span><strong>${analysis.added}</strong> new</span>
      <span><strong>${analysis.skipped}</strong> skipped</span>
    </div>
    <div class="preview-grid compact">
      <span><strong>${highRisk}</strong> high risk</span>
      <span><strong>${analysis.duplicateExisting}</strong> already saved</span>
      <span><strong>${analysis.duplicateInFile}</strong> repeated in file</span>
      <span><strong>${state.prompts.length}</strong> current saved</span>
    </div>
    <p class="import-safety-note"><strong>Safety:</strong> Import adds new prompts only. It does not overwrite your saved prompts. Exact duplicates are skipped.</p>
    <p><strong>File:</strong> ${escapeHtml(filename)}</p>
    <p><strong>Categories:</strong> ${categories.map(escapeHtml).join(", ")}</p>
    <div class="preview-list">
      ${prompts
        .slice(0, 5)
        .map((prompt) => {
          const normalized = normalizePrompt(prompt);
          const audit = auditPrompt(normalized);
          return `<div><strong>${escapeHtml(normalized.title)}</strong><span>${escapeHtml(normalized.category)} · ${audit.score} audit score</span></div>`;
        })
        .join("")}
    </div>
  `;
  els.confirmImportButton.disabled = analysis.added === 0;
  els.importPreviewModal.hidden = false;
  renderIcons(els.importPreviewModal);
}

function closeImportPreview() {
  pendingImportPrompts = [];
  els.confirmImportButton.disabled = false;
  els.importPreviewModal.hidden = true;
}

function confirmImportPreview() {
  const result = mergePrompts(pendingImportPrompts);
  pendingImportPrompts = [];
  els.confirmImportButton.disabled = false;
  selectedCategory = null;
  selectedTag = null;
  els.importPreviewModal.hidden = true;
  saveState();
  render();
  showNotice(`Import complete. Added ${result.added} prompt${result.added === 1 ? "" : "s"}, skipped ${result.skipped} duplicate${result.skipped === 1 ? "" : "s"}.`, "success");
}

function mergePrompts(prompts) {
  const now = new Date().toISOString();
  const existingKeys = new Set(state.prompts.map((prompt) => promptKey(prompt)));
  const existingIds = new Set(state.prompts.map((prompt) => prompt.id));
  let firstImportedId = null;
  let added = 0;
  let skipped = 0;
  prompts.forEach((item) => {
    const prompt = normalizePrompt(item, now);
    if (existingIds.has(prompt.id)) prompt.id = crypto.randomUUID();
    const key = promptKey(prompt);
    if (existingKeys.has(key)) {
      skipped += 1;
      return;
    }
    ensureCategory(prompt.category);
    state.prompts.unshift(prompt);
    existingKeys.add(key);
    existingIds.add(prompt.id);
    added += 1;
    if (!firstImportedId) firstImportedId = prompt.id;
  });
  if (firstImportedId) selectedId = firstImportedId;
  return { added, skipped };
}

function analyzeImportPrompts(prompts) {
  const existingKeys = new Set(state.prompts.map((prompt) => promptKey(prompt)));
  const fileKeys = new Set();
  let added = 0;
  let duplicateExisting = 0;
  let duplicateInFile = 0;
  prompts.forEach((item) => {
    const prompt = normalizePrompt(item);
    const key = promptKey(prompt);
    if (existingKeys.has(key)) {
      duplicateExisting += 1;
      return;
    }
    if (fileKeys.has(key)) {
      duplicateInFile += 1;
      return;
    }
    fileKeys.add(key);
    added += 1;
  });
  return {
    added,
    duplicateExisting,
    duplicateInFile,
    skipped: duplicateExisting + duplicateInFile
  };
}

function promptKey(prompt) {
  return importCore.promptKey(prompt);
}

function normalizePrompt(item, now = new Date().toISOString()) {
  return importCore.normalizePrompt(item, now);
}

function parseMarkdownPrompts(text) {
  return importCore.parseMarkdownPrompts(text);
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function dateStamp() {
  return new Date().toISOString().slice(0, 10);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

els.newPromptButton.addEventListener("click", createPrompt);
els.addCategoryButton.addEventListener("click", addCategory);
els.categoryForm.addEventListener("submit", saveNewCategory);
els.cancelCategoryButton.addEventListener("click", closeCategoryForm);
els.form.addEventListener("submit", saveCurrentPrompt);
els.duplicateButton.addEventListener("click", duplicatePrompt);
els.deleteButton.addEventListener("click", deletePrompt);
els.confirmDeleteButton.addEventListener("click", confirmDeletePrompt);
els.cancelDeleteButton.addEventListener("click", closeDeletePromptModal);
els.cancelDeleteTextButton.addEventListener("click", closeDeletePromptModal);
els.refreshAuditButton.addEventListener("click", refreshAuditFromEditor);
els.restoreButton.addEventListener("click", restoreVersion);
els.overviewButton.addEventListener("click", () => {
  if (!confirmPendingEditorChanges()) return;
  draftPrompt = null;
  hasUnsavedChanges = false;
  workspaceView = "overview";
  selectedCategory = null;
  activeEditorTab = "prompt";
  render();
});
els.searchInput.addEventListener("input", () => {
  renderCategories();
  renderOverview();
  renderIcons();
});
els.exportJsonButton.addEventListener("click", exportJson);
els.exportMdButton.addEventListener("click", exportMarkdown);
els.confirmImportButton.addEventListener("click", confirmImportPreview);
els.cancelImportButton.addEventListener("click", closeImportPreview);
els.cancelImportTextButton.addEventListener("click", closeImportPreview);
els.editorTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeEditorTab = button.dataset.editorTab;
    renderEditorTabs();
    renderIcons();
  });
});
els.bodyViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeBodyView = button.dataset.bodyView;
    renderPromptBodyTabs();
  });
});
els.importButton.addEventListener("click", () => {
  if (hasPendingEditorChanges()) {
    showNotice("Save your current prompt before import. This protects unsaved work.", "warn");
    return;
  }
  els.importFile.click();
});
els.importFile.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) importFile(file);
  event.target.value = "";
});

[els.bodyInput, els.summaryInput, els.titleInput, els.categorySelect, els.categoryCustomInput, els.tagsInput].forEach((input) => {
  input.addEventListener("input", () => {
    renderPlaceholders(getEditorPromptDraft());
    renderPromptPreview(els.bodyInput.value);
    markEditorDirty();
    renderIcons();
  });
});

els.categorySelect.addEventListener("change", () => {
  const isCustom = els.categorySelect.value === "__new__";
  els.categoryCustomInput.hidden = !isCustom;
  if (isCustom) els.categoryCustomInput.focus();
  markEditorDirty();
});

document.addEventListener("click", (event) => {
  const emptyNewPromptButton = event.target.closest("[data-empty-new-prompt]");
  if (emptyNewPromptButton) {
    createPrompt();
    return;
  }
  const removeEmptyCategoryButton = event.target.closest("[data-remove-empty-category]");
  if (removeEmptyCategoryButton) {
    removeEmptyCategory(removeEmptyCategoryButton.dataset.removeEmptyCategory);
    return;
  }
  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    if (!confirmPendingEditorChanges()) return;
    draftPrompt = null;
    hasUnsavedChanges = false;
    selectedCategory = categoryButton.dataset.category;
    if (expandedCategories.has(selectedCategory)) {
      expandedCategories.delete(selectedCategory);
    } else {
      expandedCategories.add(selectedCategory);
    }
    selectedTag = null;
    selectFirstVisiblePrompt();
    workspaceView = "editor";
    render();
  }
  const tagButton = event.target.closest("[data-tag]");
  if (tagButton) {
    if (!confirmPendingEditorChanges()) return;
    draftPrompt = null;
    hasUnsavedChanges = false;
    selectedTag = selectedTag === tagButton.dataset.tag ? null : tagButton.dataset.tag;
    selectedCategory = null;
    selectFirstVisiblePrompt();
    workspaceView = "editor";
    render();
  }
  const promptButton = event.target.closest("[data-prompt-id]");
  if (promptButton) {
    if (promptButton.dataset.promptId !== selectedId && !confirmPendingEditorChanges()) return;
    draftPrompt = null;
    hasUnsavedChanges = false;
    selectedId = promptButton.dataset.promptId;
    selectedVersionIndex = null;
    workspaceView = "editor";
    activeEditorTab = "prompt";
    render();
  }
  const versionButton = event.target.closest("[data-version-index]");
  if (versionButton) {
    selectedVersionIndex = Number(versionButton.dataset.versionIndex);
    renderHistory(getSelectedPrompt());
  }
});

async function initApp() {
  await loadDataFileIfEmpty();
  saveState();
  render();
}

initApp();
