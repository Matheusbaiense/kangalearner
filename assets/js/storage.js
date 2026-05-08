/**
 * KangaLearner — localStorage versionado (migração kl-* legado → v2).
 */
(function () {
  const STORAGE_VERSION = "v2";

  const KEYS = {
    answeredByState: "kl-answered-by-state-" + STORAGE_VERSION,
    state: "kl-state-" + STORAGE_VERSION,
    lang: "kl-lang"
  };

  const LEGACY = {
    answeredByState: "kl-answered-by-state",
    answeredFlat: "kl-answered",
    state: "kl-state"
  };

  function migrateAnsweredByState() {
    if (localStorage.getItem(KEYS.answeredByState)) {
      localStorage.removeItem(LEGACY.answeredByState);
      localStorage.removeItem(LEGACY.answeredFlat);
      return;
    }
    const oldBlob = localStorage.getItem(LEGACY.answeredByState);
    if (oldBlob) {
      try {
        JSON.parse(oldBlob);
        localStorage.setItem(KEYS.answeredByState, oldBlob);
      } catch (_) {}
      localStorage.removeItem(LEGACY.answeredByState);
      localStorage.removeItem(LEGACY.answeredFlat);
      return;
    }
    const flat = localStorage.getItem(LEGACY.answeredFlat);
    if (flat) {
      try {
        const parsed = JSON.parse(flat);
        if (parsed && typeof parsed === "object") {
          localStorage.setItem(KEYS.answeredByState, JSON.stringify({ WA: parsed }));
        }
      } catch (_) {}
      localStorage.removeItem(LEGACY.answeredFlat);
    }
  }

  function migrateState() {
    if (localStorage.getItem(KEYS.state)) {
      localStorage.removeItem(LEGACY.state);
      return;
    }
    const old = localStorage.getItem(LEGACY.state);
    if (old) {
      localStorage.setItem(KEYS.state, old);
      localStorage.removeItem(LEGACY.state);
    }
  }

  function migrateFromLegacy() {
    try {
      migrateAnsweredByState();
      migrateState();
    } catch (e) {
      console.warn("KangaStorage: migrateFromLegacy failed", e);
    }
  }

  function getAnsweredByStateRaw() {
    return localStorage.getItem(KEYS.answeredByState);
  }

  function setAnsweredByStateJson(jsonString) {
    try {
      localStorage.setItem(KEYS.answeredByState, jsonString);
      return true;
    } catch (e) {
      console.warn("KangaStorage: falha ao salvar progresso", e);
      return false;
    }
  }

  function getState() {
    return localStorage.getItem(KEYS.state);
  }

  function setState(code) {
    try {
      localStorage.setItem(KEYS.state, code);
      return true;
    } catch (e) {
      console.warn("KangaStorage: falha ao salvar estado", e);
      return false;
    }
  }

  function getLang() {
    try {
      return localStorage.getItem(KEYS.lang);
    } catch (e) {
      return null;
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem(KEYS.lang, lang);
      return true;
    } catch (e) {
      return false;
    }
  }

  // ── Shared helpers ────────────────────────────────────────────────────────
  function safeParseJson(raw, fallback) {
    if (raw == null || raw === "") return fallback;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function safeStringifyJson(value) {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return "";
    }
  }

  function safeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  function safeRemove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  window.KangaStorage = {
    KEYS,
    migrateFromLegacy,
    getAnsweredByStateRaw,
    setAnsweredByStateJson,
    getState,
    setState,
    getLang,
    setLang
  };

  // ── KL_STORAGE (new unified storage surface) ──────────────────────────────
  // Note: The app currently persists answers by state (v2) under `kl-answered-by-state-v2`.
  // KL_STORAGE keeps that format for backward compatibility while providing a stable API.
  const KL_KEYS = {
    lang: "kl-lang",
    state: "kl-state",
    answers: "dw-answers",
    lastMock: "kl-last-mock-results",
    lastExam: "kl-last-exam-results",
    savedQuestions: "kl-saved-questions"
  };

  function answeredByStateKeyV2() {
    return KEYS.answeredByState;
  }

  function stateKeyV2() {
    return KEYS.state;
  }

  function loadAnsweredByState() {
    // Prefer v2; fall back to legacy shapes.
    const v2 = safeGet(answeredByStateKeyV2());
    if (v2) return safeParseJson(v2, {});

    const legacyByState = safeGet(LEGACY.answeredByState);
    if (legacyByState) return safeParseJson(legacyByState, {});

    const flat = safeGet(LEGACY.answeredFlat);
    const parsedFlat = safeParseJson(flat, null);
    if (parsedFlat && typeof parsedFlat === "object") return { WA: parsedFlat };

    // Optional compatibility key from older DW versions.
    const dw = safeGet(KL_KEYS.answers);
    const parsedDw = safeParseJson(dw, null);
    if (parsedDw && typeof parsedDw === "object") return { WA: parsedDw };

    return {};
  }

  function saveAnsweredByState(byState) {
    const json = safeStringifyJson(byState || {});
    if (!json) return false;
    return safeSet(answeredByStateKeyV2(), json);
  }

  function currentState() {
    // Prefer v2 state key; fall back to legacy.
    const v2 = safeGet(stateKeyV2());
    if (v2) return v2;
    const legacy = safeGet(LEGACY.state);
    return legacy || "WA";
  }

  function setCurrentState(code) {
    if (!code) return false;
    return safeSet(stateKeyV2(), String(code));
  }

  function currentLang() {
    const l = safeGet(KEYS.lang);
    return l || "en";
  }

  function setCurrentLang(lang) {
    if (!lang) return false;
    return safeSet(KEYS.lang, String(lang));
  }

  function storageStateKeyForAnswers(state) {
    // Maintain the app’s “AU uses WA answers” behavior.
    return state === "AU" ? "WA" : state;
  }

  function getAnswers() {
    return loadAnsweredByState();
  }

  function setAnswers(answers) {
    // Accept either flat map (assume WA) or byState map.
    if (!answers || typeof answers !== "object") return saveAnsweredByState({});
    if (
      Object.prototype.hasOwnProperty.call(answers, "WA") ||
      Object.keys(answers).some((k) => k.length <= 3)
    ) {
      return saveAnsweredByState(answers);
    }
    return saveAnsweredByState({ WA: answers });
  }

  function getAnswer(questionId) {
    if (!questionId) return null;
    const state = storageStateKeyForAnswers(currentState());
    const byState = loadAnsweredByState();
    const bucket = byState && typeof byState === "object" ? byState[state] || {} : {};
    return bucket && typeof bucket === "object" ? bucket[questionId] || null : null;
  }

  function saveAnswer(questionId, isCorrect, selectedLetter) {
    if (!questionId) return false;
    const state = storageStateKeyForAnswers(currentState());
    const byState = loadAnsweredByState();
    const next = { ...(byState || {}) };
    const bucket = next[state] && typeof next[state] === "object" ? next[state] : {};
    const nextBucket = { ...bucket };
    nextBucket[questionId] = {
      correct: Boolean(isCorrect),
      chosen: selectedLetter != null ? String(selectedLetter) : null
    };
    next[state] = nextBucket;
    return saveAnsweredByState(next);
  }

  function resetAnswers() {
    const state = storageStateKeyForAnswers(currentState());
    const byState = loadAnsweredByState();
    const next = { ...(byState || {}) };
    next[state] = {};
    return saveAnsweredByState(next);
  }

  function getSavedQuestions() {
    const raw = safeGet(KL_KEYS.savedQuestions);
    const parsed = safeParseJson(raw, []);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  }

  function toggleSavedQuestion(questionId) {
    if (!questionId) return { saved: false, list: getSavedQuestions() };
    const current = getSavedQuestions();
    const has = current.includes(questionId);
    const next = has ? current.filter((id) => id !== questionId) : current.concat([questionId]);
    safeSet(KL_KEYS.savedQuestions, safeStringifyJson(next) || "[]");
    return { saved: !has, list: next };
  }

  function saveLastMockResults(results) {
    const json = safeStringifyJson(results);
    if (!json) return false;
    return safeSet(KL_KEYS.lastMock, json);
  }

  function getLastMockResults() {
    const raw = safeGet(KL_KEYS.lastMock);
    const parsed = safeParseJson(raw, null);
    return parsed && typeof parsed === "object" ? parsed : null;
  }

  function clearLastMockResults() {
    return safeRemove(KL_KEYS.lastMock);
  }

  function saveLastExamResults(results) {
    const json = safeStringifyJson(results);
    if (!json) return false;
    return safeSet(KL_KEYS.lastExam, json);
  }

  function getLastExamResults() {
    const raw = safeGet(KL_KEYS.lastExam);
    const parsed = safeParseJson(raw, null);
    return parsed && typeof parsed === "object" ? parsed : null;
  }

  function clearLastExamResults() {
    return safeRemove(KL_KEYS.lastExam);
  }

  function getStats(questions) {
    const qs = Array.isArray(questions) ? questions : [];
    const state = storageStateKeyForAnswers(currentState());
    const byState = loadAnsweredByState();
    const answeredMap =
      byState && typeof byState === "object" && byState[state] && typeof byState[state] === "object"
        ? byState[state]
        : {};

    const answeredIds = Object.keys(answeredMap);
    const answered = answeredIds.length;
    let correct = 0;
    answeredIds.forEach((qid) => {
      if (answeredMap[qid] && answeredMap[qid].correct) correct++;
    });
    const incorrect = answered - correct;

    // Scope questions to current state (unless AU).
    const relevant =
      currentState() === "AU"
        ? qs
        : qs.filter((q) => Array.isArray(q.states) && q.states.includes(state));
    const totalQuestions = relevant.length;
    const unanswered = Math.max(0, totalQuestions - answered);
    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;

    const byCategory = {};
    relevant.forEach((q) => {
      const cat = q && q.cat ? q.cat : "Other";
      if (!byCategory[cat]) byCategory[cat] = { total: 0, answered: 0, correct: 0 };
      byCategory[cat].total++;
      const a = answeredMap[q.id];
      if (a) {
        byCategory[cat].answered++;
        if (a.correct) byCategory[cat].correct++;
      }
    });

    const byCatAcc = Object.keys(byCategory).map((k) => {
      const c = byCategory[k];
      const pct = c.answered > 0 ? Math.round((c.correct / c.answered) * 100) : null;
      return { key: k, answered: c.answered, accuracy: pct };
    });
    const answeredCats = byCatAcc.filter((x) => typeof x.accuracy === "number");
    answeredCats.sort((a, b) => a.accuracy - b.accuracy);
    const weakest = answeredCats.length ? answeredCats[0] : null;
    const strongest = answeredCats.length ? answeredCats[answeredCats.length - 1] : null;

    return {
      state: state,
      totalQuestions,
      answered,
      answeredUnique: answered, // intentional alias kept for practice-page.js compatibility
      correct,
      incorrect,
      unanswered,
      accuracy,
      byCategory,
      weakestTopicKey: weakest ? weakest.key : null,
      weakestTopicAccuracy: weakest ? weakest.accuracy : null,
      strongestTopicKey: strongest ? strongest.key : null,
      strongestTopicAccuracy: strongest ? strongest.accuracy : null
    };
  }

  window.KL_STORAGE = {
    keys: KL_KEYS,
    getLang: currentLang,
    setLang: setCurrentLang,
    getState: currentState,
    setState: setCurrentState,
    getAnswers,
    setAnswers,
    saveAnswer,
    getAnswer,
    resetAnswers,
    getSavedQuestions,
    toggleSavedQuestion,
    saveLastMockResults,
    getLastMockResults,
    clearLastMockResults,
    saveLastExamResults,
    getLastExamResults,
    clearLastExamResults,
    getStats
  };
})();
