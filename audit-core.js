(function attachAuditCore(root) {
  const auditRules = [
    {
      level: "high",
      weight: 35,
      pattern: "(ignore|bypass|override).{0,30}(system|instruction|policy|guardrail)",
      message: "Possible instruction-bypass wording."
    },
    {
      level: "high",
      weight: 30,
      pattern: "((password|api key|secret|token|credential).{0,30}(print|show|extract|reveal|return)|(print|show|extract|reveal|return).{0,30}(password|api key|secret|token|credential))",
      message: "May request sensitive credential disclosure."
    },
    {
      level: "medium",
      weight: 18,
      pattern: "(personal data|ssn|passport|credit card|medical record|private)",
      message: "Mentions sensitive personal data; verify minimization."
    },
    {
      level: "medium",
      weight: 15,
      pattern: "(delete|drop|wipe|destroy|reset).{0,30}(database|file|record|table)",
      message: "Contains destructive operation language."
    },
    {
      level: "medium",
      weight: 12,
      pattern: "(malware|phishing|exploit|keylogger|ransomware)",
      message: "Security-sensitive topic detected."
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
      label: finding.message,
      level: finding.level,
      points: finding.weight
    }));
    const qualityPenalties = [
      ...(missingSummary ? [{ label: "Executive summary is short or missing.", level: "medium", points: 8 }] : []),
      ...(missingVariables ? [{ label: "No reusable {placeholder} variables detected.", level: "low", points: 4 }] : [])
    ];
    const riskPenaltyTotal = riskPenalties.reduce((sum, penalty) => sum + penalty.points, 0);
    const qualityPenaltyTotal = qualityPenalties.reduce((sum, penalty) => sum + penalty.points, 0);
    let score = 100 - riskPenaltyTotal - qualityPenaltyTotal;
    score = Math.max(0, score);
    const level = score < 70 ? "high" : score < 88 ? "medium" : "low";
    const qualityChecks = [
      { label: "Executive summary", status: missingSummary ? "review" : "pass", detail: missingSummary ? "Add a short use-case summary." : "Summary is clear enough." },
      { label: "Reusable placeholders", status: missingVariables ? "review" : "pass", detail: missingVariables ? "Add variables like {audience} or {task}." : `${placeholders.length} variable(s) detected.` },
      { label: "Output format", status: missingOutputFormat ? "review" : "pass", detail: missingOutputFormat ? "Add a clear return format." : "Output format is mentioned." },
      { label: "Prompt detail", status: shortPrompt ? "review" : "pass", detail: shortPrompt ? "Prompt body may be too short." : "Prompt has enough detail." }
    ];
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
        ...(missingSummary ? [{ level: "medium", message: "Executive summary is short or missing." }] : []),
        ...(missingVariables ? [{ level: "low", message: "No reusable {placeholder} variables detected." }] : [])
      ],
      breakdown: {
        base: 100,
        riskPenalties,
        qualityPenalties,
        riskPenaltyTotal,
        qualityPenaltyTotal,
        final: score
      },
      placeholders,
      qualityChecks,
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
