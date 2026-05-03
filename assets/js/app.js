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
    const KS = window.KangaStorage;
    const cards = document.querySelectorAll(".state-card");
    const select = document.getElementById("state-select");
    let saved = "WA";
    try {
      saved = (KS && KS.getState()) || localStorage.getItem("kl-state") || "WA";
    } catch (e) {
      saved = "WA";
    }

    function applyUI(code) {
      cards.forEach((c) => {
        const on = c.dataset.state === code;
        c.classList.toggle("active", on);
        c.setAttribute("aria-pressed", on ? "true" : "false");
      });
      if (select) select.value = code;
    }

    function setState(code) {
      if (!code) return;
      if (KS) KS.setState(code);
      else localStorage.setItem("kl-state", code);
      applyUI(code);
      if (window.DW && typeof window.DW.setState === "function") {
        window.DW.setState(code);
      }
    }

    cards.forEach((card) => {
      card.addEventListener("click", () => setState(card.dataset.state));
    });

    if (select) {
      select.addEventListener("change", () => setState(select.value));
    }

    setState(saved);
  }

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
        (window.KangaStorage && window.KangaStorage.getLang && window.KangaStorage.getLang()) ||
        localStorage.getItem("kl-lang") ||
        "en";
    } catch (e) {
      initialLang = "en";
    }
    if (!initialLang) initialLang = "en";

    hydrateStaticI18n(initialLang);

    try {
      if (window.DW && typeof window.DW.init === "function") {
        window.DW.init();
      }
    } catch (e) {
      console.error("KangaLearner: DW.init failed", e);
    }

    hydrateStaticI18n(window.DW?.lang || initialLang);

    if (window.KL_LEARN && typeof window.KL_LEARN.init === "function") {
      window.KL_LEARN.init();
    }

    initStateSelector();

    document.querySelectorAll('[data-action="mode-sim"]').forEach((el) => {
      el.addEventListener("click", () => setTimeout(() => window.DW?.setMode?.("sim"), 30));
    });

    document.querySelectorAll(".topic-card[data-cat]").forEach((card) => {
      card.addEventListener("click", () =>
        setTimeout(() => window.DW?.setCat?.(card.dataset.cat), 30)
      );
    });

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
  });
})();
