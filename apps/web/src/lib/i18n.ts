// Lang includes pure modes + bilingual modes
// "pt-en" = Portuguese UI + English subtitle in questions
// "es-en" = Spanish UI + English subtitle in questions
export type Lang = "en" | "pt" | "es" | "pt-en" | "es-en";

// The base lang used for UI strings (strips the bilingual suffix)
export type UiLang = "en" | "pt" | "es";

export function getUiLang(lang: Lang): UiLang {
  if (lang === "pt-en") return "pt";
  if (lang === "es-en") return "es";
  return lang;
}

export function isBilingualLang(lang: Lang): boolean {
  return lang === "pt-en" || lang === "es-en";
}

export const VALID_LANGS: Lang[] = ["en", "pt", "es", "pt-en", "es-en"];

export const t = {
  en: {
    // Nav
    learn: "Learn",
    practice: "Practice",
    mockTest: "Mock Test",
    progress: "Progress",
    resources: "Resources",
    dashboard: "Dashboard",
    signIn: "Sign in",
    account: "Account",
    signOut: "Sign out",
    // Practice UI
    studyMode: "Study Mode",
    filterByTopic: "Filter by topic",
    allQuestions: "All questions",
    wrongAnswers: "Wrong answers",
    unanswered: "Unanswered",
    mockTestMode: "Mock test (30)",
    allTopics: "All topics",
    yourProgress: "Your Progress",
    score: "Score",
    correctLabel: "correct",
    resetAll: "Reset all",
    viewDashboard: "View full dashboard →",
    answer: "Answer",
    noQuestionsTitle: "No questions here!",
    noQuestionsSub: "Try a different mode or reset your progress.",
    language: "Language",
    inEnglish: "In English",
    // Mock test
    startMockTest: "Start Mock Test",
    practiceMode: "Practice Mock",
    examMode: "Exam Mode",
    loading: "Loading…",
    // Auth
    emailLabel: "Email",
    passwordLabel: "Password",
    forgotPassword: "Forgot password?",
    continueWithGoogle: "Continue with Google",
    // Misc
    pass: "Pass",
    fail: "Fail",
  },
  pt: {
    learn: "Aprender",
    practice: "Praticar",
    mockTest: "Simulado",
    progress: "Progresso",
    resources: "Recursos",
    dashboard: "Painel",
    signIn: "Entrar",
    account: "Conta",
    signOut: "Sair",
    studyMode: "Modo de Estudo",
    filterByTopic: "Filtrar por tópico",
    allQuestions: "Todas as perguntas",
    wrongAnswers: "Respostas erradas",
    unanswered: "Não respondidas",
    mockTestMode: "Simulado (30)",
    allTopics: "Todos os tópicos",
    yourProgress: "Seu Progresso",
    score: "Pontuação",
    correctLabel: "corretas",
    resetAll: "Reiniciar tudo",
    viewDashboard: "Ver painel completo →",
    answer: "Resposta",
    noQuestionsTitle: "Nenhuma pergunta aqui!",
    noQuestionsSub: "Tente outro modo ou reinicie seu progresso.",
    language: "Idioma",
    inEnglish: "Em inglês",
    startMockTest: "Iniciar Simulado",
    practiceMode: "Modo Prática",
    examMode: "Modo Exame",
    loading: "Carregando…",
    emailLabel: "E-mail",
    passwordLabel: "Senha",
    forgotPassword: "Esqueceu a senha?",
    continueWithGoogle: "Continuar com Google",
    pass: "Aprovado",
    fail: "Reprovado",
  },
  es: {
    learn: "Aprender",
    practice: "Practicar",
    mockTest: "Simulacro",
    progress: "Progreso",
    resources: "Recursos",
    dashboard: "Panel",
    signIn: "Ingresar",
    account: "Cuenta",
    signOut: "Salir",
    studyMode: "Modo de Estudio",
    filterByTopic: "Filtrar por tema",
    allQuestions: "Todas las preguntas",
    wrongAnswers: "Respuestas incorrectas",
    unanswered: "Sin responder",
    mockTestMode: "Simulacro (30)",
    allTopics: "Todos los temas",
    yourProgress: "Tu Progreso",
    score: "Puntuación",
    correctLabel: "correctas",
    resetAll: "Reiniciar todo",
    viewDashboard: "Ver panel completo →",
    answer: "Respuesta",
    noQuestionsTitle: "¡No hay preguntas aquí!",
    noQuestionsSub: "Prueba otro modo o reinicia tu progreso.",
    language: "Idioma",
    inEnglish: "En inglés",
    startMockTest: "Iniciar Simulacro",
    practiceMode: "Modo Práctica",
    examMode: "Modo Examen",
    loading: "Cargando…",
    emailLabel: "Correo electrónico",
    passwordLabel: "Contraseña",
    forgotPassword: "¿Olvidó su contraseña?",
    continueWithGoogle: "Continuar con Google",
    pass: "Aprobado",
    fail: "Reprobado",
  },
} as const satisfies Record<UiLang, Record<string, string>>;

export type UIStrings = typeof t["en"];
