export type Lang = "en" | "pt" | "es" | "pt-en" | "es-en";
export type UiLang = "en" | "pt" | "es";

export const LANG_OPTIONS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "pt", label: "Português", short: "PT" },
  { code: "es", label: "Español", short: "ES" },
  { code: "pt-en", label: "Português + English", short: "PT-EN" },
  { code: "es-en", label: "Español + English", short: "ES-EN" }
];

export function uiLang(lang: Lang): UiLang {
  if (lang === "pt-en") return "pt";
  if (lang === "es-en") return "es";
  return lang;
}

export function isBilingual(lang: Lang): boolean {
  return lang === "pt-en" || lang === "es-en";
}

export function tx<T extends string>(
  value: Record<UiLang, T> | Record<string, T> | string | null | undefined,
  lang: UiLang
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.en ?? Object.values(value)[0] ?? "";
}

export const strings = {
  en: {
    appName: "KangaLearner",
    home: "Home",
    learn: "Learn",
    practice: "Practice",
    mock: "Mock Test",
    profile: "Profile",
    startPractice: "Start practice",
    startMock: "Start mock test",
    state: "State",
    language: "Language",
    save: "Save",
    saved: "Saved",
    wrong: "Wrong",
    unanswered: "Unanswered",
    all: "All",
    allTopics: "All topics",
    answer: "Answer",
    explanation: "Explanation",
    next: "Next",
    finish: "Finish",
    reset: "Reset progress",
    guest: "Guest mode",
    signIn: "Sign in",
    signUp: "Create account",
    signOut: "Sign out",
    email: "Email",
    password: "Password",
    syncPending: "Sync pending",
    synced: "Synced",
    offlineReady: "Works offline",
    mockMode: "Mode",
    practiceMode: "Practice",
    examMode: "Exam",
    timeRemaining: "Time remaining",
    result: "Result",
    pass: "Pass",
    fail: "Keep practising",
    noQuestions: "No questions available for this filter.",
    tutorLater: "AI tutor plugin reserved for a future release."
  },
  pt: {
    appName: "KangaLearner",
    home: "Início",
    learn: "Aprender",
    practice: "Praticar",
    mock: "Simulado",
    profile: "Perfil",
    startPractice: "Começar prática",
    startMock: "Iniciar simulado",
    state: "Estado",
    language: "Idioma",
    save: "Salvar",
    saved: "Salvas",
    wrong: "Erradas",
    unanswered: "Sem resposta",
    all: "Todas",
    allTopics: "Todos os tópicos",
    answer: "Resposta",
    explanation: "Explicação",
    next: "Próxima",
    finish: "Finalizar",
    reset: "Reiniciar progresso",
    guest: "Modo visitante",
    signIn: "Entrar",
    signUp: "Criar conta",
    signOut: "Sair",
    email: "E-mail",
    password: "Senha",
    syncPending: "Sync pendente",
    synced: "Sincronizado",
    offlineReady: "Funciona offline",
    mockMode: "Modo",
    practiceMode: "Prática",
    examMode: "Exame",
    timeRemaining: "Tempo restante",
    result: "Resultado",
    pass: "Aprovado",
    fail: "Continue praticando",
    noQuestions: "Nenhuma pergunta disponível para este filtro.",
    tutorLater: "Plugin de AI tutor reservado para uma versão futura."
  },
  es: {
    appName: "KangaLearner",
    home: "Inicio",
    learn: "Aprender",
    practice: "Practicar",
    mock: "Simulacro",
    profile: "Perfil",
    startPractice: "Empezar práctica",
    startMock: "Iniciar simulacro",
    state: "Estado",
    language: "Idioma",
    save: "Guardar",
    saved: "Guardadas",
    wrong: "Incorrectas",
    unanswered: "Sin responder",
    all: "Todas",
    allTopics: "Todos los temas",
    answer: "Respuesta",
    explanation: "Explicación",
    next: "Siguiente",
    finish: "Finalizar",
    reset: "Reiniciar progreso",
    guest: "Modo invitado",
    signIn: "Ingresar",
    signUp: "Crear cuenta",
    signOut: "Salir",
    email: "Correo",
    password: "Contraseña",
    syncPending: "Sync pendiente",
    synced: "Sincronizado",
    offlineReady: "Funciona offline",
    mockMode: "Modo",
    practiceMode: "Práctica",
    examMode: "Examen",
    timeRemaining: "Tiempo restante",
    result: "Resultado",
    pass: "Aprobado",
    fail: "Sigue practicando",
    noQuestions: "No hay preguntas disponibles para este filtro.",
    tutorLater: "Plugin de AI tutor reservado para una versión futura."
  }
} as const;

export type MobileStrings = Record<keyof (typeof strings)["en"], string>;
