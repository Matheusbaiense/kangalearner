// App bootstrap and non-quiz interactions
(function () {
  function hydrateStaticI18n(lang) {
    if (typeof window.hydrateKangaStaticI18n === "function") {
      window.hydrateKangaStaticI18n(lang);
    }
  }

  function patchDWLangHydrate() {
    var DW = window.DW;
    if (!DW || typeof DW.setLang !== "function" || DW.__kangaStaticI18nPatched) return;
    DW.__kangaStaticI18nPatched = true;
    var orig = DW.setLang.bind(DW);
    DW.setLang = function (lang, el) {
      orig(lang, el);
      hydrateStaticI18n(lang);
    };
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

    patchDWLangHydrate();

    let initialLang = "en";
    try {
      initialLang =
        (window.KL_STORAGE && window.KL_STORAGE.getLang && window.KL_STORAGE.getLang()) ||
        (window.KangaStorage && window.KangaStorage.getLang && window.KangaStorage.getLang()) ||
        localStorage.getItem("kl-lang") ||
        "en";
    } catch (e) {
      initialLang = "en";
    }
    if (!initialLang) initialLang = "en";

    document.documentElement.lang = documentLangFromKangaLang(initialLang);

    hydrateStaticI18n(initialLang);

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
      btn.addEventListener("click", () => window.DW?.setLang?.(btn.dataset.lang, btn));
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
