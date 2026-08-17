import { CATEGORIES, filterByState, type AuStateCode, type LocalizedText } from "@kanga/core";
import { QUESTIONS } from "@kanga/core/data/questions";

/**
 * Contagens reais do banco de perguntas por estado, calculadas em build.
 * Server-only: importa o dataset completo, nao usar em client components.
 */
export interface StateBankCounts {
  total: number;
  car: number;
  motorcycle: number;
}

export function bankCountsFor(code: AuStateCode): StateBankCounts {
  const pool = filterByState([...QUESTIONS], code);
  const motorcycle = pool.filter((q) => q.licenceType === "motorcycle").length;
  return { total: pool.length, car: pool.length - motorcycle, motorcycle };
}

/** Labels trilingues das categorias realmente presentes no pool do estado. */
export function bankCategoryLabelsFor(code: AuStateCode): LocalizedText[] {
  const pool = filterByState([...QUESTIONS], code);
  const present = new Set(pool.map((q) => q.cat));
  return CATEGORIES.filter((c) => present.has(c.key)).map((c) => c.label);
}

/** Total de perguntas unicas cobrindo os estados publicados (sem dupla contagem). */
export function bankTotalFor(codes: AuStateCode[]): number {
  const wanted = new Set<string>(codes);
  return QUESTIONS.filter((q) => !q.states || q.states.some((s) => wanted.has(s))).length;
}
