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
})();
