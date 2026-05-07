// KangaLearner — minimal i18n facade (display vs translation language)
(function () {
  "use strict";

  function getStoredLang() {
    try {
      if (window.KL_STORAGE && typeof window.KL_STORAGE.getLang === "function") {
        return window.KL_STORAGE.getLang() || "en";
      }
      return (
        (window.KangaStorage && window.KangaStorage.getLang && window.KangaStorage.getLang()) ||
        "en"
      );
    } catch (e) {
      return "en";
    }
  }

  function displayLang(lang) {
    if (lang === "pten") return "pt";
    if (lang === "esen") return "es";
    if (String(lang).startsWith("pt")) return "pt";
    if (String(lang).startsWith("es")) return "es";
    return "en";
  }

  function translationLang(lang) {
    return lang === "pten" || lang === "esen" ? "en" : null;
  }

  function documentLang(lang) {
    // Keep existing behavior in app.js/quiz-engine.js but centralize it.
    if (lang === "pt" || lang === "pten") return "pt-BR";
    if (lang === "es" || lang === "esen") return "es";
    return "en";
  }

  const LABELS = {
    home: { en: "Home", pt: "Início", es: "Inicio" },
    learn: { en: "Learn", pt: "Aprender", es: "Aprender" },
    practice: { en: "Practice", pt: "Praticar", es: "Practicar" },
    mockTest: { en: "Mock Test", pt: "Simulado", es: "Simulacro" },
    progress: { en: "Progress", pt: "Progresso", es: "Progreso" },
    resources: { en: "Resources", pt: "Recursos", es: "Recursos" },
    score: { en: "Score", pt: "Score", es: "Puntuación" },
    correct: { en: "Correct", pt: "Certas", es: "Correctas" },
    incorrect: { en: "Incorrect", pt: "Erradas", es: "Incorrectas" },
    unanswered: { en: "Unanswered", pt: "Não respondidas", es: "Sin responder" },
    resetAll: { en: "Reset all", pt: "Apagar tudo", es: "Borrar todo" },
    loadMoreQuestions: { en: "Load more", pt: "Carregar mais", es: "Cargar más" },
    explanation: { en: "Explanation", pt: "Explicação", es: "Explicación" },
    yourAnswer: { en: "Your answer", pt: "Sua resposta", es: "Tu respuesta" },
    correctAnswer: { en: "Correct answer", pt: "Resposta correta", es: "Respuesta correcta" },
    comingSoon: { en: "Coming soon", pt: "Em breve", es: "Próximamente" },
    practiseWA: { en: "Practise WA", pt: "Praticar WA", es: "Practicar WA" },
    backToLearn: { en: "Back to Learn", pt: "Voltar para Aprender", es: "Volver a Aprender" },
    studyAidDisclaimer: {
      en: "KangaLearner is a study aid. Always confirm current requirements with your state transport authority.",
      pt: "O KangaLearner é uma ferramenta de apoio ao estudo. Confirme sempre as regras atuais com o órgão de trânsito do seu estado.",
      es: "KangaLearner es una herramienta de apoyo al estudio. Confirma siempre los requisitos actuales con la autoridad de transporte de tu estado."
    },
    confirmReset: {
      en: "Are you sure you want to reset your progress?",
      pt: "Tem certeza que deseja apagar seu progresso?",
      es: "¿Seguro que deseas borrar tu progreso?"
    }
  };

  function label(key) {
    const lang = displayLang(getStoredLang());
    return (LABELS[key] && (LABELS[key][lang] || LABELS[key].en)) || key;
  }

  function t(obj, fallback) {
    const rawLang = getStoredLang();
    const d = displayLang(rawLang);
    if (!obj || typeof obj !== "object") return fallback || "";
    return obj[d] || obj[rawLang] || obj.en || fallback || "";
  }

  function setLang(lang) {
    try {
      if (window.KL_STORAGE && typeof window.KL_STORAGE.setLang === "function") {
        window.KL_STORAGE.setLang(lang);
      } else if (window.KangaStorage && window.KangaStorage.setLang) {
        window.KangaStorage.setLang(lang);
      } else {
        localStorage.setItem("kl-lang", lang);
      }
    } catch (e) {}

    setDocumentLang(lang);
    applyStaticLanguage(lang);
  }

  function setDocumentLang(lang) {
    try {
      document.documentElement.lang = documentLang(lang);
    } catch (e) {}
  }

  function applyStaticLanguage(lang) {
    try {
      if (typeof window.hydrateKangaStaticI18n === "function") {
        window.hydrateKangaStaticI18n(lang);
      }
    } catch (e) {}
  }

  window.KL_I18N = {
    getLang: getStoredLang,
    setLang: setLang,
    getDisplayLang: displayLang,
    getTranslationLang: translationLang,
    setDocumentLang: setDocumentLang,
    t: t,
    label: label,
    applyStaticLanguage: applyStaticLanguage
  };
})();
