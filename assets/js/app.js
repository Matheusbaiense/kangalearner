// App bootstrap and non-quiz interactions
(function () {
  function hydrateStaticI18n(lang) {
    if (typeof window.hydrateKangaStaticI18n === "function") {
      window.hydrateKangaStaticI18n(lang);
    }
  }

  function patchDWLangHydrate() {
    var DW = window.DW;
    if (!DW || typeof DW.setLang !== "function") return false;
    if (DW.__kangaStaticI18nPatched) return true;
    DW.__kangaStaticI18nPatched = true;
    var orig = DW.setLang.bind(DW);
    DW.setLang = function (lang, el) {
      orig(lang, el);
      hydrateStaticI18n(lang);
    };
    return true;
  }

  function initStateSelector() {
    const KS = window.KL_STORAGE || window.KangaStorage;
    const cards = document.querySelectorAll(".state-card");
    const select = document.getElementById("state-select");
    let saved = "WA";
    try {
      saved = (KS && KS.getState && KS.getState()) || localStorage.getItem("kl-state") || "WA";
    } catch (e) {
      saved = "WA";
    }
    if (saved === "AU") {
      saved = "WA";
      try {
        if (KS && KS.setState) KS.setState("WA");
        else localStorage.setItem("kl-state", "WA");
      } catch (e) {}
    }

    function applyUI(code) {
      cards.forEach((c) => {
        const on = c.dataset.state === code;
        c.classList.toggle("active", on);
        if (c.tagName === "BUTTON") {
          c.setAttribute("aria-pressed", on ? "true" : "false");
        }
      });
      if (select) select.value = code;
    }

    function setState(code) {
      if (!code) return;
      if (KS && KS.setState) KS.setState(code);
      else localStorage.setItem("kl-state", code);
      applyUI(code);
      if (window.DW && typeof window.DW.setState === "function") {
        window.DW.setState(code);
      }
    }

    cards.forEach((card) => {
      if (card.getAttribute("data-available") === "false") return;
      card.addEventListener("click", () => setState(card.dataset.state));
    });

    if (select) {
      select.addEventListener("change", () => setState(select.value));
    }

    setState(saved);
  }

  // Expose for SPA router hydration (state cards are injected dynamically).
  window.KL_initStateSelector = initStateSelector;

  function initReadingProgress() {
    const bar = document.getElementById("reading-progress");
    if (!bar) return;
    window.addEventListener(
      "scroll",
      () => {
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        bar.style.width = Math.min(pct, 100) + "%";
        bar.setAttribute("aria-valuenow", String(Math.min(Math.round(pct), 100)));
      },
      { passive: true }
    );
  }

  /** Subtle header background when scrolling down; restore when scrolling up. */
  function initHeaderScrollBehavior() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;
    function onScrollFrame() {
      const y = window.scrollY;
      const goingDown = y > lastY;
      if (y < 12) {
        header.classList.remove("is-scrolled-down");
      } else if (goingDown && y > 32) {
        header.classList.add("is-scrolled-down");
      } else if (!goingDown) {
        header.classList.remove("is-scrolled-down");
      }
      lastY = y;
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(onScrollFrame);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  function initSubscribe() {
    const subscribeForm = document.getElementById("subscribe-form");
    const subscribeEmail = document.getElementById("subscribe-email");
    const subscribeFeedback = document.getElementById("subscribe-feedback");
    if (!subscribeForm || !subscribeEmail || !subscribeFeedback) return;
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!subscribeEmail.validity.valid) {
        subscribeFeedback.textContent =
          window.DW?.t?.("subscribe_err") || "Please enter a valid email.";
        return;
      }
      subscribeFeedback.textContent =
        window.DW?.t?.("subscribe_not_live") ||
        "Newsletter signup isn’t available yet — thanks for your interest!";
      subscribeForm.reset();
    });
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("contact-feedback");
    if (!form || !feedback) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      feedback.textContent =
        window.DW?.t?.("contact_not_live") ||
        "Contact form isn’t available yet — please try again later.";
      form.reset();
    });
  }

  function documentLangFromKangaLang(lang) {
    if (window.KL_I18N && typeof window.KL_I18N.setDocumentLang === "function") {
      try {
        window.KL_I18N.setDocumentLang(lang);
        return document.documentElement.lang || "en";
      } catch (e) {
        return "en";
      }
    }
    if (lang === "pten") return "pt-BR";
    if (lang === "esen") return "es";
    if (String(lang).startsWith("pt")) return "pt-BR";
    if (String(lang).startsWith("es")) return "es";
    return "en";
  }

  document.addEventListener("DOMContentLoaded", () => {
    try {
      window.KangaStorage?.migrateFromLegacy?.();
    } catch (e) {
      console.warn("KangaLearner: migrateFromLegacy failed", e);
    }

    // Ensure language changes re-hydrate static i18n (Practice/Resources/Progress pages).
    // DW can be initialized slightly later depending on script timing, so retry briefly.
    (function ensurePatched() {
      var attempts = 0;
      var timer = setInterval(function () {
        attempts++;
        var ok = false;
        try {
          ok = patchDWLangHydrate();
        } catch (e) {
          ok = false;
        }
        if (ok || attempts >= 40) clearInterval(timer); // ~2s
      }, 50);
    })();

    function getActiveLang() {
      try {
        const active = document.querySelector(".ld-option.active[data-lang]");
        const ui = active ? active.getAttribute("data-lang") : null;
        if (ui) return ui;
      } catch (e) {}
      try {
        return (
          (window.KL_STORAGE && window.KL_STORAGE.getLang && window.KL_STORAGE.getLang()) ||
          (window.KangaStorage && window.KangaStorage.getLang && window.KangaStorage.getLang()) ||
          localStorage.getItem("kl-lang") ||
          "en"
        );
      } catch (e) {
        return "en";
      }
    }

    let initialLang = getActiveLang();
    if (!initialLang) initialLang = "en";

    document.documentElement.lang = documentLangFromKangaLang(initialLang);

    hydrateStaticI18n(initialLang);

    // ── Auth header controls (KL_AUTH_PROVIDER when configured, else KL_AUTH_MOCK) ──
    (function initMockAuthHeaderControls() {
      var host = document.getElementById("kl-auth-header-controls");
      if (!host) return;

      function authSurface() {
        return window.KL_AUTH_PROVIDER || window.KL_AUTH_MOCK;
      }

      function currentRole() {
        try {
          var A = authSurface();
          return A && A.getRole ? A.getRole() : "guest";
        } catch (e) {
          return "guest";
        }
      }

      function roleName() {
        try {
          var A = authSurface();
          return A && A.getDisplayName ? A.getDisplayName() : "Guest";
        } catch (e) {
          return "Guest";
        }
      }

      function render() {
        var role = currentRole();
        var signedIn = role !== "guest";
        var isAdmin = role === "admin";

        host.innerHTML = "";

        if (!signedIn) {
          var a = document.createElement("a");
          a.className = "btn btn-secondary btn-compact";
          a.href = "#login";
          a.setAttribute("data-i18n", "auth.header.signIn");
          a.innerHTML =
            '<span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span>';
          host.appendChild(a);
          return;
        }

        var chip = document.createElement("a");
        chip.className = "auth-chip";
        chip.href = "#account";
        chip.setAttribute("aria-label", "Account");
        chip.innerHTML =
          '<span class="auth-chip-dot" aria-hidden="true"></span><span class="auth-chip-text">' +
          roleName() +
          "</span>";
        host.appendChild(chip);

        if (isAdmin) {
          var admin = document.createElement("a");
          admin.className = "btn btn-secondary btn-compact";
          admin.href = "#admin";
          admin.setAttribute("data-i18n", "admin.header.link");
          admin.innerHTML =
            '<span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span>';
          host.appendChild(admin);
        }
      }

      render();
      hydrateStaticI18n(getActiveLang());

      window.addEventListener("kl:authRoleChanged", function () {
        render();
        hydrateStaticI18n(getActiveLang());
      });
    })();

    (function enableBackendSyncIfSession() {
      var hasSbSession = document.cookie.split(";").some(function (c) {
        return c.trim().indexOf("sb-") === 0;
      });
      if (!hasSbSession) return;
      var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
      var tid = ctrl
        ? setTimeout(function () {
            try {
              ctrl.abort();
            } catch (e) {}
          }, 2000)
        : null;
      fetch("/api/health", { signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) {
          if (r.ok) window.KANGA_ENABLE_BACKEND_SYNC = true;
        })
        .catch(function () {})
        .finally(function () {
          if (tid) clearTimeout(tid);
        });
    })();

    hydrateStaticI18n(window.DW?.lang || initialLang);

    // Bind header state <select> immediately; router will re-call after page renders.
    initStateSelector();

    const ldTrigger = document.getElementById("ld-trigger");
    if (ldTrigger) {
      ldTrigger.addEventListener("click", () => window.DW?.ldToggle?.());
    }
    document.querySelectorAll(".ld-option[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        if (!lang) return;

        // Update static UI even if DW hasn't initialized yet.
        try {
          const d =
            window.KL_I18N && typeof window.KL_I18N.getDisplayLang === "function"
              ? window.KL_I18N.getDisplayLang(lang)
              : String(lang).startsWith("pt")
                ? "pt"
                : String(lang).startsWith("es")
                  ? "es"
                  : "en";
          document.body.className = "mode-" + d;
        } catch (e) {}

        try {
          if (window.KL_I18N && typeof window.KL_I18N.setLang === "function") {
            window.KL_I18N.setLang(lang);
          }
        } catch (e) {}

        // Keep dropdown state in sync.
        try {
          document.querySelectorAll(".ld-option").forEach((o) => o.classList.remove("active"));
          btn.classList.add("active");
          document
            .querySelectorAll(".ld-option")
            .forEach((o) =>
              o.setAttribute("aria-selected", o.classList.contains("active") ? "true" : "false")
            );
        } catch (e) {}

        // If DW is available, let it re-render quiz surfaces too.
        window.DW?.setLang?.(lang, btn);
      });
    });

    initReadingProgress();
    initHeaderScrollBehavior();
    initSubscribe();
    initContactForm();

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").catch(function () {});
      });
    }
  });
})();
