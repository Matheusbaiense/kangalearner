// Lazy loader for the legacy questions dataset.
// Keeps compatibility with the existing global `window.QUESTIONS` / `window.CATEGORIES`.
(function () {
  let loading = null;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Failed to load " + src));
      document.head.appendChild(s);
    });
  }

  async function ensureQuestionsLoaded() {
    if (Array.isArray(window.QUESTIONS) && Array.isArray(window.CATEGORIES)) return;
    if (loading) return loading;
    loading = (async () => {
      try {
        await loadScript("assets/js/data/questions.js");
        if (!Array.isArray(window.QUESTIONS) || !Array.isArray(window.CATEGORIES)) {
          throw new Error("questions.js loaded but did not expose QUESTIONS/CATEGORIES");
        }
      } catch (e) {
        loading = null;
        throw e;
      }
    })();
    return loading;
  }

  window.KangaQuestions = {
    ensureLoaded: ensureQuestionsLoaded
  };
})();
