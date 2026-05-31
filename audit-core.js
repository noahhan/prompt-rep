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
      pattern: "(password|api key|secret|token|credential).{0,30}(print|show|extract|reveal|return)",
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
    const findings = rules.filter((rule) => new RegExp(rule.pattern).test(text));
    const missingSummary = String(prompt.summary || "").trim().length < 20;
    const missingVariables = getPlaceholders(prompt.body).length === 0;
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
    return {
      score,
      level: score < 70 ? "high" : score < 88 ? "medium" : "low",
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
      }
    };
  }

  root.PromptVaultAudit = {
    auditRules,
    auditPrompt,
    getPlaceholders
  };
})(typeof window !== "undefined" ? window : globalThis);
