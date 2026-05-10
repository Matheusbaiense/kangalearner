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
    // ── Nav ───────────────────────────────────────────────
    home: "Home",
    learn: "Learn",
    practice: "Practice",
    mockTest: "Mock Test",
    progress: "Progress",
    resources: "Resources",
    dashboard: "Dashboard",
    signIn: "Sign in",
    account: "Account",
    signOut: "Sign out",

    // ── Learn page ────────────────────────────────────────
    learnTitle: "Learn Road Rules",
    learnSub: "Study by topic before taking the practice quiz or mock test.",
    learnKeyRules: "Key Rules",
    learnMistakes: "Common Mistakes",
    learnExample: "Practical Example",
    learnQuickCheck: "Quick Check",
    learnSource: "Source",
    learnBack: "← All topics",
    learnPractice: "Practise this topic →",
    learnAllTopics: "All practice questions →",

    // ── Landing ───────────────────────────────────────────
    heroEyebrow: "WA learner test practice",
    heroTitle: "Prepare for your WA learner test with confidence.",
    heroDesc: "Study key WA road rules, practise the existing WA questions, take a 30-question mock test and track your progress in English, Portuguese or Spanish.",
    heroCta1: "Start practising WA questions",
    heroCta2: "Take the 30-question mock test",
    heroProof: "WA available now. More Australian states coming soon.",
    // Features
    feat1Title: "Learn",
    feat1Sub: "Study road rules by topic with clear explanations.",
    feat2Title: "Practice",
    feat2Sub: "Answer questions filtered by category and difficulty.",
    feat3Title: "Mock Test",
    feat3Sub: "Simulate the official 30-question WA learner test.",
    feat4Title: "Progress",
    feat4Sub: "See your accuracy by category and review mistakes.",
    // Trust
    trustTitle: "Why KangaLearner",
    trustMultiTitle: "Multilingual support",
    trustMultiBody: "Study in English, Portuguese or Spanish — more languages coming soon.",
    trustSaveTitle: "Progress saved",
    trustSaveBody: "Your progress is saved automatically in the browser.",
    trustOfficialTitle: "Based on official rules",
    trustOfficialBody: "Content structured from WA public sources. Always confirm with the Department of Transport.",
    // Topics
    topicsTitle: "Study the key topics",
    topicSpeed: "Speed Limits",
    topicSpeedDesc: "Understand speed limits and rules",
    topicSigns: "Road Signs",
    topicSignsDesc: "Recognise signs and road markings",
    topicParking: "Parking",
    topicParkingDesc: "Parking rules and restrictions",
    topicAlcohol: "Alcohol / BAC",
    topicAlcoholDesc: "Drink driving laws and penalties",
    topicLanes: "Lanes & Merging",
    topicLanesDesc: "Lane use, lines and giving way",
    topicSafety: "Road Safety",
    topicSafetyDesc: "Tips for driving safely",
    // States
    stateAvailable: "Available now",
    comingSoon: "Coming soon",
    // Testimonials / FAQ / CTA
    testimonialsTitle: "What learners say",
    faqTitle: "Frequently asked questions",
    ctaTitle: "Ready to pass your learner test?",
    ctaBtn: "Start practising now →",
    // Social proof
    proofQuestions: "Questions",
    proofLanguages: "Languages",
    proofFree: "Forever",

    // ── Practice UI ───────────────────────────────────────
    studyMode: "Study Mode",
    filterByTopic: "Filter by topic",
    allQuestions: "All questions",
    wrongAnswers: "Wrong answers",
    unanswered: "Unanswered",
    mockTestMode: "Mock test (30)",
    savedMode: "Saved",
    allTopics: "All topics",
    yourProgress: "Your Progress",
    score: "Score",
    correctLabel: "correct",
    resetAll: "Reset all",
    viewDashboard: "View full dashboard →",
    answer: "Answer",
    noQuestionsTitle: "No questions here!",
    noQuestionsSub: "Try a different mode or reset your progress.",
    noSavedTitle: "No saved questions yet",
    noSavedSub: "Tap ★ on any question to save it for later.",
    language: "Language",
    inEnglish: "In English",
    saveQuestion: "Save question",
    unsaveQuestion: "Unsave question",

    // ── Mock test ─────────────────────────────────────────
    startMockTest: "Start Mock Test",
    practiceMode: "Practice Mock",
    examMode: "Exam Mode",
    loading: "Loading…",
    exitLabel: "Exit",
    nextLabel: "Next →",
    finishLabel: "Finish →",
    timeRemaining: "Time remaining",
    timeUp: "Time's up!",
    submitAnyway: "Submit test",

    // ── Resources ─────────────────────────────────────────
    resourcesKicker: "Official sources",
    resourcesTitle: "Study resources for the WA learner test",
    resourcesSub: "These links open official Western Australia government websites. Use them alongside your KangaLearner practice for the best results.",
    resourcesWaOnly: "WA resources only — other states coming soon.",
    resourcesStudyGuide: "Study guide",
    resourcesPracticeNow: "Practise questions",

    // ── Progress ──────────────────────────────────────────
    progressTitle: "Your Progress",
    progressSub: "Track your accuracy by topic and see what to study next.",
    progressEmpty: "Answer some questions in Practice mode to see your stats here.",
    categoryCol: "Category",
    accuracyCol: "Accuracy",
    attemptedCol: "Attempted",
    nextStepTitle: "Recommended next step",
    nextStepReviewWrong: "Review your wrong answers",
    nextStepFinishUnanswered: "Answer unanswered questions",
    nextStepTakeMock: "You're ready — take the mock test!",
    nextStepEmpty: "Start practising to get a recommendation.",
    resetConfirm: "Reset all progress? This cannot be undone.",

    // ── Footer ────────────────────────────────────────────
    footerTagline: "Pass your WA learner test — in English, Portuguese or Spanish.",
    footerProductTitle: "Product",
    footerCompanyTitle: "Company",
    footerLegalTitle: "Legal",
    footerNewsletterTitle: "Stay updated",
    footerNewsletterSub: "New states, features and tips — no spam.",
    newsletterPlaceholder: "Your email address",
    newsletterBtn: "Subscribe",
    newsletterSuccess: "Thanks! We'll keep you posted.",
    newsletterError: "Something went wrong. Please try again.",
    footerCopyright: "© 2026 KangaLearner. All rights reserved.",

    // ── Auth ──────────────────────────────────────────────
    emailLabel: "Email",
    passwordLabel: "Password",
    forgotPassword: "Forgot password?",
    continueWithGoogle: "Continue with Google",

    // ── Misc ──────────────────────────────────────────────
    pass: "Pass",
    fail: "Fail",
  },

  pt: {
    // ── Nav ───────────────────────────────────────────────
    home: "Início",
    learn: "Aprender",
    practice: "Praticar",
    mockTest: "Simulado",
    progress: "Progresso",
    resources: "Recursos",
    dashboard: "Painel",
    signIn: "Entrar",
    account: "Conta",
    signOut: "Sair",

    // ── Learn page ────────────────────────────────────────
    learnTitle: "Aprender as regras de trânsito",
    learnSub: "Estude por tópico antes de fazer o simulado ou praticar.",
    learnKeyRules: "Regras principais",
    learnMistakes: "Erros comuns",
    learnExample: "Exemplo prático",
    learnQuickCheck: "Verificação rápida",
    learnSource: "Fonte",
    learnBack: "← Todos os tópicos",
    learnPractice: "Praticar este tópico →",
    learnAllTopics: "Todas as perguntas →",

    // ── Landing ───────────────────────────────────────────
    heroEyebrow: "Prática para a prova de learner de WA",
    heroTitle: "Prepare-se para a prova de learner de WA com confiança.",
    heroDesc: "Estude as principais regras de trânsito de WA, pratique as perguntas existentes, faça um simulado com 30 questões e acompanhe seu progresso em inglês, português ou espanhol.",
    heroCta1: "Praticar perguntas de WA",
    heroCta2: "Fazer simulado de 30 questões",
    heroProof: "WA disponível agora. Outros estados da Austrália em breve.",
    // Features
    feat1Title: "Aprender",
    feat1Sub: "Estude as regras de trânsito por tema com explicações claras.",
    feat2Title: "Praticar",
    feat2Sub: "Responda perguntas filtradas por categoria e dificuldade.",
    feat3Title: "Simulado",
    feat3Sub: "Simule a prova oficial de learner de WA com 30 questões.",
    feat4Title: "Progresso",
    feat4Sub: "Veja sua taxa de acerto por categoria e revise os erros.",
    // Trust
    trustTitle: "Por que KangaLearner",
    trustMultiTitle: "Suporte multilíngue",
    trustMultiBody: "Estude em inglês, português e espanhol — mais idiomas em breve.",
    trustSaveTitle: "Progresso salvo",
    trustSaveBody: "Seu progresso é salvo automaticamente no navegador.",
    trustOfficialTitle: "Baseado em regras oficiais",
    trustOfficialBody: "Conteúdo baseado em fontes públicas de WA. Confirme sempre com o Departamento de Transportes.",
    // Topics
    topicsTitle: "Estude os principais tópicos",
    topicSpeed: "Velocidade",
    topicSpeedDesc: "Entenda limites e regras de velocidade",
    topicSigns: "Sinais",
    topicSignsDesc: "Reconheça sinais e marcações",
    topicParking: "Estacionamento",
    topicParkingDesc: "Regras e restrições de estacionamento",
    topicAlcohol: "Álcool / BAC",
    topicAlcoholDesc: "Leis e penalidades de álcool ao volante",
    topicLanes: "Faixas e Ultrapassagem",
    topicLanesDesc: "Uso de faixas, linhas e dar passagem",
    topicSafety: "Segurança",
    topicSafetyDesc: "Dicas para dirigir com segurança",
    // States
    stateAvailable: "Disponível agora",
    comingSoon: "Em breve",
    // Testimonials / FAQ / CTA
    testimonialsTitle: "O que os alunos dizem",
    faqTitle: "Perguntas frequentes",
    ctaTitle: "Pronto para passar na prova de learner?",
    ctaBtn: "Começar a praticar agora →",
    // Social proof
    proofQuestions: "Perguntas",
    proofLanguages: "Idiomas",
    proofFree: "Para sempre",

    // ── Practice UI ───────────────────────────────────────
    studyMode: "Modo de Estudo",
    filterByTopic: "Filtrar por tópico",
    allQuestions: "Todas as perguntas",
    wrongAnswers: "Respostas erradas",
    unanswered: "Não respondidas",
    mockTestMode: "Simulado (30)",
    savedMode: "Salvas",
    allTopics: "Todos os tópicos",
    yourProgress: "Seu Progresso",
    score: "Pontuação",
    correctLabel: "corretas",
    resetAll: "Reiniciar tudo",
    viewDashboard: "Ver painel completo →",
    answer: "Resposta",
    noQuestionsTitle: "Nenhuma pergunta aqui!",
    noQuestionsSub: "Tente outro modo ou reinicie seu progresso.",
    noSavedTitle: "Nenhuma pergunta salva ainda",
    noSavedSub: "Toque em ★ em qualquer pergunta para salvá-la.",
    language: "Idioma",
    inEnglish: "Em inglês",
    saveQuestion: "Salvar pergunta",
    unsaveQuestion: "Remover dos salvos",

    // ── Mock test ─────────────────────────────────────────
    startMockTest: "Iniciar Simulado",
    practiceMode: "Modo Prática",
    examMode: "Modo Exame",
    loading: "Carregando…",
    exitLabel: "Sair",
    nextLabel: "Próxima →",
    finishLabel: "Finalizar →",
    timeRemaining: "Tempo restante",
    timeUp: "Tempo esgotado!",
    submitAnyway: "Enviar prova",

    // ── Resources ─────────────────────────────────────────
    resourcesKicker: "Fontes oficiais",
    resourcesTitle: "Recursos de estudo para a prova de learner de WA",
    resourcesSub: "Esses links abrem sites oficiais do governo da Austrália Ocidental. Use-os junto com a prática no KangaLearner para melhores resultados.",
    resourcesWaOnly: "Recursos de WA — outros estados em breve.",
    resourcesStudyGuide: "Guia de estudo",
    resourcesPracticeNow: "Praticar perguntas",

    // ── Progress ──────────────────────────────────────────
    progressTitle: "Seu Progresso",
    progressSub: "Acompanhe sua taxa de acerto por tópico e veja o que estudar a seguir.",
    progressEmpty: "Responda algumas perguntas no modo Prática para ver suas estatísticas aqui.",
    categoryCol: "Categoria",
    accuracyCol: "Acerto",
    attemptedCol: "Respondidas",
    nextStepTitle: "Próximo passo recomendado",
    nextStepReviewWrong: "Revise suas respostas erradas",
    nextStepFinishUnanswered: "Responda as perguntas não respondidas",
    nextStepTakeMock: "Você está pronto — faça o simulado!",
    nextStepEmpty: "Comece a praticar para receber uma recomendação.",
    resetConfirm: "Reiniciar todo o progresso? Esta ação não pode ser desfeita.",

    // ── Footer ────────────────────────────────────────────
    footerTagline: "Passe na prova de learner de WA — em inglês, português ou espanhol.",
    footerProductTitle: "Produto",
    footerCompanyTitle: "Empresa",
    footerLegalTitle: "Legal",
    footerNewsletterTitle: "Fique por dentro",
    footerNewsletterSub: "Novos estados, recursos e dicas — sem spam.",
    newsletterPlaceholder: "Seu endereço de e-mail",
    newsletterBtn: "Assinar",
    newsletterSuccess: "Obrigado! Vamos te manter informado.",
    newsletterError: "Algo deu errado. Tente novamente.",
    footerCopyright: "© 2026 KangaLearner. Todos os direitos reservados.",

    // ── Auth ──────────────────────────────────────────────
    emailLabel: "E-mail",
    passwordLabel: "Senha",
    forgotPassword: "Esqueceu a senha?",
    continueWithGoogle: "Continuar com Google",

    // ── Misc ──────────────────────────────────────────────
    pass: "Aprovado",
    fail: "Reprovado",
  },

  es: {
    // ── Nav ───────────────────────────────────────────────
    home: "Inicio",
    learn: "Aprender",
    practice: "Practicar",
    mockTest: "Simulacro",
    progress: "Progreso",
    resources: "Recursos",
    dashboard: "Panel",
    signIn: "Ingresar",
    account: "Cuenta",
    signOut: "Salir",

    // ── Learn page ────────────────────────────────────────
    learnTitle: "Aprender las reglas de tránsito",
    learnSub: "Estudia por tema antes de hacer el simulacro o practicar.",
    learnKeyRules: "Reglas clave",
    learnMistakes: "Errores comunes",
    learnExample: "Ejemplo práctico",
    learnQuickCheck: "Comprobación rápida",
    learnSource: "Fuente",
    learnBack: "← Todos los temas",
    learnPractice: "Practicar este tema →",
    learnAllTopics: "Todas las preguntas →",

    // ── Landing ───────────────────────────────────────────
    heroEyebrow: "Práctica para el examen learner de WA",
    heroTitle: "Prepárate para el examen learner de WA con confianza.",
    heroDesc: "Estudia las principales reglas de tránsito de WA, practica las preguntas existentes, haz un simulacro de 30 preguntas y sigue tu progreso en inglés, portugués o español.",
    heroCta1: "Practicar preguntas de WA",
    heroCta2: "Hacer simulacro de 30 preguntas",
    heroProof: "WA disponible ahora. Otros estados de Australia próximamente.",
    // Features
    feat1Title: "Aprender",
    feat1Sub: "Estudia las reglas de tránsito por tema con explicaciones claras.",
    feat2Title: "Practicar",
    feat2Sub: "Responde preguntas filtradas por categoría y dificultad.",
    feat3Title: "Simulacro",
    feat3Sub: "Simula el examen oficial learner de WA con 30 preguntas.",
    feat4Title: "Progreso",
    feat4Sub: "Ve tu tasa de aciertos por categoría y revisa los errores.",
    // Trust
    trustTitle: "¿Por qué KangaLearner?",
    trustMultiTitle: "Soporte multilingüe",
    trustMultiBody: "Estudia en inglés, portugués o español — más idiomas próximamente.",
    trustSaveTitle: "Progreso guardado",
    trustSaveBody: "Tu progreso se guarda automáticamente en el navegador.",
    trustOfficialTitle: "Basado en reglas oficiales",
    trustOfficialBody: "Contenido basado en fuentes públicas de WA. Confirma siempre con el Departamento de Transportes.",
    // Topics
    topicsTitle: "Estudia los temas clave",
    topicSpeed: "Velocidad",
    topicSpeedDesc: "Entiende límites y reglas de velocidad",
    topicSigns: "Señales",
    topicSignsDesc: "Reconoce señales y marcas viales",
    topicParking: "Estacionamiento",
    topicParkingDesc: "Reglas y restricciones de estacionamiento",
    topicAlcohol: "Alcohol / BAC",
    topicAlcoholDesc: "Leyes y penalidades por conducir ebrio",
    topicLanes: "Carriles y Adelantamiento",
    topicLanesDesc: "Uso de carriles, líneas y ceder el paso",
    topicSafety: "Seguridad vial",
    topicSafetyDesc: "Consejos para conducir de forma segura",
    // States
    stateAvailable: "Disponible ahora",
    comingSoon: "Próximamente",
    // Testimonials / FAQ / CTA
    testimonialsTitle: "Lo que dicen los estudiantes",
    faqTitle: "Preguntas frecuentes",
    ctaTitle: "¿Listo para aprobar el examen learner?",
    ctaBtn: "Empezar a practicar ahora →",
    // Social proof
    proofQuestions: "Preguntas",
    proofLanguages: "Idiomas",
    proofFree: "Para siempre",

    // ── Practice UI ───────────────────────────────────────
    studyMode: "Modo de Estudio",
    filterByTopic: "Filtrar por tema",
    allQuestions: "Todas las preguntas",
    wrongAnswers: "Respuestas incorrectas",
    unanswered: "Sin responder",
    mockTestMode: "Simulacro (30)",
    savedMode: "Guardadas",
    allTopics: "Todos los temas",
    yourProgress: "Tu Progreso",
    score: "Puntuación",
    correctLabel: "correctas",
    resetAll: "Reiniciar todo",
    viewDashboard: "Ver panel completo →",
    answer: "Respuesta",
    noQuestionsTitle: "¡No hay preguntas aquí!",
    noQuestionsSub: "Prueba otro modo o reinicia tu progreso.",
    noSavedTitle: "No hay preguntas guardadas aún",
    noSavedSub: "Toca ★ en cualquier pregunta para guardarla.",
    language: "Idioma",
    inEnglish: "En inglés",
    saveQuestion: "Guardar pregunta",
    unsaveQuestion: "Quitar de guardados",

    // ── Mock test ─────────────────────────────────────────
    startMockTest: "Iniciar Simulacro",
    practiceMode: "Modo Práctica",
    examMode: "Modo Examen",
    loading: "Cargando…",
    exitLabel: "Salir",
    nextLabel: "Siguiente →",
    finishLabel: "Finalizar →",
    timeRemaining: "Tiempo restante",
    timeUp: "¡Se acabó el tiempo!",
    submitAnyway: "Enviar examen",

    // ── Resources ─────────────────────────────────────────
    resourcesKicker: "Fuentes oficiales",
    resourcesTitle: "Recursos de estudio para el examen learner de WA",
    resourcesSub: "Estos enlaces abren sitios oficiales del gobierno de Australia Occidental. Úsalos junto con la práctica en KangaLearner para mejores resultados.",
    resourcesWaOnly: "Recursos de WA — otros estados próximamente.",
    resourcesStudyGuide: "Guía de estudio",
    resourcesPracticeNow: "Practicar preguntas",

    // ── Progress ──────────────────────────────────────────
    progressTitle: "Tu Progreso",
    progressSub: "Sigue tu tasa de aciertos por tema y ve qué estudiar a continuación.",
    progressEmpty: "Responde algunas preguntas en el modo Práctica para ver tus estadísticas aquí.",
    categoryCol: "Categoría",
    accuracyCol: "Acierto",
    attemptedCol: "Respondidas",
    nextStepTitle: "Próximo paso recomendado",
    nextStepReviewWrong: "Revisa tus respuestas incorrectas",
    nextStepFinishUnanswered: "Responde las preguntas sin responder",
    nextStepTakeMock: "Estás listo — ¡haz el simulacro!",
    nextStepEmpty: "Empieza a practicar para recibir una recomendación.",
    resetConfirm: "¿Reiniciar todo el progreso? Esta acción no se puede deshacer.",

    // ── Footer ────────────────────────────────────────────
    footerTagline: "Aprueba el examen learner de WA — en inglés, portugués o español.",
    footerProductTitle: "Producto",
    footerCompanyTitle: "Empresa",
    footerLegalTitle: "Legal",
    footerNewsletterTitle: "Mantente informado",
    footerNewsletterSub: "Nuevos estados, funciones y consejos — sin spam.",
    newsletterPlaceholder: "Tu dirección de correo electrónico",
    newsletterBtn: "Suscribirse",
    newsletterSuccess: "¡Gracias! Te mantendremos informado.",
    newsletterError: "Algo salió mal. Inténtalo de nuevo.",
    footerCopyright: "© 2026 KangaLearner. Todos los derechos reservados.",

    // ── Auth ──────────────────────────────────────────────
    emailLabel: "Correo electrónico",
    passwordLabel: "Contraseña",
    forgotPassword: "¿Olvidó su contraseña?",
    continueWithGoogle: "Continuar con Google",

    // ── Misc ──────────────────────────────────────────────
    pass: "Aprobado",
    fail: "Reprobado",
  },
} as const satisfies Record<UiLang, Record<string, string>>;

export type UIStrings = typeof t["en"];
