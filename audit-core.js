(function attachAuditCore(root) {
  const auditRules = [
    {
      id: "R1",
      label: "Instruction bypass",
      level: "high",
      weight: 35,
      pattern: "(ignore|bypass|override).{0,30}(system|instruction|policy|guardrail)",
      message: "May ask to bypass instructions or policy."
    },
    {
      id: "R2",
      label: "Secret exposure",
      level: "high",
      weight: 30,
      pattern: "((password|api key|secret|token|credential).{0,30}(print|show|extract|reveal|return)|(print|show|extract|reveal|return).{0,30}(password|api key|secret|token|credential))",
      message: "May ask to reveal secrets or credentials."
    },
    {
      id: "R3",
      label: "Personal data",
      level: "medium",
      weight: 18,
      pattern: "(personal data|ssn|passport|credit card|medical record|private)",
      message: "Mentions sensitive personal data."
    },
    {
      id: "R4",
      label: "Destructive action",
      level: "medium",
      weight: 15,
      pattern: "(delete|drop|wipe|destroy|reset).{0,30}(database|file|record|table)",
      message: "Contains destructive operation wording."
    },
    {
      id: "R5",
      label: "Cyber abuse",
      level: "medium",
      weight: 12,
      pattern: "(malware|phishing|exploit|keylogger|ransomware)",
      message: "Mentions harmful cyber activity."
    }
  ];

  function getPlaceholders(body) {
    return [...new Set((String(body || "").match(/\{[a-zA-Z0-9_.-]+\}/g) || []).map((item) => item.slice(1, -1)))];
  }

  function auditPrompt(prompt, rules = auditRules) {
    const text = `${prompt.title || ""}\n${prompt.summary || ""}\n${prompt.body || ""}`.toLowerCase();
    const placeholders = getPlaceholders(prompt.body);
    const findings = rules.filter((rule) => new RegExp(rule.pattern).test(text));
    const missingSummary = String(prompt.summary || "").trim().length < 20;
    const missingVariables = placeholders.length === 0;
    const missingOutputFormat = !/(format|return|json|markdown|table|bullet|section)/i.test(prompt.body || "");
    const shortPrompt = String(prompt.body || "").trim().length < 80;
    const riskPenalties = findings.map((finding) => ({
      id: finding.id,
      label: finding.label,
      level: finding.level,
      points: finding.weight,
      detail: finding.message
    }));
    const riskChecks = rules.map((rule) => {
      const matched = findings.includes(rule);
      return {
        id: rule.id,
        label: rule.label,
        status: matched ? "review" : "pass",
        level: rule.level,
        points: matched ? rule.weight : 0,
        maxPenalty: rule.weight,
        detail: matched ? rule.message : "No match."
      };
    });
    const structureChecks = [
      {
        id: "S1",
        label: "Summary",
        status: missingSummary ? "review" : "pass",
        points: missingSummary ? 8 : 0,
        maxPenalty: 8,
        detail: missingSummary ? "Add a short use-case summary." : "Summary is long enough."
      },
      {
        id: "S2",
        label: "Variables",
        status: missingVariables ? "review" : "pass",
        points: missingVariables ? 4 : 0,
        maxPenalty: 4,
        detail: missingVariables ? "Add {placeholder} variables." : `${placeholders.length} variable(s) found.`
      },
      {
        id: "S3",
        label: "Output format",
        status: missingOutputFormat ? "review" : "pass",
        points: 0,
        maxPenalty: 0,
        detail: missingOutputFormat ? "Mention JSON, Markdown, table, bullets, or sections." : "Output format is mentioned."
      },
      {
        id: "S4",
        label: "Detail",
        status: shortPrompt ? "review" : "pass",
        points: 0,
        maxPenalty: 0,
        detail: shortPrompt ? "Prompt body may be too short." : "Prompt has enough detail."
      }
    ];
    const structurePenalties = structureChecks
      .filter((check) => check.points > 0)
      .map((check) => ({
        id: check.id,
        label: check.label,
        level: check.status === "review" ? "medium" : "low",
        points: check.points,
        detail: check.detail
      }));
    const riskPenaltyTotal = riskPenalties.reduce((sum, penalty) => sum + penalty.points, 0);
    const structurePenaltyTotal = structurePenalties.reduce((sum, penalty) => sum + penalty.points, 0);
    let score = 100 - riskPenaltyTotal - structurePenaltyTotal;
    score = Math.max(0, score);
    const level = score < 70 ? "high" : score < 88 ? "medium" : "low";
    const suggestions = [
      ...(missingSummary ? ["Add a short executive summary explaining when to use this prompt."] : []),
      ...(missingVariables ? ["Add reusable placeholders such as {audience}, {task}, or {format}."] : []),
      ...(missingOutputFormat ? ["Add a clear output format so results are easier to compare."] : []),
      ...(findings.some((finding) => finding.level === "high") ? ["Remove or rewrite wording that asks for secrets, bypasses, or unsafe behavior."] : [])
    ];
    return {
      score,
      level,
      findings: [
        ...findings,
        ...(missingSummary ? [{ id: "S1", label: "Summary", level: "medium", message: "Executive summary is short or missing." }] : []),
        ...(missingVariables ? [{ id: "S2", label: "Variables", level: "low", message: "No reusable {placeholder} variables detected." }] : [])
      ],
      breakdown: {
        base: 100,
        riskPenalties,
        structurePenalties,
        qualityPenalties: structurePenalties,
        riskPenaltyTotal,
        structurePenaltyTotal,
        qualityPenaltyTotal: structurePenaltyTotal,
        final: score
      },
      placeholders,
      riskChecks,
      structureChecks,
      qualityChecks: structureChecks,
      suggestions: suggestions.length ? suggestions : ["No improvement needed from current audit checks."],
      exportWarning: level === "high" ? "High-risk prompt. Review before export." : "No export warning for this prompt."
    };
  }

  root.PromptVaultAudit = {
    auditRules,
    auditPrompt,
    getPlaceholders
  };
})(typeof window !== "undefined" ? window : globalThis);
