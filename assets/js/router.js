/**
 * KangaLearner — router SPA por hash (`#home`, `#learn`, `#practice`, `#mock-run`, …).
 * Rotas de quiz mostram `#quiz-root` e escondem `#page-root`; as restantes fazem render HTML em `#page-root`.
 * API: `window.KL_ROUTER.go("#learn")`, páginas em `window.KL_PAGES`.
 */
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
    practice: function (p) {
      return window.KL_PAGES.practice(p);
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
    },

    // ── Auth (public) ───────────────────────────────────────────────────────
    login: function (p) {
      return window.KL_PAGES.login(p);
    },
    signup: function (p) {
      return window.KL_PAGES.signup(p);
    },
    "forgot-password": function (p) {
      return window.KL_PAGES["forgot-password"](p);
    },
    "reset-password": function (p) {
      return window.KL_PAGES["reset-password"](p);
    },
    "verify-email": function (p) {
      return window.KL_PAGES["verify-email"](p);
    },
    "auth-callback": function (p) {
      return window.KL_PAGES["auth-callback"](p);
    },
    logout: function (p) {
      return window.KL_PAGES.logout(p);
    },
    "session-expired": function (p) {
      return window.KL_PAGES["session-expired"](p);
    },

    // ── Account (guarded) ───────────────────────────────────────────────────
    account: function (p) {
      return window.KL_PAGES.account(p);
    },
    profile: function (p) {
      return window.KL_PAGES.profile(p);
    },
    settings: function (p) {
      return window.KL_PAGES.settings(p);
    },
    security: function (p) {
      return window.KL_PAGES.security(p);
    },
    "privacy-settings": function (p) {
      return window.KL_PAGES["privacy-settings"](p);
    },
    "data-controls": function (p) {
      return window.KL_PAGES["data-controls"](p);
    },
    notifications: function (p) {
      return window.KL_PAGES.notifications(p);
    },

    // ── Premium / pricing / billing ─────────────────────────────────────────
    premium: function (p) {
      return window.KL_PAGES.premium(p);
    },
    pricing: function (p) {
      return window.KL_PAGES.pricing(p);
    },
    billing: function (p) {
      return window.KL_PAGES.billing(p);
    },
    "upgrade-success": function (p) {
      return window.KL_PAGES["upgrade-success"](p);
    },
    "upgrade-cancelled": function (p) {
      return window.KL_PAGES["upgrade-cancelled"](p);
    },

    // ── Admin (guarded) ─────────────────────────────────────────────────────
    admin: function (p) {
      return window.KL_PAGES.admin(p);
    },
    "admin-users": function (p) {
      return window.KL_PAGES["admin-users"](p);
    },
    "admin-reports": function (p) {
      return window.KL_PAGES["admin-reports"](p);
    },
    "admin-content": function (p) {
      return window.KL_PAGES["admin-content"](p);
    },
    "admin-support": function (p) {
      return window.KL_PAGES["admin-support"](p);
    },
    "admin-data-requests": function (p) {
      return window.KL_PAGES["admin-data-requests"](p);
    },
    "admin-audit-log": function (p) {
      return window.KL_PAGES["admin-audit-log"](p);
    },

    // ── Legal / trust (public) ──────────────────────────────────────────────
    "privacy-policy": function (p) {
      return window.KL_PAGES["privacy-policy"](p);
    },
    terms: function (p) {
      return window.KL_PAGES.terms(p);
    },
    "security-policy": function (p) {
      return window.KL_PAGES["security-policy"](p);
    },
    "data-deletion": function (p) {
      return window.KL_PAGES["data-deletion"](p);
    },
    "not-official": function (p) {
      return window.KL_PAGES["not-official"](p);
    },
    "contact-support": function (p) {
      return window.KL_PAGES["contact-support"](p);
    }
  };

  // Quiz routes use #quiz-root directly (never destroyed)
  var QUIZ_ROUTES = { "practice-run": true, "mock-run": true, "exam-run": true };

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

    // Route guards (mock roles only). Never destroy #quiz-root.
    try {
      var GG = window.KL_ROUTE_GUARDS;
      if (GG && typeof GG.guardRoute === "function") {
        var redirect = GG.guardRoute(page);
        if (redirect && typeof redirect === "string" && redirect.charAt(0) === "#") {
          if (location.hash !== redirect) {
            location.hash = redirect.replace("#", "");
            return;
          }
        }
      }
    } catch (eGuard) {}

    // In-page anchors:
    // - #topics: render home and scroll to topics section
    // - #states: consolidate with Learn and scroll to its "Road Rules" block
    if (page === "topics") {
      scrollTarget = page;
      page = "home";
    }
    if (page === "states") {
      scrollTarget = "road-rules";
      page = "learn";
    }
    if (page === "road-rules" || page === "roadrules" || page === "roadRules") {
      scrollTarget = "road-rules";
      page = "learn";
    }

    // Legacy: #mock is now an alias to #practice focused on Exam Simulation.
    if (page === "mock") {
      try {
        sessionStorage.setItem("kl-practice-focus", "exam");
      } catch (e) {}
      // Redirect so URL (and back button) match the unified IA.
      if (location.hash !== "#practice") {
        location.hash = "practice";
        return;
      }
      page = "practice";
    }

    window.scrollTo(0, 0);
    updateNavActive(page, scrollTarget);

    if (page !== "mock-run" && page !== "exam-run") clearExamTimer();

    if (QUIZ_ROUTES[page]) {
      activateQuizRoot();
      if (page === "practice-run") {
        if (window.kangaAnalytics && typeof window.kangaAnalytics.track === "function") {
          window.kangaAnalytics.track("quiz_start", { mode: "practice" });
        }
        startPractice(param);
      }
      if (page === "mock-run" || page === "exam-run") startMockRun();
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

    if (window.kangaAnalytics && typeof window.kangaAnalytics.pageView === "function") {
      window.kangaAnalytics.pageView(page + (param ? "/" + param : ""));
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
      try {
        sessionStorage.removeItem("kl-sim-strict-exam");
      } catch (e) {}
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
        if (!selectedMode) selectedMode = "topic";

        // "topic" = regular study (instant feedback + explanations)
        // "practice-mock" = 30Q sim with feedback, "exam" = 30Q exam-style (no feedback until end)
        if (selectedMode === "practice-mock") {
          try {
            sessionStorage.setItem("kl-sim-strict-exam", "0");
            sessionStorage.removeItem("kl-exam-real-timer");
          } catch (e) {}
          window.DW.setMode("sim");
        } else if (selectedMode === "exam") {
          try {
            sessionStorage.setItem("kl-sim-strict-exam", "1");
          } catch (e2) {}
          window.DW.setMode("sim");
        } else {
          try {
            sessionStorage.setItem("kl-sim-strict-exam", "0");
            sessionStorage.removeItem("kl-exam-real-timer");
          } catch (e3) {}
          window.DW.setMode("all");
        }

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

  function getUiLang() {
    try {
      var active = document.querySelector(".ld-option.active[data-lang]");
      return active ? active.getAttribute("data-lang") : null;
    } catch (e) {
      return null;
    }
  }

  function getPreferredLang() {
    try {
      var live = window.DW && window.DW.lang ? window.DW.lang : null;
      var ui = getUiLang();
      var stored = null;
      if (window.KangaStorage && typeof window.KangaStorage.getLang === "function") {
        stored = window.KangaStorage.getLang();
      } else {
        stored = localStorage.getItem("kl-lang");
      }

      // UI selection is source of truth; never let stored bilingual override EN/PT/ES view.
      if (ui) return ui;

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
      var mode = null;
      try {
        mode = sessionStorage.getItem("kl-practice-mode");
      } catch (e0) {
        mode = null;
      }
      var isExam = mode === "exam";
      if (window.KL_STORAGE && typeof window.KL_STORAGE.saveLastMockResults === "function") {
        window.KL_STORAGE.saveLastMockResults(results);
      } else {
        localStorage.setItem("kl-last-mock-results", JSON.stringify(results));
      }
      // Persist exam results separately (for readiness) while keeping mock results for compatibility.
      if (isExam) {
        if (window.KL_STORAGE && typeof window.KL_STORAGE.saveLastExamResults === "function") {
          window.KL_STORAGE.saveLastExamResults(results);
        } else {
          localStorage.setItem("kl-last-exam-results", JSON.stringify(results));
        }
      }
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
  function updateNavActive(page, scrollTarget) {
    var normalised =
      page === "practice-run"
        ? "practice"
        : page === "mock" ||
            page === "mock-run" ||
            page === "exam" ||
            page === "exam-run" ||
            page === "mock-results" ||
            page === "progress"
          ? "practice"
          : page;
    // If #states routes into Learn, Learn is the active nav item.
    var treatAsLearn = scrollTarget === "road-rules" && normalised === "learn";
    document.querySelectorAll(".main-nav a[href]").forEach(function (a) {
      var href = (a.getAttribute("href") || "").replace("#", "").split("/")[0];
      var active = false;
      if (treatAsLearn) {
        active = href === "learn";
      } else {
        active = href === normalised || (normalised === "home" && (href === "home" || href === ""));
      }
      a.classList.toggle("active", active);
    });
  }

  // ── Post-render hydration ─────────────────────────────────────────────────
  function hydrateAfterRender() {
    var lang = getPreferredLang();
    if (typeof window.hydrateKangaStaticI18n === "function") {
      window.hydrateKangaStaticI18n(lang);
    }
    bindAuthAndAccountUi();
    bindStateCards();
    bindLearnStateCards();
    bindTopicCards();
    bindPracticeLanding();
    bindMockSetup();
    refreshMockExamUi();
    applyPracticeFocus();
    if (typeof window.KL_initStateSelector === "function") {
      window.KL_initStateSelector();
    }
  }

  // ── Auth/account skeleton bindings (local-only; no backend) ───────────────
  function bindAuthAndAccountUi() {
    bindLoginForm();
    bindSignupForm();
    bindForgotForm();
    bindResetForm();
    bindVerifyButtons();
    bindAccountRoleButtons();
    bindProfileForm();
    bindPrivacyToggles();
    bindDataControls();
    bindSupportForm();
    bindPricingUpgrade();
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (!el) return false;
    el.textContent = text || "";
    return true;
  }

  function show(id) {
    var el = document.getElementById(id);
    if (!el) return false;
    el.removeAttribute("hidden");
    return true;
  }

  function hide(id) {
    var el = document.getElementById(id);
    if (!el) return false;
    el.setAttribute("hidden", "");
    return true;
  }

  function isValidEmail(email) {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
  }

  function t(key, fallback) {
    try {
      if (typeof window.tSafe === "function") return window.tSafe(key, fallback);
    } catch (e) {}
    return fallback || "";
  }

  function bindLoginForm() {
    var form = document.getElementById("kl-login-form");
    if (!form || form.__klBound) return;
    form.__klBound = true;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = String((document.getElementById("kl-login-email") || {}).value || "").trim();
      var pass = String((document.getElementById("kl-login-password") || {}).value || "");

      var emailErr = "";
      var passErr = "";
      if (!email) emailErr = t("auth.validation.emailRequired", "Email is required.");
      else if (!isValidEmail(email))
        emailErr = t("auth.validation.emailInvalid", "Enter a valid email.");
      if (!pass) passErr = t("auth.validation.passwordRequired", "Password is required.");

      if (emailErr) {
        setText("kl-login-email-err", emailErr);
        show("kl-login-email-err");
      } else hide("kl-login-email-err");

      if (passErr) {
        setText("kl-login-password-err", passErr);
        show("kl-login-password-err");
      } else hide("kl-login-password-err");

      if (emailErr || passErr) return;

      // Mock behaviour: show placeholder notice and set role to "user" (still no real auth).
      try {
        if (window.KL_AUTH_MOCK && window.KL_AUTH_MOCK.setRole) window.KL_AUTH_MOCK.setRole("user");
      } catch (e2) {}
      setText("kl-login-notice", t("auth.login.placeholderNotice", "Auth is not connected yet."));
      show("kl-login-notice");
    });
  }

  function bindSignupForm() {
    var form = document.getElementById("kl-signup-form");
    if (!form || form.__klBound) return;
    form.__klBound = true;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var first = String((document.getElementById("kl-signup-first") || {}).value || "").trim();
      var email = String((document.getElementById("kl-signup-email") || {}).value || "").trim();
      var pass = String((document.getElementById("kl-signup-password") || {}).value || "");
      var confirm = String((document.getElementById("kl-signup-confirm") || {}).value || "");
      var agree = !!(document.getElementById("kl-signup-terms") || {}).checked;

      hide("kl-signup-first-err");
      hide("kl-signup-email-err");
      hide("kl-signup-password-err");
      hide("kl-signup-confirm-err");
      hide("kl-signup-terms-err");

      var hasErr = false;
      if (!first) {
        setText(
          "kl-signup-first-err",
          t("auth.validation.firstRequired", "First name is required.")
        );
        show("kl-signup-first-err");
        hasErr = true;
      }
      if (!email) {
        setText("kl-signup-email-err", t("auth.validation.emailRequired", "Email is required."));
        show("kl-signup-email-err");
        hasErr = true;
      } else if (!isValidEmail(email)) {
        setText("kl-signup-email-err", t("auth.validation.emailInvalid", "Enter a valid email."));
        show("kl-signup-email-err");
        hasErr = true;
      }
      if (!pass) {
        setText(
          "kl-signup-password-err",
          t("auth.validation.passwordRequired", "Password is required.")
        );
        show("kl-signup-password-err");
        hasErr = true;
      } else if (String(pass).length < 8) {
        setText("kl-signup-password-err", t("auth.validation.passwordMin", "Min 8 characters."));
        show("kl-signup-password-err");
        hasErr = true;
      }
      if (!confirm || confirm !== pass) {
        setText(
          "kl-signup-confirm-err",
          t("auth.validation.confirmMismatch", "Passwords do not match.")
        );
        show("kl-signup-confirm-err");
        hasErr = true;
      }
      if (!agree) {
        setText("kl-signup-terms-err", t("auth.validation.termsRequired", "You must agree."));
        show("kl-signup-terms-err");
        hasErr = true;
      }
      if (hasErr) return;

      try {
        if (window.KL_AUTH_MOCK && window.KL_AUTH_MOCK.setRole) window.KL_AUTH_MOCK.setRole("user");
      } catch (e2) {}
      setText(
        "kl-signup-notice",
        t("auth.signup.placeholderNotice", "Account creation is not connected.")
      );
      show("kl-signup-notice");
    });
  }

  function bindForgotForm() {
    var form = document.getElementById("kl-forgot-form");
    if (!form || form.__klBound) return;
    form.__klBound = true;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = String((document.getElementById("kl-forgot-email") || {}).value || "").trim();
      if (!email || !isValidEmail(email)) {
        setText("kl-forgot-email-err", t("auth.validation.emailInvalid", "Enter a valid email."));
        show("kl-forgot-email-err");
        return;
      }
      hide("kl-forgot-email-err");
      setText(
        "kl-forgot-notice",
        t("auth.forgot.placeholderNotice", "Password reset is not connected.")
      );
      show("kl-forgot-notice");
    });
  }

  function bindResetForm() {
    var form = document.getElementById("kl-reset-form");
    if (!form || form.__klBound) return;
    form.__klBound = true;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var pass = String((document.getElementById("kl-reset-password") || {}).value || "");
      var confirm = String((document.getElementById("kl-reset-confirm") || {}).value || "");
      var hasErr = false;
      hide("kl-reset-password-err");
      hide("kl-reset-confirm-err");
      if (!pass || pass.length < 8) {
        setText("kl-reset-password-err", t("auth.validation.passwordMin", "Min 8 characters."));
        show("kl-reset-password-err");
        hasErr = true;
      }
      if (!confirm || confirm !== pass) {
        setText(
          "kl-reset-confirm-err",
          t("auth.validation.confirmMismatch", "Passwords do not match.")
        );
        show("kl-reset-confirm-err");
        hasErr = true;
      }
      if (hasErr) return;
      setText(
        "kl-reset-notice",
        t("auth.reset.placeholderNotice", "Password reset is not connected.")
      );
      show("kl-reset-notice");
    });
  }

  function bindVerifyButtons() {
    var resend = document.getElementById("kl-verify-resend");
    if (resend && !resend.__klBound) {
      resend.__klBound = true;
      resend.addEventListener("click", function () {
        setText("kl-verify-notice", t("auth.verify.placeholderNotice", "Not connected yet."));
        show("kl-verify-notice");
      });
    }
    var change = document.getElementById("kl-verify-change");
    if (change && !change.__klBound) {
      change.__klBound = true;
      change.addEventListener("click", function () {
        setText("kl-verify-notice", t("auth.verify.placeholderNotice", "Not connected yet."));
        show("kl-verify-notice");
      });
    }
  }

  function bindAccountRoleButtons() {
    var ids = ["kl-role-guest", "kl-role-user", "kl-role-premium", "kl-role-admin"];
    ids.forEach(function (id) {
      var btn = document.getElementById(id);
      if (!btn || btn.__klBound) return;
      btn.__klBound = true;
      btn.addEventListener("click", function () {
        var role = btn.getAttribute("data-role") || "guest";
        try {
          if (window.KL_AUTH_MOCK && window.KL_AUTH_MOCK.setRole) window.KL_AUTH_MOCK.setRole(role);
        } catch (e) {}
        setText("kl-role-notice", "Role set to: " + role);
        show("kl-role-notice");
      });
    });
  }

  function bindProfileForm() {
    var form = document.getElementById("kl-profile-form");
    if (!form || form.__klBound) return;
    form.__klBound = true;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      setText("kl-profile-notice", t("account.profile.placeholderNotice", "Not connected yet."));
      show("kl-profile-notice");
    });
  }

  function bindPrivacyToggles() {
    var ids = ["kl-privacy-analytics", "kl-privacy-marketing", "kl-privacy-personal"];
    var any = ids.some(function (id) {
      return !!document.getElementById(id);
    });
    if (!any) return;
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el || el.__klBound) return;
      el.__klBound = true;
      el.addEventListener("change", function () {
        setText(
          "kl-privacy-notice",
          t("account.privacy.savedLocal", "Saved locally (placeholder).")
        );
        show("kl-privacy-notice");
      });
    });
  }

  function bindDataControls() {
    var del = document.getElementById("kl-delete-local");
    if (del && !del.__klBound) {
      del.__klBound = true;
      del.addEventListener("click", function () {
        var msg = t("confirm.resetProgress", "Are you sure you want to reset your progress?");
        var ok = typeof window.confirm === "function" ? window.confirm(msg) : false;
        if (!ok) return;
        try {
          if (window.KL_STORAGE && typeof window.KL_STORAGE.resetAnswers === "function") {
            window.KL_STORAGE.resetAnswers();
          }
        } catch (e) {}
        setText(
          "kl-data-controls-notice",
          t("account.dataControls.deleted", "Local progress deleted.")
        );
        show("kl-data-controls-notice");
      });
    }
    var exp = document.getElementById("kl-export-data");
    if (exp && !exp.__klBound) {
      exp.__klBound = true;
      exp.addEventListener("click", function () {
        setText(
          "kl-data-controls-notice",
          t("account.dataControls.exportPlaceholder", "Export is not connected yet.")
        );
        show("kl-data-controls-notice");
      });
    }
  }

  function bindSupportForm() {
    var form = document.getElementById("kl-support-form");
    if (!form || form.__klBound) return;
    form.__klBound = true;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      setText(
        "kl-support-notice",
        t("support.placeholderNotice", "Support form is not connected yet.")
      );
      show("kl-support-notice");
    });
  }

  function bindPricingUpgrade() {
    // Optional: Simulate upgrade by setting role premium if user clicks the CTA.
    var link = document.querySelector('a[href="#upgrade-success"]');
    if (!link || link.__klBound) return;
    link.__klBound = true;
    link.addEventListener("click", function () {
      try {
        if (window.KL_AUTH_MOCK && window.KL_AUTH_MOCK.setRole)
          window.KL_AUTH_MOCK.setRole("premium");
      } catch (e) {}
    });
  }

  function applyPracticeFocus() {
    var focus = null;
    try {
      focus = sessionStorage.getItem("kl-practice-focus");
      sessionStorage.removeItem("kl-practice-focus");
    } catch (e) {}
    if (focus !== "exam") return;
    var card = document.getElementById("kl-exam-card");
    if (!card) return;
    try {
      card.classList.add("is-focus");
      var btn = card.querySelector("button, a");
      if (btn && typeof btn.focus === "function") btn.focus();
      if (typeof card.scrollIntoView === "function") card.scrollIntoView({ block: "start" });
    } catch (e2) {}
  }

  function refreshMockExamUi() {
    var examBtn = document.querySelector('[data-action="start-mock"][data-mode="exam"]');
    var hint = document.getElementById("kl-mock-exam-hint");
    var practiceMockBtn = document.querySelector(
      '[data-action="start-practice"][data-mode="practice-mock"]'
    );
    var practiceMockHint = document.getElementById("kl-practice-mock-hint");
    var practiceExamBtn = document.querySelector(
      '[data-action="start-practice"][data-mode="exam"]'
    );
    var practiceExamHint = document.getElementById("kl-practice-exam-hint");
    ensureDWInit().then(function () {
      var ok = false;
      if (window.DW && typeof window.DW.uniqueQuestionCountForState === "function") {
        ok = window.DW.uniqueQuestionCountForState("WA") >= 30;
      }
      if (examBtn) {
        examBtn.disabled = !ok;
        examBtn.setAttribute("aria-disabled", ok ? "false" : "true");
      }
      if (hint) {
        if (ok) {
          hint.setAttribute("hidden", "");
          hint.style.display = "none";
        } else {
          hint.removeAttribute("hidden");
          hint.style.display = "";
        }
      }

      if (practiceMockBtn) {
        practiceMockBtn.disabled = !ok;
        practiceMockBtn.setAttribute("aria-disabled", ok ? "false" : "true");
      }
      if (practiceMockHint) {
        if (ok) {
          practiceMockHint.setAttribute("hidden", "");
          practiceMockHint.style.display = "none";
        } else {
          practiceMockHint.removeAttribute("hidden");
          practiceMockHint.style.display = "";
        }
      }

      if (practiceExamBtn) {
        practiceExamBtn.disabled = !ok;
        practiceExamBtn.setAttribute("aria-disabled", ok ? "false" : "true");
      }
      if (practiceExamHint) {
        if (ok) {
          practiceExamHint.setAttribute("hidden", "");
          practiceExamHint.style.display = "none";
        } else {
          practiceExamHint.removeAttribute("hidden");
          practiceExamHint.style.display = "";
        }
      }
    });
  }

  function bindStateCards() {
    document
      .querySelectorAll('#page-root .state-card[data-state][data-available="true"]')
      .forEach(function (card) {
        card.addEventListener("click", function () {
          var code = card.dataset.state;
          if (window.KangaStorage) window.KangaStorage.setState(code);
          if (window.DW && typeof window.DW.setState === "function") window.DW.setState(code);
          document.querySelectorAll("#page-root .state-card").forEach(function (c) {
            var on = c.dataset.state === code;
            c.classList.toggle("active", on);
            if (c.matches("button")) c.setAttribute("aria-pressed", on ? "true" : "false");
          });
        });
      });
  }

  // State cards rendered inside the Learn page (Road Rules section)
  function bindLearnStateCards() {
    document
      .querySelectorAll('#page-root #road-rules .state-card[data-state][data-available="true"]')
      .forEach(function (card) {
        card.addEventListener("click", function () {
          var code = card.dataset.state;
          if (window.KangaStorage) window.KangaStorage.setState(code);
          if (window.DW && typeof window.DW.setState === "function") window.DW.setState(code);
          location.hash = "practice-run";
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
        location.hash = "practice-run";
      });
    });
  }

  function bindPracticeLanding() {
    document.querySelectorAll('[data-action="start-practice"][data-mode]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        try {
          var mode = btn.getAttribute("data-mode") || "topic";
          sessionStorage.setItem("kl-practice-mode", mode);
          if (mode === "practice-mock") {
            sessionStorage.setItem("kl-sim-strict-exam", "0");
            sessionStorage.removeItem("kl-exam-real-timer");
          } else if (mode === "exam") {
            sessionStorage.setItem("kl-sim-strict-exam", "1");
            sessionStorage.removeItem("kl-exam-real-timer");
          } else {
            sessionStorage.setItem("kl-sim-strict-exam", "0");
            sessionStorage.removeItem("kl-exam-real-timer");
          }
        } catch (e) {}
        location.hash = "practice-run";
      });
    });
  }

  function bindMockSetup() {
    document.querySelectorAll('[data-action="start-mock"]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        try {
          var mode = btn.getAttribute("data-mode") || "exam";
          sessionStorage.setItem("kl-practice-mode", mode);
          sessionStorage.setItem("kl-sim-strict-exam", mode === "exam" ? "1" : "0");
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
    var timerCb = document.getElementById("kl-exam-real-timer");
    if (timerCb && !timerCb.__klBound) {
      timerCb.__klBound = true;
      timerCb.addEventListener("change", function () {
        refreshMockExamUi();
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
