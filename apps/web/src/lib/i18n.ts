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

export function tx(obj: Record<string, string> | null | undefined, lang: UiLang): string {
  if (!obj) return "";
  return obj[lang] ?? obj.en ?? Object.values(obj)[0] ?? "";
}

/** Preenche placeholders {chave} de um template de string traduzida. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.split(`{${key}}`).join(String(value)),
    template
  );
}

export const VALID_LANGS: Lang[] = ["en", "pt", "es", "pt-en", "es-en"];

export const t = {
  en: {
    // ── Nav ───────────────────────────────────────────────
    home: "Home",
    learn: "Learn",
    practice: "Practice",
    retry: "Retry",
    questionsWord: "questions",
    passMarkWord: "Pass mark",
    topicsWord: "topics",
    roadRulesWord: "road rules",
    mockTest: "Mock Test",
    mockGuestTitle: "Save your mock test results",
    mockGuestSub:
      "Create a free account to track your score, review wrong answers, and see your progress over time.",
    mockGuestContinue: "Continue without saving",
    mockGuestSignIn: "Sign in",
    mockGuestBannerTitle: "Want to track your progress?",
    mockGuestBannerBody:
      "Create a free account to save results and see your improvement over time.",
    mockGuestBannerCta: "Sign up free",
    progress: "Progress",
    resources: "Resources",
    blog: "Blog",
    dashboard: "Dashboard",
    signIn: "Sign in",
    account: "Account",
    settings: "Settings",
    achievements: "Achievements",
    help: "Help",
    signOut: "Sign out",

    // ── Mascot + 404 ──────────────────────────────────────
    kangaAlmost: "Almost!",
    notFoundTitle: "Page not found",
    notFoundSub: "The page you are looking for does not exist or has moved.",
    notFoundCta: "Back to home",

    // ── Learn page ────────────────────────────────────────
    learnTitle: "Learn Road Rules",
    learnSub: "Study by topic before taking the practice quiz or mock test.",
    learnKeyRules: "Key Rules",
    learnMistakes: "Common Mistakes",
    learnExample: "Practical Example",
    learnQuickCheck: "Quick Check",
    learnSource: "Source",
    learnSectionedNote:
      "This test is split into sections, each with its own minimum, so you must pass every section.",
    mockRealExamNote:
      "The real {testName} in {state} has {questions} questions and needs {minCorrect} correct.",
    learnBack: "← All topics",
    learnPractice: "Practise this topic →",
    learnAllTopics: "All practice questions →",
    learnStateTestCta: "Free {stateCode} {testName} practice →",

    // ── Blog ──────────────────────────────────────────────
    blogTitle: "Blog",
    blogSub: "Guides for newcomers learning to drive in Australia.",
    blogBack: "← All posts",
    blogReadMore: "Read more →",
    blogPublished: "Published",
    blogSource: "Official source",
    blogRelatedTitle: "Keep studying",
    blogRelatedLearn: "Browse all learn topics →",
    blogRelatedPractice: "Start free practice →",
    blogSearchPlaceholder: "Search posts...",
    blogFilterAll: "All states",
    blogNoResults: "No posts match your search.",
    blogHelpfulQuestion: "Was this post helpful?",
    blogHelpfulYes: "Yes",
    blogHelpfulNo: "No",
    blogHelpfulThanks: "Thanks for the feedback!",

    // ── Landing ───────────────────────────────────────────
    heroEyebrow: "For immigrants across Australia",
    heroTitle: "Pass your Australian learner test, in your language.",
    heroDesc:
      "Real exam-style questions in English, Portuguese or Spanish. " +
      "Study, practise and walk into your state's test feeling ready.",
    heroCta1: "Start free practice",
    heroCtaNote: "Free. No sign-up needed.",
    heroCta2: "Try mock test",
    heroBadge1: "Free forever",
    heroBadge2: "2000+ exam-style questions",
    heroBadge3: "English · Português · Español",
    heroProof: "All Australian states and territories available now.",
    heroSourcePill: "Based on the official handbooks · Updated Aug 2026",
    heroStat1Label: "exam-style questions",
    heroStat2Label: "states & territories",
    heroStat3Label: "languages",
    // Features
    feat1Title: "Learn",
    feat1Sub: "Study road rules by topic with clear explanations.",
    feat2Title: "Practice",
    feat2Sub: "Answer questions filtered by category and difficulty.",
    feat3Title: "Mock Test",
    feat3Sub: "Simulate the official 30-question learner test.",
    feat4Title: "Progress",
    feat4Sub: "See your accuracy by category and review mistakes.",
    // Trust
    trustTitle: "Why KangaLearner",
    trustMultiTitle: "Multilingual support",
    trustMultiBody: "Study in English, Portuguese or Spanish, more languages coming soon.",
    trustSaveTitle: "Progress saved",
    trustSaveBody: "Your progress is saved automatically in the browser.",
    trustOfficialTitle: "Based on official rules",
    trustOfficialBody:
      "Content structured from official state sources. Always confirm with your state's Department of Transport.",
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
    // How it works strip
    howStep1Label: "Study",
    howStep1Desc: "Learn road rules by topic with clear explanations",
    howStep2Label: "Practice",
    howStep2Desc: "Answer exam-style questions filtered by category",
    howStep3Label: "Mock Test",
    howStep3Desc: "Simulate the official 30-question learner test",
    // How it works section (M2.2)
    howItWorksTitle: "How it works",
    sectionEyebrowHow: "Get started",
    sectionEyebrowTrust: "Why KangaLearner",
    sectionEyebrowTopics: "What you'll master",
    howStep1Title: "Study by topic",
    howStep1DescCard: "19 road rule topics, signs, speed limits, give way, alcohol laws and more.",
    howStep2Title: "Take a mock test",
    howStep2DescCard: "30 questions, 45 minutes. Same format as your state's real learner test.",
    howStep3Title: "Track your progress",
    howStep3DescCard: "See which topics need more practice. Sign up free to save your results.",
    testimonialBetaLabel: "Stories from our early community",

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
    loadMoreQuestions: "Show more questions",
    noSavedTitle: "No saved questions yet",
    noSavedSub: "Tap ★ on any question to save it for later.",
    language: "Language",
    inEnglish: "In English",
    saveQuestion: "Save question",
    unsaveQuestion: "Unsave question",

    // ── Mock test ─────────────────────────────────────────
    startMockTest: "Start Mock Test",
    vehicleType: "Licence Type",
    carLicence: "Car",
    motorcycleLicence: "Motorcycle",
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
    resourcesKicker: "Licence companion",
    resourcesTitleByState: "{stateCode} licence resources and next steps",
    resourcesSubByState:
      "A plain-language hub for the {testName}, driving hours and the official {state} pathway. Use it alongside {authority} sources.",
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
    nextStepTakeMock: "You're ready, take the mock test!",
    nextStepEmpty: "Start practising to get a recommendation.",
    resetConfirm: "Reset all progress? This cannot be undone.",
    progressCloudNote:
      "Your practice history is synced to the cloud. Check your Dashboard for full stats.",

    // ── Dashboard ─────────────────────────────────────────
    dashWelcomeTitle: "Let's get you test-ready",
    dashWelcomeSub:
      "Three steps to your learner licence: study the topics, practise real questions, then prove it in a mock test.",
    dashWelcomeCta: "Answer your first question",
    dashHello: "Hello",
    dashSub: "Your progress across all practice sessions.",
    dashQuestionsAnswered: "Questions answered",
    dashStartPractisingStats: "Start practising to see stats",
    dashCorrect: "correct",
    dashOverallAccuracy: "Overall accuracy",
    dashNoAttemptsYet: "No attempts yet",
    dashAbovePassThreshold: "Above pass threshold",
    dashTarget80: "Target: 80%",
    dashMockTestsTaken: "Mock tests taken",
    dashBest: "Best",
    dashNoMockTestsYet: "No mock tests yet",
    dashStreak: "Streak",
    dashStreakOneDay: "1 consecutive day",
    dashStreakDays: "consecutive days",
    dashDailyGoal: "Daily goal",
    dashQuestionsAnsweredToday: "questions answered today",
    dashOf: "of",
    dashProgressByState: "Progress by state",
    dashFilteredFor: "Data filtered for",
    dashStateAccuracy: "Accuracy",
    dashNoAttemptsInState: "No attempts in this state yet",
    dashCategoriesPractised: "Categories practised",
    dashCategoryBreakdownBelow: "Category breakdown below",
    dashCategoryBreakdown: "Category breakdown",
    dashNoAttemptsForStatePrefix: "No attempts found for",
    dashNoAttemptsForStateSuffix: "Practice questions from this state to see progress here.",
    dashWeeklyActivity: "Weekly activity",
    dashNoWeeklyActivity: "No activity yet, start practising to see your trend.",
    dashChartNoActivity: "No activity",
    dashContinuePractice: "Continue practice →",
    dashTakeMockTest: "Take mock test",
    dashWhatToPractiseNext: "What to practise next",
    dashMoreQuestionsRecommendations: "Answer more questions to get personalised recommendations.",
    dashPractiseArrow: "Practise →",
    dashProgressByTopic: "Progress by topic",
    dashNoTopicData: "No data yet, answer some questions in Practice mode.",
    dashPractise: "Practise",
    dashMockTestHistory: "Mock test history",
    dashNoMockTestsTryPrefix: "No mock tests yet, try the",
    dashMockTestMode: "Mock Test mode",
    dashSignedInAs: "Signed in as",
    dashSignOutFromNav: "sign out from nav",
    dashStateLabel: "State",
    dashLoadMore: "Load more",

    // ── Account ───────────────────────────────────────────
    accountPageSub: "Manage your profile, preferences and security.",
    accountNavProfile: "Profile",
    accountNavPreferences: "Preferences",
    accountNavSecurity: "Security",
    accountNavDanger: "Danger Zone",
    accountProfileSub: "Your public name and contact info.",
    accountUploadPhoto: "Upload photo",
    accountUploading: "Uploading…",
    accountRemove: "Remove",
    accountAvatarHint: "JPG, PNG, WebP or GIF · max 2 MB",
    accountFullName: "Full name",
    accountFullNamePlaceholder: "Your full name",
    accountEmailHint: "Email cannot be changed here.",
    accountPhone: "Phone",
    accountOptional: "(optional)",
    accountPhonePlaceholder: "+61 4xx xxx xxx",
    accountSaveProfile: "Save profile",
    accountSaving: "Saving…",
    accountProfileSaved: "Profile saved.",
    accountPreferencesSub: "State, language, timezone and display settings.",
    accountState: "State",
    accountStateHint: "Saved as your default state across the app and static site.",
    accountLanguageHint: "Saved as your default display language across the app and static site.",
    accountTimezone: "Timezone",
    accountTimezoneHint: "Used for scheduling practice reminders (coming soon).",
    accountTheme: "Theme",
    accountThemeLight: "Light",
    accountThemeDark: "Dark",
    accountThemeSystem: "System",
    accountThemeHint: "Choose light, dark, or follow your system setting.",
    accountSavePreferences: "Save preferences",
    accountPreferencesSaved: "Preferences saved.",
    accountSignInRequired: "You need to be signed in.",
    accountSecuritySub: "Update your password.",
    accountNewPassword: "New password",
    accountNewPasswordPlaceholder: "Min. 8 characters",
    accountConfirmPassword: "Confirm new password",
    accountConfirmPasswordPlaceholder: "Repeat new password",
    accountChangePassword: "Change password",
    accountChanging: "Changing…",
    accountPasswordMinLength: "New password must be at least 8 characters.",
    accountPasswordMismatch: "Passwords don't match.",
    accountPasswordChanged: "Password changed successfully.",
    accountDangerSub: "Irreversible actions, proceed with caution.",
    accountDeleteTitle: "Delete account",
    accountDeleteDesc:
      "This will permanently delete your account and all progress data. This action cannot be undone.",
    accountDeleteBtn: "Delete account",
    accountDeleting: "Deleting…",
    accountDeleteConfirm:
      "Are you sure? This action is irreversible and permanently deletes all your data.",
    accountNetworkError: "Network error. Please try again.",
    accountDeleteFailed: "Could not delete account. Please try again.",
    accountAvatarUpdated: "Avatar updated!",
    accountAvatarRemoved: "Avatar removed.",
    accountAvatarAlt: "Avatar",
    accountUploadFailed: "Upload failed",

    // ── Footer ────────────────────────────────────────────
    footerTagline: "Pass your Australian learner test, in English, Portuguese or Spanish.",
    footerProductTitle: "Product",
    footerCompanyTitle: "Company",
    footerLegalTitle: "Legal",
    footerNewsletterTitle: "Get weekly driving tips",
    footerNewsletterDesc: "In English, Portuguese or Spanish. Unsubscribe anytime.",
    footerNewsletterPlaceholder: "your@email.com",
    footerNewsletterCta: "Subscribe",
    footerNewsletterSuccess: "You're in! Check your inbox.",
    footerNewsletterError: "Something went wrong. Please try again.",
    footerStatesLabel: "Learner tests",
    stateCtaPractice: "Practice {state} questions",
    stateCtaMock: "Take a {state} mock test",

    // ── Learner test pages (/learner-test) ────────────────
    ltHubTitle: "Learner practice tests by state",
    ltHubSub:
      "{total} free practice questions for Australian learner licence tests. " +
      "Pick your state or territory to practise with real exam-style questions in " +
      "English, Portuguese or Spanish.",
    ltHubIntro:
      "Every state and territory runs its own learner knowledge test, with its own name, " +
      "question count and pass mark. KangaLearner keeps a separate question pool for each " +
      "one, so you practise exactly what your state tests.",
    ltHubFactQuestions: "Free questions",
    ltHubFactStates: "States and territories",
    ltHubFactLangs: "Study languages",
    ltHubOfficialTitle: "Official tests covered",
    ltHubListTail: ": {n} free questions, run by {authority}.",
    ltHubDisclaimer:
      "KangaLearner is an independent study tool and is not affiliated with any state " +
      "transport authority. Always check your state's official website for current test " +
      "requirements.",
    ltQuestionsCount: "{n} questions",
    ltPracticeBadge: "Practice test",
    ltStateH1: "{test} Practice",
    ltStateSub:
      "Free {test} practice questions for {state}. Study in English, Portuguese or Spanish.",
    ltStateIntro:
      "The {test} is the official knowledge test you must pass to get your learner " +
      "licence in {state}. It is run by {authority}.",
    ltStateIntroExam: "The real test has {n} questions and the pass mark is {pass}.",
    ltStateBankBoth:
      "KangaLearner has {total} free practice questions for {code}: {car} for the car " +
      "test and {moto} for the motorcycle test.",
    ltStateBankCarOnly:
      "KangaLearner has {total} free practice questions for {code}, all focused on the " +
      "car knowledge test.",
    ltStateBankLangs:
      "Every question is available in English, Portuguese and Spanish, with clear explanations.",
    ltFactTest: "Official test",
    ltFactAuthority: "Run by",
    ltFactQuestions: "Real test",
    ltFactBank: "Free question bank",
    ltFactBankSplit: "{car} car, {moto} motorcycle",
    ltFactBankCarOnly: "car questions",
    ltTopicsTitle: "What is on the test",
    ltTopicsBody: "The {code} question pool covers every topic tested in the real exam: {topics}.",
    ltWaGuidePre: "Read the full ",
    ltWaGuideLink: "WA test format guide",
    ltWaGuidePost: " for booking details and what to expect on the day.",
    ltSignsTitle: "Signs that appear on the test",
    ltSignsSub: "Real {state} road signs used in the practice questions.",
    ltFaqTitle: "{code} learner test FAQ",
    ltFaqBilingualQ: "Can I practise for the {test} in Portuguese or Spanish?",
    ltFaqBilingualA:
      "Yes. Every KangaLearner question is available in English, Portuguese and Spanish, " +
      "including bilingual study modes.",
    ltFaqBankQ: "How many {code} practice questions does KangaLearner have?",
    ltFaqBankABoth:
      "{total} free questions: {car} for the car test and {moto} for the motorcycle " +
      "test. Every question has an explanation.",
    ltFaqBankACarOnly:
      "{total} free questions, all focused on the car knowledge test. Every question " +
      "has an explanation.",
    ltOtherStatesTitle: "Practice tests in other states",
    ltAllStatesLink: "All Australian learner practice tests by state",
    ltDisclaimer:
      "KangaLearner is an independent study tool and is not affiliated with {authority}. " +
      "Always check {url} for current test requirements. Test facts last reviewed on {date}.",
    resCommunityTitle: "Immigrant Communities",
    resCommunityDesc:
      "Connect with other immigrants across Australia who are also getting their licence.",
    resStudyTitle: "Free Study Guides",
    resStudyDesc: "Official DoT resources, free to download.",
    resJourneyTitle: "Your Road to a Full Licence",
    resChecklistTitle: "Test Day Checklist",
    footerCopyright: "© 2026 KangaLearner. All rights reserved.",

    // ── Auth ──────────────────────────────────────────────
    emailLabel: "Email",
    passwordLabel: "Password",
    forgotPassword: "Forgot password?",
    continueWithGoogle: "Continue with Google",
    authWelcomeBack: "Welcome back",
    authSignInSub: "Sign in to access your progress, insights and mock test history.",
    authSigningIn: "Signing in…",
    authNoAccount: "Don't have an account?",
    authCreateOne: "Create one",
    authTagline: "Official road rules · Up to date · Trusted by learner drivers Australia-wide",
    authServiceUnavailable:
      "Authentication service unavailable. Please refresh the page or try again later.",
    authCreateAccount: "Create your account",
    authCreateAccountSub:
      "Save your progress, track insights and access your full mock test history.",
    authYourName: "Your name",
    authAtLeast8: "At least 8 characters",
    authCreatingAccount: "Creating account…",
    authCreateAccountBtn: "Create account",
    authCheckYourEmail: "Check your email",
    authEmailConfirmSentPrefix: "We sent a confirmation link to",
    authEmailConfirmAction: "Click the link to activate your account.",
    authAgreeTermsPrefix: "By creating an account, you agree to our",
    authAlreadyHaveAccount: "Already have an account?",
    authResetPassword: "Reset your password",
    authResetSub: "Enter your email and we'll send you a reset link.",
    authSending: "Sending…",
    authSendResetLink: "Send reset link",
    authRememberedIt: "Remembered it?",
    authResetEmailSentPrefix: "We sent a password reset link to",
    authResetEmailSentSuffix: "Follow the link to choose a new password.",
    authChooseNewPassword: "Choose a new password",
    authChooseNewPasswordSub: "Enter a new password for your account.",
    authWaitingResetSession:
      "Waiting for reset session… If this persists, open the email link again.",
    authNewPasswordLabel: "New password",
    authConfirmPasswordLabel: "Confirm password",
    authRepeatYourPassword: "Repeat your password",
    authUpdating: "Updating…",
    authUpdatePassword: "Update password",
    authPasswordsDoNotMatch: "Passwords do not match.",
    authPasswordUpdated: "Password updated",
    authPasswordUpdatedSub: "Your password has been updated successfully.",
    authBackToSignIn: "← Back to sign in",
    authSignInArrow: "Sign in →",

    // ── Auth nudge ────────────────────────────────────────
    nudgeTitle: "Sign in to save your progress",
    nudgeBody:
      "Your results are only stored locally. Create a free account to sync across devices and track your history.",
    nudgeSignUp: "Create free account",
    nudgeSignIn: "Sign in",

    // ── Misc ──────────────────────────────────────────────
    pass: "Pass",
    fail: "Fail",
    mockNoQuestions: "No questions available for this state.",
    mockNoResults: "No results found for this session.",
    mockConfigNotFound: "No mock config found.",
    mockSessionError: "Session error",
    mockLoadNextQuestion: "We couldn't load the next question.",

    // ── Readiness score ───────────────────────────────────
    "readiness.title": "Am I ready for the test?",
    "readiness.hint": "Based on question coverage, accuracy by topic and your recent mock tests.",
    "readiness.level.not_ready": "Not ready yet",
    "readiness.level.getting_there": "Getting there",
    "readiness.level.almost": "Almost ready",
    "readiness.level.ready": "Ready",
    "readiness.noMocks": "Take a mock test. Readiness needs at least 2 passing mocks.",
    "readiness.lowMockScores": "Your recent mock scores are below 80%. Try another mock test.",
    "readiness.needMorePassingMocks":
      "Pass one more mock test (80% or better) to confirm you're ready.",
    "readiness.weakCategories": "Some topics are below 70%. Practise your weakest topic.",
    "readiness.lowCoverage":
      "You haven't seen most of the question bank yet. Keep practising new questions.",
    "readiness.viewDashboard": "See full readiness on your dashboard"
  },

  pt: {
    // ── Nav ───────────────────────────────────────────────
    home: "Início",
    learn: "Aprender",
    practice: "Praticar",
    retry: "Tentar de novo",
    questionsWord: "questões",
    passMarkWord: "Nota de corte",
    topicsWord: "tópicos",
    roadRulesWord: "regras de trânsito",
    mockTest: "Simulado",
    mockGuestTitle: "Salve os resultados do simulado",
    mockGuestSub:
      "Crie uma conta gratuita para acompanhar sua pontuação, revisar erros e ver seu progresso.",
    mockGuestContinue: "Continuar sem salvar",
    mockGuestSignIn: "Entrar",
    mockGuestBannerTitle: "Quer acompanhar seu progresso?",
    mockGuestBannerBody:
      "Crie uma conta gratuita para salvar resultados e ver sua evolução ao longo do tempo.",
    mockGuestBannerCta: "Criar conta grátis",
    progress: "Progresso",
    resources: "Recursos",
    blog: "Blog",
    dashboard: "Painel",
    signIn: "Entrar",
    account: "Conta",
    settings: "Configurações",
    achievements: "Conquistas",
    help: "Ajuda",
    signOut: "Sair",

    // ── Mascot + 404 ──────────────────────────────────────
    kangaAlmost: "Quase!",
    notFoundTitle: "Página não encontrada",
    notFoundSub: "A página que você procura não existe ou mudou de lugar.",
    notFoundCta: "Voltar ao início",

    // ── Learn page ────────────────────────────────────────
    learnTitle: "Aprender as regras de trânsito",
    learnSub: "Estude por tópico antes de fazer o simulado ou praticar.",
    learnKeyRules: "Regras principais",
    learnMistakes: "Erros comuns",
    learnExample: "Exemplo prático",
    learnQuickCheck: "Verificação rápida",
    learnSource: "Fonte",
    learnSectionedNote:
      "Esta prova é dividida em seções, cada uma com um mínimo próprio, então você precisa passar em todas.",
    mockRealExamNote:
      "A prova real ({testName}) em {state} tem {questions} questões e exige {minCorrect} acertos.",
    learnBack: "← Todos os tópicos",
    learnPractice: "Praticar este tópico →",
    learnAllTopics: "Todas as perguntas →",
    learnStateTestCta: "Prática grátis: {testName} de {stateCode} →",

    // ── Blog ──────────────────────────────────────────────
    blogTitle: "Blog",
    blogSub: "Guias para quem chegou agora e está aprendendo a dirigir na Austrália.",
    blogBack: "← Todos os posts",
    blogReadMore: "Ler mais →",
    blogPublished: "Publicado em",
    blogSource: "Fonte oficial",
    blogRelatedTitle: "Continue estudando",
    blogRelatedLearn: "Ver todos os tópicos de aprendizado →",
    blogRelatedPractice: "Começar a praticar grátis →",
    blogSearchPlaceholder: "Buscar posts...",
    blogFilterAll: "Todos os estados",
    blogNoResults: "Nenhum post encontrado.",
    blogHelpfulQuestion: "Este post foi útil?",
    blogHelpfulYes: "Sim",
    blogHelpfulNo: "Não",
    blogHelpfulThanks: "Obrigado pelo feedback!",

    // ── Landing ───────────────────────────────────────────
    heroEyebrow: "Para imigrantes em toda a Austrália",
    heroTitle: "Passe na prova de learner australiana, no seu idioma.",
    heroDesc:
      "Questões no estilo da prova real, em inglês, português ou espanhol. " +
      "Estude, pratique e chegue no teste do seu estado se sentindo pronto.",
    heroCta1: "Começar a praticar",
    heroCtaNote: "Grátis. Sem precisar de cadastro.",
    heroCta2: "Tentar o simulado",
    heroBadge1: "Gratuito para sempre",
    heroBadge2: "2000+ questões estilo prova",
    heroBadge3: "English · Português · Español",
    heroProof: "Todos os estados e territórios australianos disponíveis agora.",
    heroSourcePill: "Baseado nos handbooks oficiais · Atualizado ago 2026",
    heroStat1Label: "questões estilo prova",
    heroStat2Label: "estados e territórios",
    heroStat3Label: "idiomas",
    // Features
    feat1Title: "Aprender",
    feat1Sub: "Estude as regras de trânsito por tema com explicações claras.",
    feat2Title: "Praticar",
    feat2Sub: "Responda perguntas filtradas por categoria e dificuldade.",
    feat3Title: "Simulado",
    feat3Sub: "Simule a prova oficial de learner com 30 questões.",
    feat4Title: "Progresso",
    feat4Sub: "Veja sua taxa de acerto por categoria e revise os erros.",
    // Trust
    trustTitle: "Por que KangaLearner",
    trustMultiTitle: "Suporte multilíngue",
    trustMultiBody: "Estude em inglês, português e espanhol, mais idiomas em breve.",
    trustSaveTitle: "Progresso salvo",
    trustSaveBody: "Seu progresso é salvo automaticamente no navegador.",
    trustOfficialTitle: "Baseado em regras oficiais",
    trustOfficialBody:
      "Conteúdo baseado em fontes oficiais estaduais. Confirme sempre com o Departamento de Transportes do seu estado.",
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
    // How it works strip
    howStep1Label: "Estudar",
    howStep1Desc: "Aprenda as regras de trânsito por tópico com explicações claras",
    howStep2Label: "Praticar",
    howStep2Desc: "Responda perguntas no formato do exame filtradas por categoria",
    howStep3Label: "Simulado",
    howStep3Desc: "Simule a prova oficial de 30 questões do learner",
    howItWorksTitle: "Como funciona",
    sectionEyebrowHow: "Comece aqui",
    sectionEyebrowTrust: "Por que o KangaLearner",
    sectionEyebrowTopics: "O que você vai dominar",
    howStep1Title: "Estude por tópico",
    howStep1DescCard:
      "19 tópicos das regras de trânsito, placas, velocidade, preferência, álcool e mais.",
    howStep2Title: "Faça um simulado",
    howStep2DescCard: "30 questões, 45 minutos. Mesmo formato da prova real do seu estado.",
    howStep3Title: "Acompanhe seu progresso",
    howStep3DescCard:
      "Veja quais tópicos precisam mais prática. Crie conta grátis para salvar resultados.",
    testimonialBetaLabel: "Histórias da nossa comunidade beta",

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
    loadMoreQuestions: "Mostrar mais perguntas",
    noSavedTitle: "Nenhuma pergunta salva ainda",
    noSavedSub: "Toque em ★ em qualquer pergunta para salvá-la.",
    language: "Idioma",
    inEnglish: "Em inglês",
    saveQuestion: "Salvar pergunta",
    unsaveQuestion: "Remover dos salvos",

    // ── Mock test ─────────────────────────────────────────
    startMockTest: "Iniciar Simulado",
    vehicleType: "Tipo de Carteira",
    carLicence: "Carro",
    motorcycleLicence: "Moto",
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
    resourcesKicker: "Companion da carteira",
    resourcesTitleByState: "Recursos e próximos passos para a carteira em {stateCode}",
    resourcesSubByState:
      "Um hub em linguagem simples para o {testName}, horas de direção e o caminho oficial de {state}. Use junto com as fontes do {authority}.",
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
    nextStepTakeMock: "Você está pronto, faça o simulado!",
    nextStepEmpty: "Comece a praticar para receber uma recomendação.",
    resetConfirm: "Reiniciar todo o progresso? Esta ação não pode ser desfeita.",
    progressCloudNote:
      "Seu histórico de prática está sincronizado na nuvem. Veja seu Painel para estatísticas completas.",

    // ── Dashboard ─────────────────────────────────────────
    dashWelcomeTitle: "Vamos te deixar pronto para a prova",
    dashWelcomeSub:
      "Três passos até a sua licença de learner: estude os tópicos, pratique questões reais e prove no simulado.",
    dashWelcomeCta: "Responda sua primeira questão",
    dashHello: "Olá",
    dashSub: "Seu progresso em todas as sessões de prática.",
    dashQuestionsAnswered: "Perguntas respondidas",
    dashStartPractisingStats: "Comece a praticar para ver estatísticas",
    dashCorrect: "corretas",
    dashOverallAccuracy: "Taxa de acerto geral",
    dashNoAttemptsYet: "Nenhuma tentativa ainda",
    dashAbovePassThreshold: "Acima do limite de aprovação",
    dashTarget80: "Meta: 80%",
    dashMockTestsTaken: "Simulados realizados",
    dashBest: "Melhor",
    dashNoMockTestsYet: "Nenhum simulado ainda",
    dashStreak: "Sequência",
    dashStreakOneDay: "1 dia consecutivo",
    dashStreakDays: "dias consecutivos",
    dashDailyGoal: "Meta diária",
    dashQuestionsAnsweredToday: "perguntas respondidas hoje",
    dashOf: "de",
    dashProgressByState: "Progresso por estado",
    dashFilteredFor: "Dados filtrados para",
    dashStateAccuracy: "% de acerto",
    dashNoAttemptsInState: "Sem respostas neste estado",
    dashCategoriesPractised: "Categorias praticadas",
    dashCategoryBreakdownBelow: "Detalhamento por categoria abaixo",
    dashCategoryBreakdown: "Detalhamento por categoria",
    dashNoAttemptsForStatePrefix: "Nenhuma tentativa encontrada para",
    dashNoAttemptsForStateSuffix: "Pratique perguntas deste estado para ver o progresso aqui.",
    dashWeeklyActivity: "Atividade semanal",
    dashNoWeeklyActivity: "Nenhuma atividade ainda, comece a praticar para ver sua tendência.",
    dashChartNoActivity: "Sem atividade",
    dashContinuePractice: "Continuar prática →",
    dashTakeMockTest: "Fazer simulado",
    dashWhatToPractiseNext: "O que praticar a seguir",
    dashMoreQuestionsRecommendations:
      "Responda mais perguntas para receber recomendações personalizadas.",
    dashPractiseArrow: "Praticar →",
    dashProgressByTopic: "Progresso por tópico",
    dashNoTopicData: "Sem dados ainda, responda perguntas no modo Prática.",
    dashPractise: "Praticar",
    dashMockTestHistory: "Histórico de simulados",
    dashNoMockTestsTryPrefix: "Nenhum simulado ainda, experimente o",
    dashMockTestMode: "modo Simulado",
    dashSignedInAs: "Conectado como",
    dashSignOutFromNav: "sair pelo menu",
    dashStateLabel: "Estado",
    dashLoadMore: "Carregar mais",

    // ── Account ───────────────────────────────────────────
    accountPageSub: "Gerencie seu perfil, preferências e segurança.",
    accountNavProfile: "Perfil",
    accountNavPreferences: "Preferências",
    accountNavSecurity: "Segurança",
    accountNavDanger: "Zona de perigo",
    accountProfileSub: "Seu nome público e informações de contato.",
    accountUploadPhoto: "Enviar foto",
    accountUploading: "Enviando…",
    accountRemove: "Remover",
    accountAvatarHint: "JPG, PNG, WebP ou GIF · máx. 2 MB",
    accountFullName: "Nome completo",
    accountFullNamePlaceholder: "Seu nome completo",
    accountEmailHint: "O e-mail não pode ser alterado aqui.",
    accountPhone: "Telefone",
    accountOptional: "(opcional)",
    accountPhonePlaceholder: "+61 4xx xxx xxx",
    accountSaveProfile: "Salvar perfil",
    accountSaving: "Salvando…",
    accountProfileSaved: "Perfil salvo.",
    accountPreferencesSub: "Estado, idioma, fuso horário e exibição.",
    accountState: "Estado",
    accountStateHint: "Salvo como seu estado padrão no app e no site estático.",
    accountLanguageHint: "Salvo como seu idioma padrão no app e no site estático.",
    accountTimezone: "Fuso horário",
    accountTimezoneHint: "Usado para lembretes de prática (em breve).",
    accountTheme: "Tema",
    accountThemeLight: "Claro",
    accountThemeDark: "Escuro",
    accountThemeSystem: "Sistema",
    accountThemeHint: "Escolha claro, escuro ou siga a configuração do sistema.",
    accountSavePreferences: "Salvar preferências",
    accountPreferencesSaved: "Preferências salvas.",
    accountSignInRequired: "Você precisa estar conectado.",
    accountSecuritySub: "Atualize sua senha.",
    accountNewPassword: "Nova senha",
    accountNewPasswordPlaceholder: "Mín. 8 caracteres",
    accountConfirmPassword: "Confirmar nova senha",
    accountConfirmPasswordPlaceholder: "Repita a nova senha",
    accountChangePassword: "Alterar senha",
    accountChanging: "Alterando…",
    accountPasswordMinLength: "A nova senha deve ter pelo menos 8 caracteres.",
    accountPasswordMismatch: "As senhas não coincidem.",
    accountPasswordChanged: "Senha alterada com sucesso.",
    accountDangerSub: "Ações irreversíveis, proceda com cautela.",
    accountDeleteTitle: "Excluir conta",
    accountDeleteDesc:
      "Isso excluirá permanentemente sua conta e todos os dados de progresso. Esta ação não pode ser desfeita.",
    accountDeleteBtn: "Excluir conta",
    accountDeleting: "Excluindo…",
    accountDeleteConfirm:
      "Tem certeza? Esta ação é irreversível e apaga todos os seus dados permanentemente.",
    accountNetworkError: "Erro de rede. Tente novamente.",
    accountDeleteFailed: "Não foi possível excluir a conta. Tente novamente.",
    accountAvatarUpdated: "Avatar atualizado!",
    accountAvatarRemoved: "Avatar removido.",
    accountAvatarAlt: "Avatar",
    accountUploadFailed: "Falha no envio",

    // ── Footer ────────────────────────────────────────────
    footerTagline: "Passe na prova de learner australiana, em inglês, português ou espanhol.",
    footerProductTitle: "Produto",
    footerCompanyTitle: "Empresa",
    footerLegalTitle: "Legal",
    footerNewsletterTitle: "Dicas semanais de direção",
    footerNewsletterDesc: "Em inglês, português ou espanhol. Cancele quando quiser.",
    footerNewsletterPlaceholder: "seu@email.com",
    footerNewsletterCta: "Inscrever-se",
    footerNewsletterSuccess: "Inscrito! Verifique sua caixa de entrada.",
    footerNewsletterError: "Algo deu errado. Tente novamente.",
    footerStatesLabel: "Provas de learner",
    stateCtaPractice: "Praticar questões de {state}",
    stateCtaMock: "Fazer um simulado de {state}",

    // ── Learner test pages (/learner-test) ────────────────
    ltHubTitle: "Simulados do teste de aprendiz por estado",
    ltHubSub:
      "{total} questões gratuitas para os testes de habilitação de aprendiz da Austrália. " +
      "Escolha seu estado ou território e pratique com questões no estilo do exame real, " +
      "em inglês, português ou espanhol.",
    ltHubIntro:
      "Cada estado e território aplica seu próprio teste teórico de aprendiz, com nome, " +
      "número de questões e nota de corte próprios. O KangaLearner mantém um banco de " +
      "questões separado para cada um, então você pratica exatamente o que o seu estado cobra.",
    ltHubFactQuestions: "Questões grátis",
    ltHubFactStates: "Estados e territórios",
    ltHubFactLangs: "Idiomas de estudo",
    ltHubOfficialTitle: "Testes oficiais cobertos",
    ltHubListTail: ": {n} questões grátis, aplicado por {authority}.",
    ltHubDisclaimer:
      "O KangaLearner é uma ferramenta de estudo independente e não é afiliado a nenhum " +
      "órgão de trânsito estadual. Confira sempre o site oficial do seu estado para os " +
      "requisitos atuais do teste.",
    ltQuestionsCount: "{n} questões",
    ltPracticeBadge: "Simulado",
    ltStateH1: "Prática para o {test}",
    ltStateSub:
      "Questões gratuitas de prática do {test} para {state}. " +
      "Estude em inglês, português ou espanhol.",
    ltStateIntro:
      "O {test} é o teste teórico oficial que você precisa passar para tirar a licença " +
      "de aprendiz em {state}. Ele é aplicado por {authority}.",
    ltStateIntroExam: "O teste real tem {n} questões e a nota de corte é {pass}.",
    ltStateBankBoth:
      "O KangaLearner tem {total} questões gratuitas de prática para {code}: {car} para " +
      "o teste de carro e {moto} para o de moto.",
    ltStateBankCarOnly:
      "O KangaLearner tem {total} questões gratuitas de prática para {code}, todas " +
      "focadas no teste teórico de carro.",
    ltStateBankLangs:
      "Cada questão está disponível em inglês, português e espanhol, com explicações claras.",
    ltFactTest: "Teste oficial",
    ltFactAuthority: "Aplicado por",
    ltFactQuestions: "Teste real",
    ltFactBank: "Banco de questões grátis",
    ltFactBankSplit: "{car} carro, {moto} moto",
    ltFactBankCarOnly: "questões de carro",
    ltTopicsTitle: "O que cai na prova",
    ltTopicsBody: "O banco de questões de {code} cobre todos os tópicos do exame real: {topics}.",
    ltWaGuidePre: "Leia o ",
    ltWaGuideLink: "guia completo do formato do teste de WA",
    ltWaGuidePost: " para detalhes de agendamento e o que esperar no dia.",
    ltSignsTitle: "Placas que caem na prova",
    ltSignsSub: "Placas de trânsito reais de {state} usadas nas questões de prática.",
    ltFaqTitle: "Perguntas frequentes do teste de {code}",
    ltFaqBilingualQ: "Posso praticar para o {test} em português ou espanhol?",
    ltFaqBilingualA:
      "Sim. Cada questão do KangaLearner está disponível em inglês, português e " +
      "espanhol, incluindo modos de estudo bilíngues.",
    ltFaqBankQ: "Quantas questões de prática de {code} o KangaLearner tem?",
    ltFaqBankABoth:
      "{total} questões grátis: {car} para o teste de carro e {moto} para o de moto. " +
      "Cada questão tem explicação.",
    ltFaqBankACarOnly:
      "{total} questões grátis, todas focadas no teste teórico de carro. Cada questão " +
      "tem explicação.",
    ltOtherStatesTitle: "Simulados em outros estados",
    ltAllStatesLink: "Todos os simulados de aprendiz da Austrália por estado",
    ltDisclaimer:
      "O KangaLearner é uma ferramenta de estudo independente e não é afiliado a " +
      "{authority}. Confira sempre {url} para os requisitos atuais do teste. Fatos do " +
      "teste revisados pela última vez em {date}.",
    resCommunityTitle: "Comunidades de Imigrantes",
    resCommunityDesc:
      "Conecte-se com outros imigrantes em toda a Austrália que também estão tirando a carteira.",
    resStudyTitle: "Guias de Estudo Gratuitos",
    resStudyDesc: "Recursos oficiais do DoT, gratuitos para download.",
    resJourneyTitle: "Seu Caminho para a Carteira Completa",
    resChecklistTitle: "Checklist do Dia da Prova",
    footerCopyright: "© 2026 KangaLearner. Todos os direitos reservados.",

    // ── Auth ──────────────────────────────────────────────
    emailLabel: "E-mail",
    passwordLabel: "Senha",
    forgotPassword: "Esqueceu a senha?",
    continueWithGoogle: "Continuar com Google",
    authWelcomeBack: "Boas-vindas",
    authSignInSub: "Entre para acessar seu progresso, insights e histórico de simulados.",
    authSigningIn: "Entrando…",
    authNoAccount: "Não tem uma conta?",
    authCreateOne: "Crie uma",
    authTagline:
      "Regras oficiais de trânsito · Sempre atualizado · Confiado por motoristas na Austrália",
    authServiceUnavailable:
      "Serviço de autenticação indisponível. Atualize a página ou tente mais tarde.",
    authCreateAccount: "Crie sua conta",
    authCreateAccountSub:
      "Salve seu progresso, acompanhe insights e acesse seu histórico completo de simulados.",
    authYourName: "Seu nome",
    authAtLeast8: "Mínimo 8 caracteres",
    authCreatingAccount: "Criando conta…",
    authCreateAccountBtn: "Criar conta",
    authCheckYourEmail: "Verifique seu e-mail",
    authEmailConfirmSentPrefix: "Enviamos um link de confirmação para",
    authEmailConfirmAction: "Clique no link para ativar sua conta.",
    authAgreeTermsPrefix: "Ao criar uma conta, você concorda com nossos",
    authAlreadyHaveAccount: "Já tem uma conta?",
    authResetPassword: "Redefinir sua senha",
    authResetSub: "Digite seu e-mail e enviaremos um link de redefinição.",
    authSending: "Enviando…",
    authSendResetLink: "Enviar link de redefinição",
    authRememberedIt: "Lembrou?",
    authResetEmailSentPrefix: "Enviamos um link de redefinição de senha para",
    authResetEmailSentSuffix: "Siga o link para escolher uma nova senha.",
    authChooseNewPassword: "Escolha uma nova senha",
    authChooseNewPasswordSub: "Digite uma nova senha para sua conta.",
    authWaitingResetSession:
      "Aguardando sessão de redefinição… Se persistir, abra o link do e-mail novamente.",
    authNewPasswordLabel: "Nova senha",
    authConfirmPasswordLabel: "Confirmar senha",
    authRepeatYourPassword: "Repita sua senha",
    authUpdating: "Atualizando…",
    authUpdatePassword: "Atualizar senha",
    authPasswordsDoNotMatch: "As senhas não coincidem.",
    authPasswordUpdated: "Senha atualizada",
    authPasswordUpdatedSub: "Sua senha foi atualizada com sucesso.",
    authBackToSignIn: "← Voltar para entrar",
    authSignInArrow: "Entrar →",

    // ── Auth nudge ────────────────────────────────────────
    nudgeTitle: "Faça login para salvar seu progresso",
    nudgeBody:
      "Seus resultados estão armazenados apenas localmente. Crie uma conta gratuita para sincronizar entre dispositivos e acompanhar seu histórico.",
    nudgeSignUp: "Criar conta grátis",
    nudgeSignIn: "Entrar",

    // ── Misc ──────────────────────────────────────────────
    pass: "Aprovado",
    fail: "Reprovado",
    mockNoQuestions: "Nenhuma questão disponível para este estado.",
    mockNoResults: "Nenhum resultado encontrado para esta sessão.",
    mockConfigNotFound: "Configuração do simulado não encontrada.",
    mockSessionError: "Erro de sessão",
    mockLoadNextQuestion: "Não foi possível carregar a próxima questão.",

    // ── Readiness score ───────────────────────────────────
    "readiness.title": "Estou pronto para a prova?",
    "readiness.hint":
      "Com base na cobertura das questões, na precisão por tópico e nos seus simulados recentes.",
    "readiness.level.not_ready": "Ainda não",
    "readiness.level.getting_there": "No caminho",
    "readiness.level.almost": "Quase lá",
    "readiness.level.ready": "Pronto",
    "readiness.noMocks": "Faça um simulado. A prontidão exige pelo menos 2 simulados aprovados.",
    "readiness.lowMockScores": "Seus simulados recentes estão abaixo de 80%. Tente outro simulado.",
    "readiness.needMorePassingMocks":
      "Passe em mais um simulado (80% ou mais) para confirmar que está pronto.",
    "readiness.weakCategories":
      "Alguns tópicos estão abaixo de 70%. Pratique seu tópico mais fraco.",
    "readiness.lowCoverage":
      "Você ainda não viu a maior parte do banco de questões. Continue praticando questões novas.",
    "readiness.viewDashboard": "Veja a prontidão completa no seu painel"
  },

  es: {
    // ── Nav ───────────────────────────────────────────────
    home: "Inicio",
    learn: "Aprender",
    practice: "Practicar",
    retry: "Reintentar",
    questionsWord: "preguntas",
    passMarkWord: "Puntaje mínimo",
    topicsWord: "temas",
    roadRulesWord: "reglas de tránsito",
    mockTest: "Simulacro",
    mockGuestTitle: "Guarda los resultados del simulacro",
    mockGuestSub:
      "Crea una cuenta gratuita para seguir tu puntuación, revisar errores y ver tu progreso.",
    mockGuestContinue: "Continuar sin guardar",
    mockGuestSignIn: "Iniciar sesión",
    mockGuestBannerTitle: "¿Quieres seguir tu progreso?",
    mockGuestBannerBody: "Crea una cuenta gratuita para guardar resultados y ver tu evolución.",
    mockGuestBannerCta: "Crear cuenta gratis",
    progress: "Progreso",
    resources: "Recursos",
    blog: "Blog",
    dashboard: "Panel",
    signIn: "Ingresar",
    account: "Cuenta",
    settings: "Configuración",
    achievements: "Logros",
    help: "Ayuda",
    signOut: "Salir",

    // ── Mascot + 404 ──────────────────────────────────────
    kangaAlmost: "¡Casi!",
    notFoundTitle: "Página no encontrada",
    notFoundSub: "La página que buscas no existe o cambió de lugar.",
    notFoundCta: "Volver al inicio",

    // ── Learn page ────────────────────────────────────────
    learnTitle: "Aprender las reglas de tránsito",
    learnSub: "Estudia por tema antes de hacer el simulacro o practicar.",
    learnKeyRules: "Reglas clave",
    learnMistakes: "Errores comunes",
    learnExample: "Ejemplo práctico",
    learnQuickCheck: "Comprobación rápida",
    learnSource: "Fuente",
    learnSectionedNote:
      "Este examen se divide en secciones, cada una con su propio mínimo, así que debes aprobar todas.",
    mockRealExamNote:
      "El examen real ({testName}) en {state} tiene {questions} preguntas y exige {minCorrect} aciertos.",
    learnBack: "← Todos los temas",
    learnPractice: "Practicar este tema →",
    learnAllTopics: "Todas las preguntas →",
    learnStateTestCta: "Práctica gratis: {testName} de {stateCode} →",

    // ── Blog ──────────────────────────────────────────────
    blogTitle: "Blog",
    blogSub: "Guías para quienes recién llegaron y están aprendiendo a conducir en Australia.",
    blogBack: "← Todas las publicaciones",
    blogReadMore: "Leer más →",
    blogPublished: "Publicado el",
    blogSource: "Fuente oficial",
    blogRelatedTitle: "Sigue estudiando",
    blogRelatedLearn: "Ver todos los temas de aprendizaje →",
    blogRelatedPractice: "Empezar a practicar gratis →",
    blogSearchPlaceholder: "Buscar publicaciones...",
    blogFilterAll: "Todos los estados",
    blogNoResults: "No se encontraron publicaciones.",
    blogHelpfulQuestion: "¿Te sirvió este post?",
    blogHelpfulYes: "Sí",
    blogHelpfulNo: "No",
    blogHelpfulThanks: "¡Gracias por tu opinión!",

    // ── Landing ───────────────────────────────────────────
    heroEyebrow: "Para inmigrantes en toda Australia",
    heroTitle: "Aprueba el examen learner australiano, en tu idioma.",
    heroDesc:
      "Preguntas al estilo del examen real, en inglés, portugués o español. " +
      "Estudia, practica y llega al examen de tu estado sintiéndote listo.",
    heroCta1: "Empezar a practicar",
    heroCtaNote: "Gratis. Sin necesidad de registro.",
    heroCta2: "Probar el simulacro",
    heroBadge1: "Gratis para siempre",
    heroBadge2: "2000+ preguntas estilo examen",
    heroBadge3: "English · Português · Español",
    heroProof: "Todos los estados y territorios australianos disponibles ahora.",
    heroSourcePill: "Basado en los manuales oficiales · Actualizado ago 2026",
    heroStat1Label: "preguntas estilo examen",
    heroStat2Label: "estados y territorios",
    heroStat3Label: "idiomas",
    // Features
    feat1Title: "Aprender",
    feat1Sub: "Estudia las reglas de tránsito por tema con explicaciones claras.",
    feat2Title: "Practicar",
    feat2Sub: "Responde preguntas filtradas por categoría y dificultad.",
    feat3Title: "Simulacro",
    feat3Sub: "Simula el examen oficial learner con 30 preguntas.",
    feat4Title: "Progreso",
    feat4Sub: "Ve tu tasa de aciertos por categoría y revisa los errores.",
    // Trust
    trustTitle: "¿Por qué KangaLearner?",
    trustMultiTitle: "Soporte multilingüe",
    trustMultiBody: "Estudia en inglés, portugués o español, más idiomas próximamente.",
    trustSaveTitle: "Progreso guardado",
    trustSaveBody: "Tu progreso se guarda automáticamente en el navegador.",
    trustOfficialTitle: "Basado en reglas oficiales",
    trustOfficialBody:
      "Contenido basado en fuentes oficiales estatales. Confirma siempre con el Departamento de Transportes de tu estado.",
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
    // How it works strip
    howStep1Label: "Estudiar",
    howStep1Desc: "Aprende las reglas viales por tema con explicaciones claras",
    howStep2Label: "Practicar",
    howStep2Desc: "Responde preguntas estilo examen filtradas por categoría",
    howStep3Label: "Simulacro",
    howStep3Desc: "Simula el examen oficial de 30 preguntas del learner",
    howItWorksTitle: "Cómo funciona",
    sectionEyebrowHow: "Empieza aquí",
    sectionEyebrowTrust: "Por qué KangaLearner",
    sectionEyebrowTopics: "Lo que vas a dominar",
    howStep1Title: "Estudia por tema",
    howStep1DescCard:
      "19 temas de normas de tránsito, señales, velocidades, ceder el paso, alcohol y más.",
    howStep2Title: "Haz un simulacro",
    howStep2DescCard: "30 preguntas, 45 minutos. Mismo formato que el examen real de tu estado.",
    howStep3Title: "Sigue tu progreso",
    howStep3DescCard:
      "Ve qué temas necesitan más práctica. Regístrate gratis para guardar tus resultados.",
    testimonialBetaLabel: "Historias de nuestra comunidad beta",

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
    loadMoreQuestions: "Mostrar más preguntas",
    noSavedTitle: "No hay preguntas guardadas aún",
    noSavedSub: "Toca ★ en cualquier pregunta para guardarla.",
    language: "Idioma",
    inEnglish: "En inglés",
    saveQuestion: "Guardar pregunta",
    unsaveQuestion: "Quitar de guardados",

    // ── Mock test ─────────────────────────────────────────
    startMockTest: "Iniciar Simulacro",
    vehicleType: "Tipo de Licencia",
    carLicence: "Auto",
    motorcycleLicence: "Moto",
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
    resourcesKicker: "Companion de licencia",
    resourcesTitleByState: "Recursos y próximos pasos para la licencia en {stateCode}",
    resourcesSubByState:
      "Un hub en lenguaje simple para el {testName}, horas de conducción y la ruta oficial de {state}. Úsalo junto con las fuentes de {authority}.",
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
    nextStepTakeMock: "Estás listo, ¡haz el simulacro!",
    nextStepEmpty: "Empieza a practicar para recibir una recomendación.",
    resetConfirm: "¿Reiniciar todo el progreso? Esta acción no se puede deshacer.",
    progressCloudNote:
      "Tu historial de práctica está sincronizado en la nube. Consulta tu Panel para estadísticas completas.",

    // ── Dashboard ─────────────────────────────────────────
    dashWelcomeTitle: "Vamos a dejarte listo para el examen",
    dashWelcomeSub:
      "Tres pasos hasta tu licencia de learner: estudia los temas, practica preguntas reales y demuéstralo en el simulacro.",
    dashWelcomeCta: "Responde tu primera pregunta",
    dashHello: "Hola",
    dashSub: "Tu progreso en todas las sesiones de práctica.",
    dashQuestionsAnswered: "Preguntas respondidas",
    dashStartPractisingStats: "Empieza a practicar para ver estadísticas",
    dashCorrect: "correctas",
    dashOverallAccuracy: "Precisión general",
    dashNoAttemptsYet: "Sin intentos aún",
    dashAbovePassThreshold: "Por encima del umbral de aprobación",
    dashTarget80: "Objetivo: 80%",
    dashMockTestsTaken: "Simulacros realizados",
    dashBest: "Mejor",
    dashNoMockTestsYet: "Sin simulacros aún",
    dashStreak: "Racha",
    dashStreakOneDay: "1 día consecutivo",
    dashStreakDays: "días consecutivos",
    dashDailyGoal: "Meta diaria",
    dashQuestionsAnsweredToday: "preguntas respondidas hoy",
    dashOf: "de",
    dashProgressByState: "Progreso por estado",
    dashFilteredFor: "Datos filtrados para",
    dashStateAccuracy: "Precisión",
    dashNoAttemptsInState: "Sin intentos en este estado",
    dashCategoriesPractised: "Categorías practicadas",
    dashCategoryBreakdownBelow: "Desglose por categoría abajo",
    dashCategoryBreakdown: "Desglose por categoría",
    dashNoAttemptsForStatePrefix: "No se encontraron intentos para",
    dashNoAttemptsForStateSuffix: "Practica preguntas de este estado para ver el progreso aquí.",
    dashWeeklyActivity: "Actividad semanal",
    dashNoWeeklyActivity: "Sin actividad aún, empieza a practicar para ver tu tendencia.",
    dashChartNoActivity: "Sin actividad",
    dashContinuePractice: "Continuar práctica →",
    dashTakeMockTest: "Hacer simulacro",
    dashWhatToPractiseNext: "Qué practicar a continuación",
    dashMoreQuestionsRecommendations:
      "Responde más preguntas para obtener recomendaciones personalizadas.",
    dashPractiseArrow: "Practicar →",
    dashProgressByTopic: "Progreso por tema",
    dashNoTopicData: "Sin datos aún, responde preguntas en el modo Práctica.",
    dashPractise: "Practicar",
    dashMockTestHistory: "Historial de simulacros",
    dashNoMockTestsTryPrefix: "Sin simulacros aún, prueba el",
    dashMockTestMode: "modo Simulacro",
    dashSignedInAs: "Sesión iniciada como",
    dashSignOutFromNav: "cerrar sesión desde el menú",
    dashStateLabel: "Estado",
    dashLoadMore: "Cargar más",

    // ── Account ───────────────────────────────────────────
    accountPageSub: "Administra tu perfil, preferencias y seguridad.",
    accountNavProfile: "Perfil",
    accountNavPreferences: "Preferencias",
    accountNavSecurity: "Seguridad",
    accountNavDanger: "Zona de peligro",
    accountProfileSub: "Tu nombre público e información de contacto.",
    accountUploadPhoto: "Subir foto",
    accountUploading: "Subiendo…",
    accountRemove: "Eliminar",
    accountAvatarHint: "JPG, PNG, WebP o GIF · máx. 2 MB",
    accountFullName: "Nombre completo",
    accountFullNamePlaceholder: "Tu nombre completo",
    accountEmailHint: "El correo no se puede cambiar aquí.",
    accountPhone: "Teléfono",
    accountOptional: "(opcional)",
    accountPhonePlaceholder: "+61 4xx xxx xxx",
    accountSaveProfile: "Guardar perfil",
    accountSaving: "Guardando…",
    accountProfileSaved: "Perfil guardado.",
    accountPreferencesSub: "Estado, idioma, zona horaria y visualización.",
    accountState: "Estado",
    accountStateHint: "Guardado como tu estado predeterminado en la app y el sitio estático.",
    accountLanguageHint: "Guardado como tu idioma predeterminado en la app y el sitio estático.",
    accountTimezone: "Zona horaria",
    accountTimezoneHint: "Usado para recordatorios de práctica (próximamente).",
    accountTheme: "Tema",
    accountThemeLight: "Claro",
    accountThemeDark: "Oscuro",
    accountThemeSystem: "Sistema",
    accountThemeHint: "Elige claro, oscuro o sigue la configuración del sistema.",
    accountSavePreferences: "Guardar preferencias",
    accountPreferencesSaved: "Preferencias guardadas.",
    accountSignInRequired: "Debes iniciar sesión.",
    accountSecuritySub: "Actualiza tu contraseña.",
    accountNewPassword: "Nueva contraseña",
    accountNewPasswordPlaceholder: "Mín. 8 caracteres",
    accountConfirmPassword: "Confirmar nueva contraseña",
    accountConfirmPasswordPlaceholder: "Repite la nueva contraseña",
    accountChangePassword: "Cambiar contraseña",
    accountChanging: "Cambiando…",
    accountPasswordMinLength: "La nueva contraseña debe tener al menos 8 caracteres.",
    accountPasswordMismatch: "Las contraseñas no coinciden.",
    accountPasswordChanged: "Contraseña cambiada correctamente.",
    accountDangerSub: "Acciones irreversibles, procede con precaución.",
    accountDeleteTitle: "Eliminar cuenta",
    accountDeleteDesc:
      "Esto eliminará permanentemente tu cuenta y todos los datos de progreso. Esta acción no se puede deshacer.",
    accountDeleteBtn: "Eliminar cuenta",
    accountDeleting: "Eliminando…",
    accountDeleteConfirm:
      "¿Estás seguro? Esta acción es irreversible y borra todos tus datos permanentemente.",
    accountNetworkError: "Error de red. Inténtalo de nuevo.",
    accountDeleteFailed: "No se pudo eliminar la cuenta. Inténtalo de nuevo.",
    accountAvatarUpdated: "¡Avatar actualizado!",
    accountAvatarRemoved: "Avatar eliminado.",
    accountAvatarAlt: "Avatar",
    accountUploadFailed: "Error al subir",

    // ── Footer ────────────────────────────────────────────
    footerTagline: "Aprueba el examen learner australiano, en inglés, portugués o español.",
    footerProductTitle: "Producto",
    footerCompanyTitle: "Empresa",
    footerLegalTitle: "Legal",
    footerNewsletterTitle: "Consejos semanales sobre el manejo",
    footerNewsletterDesc: "En inglés, portugués o español. Cancela cuando quieras.",
    footerNewsletterPlaceholder: "tu@email.com",
    footerNewsletterCta: "Suscribirme",
    footerNewsletterSuccess: "¡Ya estás! Revisa tu bandeja de entrada.",
    footerNewsletterError: "Algo salió mal. Inténtalo de nuevo.",
    footerStatesLabel: "Exámenes de learner",
    stateCtaPractice: "Practicar preguntas de {state}",
    stateCtaMock: "Hacer un simulacro de {state}",

    // ── Learner test pages (/learner-test) ────────────────
    ltHubTitle: "Exámenes de práctica para aprendices por estado",
    ltHubSub:
      "{total} preguntas gratuitas para los exámenes de licencia de aprendiz de " +
      "Australia. Elige tu estado o territorio y practica con preguntas al estilo del " +
      "examen real, en inglés, portugués o español.",
    ltHubIntro:
      "Cada estado y territorio aplica su propio examen teórico de aprendiz, con nombre, " +
      "cantidad de preguntas y puntaje mínimo propios. KangaLearner mantiene un banco de " +
      "preguntas separado para cada uno, así practicas exactamente lo que evalúa tu estado.",
    ltHubFactQuestions: "Preguntas gratis",
    ltHubFactStates: "Estados y territorios",
    ltHubFactLangs: "Idiomas de estudio",
    ltHubOfficialTitle: "Exámenes oficiales cubiertos",
    ltHubListTail: ": {n} preguntas gratis, administrado por {authority}.",
    ltHubDisclaimer:
      "KangaLearner es una herramienta de estudio independiente y no está afiliada a " +
      "ningún organismo de tránsito estatal. Consulta siempre el sitio oficial de tu " +
      "estado para conocer los requisitos vigentes del examen.",
    ltQuestionsCount: "{n} preguntas",
    ltPracticeBadge: "Examen de práctica",
    ltStateH1: "Práctica para el {test}",
    ltStateSub:
      "Preguntas gratuitas de práctica del {test} para {state}. " +
      "Estudia en inglés, portugués o español.",
    ltStateIntro:
      "El {test} es el examen teórico oficial que debes aprobar para obtener tu licencia " +
      "de aprendiz en {state}. Lo administra {authority}.",
    ltStateIntroExam: "El examen real tiene {n} preguntas y el puntaje mínimo es {pass}.",
    ltStateBankBoth:
      "KangaLearner tiene {total} preguntas gratuitas de práctica para {code}: {car} " +
      "para el examen de auto y {moto} para el de moto.",
    ltStateBankCarOnly:
      "KangaLearner tiene {total} preguntas gratuitas de práctica para {code}, todas " +
      "enfocadas en el examen teórico de auto.",
    ltStateBankLangs:
      "Cada pregunta está disponible en inglés, portugués y español, con explicaciones claras.",
    ltFactTest: "Examen oficial",
    ltFactAuthority: "Administrado por",
    ltFactQuestions: "Examen real",
    ltFactBank: "Banco de preguntas gratis",
    ltFactBankSplit: "{car} auto, {moto} moto",
    ltFactBankCarOnly: "preguntas de auto",
    ltTopicsTitle: "Qué entra en el examen",
    ltTopicsBody:
      "El banco de preguntas de {code} cubre todos los temas del examen real: {topics}.",
    ltWaGuidePre: "Lee la ",
    ltWaGuideLink: "guía completa del formato del examen de WA",
    ltWaGuidePost: " para detalles de reserva y qué esperar el día del examen.",
    ltSignsTitle: "Señales que aparecen en el examen",
    ltSignsSub: "Señales de tránsito reales de {state} usadas en las preguntas de práctica.",
    ltFaqTitle: "Preguntas frecuentes del examen de {code}",
    ltFaqBilingualQ: "¿Puedo practicar para el {test} en portugués o español?",
    ltFaqBilingualA:
      "Sí. Cada pregunta de KangaLearner está disponible en inglés, portugués y español, " +
      "incluidos los modos de estudio bilingües.",
    ltFaqBankQ: "¿Cuántas preguntas de práctica de {code} tiene KangaLearner?",
    ltFaqBankABoth:
      "{total} preguntas gratis: {car} para el examen de auto y {moto} para el de moto. " +
      "Cada pregunta tiene explicación.",
    ltFaqBankACarOnly:
      "{total} preguntas gratis, todas enfocadas en el examen teórico de auto. Cada " +
      "pregunta tiene explicación.",
    ltOtherStatesTitle: "Exámenes de práctica en otros estados",
    ltAllStatesLink: "Todos los exámenes de práctica de aprendiz de Australia por estado",
    ltDisclaimer:
      "KangaLearner es una herramienta de estudio independiente y no está afiliada a " +
      "{authority}. Consulta siempre {url} para conocer los requisitos vigentes del " +
      "examen. Datos del examen revisados por última vez el {date}.",
    resCommunityTitle: "Comunidades de Inmigrantes",
    resCommunityDesc:
      "Conéctate con otros inmigrantes en toda Australia que también están sacando su licencia.",
    resStudyTitle: "Guías de Estudio Gratuitas",
    resStudyDesc: "Recursos oficiales del DoT, gratuitos para descargar.",
    resJourneyTitle: "Tu Camino hacia la Licencia Completa",
    resChecklistTitle: "Lista de Verificación para el Día del Examen",
    footerCopyright: "© 2026 KangaLearner. Todos los derechos reservados.",

    // ── Auth ──────────────────────────────────────────────
    emailLabel: "Correo electrónico",
    passwordLabel: "Contraseña",
    forgotPassword: "¿Olvidó su contraseña?",
    continueWithGoogle: "Continuar con Google",
    authWelcomeBack: "Bienvenido de nuevo",
    authSignInSub:
      "Inicia sesión para acceder a tu progreso, estadísticas e historial de simulacros.",
    authSigningIn: "Iniciando sesión…",
    authNoAccount: "¿No tienes cuenta?",
    authCreateOne: "Créala",
    authTagline: "Reglas viales oficiales · Actualizado · Confiado por conductores en Australia",
    authServiceUnavailable:
      "Servicio de autenticación no disponible. Actualiza la página o inténtalo más tarde.",
    authCreateAccount: "Crea tu cuenta",
    authCreateAccountSub:
      "Guarda tu progreso, sigue tus estadísticas y accede a tu historial completo de simulacros.",
    authYourName: "Tu nombre",
    authAtLeast8: "Al menos 8 caracteres",
    authCreatingAccount: "Creando cuenta…",
    authCreateAccountBtn: "Crear cuenta",
    authCheckYourEmail: "Revisa tu correo",
    authEmailConfirmSentPrefix: "Enviamos un enlace de confirmación a",
    authEmailConfirmAction: "Haz clic en el enlace para activar tu cuenta.",
    authAgreeTermsPrefix: "Al crear una cuenta, aceptas nuestros",
    authAlreadyHaveAccount: "¿Ya tienes cuenta?",
    authResetPassword: "Restablecer tu contraseña",
    authResetSub: "Ingresa tu correo y te enviaremos un enlace de restablecimiento.",
    authSending: "Enviando…",
    authSendResetLink: "Enviar enlace de restablecimiento",
    authRememberedIt: "¿Lo recordaste?",
    authResetEmailSentPrefix: "Enviamos un enlace de restablecimiento a",
    authResetEmailSentSuffix: "Sigue el enlace para elegir una nueva contraseña.",
    authChooseNewPassword: "Elige una nueva contraseña",
    authChooseNewPasswordSub: "Ingresa una nueva contraseña para tu cuenta.",
    authWaitingResetSession:
      "Esperando sesión de restablecimiento… Si persiste, abre el enlace del correo nuevamente.",
    authNewPasswordLabel: "Nueva contraseña",
    authConfirmPasswordLabel: "Confirmar contraseña",
    authRepeatYourPassword: "Repite tu contraseña",
    authUpdating: "Actualizando…",
    authUpdatePassword: "Actualizar contraseña",
    authPasswordsDoNotMatch: "Las contraseñas no coinciden.",
    authPasswordUpdated: "Contraseña actualizada",
    authPasswordUpdatedSub: "Tu contraseña se ha actualizado correctamente.",
    authBackToSignIn: "← Volver al inicio de sesión",
    authSignInArrow: "Ingresar →",

    // ── Auth nudge ────────────────────────────────────────
    nudgeTitle: "Inicia sesión para guardar tu progreso",
    nudgeBody:
      "Tus resultados solo están almacenados localmente. Crea una cuenta gratuita para sincronizar entre dispositivos y seguir tu historial.",
    nudgeSignUp: "Crear cuenta gratis",
    nudgeSignIn: "Ingresar",

    // ── Misc ──────────────────────────────────────────────
    pass: "Aprobado",
    fail: "Reprobado",
    mockNoQuestions: "No hay preguntas disponibles para este estado.",
    mockNoResults: "No se encontraron resultados para esta sesión.",
    mockConfigNotFound: "No se encontró la configuración del simulacro.",
    mockSessionError: "Error de sesión",
    mockLoadNextQuestion: "No pudimos cargar la siguiente pregunta.",

    // ── Readiness score ───────────────────────────────────
    "readiness.title": "¿Estoy listo para el examen?",
    "readiness.hint":
      "Basado en la cobertura de preguntas, la precisión por tema y tus simulacros recientes.",
    "readiness.level.not_ready": "Aún no",
    "readiness.level.getting_there": "En camino",
    "readiness.level.almost": "Casi listo",
    "readiness.level.ready": "Listo",
    "readiness.noMocks": "Haz un simulacro. Necesitas al menos 2 simulacros aprobados.",
    "readiness.lowMockScores":
      "Tus simulacros recientes están por debajo del 80%. Intenta otro simulacro.",
    "readiness.needMorePassingMocks":
      "Aprueba un simulacro más (80% o mejor) para confirmar que estás listo.",
    "readiness.weakCategories":
      "Algunos temas están por debajo del 70%. Practica tu tema más débil.",
    "readiness.lowCoverage":
      "Aún no has visto la mayor parte del banco de preguntas. Sigue practicando preguntas nuevas.",
    "readiness.viewDashboard": "Ve tu preparación completa en tu panel"
  }
} as const satisfies Record<UiLang, Record<string, string>>;

export type UIStrings = (typeof t)["en"];
