const STORAGE_KEY = "prompt-vault:v1";

const icons = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 20h14"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></svg>',
  "file-text": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/></svg>',
  database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
  "wifi-off": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m2 2 20 20"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M5 13a10 10 0 0 1 5-2.7M14 10.4A10 10 0 0 1 19 13"/><path d="M2 8.8a15 15 0 0 1 6.3-3M12 5a15 15 0 0 1 10 3.8"/><path d="M12 20h.01"/></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>'
};

const els = {
  categoryList: document.querySelector("#categoryList"),
  tagList: document.querySelector("#tagList"),
  promptList: document.querySelector("#promptList"),
  promptCount: document.querySelector("#promptCount"),
  listStats: document.querySelector("#listStats"),
  searchInput: document.querySelector("#searchInput"),
  sortSelect: document.querySelector("#sortSelect"),
  form: document.querySelector("#promptForm"),
  titleInput: document.querySelector("#titleInput"),
  editorStatus: document.querySelector("#editorStatus"),
  categorySelect: document.querySelector("#categorySelect"),
  categoryCustomInput: document.querySelector("#categoryCustomInput"),
  tagsInput: document.querySelector("#tagsInput"),
  summaryInput: document.querySelector("#summaryInput"),
  bodyInput: document.querySelector("#bodyInput"),
  placeholderList: document.querySelector("#placeholderList"),
  auditScore: document.querySelector("#auditScore"),
  auditBadge: document.querySelector("#auditBadge"),
  auditFindings: document.querySelector("#auditFindings"),
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
  guideTaskSelect: document.querySelector("#guideTaskSelect"),
  guidePatternList: document.querySelector("#guidePatternList"),
  guideTemplatePreview: document.querySelector("#guideTemplatePreview"),
  insertGuideButton: document.querySelector("#insertGuideButton"),
  importPreviewModal: document.querySelector("#importPreviewModal"),
  importPreviewBody: document.querySelector("#importPreviewBody"),
  confirmImportButton: document.querySelector("#confirmImportButton"),
  cancelImportButton: document.querySelector("#cancelImportButton"),
  cancelImportTextButton: document.querySelector("#cancelImportTextButton")
};

const promptGuide = [
  {
    task: "Executive summary",
    patterns: ["Persona", "Context block", "Output format", "Check"],
    placeholders: ["role", "audience", "source_notes", "desired_length"],
    guidance: "Use this when you need a short decision-ready summary.",
    scaffold:
      "You are a {role}. Prepare an executive summary for {audience}.\n\nContext:\n\"\"\"\n{source_notes}\n\"\"\"\n\nReturn:\n## Summary\n- {desired_length} concise bullets\n\n## Key decisions\n- Decision, reason, owner\n\n## Risks\n- Risk, impact, mitigation\n\n## Next actions\n- Action, owner, due date\n\nThink privately. Return only the structured answer and key assumptions."
  },
  {
    task: "Code review",
    patterns: ["Persona", "Rubric", "Severity", "Safety"],
    placeholders: ["language", "diff"],
    guidance: "Use this when you need bugs, risks, and missing tests.",
    scaffold:
      "You are a senior {language} engineer.\n\nReview this diff:\n```diff\n{diff}\n```\n\nCheck:\n- Correctness\n- Security and privacy\n- Data loss\n- Performance\n- Missing tests\n\nReturn findings first, ordered by severity. Include file and line when possible."
  },
  {
    task: "Research synthesis",
    patterns: ["Context block", "Evidence", "Uncertainty", "Format"],
    placeholders: ["research_question", "sources", "answer_length"],
    guidance: "Use this when you need an answer based on sources.",
    scaffold:
      "Answer this question: {research_question}\n\nSources:\n\"\"\"\n{sources}\n\"\"\"\n\nReturn:\n## Answer\n{answer_length}\n\n## Evidence table\n| Claim | Evidence | Source | Confidence |\n\n## Uncertainty\n- List gaps, conflicts, and assumptions.\n\nUse only the sources unless you clearly label outside knowledge."
  },
  {
    task: "Data extraction",
    patterns: ["Few-shot", "Schema", "Delimiter", "Validation"],
    placeholders: ["schema", "examples", "source_text"],
    guidance: "Use this when you need clean JSON or table output.",
    scaffold:
      "Extract data into this schema:\n```json\n{schema}\n```\n\nRules:\n- Use null for missing values.\n- Do not invent fields.\n- Preserve source wording.\n\nExamples:\n{examples}\n\nText:\n\"\"\"\n{source_text}\n\"\"\"\n\nReturn valid JSON only."
  },
  {
    task: "Writing and editing",
    patterns: ["Persona", "Audience", "Tone", "Examples"],
    placeholders: ["audience", "communication_goal", "tone", "style_reference", "draft"],
    guidance: "Use this when style, reader, and tone matter.",
    scaffold:
      "You are an editor writing for {audience}.\n\nGoal: {communication_goal}\nTone: {tone}\n\nStyle reference:\n\"\"\"\n{style_reference}\n\"\"\"\n\nDraft:\n\"\"\"\n{draft}\n\"\"\"\n\nRevise the draft. Keep the facts. Return the revised version and a short change note."
  }
];

let state = loadState() || makeSeedState();
let selectedId = state.prompts[0]?.id || null;
let selectedCategory = "All";
let selectedTag = null;
let selectedVersionIndex = null;
let pendingImportPrompts = [];
let draftPrompt = null;
let hasUnsavedChanges = false;
let categoryFormOpen = false;

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
    if (localStorage.getItem(STORAGE_KEY)) return;
    const response = await fetch("./data/prompts.json", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    const prompts = Array.isArray(data.prompts) ? data.prompts : [];
    if (!prompts.length) return;
    state = {
      categories: Array.isArray(data.categories) ? data.categories : [...new Set(prompts.map((prompt) => prompt.category).filter(Boolean))],
      prompts
    };
    selectedId = state.prompts[0]?.id || null;
  } catch {
    // Direct file opening cannot fetch local JSON. Seed data is used instead.
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateStorageStatus();
}

function updateStorageStatus() {
  els.storageStatus.textContent = `${state.prompts.length} saved prompts`;
}

function normalizeTags(value) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .filter((tag, index, list) => list.indexOf(tag) === index);
}

function getSelectedPrompt() {
  if (selectedId === "__draft__") return draftPrompt;
  return state.prompts.find((prompt) => prompt.id === selectedId) || null;
}

function auditPrompt(prompt) {
  const text = `${prompt.title}\n${prompt.summary}\n${prompt.body}`.toLowerCase();
  const rules = [
    { level: "high", weight: 35, pattern: /(ignore|bypass|override).{0,30}(system|instruction|policy|guardrail)/, message: "Possible instruction-bypass wording." },
    { level: "high", weight: 30, pattern: /(password|api key|secret|token|credential).{0,30}(print|show|extract|reveal|return)/, message: "May request sensitive credential disclosure." },
    { level: "medium", weight: 18, pattern: /(personal data|ssn|passport|credit card|medical record|private)/, message: "Mentions sensitive personal data; verify minimization." },
    { level: "medium", weight: 15, pattern: /(delete|drop|wipe|destroy|reset).{0,30}(database|file|record|table)/, message: "Contains destructive operation language." },
    { level: "medium", weight: 12, pattern: /(malware|phishing|exploit|keylogger|ransomware)/, message: "Security-sensitive topic detected." }
  ];
  const findings = rules.filter((rule) => rule.pattern.test(text));
  const missingSummary = prompt.summary.trim().length < 20;
  const missingVariables = getPlaceholders(prompt.body).length === 0;
  let score = 100 - findings.reduce((sum, finding) => sum + finding.weight, 0);
  if (missingSummary) score -= 8;
  if (missingVariables) score -= 4;
  score = Math.max(0, score);
  return {
    score,
    level: score < 70 ? "high" : score < 88 ? "medium" : "low",
    findings: [
      ...findings,
      ...(missingSummary ? [{ level: "medium", message: "Executive summary is short or missing." }] : []),
      ...(missingVariables ? [{ level: "low", message: "No reusable {placeholder} variables detected." }] : [])
    ]
  };
}

function getPlaceholders(body) {
  return [...new Set((body.match(/\{[a-zA-Z0-9_.-]+\}/g) || []).map((item) => item.slice(1, -1)))];
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
  renderPromptList();
  renderEditor();
  renderGuide();
  renderIcons();
}

function renderCategories() {
  const counts = new Map();
  state.prompts.forEach((prompt) => counts.set(prompt.category, (counts.get(prompt.category) || 0) + 1));
  const categories = ["All", ...state.categories.filter(Boolean).sort()];
  const editableCategories = state.categories.filter(Boolean).sort();
  els.categoryForm.hidden = !categoryFormOpen;
  els.categoryList.innerHTML = categories
    .map((category) => {
      const count = category === "All" ? state.prompts.length : counts.get(category) || 0;
      const canDelete = category !== "All" && count === 0;
      return `<div class="nav-row">
        <button class="nav-item ${category === selectedCategory ? "active" : ""}" type="button" data-category="${escapeHtml(category)}">
          <span>${escapeHtml(category)}</span>
          <span>${count}</span>
        </button>
        ${canDelete ? `<button class="category-delete" type="button" data-delete-category="${escapeHtml(category)}" title="Delete empty category" aria-label="Delete ${escapeHtml(category)} category"><span data-icon="trash"></span></button>` : ""}
      </div>`;
    })
    .join("");
  els.categorySelect.innerHTML = [
    ...editableCategories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`),
    '<option value="__new__">+ Add new category...</option>'
  ].join("");
}

function renderTags() {
  const tags = [...new Set(state.prompts.flatMap((prompt) => prompt.tags))].sort();
  els.tagList.innerHTML = tags.length
    ? tags.map((tag) => `<button class="tag ${tag === selectedTag ? "active" : ""}" type="button" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`).join("")
    : '<span class="tag">No tags yet</span>';
}

function getFilteredPrompts() {
  const query = els.searchInput.value.trim().toLowerCase();
  const prompts = state.prompts.filter((prompt) => {
    const inCategory = selectedCategory === "All" || prompt.category === selectedCategory;
    const inTag = !selectedTag || prompt.tags.includes(selectedTag);
    const haystack = `${prompt.title} ${prompt.category} ${prompt.tags.join(" ")} ${prompt.summary} ${prompt.body}`.toLowerCase();
    return inCategory && inTag && (!query || haystack.includes(query));
  });
  const sort = els.sortSelect.value;
  return prompts.sort((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "risk") return auditPrompt(a).score - auditPrompt(b).score;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
}

function renderPromptList() {
  const prompts = getFilteredPrompts();
  els.promptCount.textContent = `${prompts.length} saved`;
  renderListStats(prompts);
  els.promptList.innerHTML = prompts.length
    ? prompts
        .map((prompt) => {
          const audit = auditPrompt(prompt);
          const risk = audit.level === "low" ? "Low" : audit.level === "medium" ? "Med" : "High";
          const placeholderCount = getPlaceholders(prompt.body).length;
          const summary = prompt.summary || prompt.body || "No summary yet.";
          const updated = formatDate(prompt.updatedAt);
          const category = prompt.category || "Uncategorized";
          const categoryInitial = category.trim().charAt(0).toUpperCase() || "P";
          const tags = prompt.tags.length ? prompt.tags.map((tag) => `<span class="mini-tag">${escapeHtml(tag)}</span>`).join("") : '<span class="mini-tag muted-tag">No tags</span>';
          return `<button class="prompt-card ${audit.level} ${prompt.id === selectedId ? "active" : ""}" type="button" data-prompt-id="${prompt.id}">
            <div class="prompt-card-main">
              <div class="card-topline">
                <span class="category-token" aria-hidden="true">${escapeHtml(categoryInitial)}</span>
                <span class="category-pill"><span class="category-dot ${audit.level}"></span>${escapeHtml(category)}</span>
                <span class="risk ${audit.level}">${risk} risk</span>
              </div>
              <div class="card-title-row">
                <h4>${escapeHtml(prompt.title || "Untitled prompt")}</h4>
                <span class="updated-time">${updated}</span>
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
        })
        .join("")
    : document.querySelector("#emptyStateTemplate").innerHTML;
}

function renderListStats(prompts) {
  const highRisk = prompts.filter((prompt) => auditPrompt(prompt).level === "high").length;
  const variableCount = prompts.reduce((sum, prompt) => sum + getPlaceholders(prompt.body).length, 0);
  const categories = new Set(prompts.map((prompt) => prompt.category).filter(Boolean)).size;
  els.listStats.innerHTML = `
    <span><strong>${categories}</strong> categories</span>
    <span><strong>${variableCount}</strong> variables</span>
    <span><strong>${highRisk}</strong> high risk</span>
  `;
}

function selectFirstVisiblePrompt() {
  const [firstPrompt] = getFilteredPrompts();
  selectedId = firstPrompt?.id || null;
  selectedVersionIndex = null;
}

function renderEditor() {
  const prompt = getSelectedPrompt();
  if (!prompt) {
    els.form.querySelectorAll("input, textarea, select, button").forEach((node) => {
      if (node.id !== "newPromptButton") node.disabled = true;
    });
    return;
  }
  els.form.querySelectorAll("input, textarea, select, button").forEach((node) => (node.disabled = false));
  const isDraft = selectedId === "__draft__";
  els.titleInput.value = prompt.title;
  els.editorStatus.textContent = isDraft ? "Draft - not saved yet" : "Saved prompt";
  els.duplicateButton.disabled = isDraft;
  els.deleteButton.title = isDraft ? "Discard draft" : "Delete prompt";
  els.deleteButton.setAttribute("aria-label", isDraft ? "Discard draft" : "Delete prompt");
  const hasCategory = state.categories.includes(prompt.category);
  els.categorySelect.value = hasCategory ? prompt.category : "__new__";
  els.categoryCustomInput.hidden = hasCategory;
  els.categoryCustomInput.value = hasCategory ? "" : prompt.category;
  els.tagsInput.value = prompt.tags.join(", ");
  els.summaryInput.value = prompt.summary;
  els.bodyInput.value = prompt.body;
  if (els.guideTaskSelect.options.length) {
    els.guideTaskSelect.value = String(guessGuideIndex(prompt));
  }
  renderPlaceholders(prompt);
  renderAudit(prompt);
  renderHistory(prompt);
}

function guessGuideIndex(prompt) {
  const text = `${prompt.title} ${prompt.category} ${prompt.tags.join(" ")} ${prompt.summary} ${prompt.body}`.toLowerCase();
  if (/(code|review|diff|bug|security|test|language)/.test(text)) return 1;
  if (/(research|source|evidence|confidence|synthesis)/.test(text)) return 2;
  if (/(extract|json|schema|field|table)/.test(text)) return 3;
  if (/(write|edit|draft|tone|audience|style)/.test(text)) return 4;
  return 0;
}

function renderPlaceholders(prompt) {
  const placeholders = getPlaceholders(prompt.body);
  els.placeholderList.innerHTML = placeholders.length
    ? placeholders.map((name) => `<span class="placeholder-chip">{${escapeHtml(name)}}</span>`).join("")
    : '<span class="placeholder-chip">No variables</span>';
}

function renderAudit(prompt) {
  const audit = auditPrompt(prompt);
  els.auditScore.textContent = audit.score;
  els.auditScore.parentElement.className = `score-ring ${audit.level}`;
  els.auditBadge.textContent = audit.level === "low" ? "Clean" : audit.level === "medium" ? "Review" : "Risk";
  els.auditBadge.className = `audit-badge ${audit.level === "low" ? "" : audit.level}`;
  els.auditFindings.innerHTML = audit.findings.length
    ? audit.findings.map((finding) => `<li class="${finding.level === "high" ? "high" : finding.level === "medium" ? "warn" : ""}">${escapeHtml(finding.message)}</li>`).join("")
    : "<li>No safety findings detected.</li>";
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
    category: selectedCategory === "All" ? "Writing" : selectedCategory,
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
  selectedCategory = selectedCategory === "All" ? "All" : prompt.category;
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
  const confirmed = confirm(`Delete "${prompt.title}"? This only removes it from local storage.`);
  if (!confirmed) return;
  state.prompts = state.prompts.filter((item) => item.id !== prompt.id);
  selectedId = state.prompts[0]?.id || null;
  selectedVersionIndex = null;
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

function confirmRepositoryAction(message) {
  if (!hasPendingEditorChanges()) return true;
  return confirm(message);
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

function deleteCategory(category) {
  if (!category || category === "All") return;
  const count = state.prompts.filter((prompt) => prompt.category === category).length;
  if (count > 0) return;
  state.categories = state.categories.filter((item) => item !== category);
  if (selectedCategory === category) {
    selectedCategory = "All";
    selectFirstVisiblePrompt();
  }
  saveState();
  render();
}

function exportJson() {
  if (!confirmRepositoryAction("Export includes saved prompts only. Unsaved changes will not be included. Continue?")) return;
  downloadFile(`prompt-vault-${dateStamp()}.json`, JSON.stringify(state, null, 2), "application/json");
}

function exportMarkdown() {
  if (!confirmRepositoryAction("Export includes saved prompts only. Unsaved changes will not be included. Continue?")) return;
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
}

function renderGuide() {
  if (!els.guideTaskSelect || !els.guidePatternList) return;
  if (!els.guideTaskSelect.options.length) {
    els.guideTaskSelect.innerHTML = promptGuide.map((item, index) => `<option value="${index}">${escapeHtml(item.task)}</option>`).join("");
  }
  const item = promptGuide[Number(els.guideTaskSelect.value) || 0];
  els.guidePatternList.innerHTML = `
    <p>${escapeHtml(item.guidance)}</p>
    <div class="guide-chips">
      ${item.patterns.map((pattern) => `<span>${escapeHtml(pattern)}</span>`).join("")}
    </div>
    <div class="guide-placeholders">
      <strong>Useful placeholders</strong>
      <span>${item.placeholders.map((name) => `{${escapeHtml(name)}}`).join(" ")}</span>
    </div>
  `;
  els.guideTemplatePreview.textContent = item.scaffold;
}

function insertGuideScaffold() {
  const item = promptGuide[Number(els.guideTaskSelect.value) || 0];
  const prefix = els.bodyInput.value.trim() ? `${els.bodyInput.value.trim()}\n\n---\n\n` : "";
  els.bodyInput.value = `${prefix}${item.scaffold}`;
  const draft = {
    title: els.titleInput.value,
    summary: els.summaryInput.value,
    body: els.bodyInput.value
  };
  renderPlaceholders(draft);
  renderAudit(draft);
  markEditorDirty();
  els.bodyInput.focus();
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
      alert(`Import failed: ${error.message}`);
    }
  };
  reader.readAsText(file);
}

function parseImportText(text, filename) {
  if (filename.endsWith(".json")) {
    const imported = JSON.parse(text);
    return Array.isArray(imported.prompts) ? imported.prompts : Array.isArray(imported) ? imported : [];
  }
  return parseMarkdownPrompts(text);
}

function showImportPreview(filename, prompts) {
  if (!prompts.length) {
    alert("No prompts found in this file.");
    return;
  }
  const existingTitles = new Set(state.prompts.map((prompt) => prompt.title.trim().toLowerCase()));
  const duplicates = prompts.filter((prompt) => existingTitles.has(String(prompt.title || "").trim().toLowerCase())).length;
  const categories = [...new Set(prompts.map((prompt) => prompt.category || "Imported"))];
  const highRisk = prompts.filter((prompt) => auditPrompt(normalizePrompt(prompt)).level === "high").length;
  els.importPreviewBody.innerHTML = `
    <div class="preview-grid">
      <span><strong>${prompts.length}</strong> prompts</span>
      <span><strong>${categories.length}</strong> categories</span>
      <span><strong>${duplicates}</strong> duplicates</span>
      <span><strong>${highRisk}</strong> high risk</span>
    </div>
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
  els.importPreviewModal.hidden = false;
  renderIcons(els.importPreviewModal);
}

function closeImportPreview() {
  pendingImportPrompts = [];
  els.importPreviewModal.hidden = true;
}

function confirmImportPreview() {
  mergePrompts(pendingImportPrompts);
  pendingImportPrompts = [];
  selectedCategory = "All";
  selectedTag = null;
  els.importPreviewModal.hidden = true;
  saveState();
  render();
}

function mergePrompts(prompts) {
  const now = new Date().toISOString();
  const existingKeys = new Set(state.prompts.map((prompt) => promptKey(prompt)));
  const existingIds = new Set(state.prompts.map((prompt) => prompt.id));
  let firstImportedId = null;
  prompts.forEach((item) => {
    const prompt = normalizePrompt(item, now);
    if (existingIds.has(prompt.id)) prompt.id = crypto.randomUUID();
    const key = promptKey(prompt);
    if (existingKeys.has(key)) return;
    ensureCategory(prompt.category);
    state.prompts.unshift(prompt);
    existingKeys.add(key);
    existingIds.add(prompt.id);
    if (!firstImportedId) firstImportedId = prompt.id;
  });
  if (firstImportedId) selectedId = firstImportedId;
}

function promptKey(prompt) {
  return `${String(prompt.title || "").trim().toLowerCase()}::${String(prompt.body || "").trim()}`;
}

function normalizePrompt(item, now = new Date().toISOString()) {
  return {
    id: item.id || crypto.randomUUID(),
    title: item.title || "Imported prompt",
    category: item.category || "Imported",
    tags: Array.isArray(item.tags) ? item.tags : normalizeTags(String(item.tags || "")),
    summary: item.summary || "",
    body: item.body || item.prompt || "",
    createdAt: item.createdAt || now,
    updatedAt: item.updatedAt || now,
    history: Array.isArray(item.history) ? item.history : []
  };
}

function parseMarkdownPrompts(text) {
  return text
    .split(/\n---\n/g)
    .map((block) => {
      const title = (block.match(/^#\s+(.+)$/m) || [null, "Imported prompt"])[1];
      const category = (block.match(/^- Category:\s*(.+)$/im) || [null, "Imported"])[1];
      const tags = (block.match(/^- Tags:\s*(.+)$/im) || [null, ""])[1];
      const summary = (block.match(/##\s+executive summary\s+([\s\S]*?)(?=\n##|$)/i) || [null, ""])[1]?.trim();
      const body = (block.match(/```(?:text)?\s+([\s\S]*?)```/i) || [null, block])[1]?.trim();
      return { title, category, tags, summary, body };
    })
    .filter((prompt) => prompt.body);
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
els.restoreButton.addEventListener("click", restoreVersion);
els.searchInput.addEventListener("input", renderPromptList);
els.sortSelect.addEventListener("change", renderPromptList);
els.exportJsonButton.addEventListener("click", exportJson);
els.exportMdButton.addEventListener("click", exportMarkdown);
els.guideTaskSelect.addEventListener("change", renderGuide);
els.insertGuideButton.addEventListener("click", insertGuideScaffold);
els.confirmImportButton.addEventListener("click", confirmImportPreview);
els.cancelImportButton.addEventListener("click", closeImportPreview);
els.cancelImportTextButton.addEventListener("click", closeImportPreview);
els.importButton.addEventListener("click", () => {
  if (!confirmRepositoryAction("Import adds prompts to saved data. Unsaved changes will not be included. Continue?")) return;
  els.importFile.click();
});
els.importFile.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) importFile(file);
  event.target.value = "";
});

[els.bodyInput, els.summaryInput, els.titleInput, els.categorySelect, els.categoryCustomInput, els.tagsInput].forEach((input) => {
  input.addEventListener("input", () => {
    const prompt = {
      title: els.titleInput.value,
      category: getEditorCategory(),
      tags: normalizeTags(els.tagsInput.value),
      summary: els.summaryInput.value,
      body: els.bodyInput.value
    };
    renderPlaceholders(prompt);
    renderAudit(prompt);
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
  const deleteCategoryButton = event.target.closest("[data-delete-category]");
  if (deleteCategoryButton) {
    deleteCategory(deleteCategoryButton.dataset.deleteCategory);
    return;
  }
  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    if (!confirmPendingEditorChanges()) return;
    draftPrompt = null;
    hasUnsavedChanges = false;
    selectedCategory = categoryButton.dataset.category;
    selectedTag = null;
    selectFirstVisiblePrompt();
    render();
  }
  const tagButton = event.target.closest("[data-tag]");
  if (tagButton) {
    if (!confirmPendingEditorChanges()) return;
    draftPrompt = null;
    hasUnsavedChanges = false;
    selectedTag = selectedTag === tagButton.dataset.tag ? null : tagButton.dataset.tag;
    selectedCategory = "All";
    selectFirstVisiblePrompt();
    render();
  }
  const promptButton = event.target.closest("[data-prompt-id]");
  if (promptButton) {
    if (promptButton.dataset.promptId !== selectedId && !confirmPendingEditorChanges()) return;
    draftPrompt = null;
    hasUnsavedChanges = false;
    selectedId = promptButton.dataset.promptId;
    selectedVersionIndex = null;
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
