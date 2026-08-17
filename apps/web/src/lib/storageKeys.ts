export const SK = {
  answered: "kl-answered",
  saved: "kl-saved",
  stateV2: "kl-state-v2",
  lang: "kl-lang",
  stateLegacy: "kl-state",
  theme: "kl-theme",
  licenceType: "kl-licence-type",
  // histórico local de simulados (guest) — alimenta o readiness do /today
  mockHistory: "kl-mock-history",
  // chave do site estático (usado apenas em migrateLocalAttempts)
  legacyByState: "kl-answered-by-state-v2"
} as const;
