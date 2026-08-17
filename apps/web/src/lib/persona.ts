import type { UiLang } from "@/lib/i18n";

/**
 * Newcomer-journey personas. Drives onboarding segmentation, home CTAs and the
 * "what do you need today?" entry points. Stored in localStorage (guest) and,
 * when available, mirrored to `user_settings.persona` for logged-in users.
 */
export type Persona =
  | "first-learner"
  | "overseas-licence"
  | "hpt"
  | "pda"
  | "supervisor"
  | "tourist";

export const PERSONAS: readonly Persona[] = [
  "first-learner",
  "overseas-licence",
  "hpt",
  "pda",
  "supervisor",
  "tourist"
] as const;

export function isPersona(value: unknown): value is Persona {
  return typeof value === "string" && (PERSONAS as readonly string[]).includes(value);
}

/** Short label shown on the onboarding chips. */
export const PERSONA_LABEL: Record<Persona, Record<UiLang, string>> = {
  "first-learner": {
    en: "First learner permit",
    pt: "Primeira licença (learner)",
    es: "Primer permiso (learner)"
  },
  "overseas-licence": {
    en: "I have an overseas licence",
    pt: "Tenho licença estrangeira",
    es: "Tengo licencia extranjera"
  },
  hpt: {
    en: "Preparing for the HPT",
    pt: "Preparando o HPT",
    es: "Preparando el HPT"
  },
  pda: {
    en: "Preparing for the PDA",
    pt: "Preparando o PDA",
    es: "Preparando el PDA"
  },
  supervisor: {
    en: "I supervise a learner",
    pt: "Supervisiono um learner",
    es: "Superviso a un learner"
  },
  tourist: {
    en: "Visiting / just want the rules",
    pt: "Visitante / só quero as regras",
    es: "De visita / solo quiero las reglas"
  }
};

/** Where each persona should land after onboarding, plus the headline CTA. */
export const PERSONA_DESTINATION: Record<Persona, string> = {
  "first-learner": "/practice",
  "overseas-licence": "/overseas-licence",
  hpt: "/hpt",
  pda: "/pda",
  supervisor: "/supervisor",
  tourist: "/quick-quiz"
};

const STORAGE_KEY = "kl-persona-v1";

export function readPersona(): Persona | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return isPersona(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function persistPersona(persona: Persona): void {
  try {
    localStorage.setItem(STORAGE_KEY, persona);
  } catch {
    /* noop */
  }
}
