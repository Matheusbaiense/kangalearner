// KangaLearner SPA Router — hash-based navigation
(function () {
  "use strict";

  var _dwInitPromise = null;
  var _simWatcher = null;
  var PAGE_ROOT = null;
  var QUIZ_ROOT = null;

  function clearExamTimer() {
    if (window.__klExamTimerInterval) {
      clearInterval(window.__klExamTimerInterval);
      window.__klExamTimerInterval = null;
    }
    var w = document.getElementById("kl-exam-timer-wrap");
    if (w) w.setAttribute("hidden", "");
  }

  // ── Route table ───────────────────────────────────────────────────────────
  var ROUTES = {
    home: function (p) {
      return window.KL_PAGES.home(p);
    },
    learn: function (p) {
      return p ? window.KL_PAGES.topic(p) : window.KL_PAGES.learn(p);
    },
    mock: function (p) {
      return window.KL_PAGES.mock(p);
    },
    "mock-results": function (p) {
      return window.KL_PAGES.mockResults(p);
    },
    progress: function (p) {
      return window.KL_PAGES.progress(p);
    },
    glossary: function (p) {
      return window.KL_PAGES.glossary(p);
    },
    resources: function (p) {
      return window.KL_PAGES.resources(p);
    },
    about: function (p) {
      return window.KL_PAGES.about(p);
    },
    contact: function (p) {
      return window.KL_PAGES.contact(p);
    }
  };

  // Quiz routes use #quiz-root directly (never destroyed)
  var QUIZ_ROUTES = { practice: true, "mock-run": true };

  // ── Public API ────────────────────────────────────────────────────────────
  window.KL_ROUTER = {
    go: function (hash) {
      location.hash = hash;
    }
  };
  window.KL_PAGES = window.KL_PAGES || {};

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    PAGE_ROOT = document.getElementById("page-root");
    QUIZ_ROOT = document.getElementById("quiz-root");
    watchSimCompletion();
    window.addEventListener("hashchange", navigate);
    navigate();
  }

  // ── Navigate ──────────────────────────────────────────────────────────────
  function navigate() {
    var raw = location.hash.replace("#", "").trim() || "home";
    var parts = raw.split("/");
    var page = parts[0];
    var param = parts[1] || null;
    var scrollTarget = null;

    // In-page anchors: render home and scroll.
    if (page === "topics" || page === "states") {
      scrollTarget = page;
      page = "home";
    }

    window.scrollTo(0, 0);
    updateNavActive(page);

    if (page !== "mock-run") clearExamTimer();

    if (QUIZ_ROUTES[page]) {
      activateQuizRoot();
      if (page === "practice") startPractice(param);
      if (page === "mock-run") startMockRun();
    } else {
      activatePageRoot();
      var renderer = ROUTES[page] || ROUTES["home"];
      try {
        PAGE_ROOT.innerHTML = renderer(param);
      } catch (e) {
        PAGE_ROOT.innerHTML = ROUTES["home"](null);
      }
      hydrateAfterRender();

      if (scrollTarget) {
        setTimeout(function () {
          var el = document.getElementById(scrollTarget);
          if (el && typeof el.scrollIntoView === "function")
            el.scrollIntoView({ block: "start", behavior: "smooth" });
        }, 0);
      }
    }
  }

  // ── DOM visibility ────────────────────────────────────────────────────────
  function activateQuizRoot() {
    if (QUIZ_ROOT) QUIZ_ROOT.removeAttribute("hidden");
    if (PAGE_ROOT) PAGE_ROOT.style.display = "none";
  }

  function activatePageRoot() {
    if (QUIZ_ROOT) QUIZ_ROOT.setAttribute("hidden", "");
    if (PAGE_ROOT) PAGE_ROOT.style.display = "";
  }

  // ── Practice ──────────────────────────────────────────────────────────────
  function startPractice(cat) {
    ensureDWInit().then(function () {
      var savedCat = null;
      try {
        savedCat = sessionStorage.getItem("kl-practice-cat");
      } catch (e) {}
      if (savedCat) {
        try {
          sessionStorage.removeItem("kl-practice-cat");
        } catch (e) {}
      }
      var targetCat = cat || savedCat;
      if (window.DW) {
        var selectedMode = null;
        try {
          selectedMode = sessionStorage.getItem("kl-practice-mode");
        } catch (e) {}
        if (!selectedMode) selectedMode = "practice";

        // "practice" = regular study (shows explanations), "exam" = sim mode
        if (selectedMode === "exam") window.DW.setMode("sim");
        else window.DW.setMode("all");

        if (targetCat) window.DW.setCat(targetCat);
        window.DW.renderFilters();
        window.DW.renderQuiz();
        window.DW.updateScore();
      }
    });
  }

  // ── Mock run ──────────────────────────────────────────────────────────────
  function startMockRun() {
    ensureDWInit().then(function () {
      clearExamTimer();
      if (window.DW && typeof window.DW.setMode === "function") {
        window.DW.setMode("sim");
      }

      var useTimer = false;
      try {
        useTimer =
          sessionStorage.getItem("kl-exam-real-timer") === "1" &&
          sessionStorage.getItem("kl-practice-mode") === "exam";
      } catch (e) {}

      if (useTimer) {
        try {
          sessionStorage.setItem("kl-exam-started-at", String(Date.now()));
        } catch (e) {}
        var wrap = document.getElementById("kl-exam-timer-wrap");
        if (wrap) wrap.removeAttribute("hidden");
        var remain = 45 * 60;
        function tick() {
          var el = document.getElementById("kl-exam-timer-display");
          if (el) {
            var mm = Math.floor(Math.max(0, remain) / 60);
            var ss = Math.max(0, remain) % 60;
            el.textContent = mm + ":" + (ss < 10 ? "0" : "") + ss;
          }
          if (remain <= 0) {
            clearExamTimer();
            if (window.DW && typeof window.DW.completeSimExamTimeout === "function") {
              window.DW.completeSimExamTimeout();
            }
            return;
          }
          remain--;
        }
        window.__klExamTimerInterval = setInterval(tick, 1000);
        tick();
      } else {
        try {
          sessionStorage.removeItem("kl-exam-started-at");
        } catch (e) {}
      }

      var lang = getPreferredLang();
      if (typeof window.hydrateKangaStaticI18n === "function") {
        window.hydrateKangaStaticI18n(lang);
      }
    });
  }

  /**
   * Returns a shared Promise that resolves once DW.init() has completed.
   * Caching the Promise (not a boolean flag) ensures that concurrent callers
   * all await the same in-flight init rather than returning immediately.
   */
  function ensureDWInit() {
    if (!_dwInitPromise) {
      var lang = getPreferredLang();
      persistPreferredLang(lang);
      if (window.DW) window.DW.lang = lang;
      _dwInitPromise =
        window.DW && typeof window.DW.init === "function"
          ? window.DW.init().catch(function (e) {
              console.error("KangaLearner: DW.init failed", e);
            })
          : Promise.resolve();
    }
    return _dwInitPromise;
  }

  function getPreferredLang() {
    try {
      var live = window.DW && window.DW.lang ? window.DW.lang : null;
      var stored = null;
      if (window.KangaStorage && typeof window.KangaStorage.getLang === "function") {
        stored = window.KangaStorage.getLang();
      } else {
        stored = localStorage.getItem("kl-lang");
      }

      // Prefer the live selection (user just changed it) over any stale persisted value.
      if (live && stored && live !== stored) return live;
      return stored || live || "en";
    } catch (e) {
      return (window.DW && window.DW.lang) || "en";
    }
  }

  function persistPreferredLang(lang) {
    try {
      if (window.KangaStorage && typeof window.KangaStorage.setLang === "function")
        window.KangaStorage.setLang(lang);
      else localStorage.setItem("kl-lang", lang);
    } catch (e) {}
  }

  // ── MutationObserver: detect sim completion ───────────────────────────────
  function watchSimCompletion() {
    var container = document.getElementById("sim-card-container");
    if (!container) return;
    if (_simWatcher) _simWatcher.disconnect();
    _simWatcher = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var nodes = mutations[i].addedNodes;
        for (var j = 0; j < nodes.length; j++) {
          var node = nodes[j];
          var isFinal =
            node.id === "sim-final-panel" ||
            (node.querySelector && node.querySelector("#sim-final-panel"));
          if (isFinal) {
            saveMockResults();
            showMockResultsLink();
          }
        }
      }
    });
    _simWatcher.observe(container, { childList: true, subtree: true });
  }

  function saveMockResults() {
    if (!window.DW) return;
    var total = window.DW.simQueue ? window.DW.simQueue.length : 0;
    var correct = 0;
    var byCategory = {};
    var simAnswered = window.DW.simAnswered || {};

    Object.keys(simAnswered).forEach(function (qid) {
      var a = simAnswered[qid];
      if (a.correct) correct++;
      var q = window.DW.questionById ? window.DW.questionById(qid) : null;
      if (q && q.cat) {
        if (!byCategory[q.cat]) byCategory[q.cat] = { correct: 0, total: 0 };
        byCategory[q.cat].total++;
        if (a.correct) byCategory[q.cat].correct++;
      }
    });

    var timeSpentSec = null;
    try {
      var started = sessionStorage.getItem("kl-exam-started-at");
      if (started) {
        timeSpentSec = Math.max(0, Math.round((Date.now() - parseInt(started, 10)) / 1000));
      }
    } catch (e) {}

    var results = {
      total: total,
      correct: correct,
      wrong: total - correct,
      pct: total > 0 ? Math.round((correct / total) * 100) : 0,
      byCategory: byCategory,
      date: new Date().toISOString(),
      state: (window.KangaStorage && window.KangaStorage.getState()) || "WA",
      timeSpentSec: timeSpentSec
    };

    try {
      localStorage.setItem("kl-last-mock-results", JSON.stringify(results));
    } catch (e) {}
  }

  function showMockResultsLink() {
    var finalPanel = document.getElementById("sim-final-panel");
    if (!finalPanel || document.getElementById("kl-results-cta")) return;
    var cta = document.createElement("div");
    cta.id = "kl-results-cta";
    cta.className = "kl-results-cta";
    cta.innerHTML =
      '<a href="#mock-results" class="btn btn-primary kl-view-results-btn">View detailed results &rarr;</a>';
    finalPanel.appendChild(cta);
  }

  // ── Nav active state ──────────────────────────────────────────────────────
  function updateNavActive(page) {
    var normalised = page === "mock-run" ? "mock" : page;
    document.querySelectorAll(".main-nav a[href]").forEach(function (a) {
      var href = (a.getAttribute("href") || "").replace("#", "");
      var active =
        href === normalised || (normalised === "home" && (href === "home" || href === ""));
      a.classList.toggle("active", active);
    });
  }

  // ── Post-render hydration ─────────────────────────────────────────────────
  function hydrateAfterRender() {
    var lang = getPreferredLang();
    if (typeof window.hydrateKangaStaticI18n === "function") {
      window.hydrateKangaStaticI18n(lang);
    }
    bindStateCards();
    bindTopicCards();
    bindMockSetup();
    if (typeof window.KL_initStateSelector === "function") {
      window.KL_initStateSelector();
    }
  }

  function bindStateCards() {
    document.querySelectorAll("#page-root .state-card[data-state]").forEach(function (card) {
      card.addEventListener("click", function () {
        var code = card.dataset.state;
        if (window.KangaStorage) window.KangaStorage.setState(code);
        if (window.DW && typeof window.DW.setState === "function") window.DW.setState(code);
        document.querySelectorAll("#page-root .state-card").forEach(function (c) {
          var on = c.dataset.state === code;
          c.classList.toggle("active", on);
          c.setAttribute("aria-pressed", on ? "true" : "false");
        });
      });
    });
  }

  function bindTopicCards() {
    document.querySelectorAll("#page-root [data-cat]").forEach(function (card) {
      card.addEventListener("click", function (e) {
        e.preventDefault();
        var cat = card.dataset.cat;
        if (cat) {
          try {
            sessionStorage.setItem("kl-practice-cat", cat);
          } catch (ex) {}
        }
        location.hash = "practice";
      });
    });
  }

  function bindMockSetup() {
    document.querySelectorAll('[data-action="start-mock"]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        try {
          var mode = btn.getAttribute("data-mode") || "exam";
          sessionStorage.setItem("kl-practice-mode", mode);
          var cb = document.getElementById("kl-exam-real-timer");
          if (cb && cb.checked && mode === "exam") {
            sessionStorage.setItem("kl-exam-real-timer", "1");
          } else {
            sessionStorage.removeItem("kl-exam-real-timer");
          }
        } catch (e) {}
        location.hash = "mock-run";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
