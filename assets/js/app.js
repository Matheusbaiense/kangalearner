// App bootstrap and non-quiz interactions
(function () {
  function localePick(localeRoot, key) {
    if (!localeRoot || !key) return null;
    return key.split(".").reduce(function (obj, k) {
      return obj && obj[k] !== undefined ? obj[k] : null;
    }, localeRoot);
  }

  function packLang(lang) {
    if (lang === "pten") return "pt";
    if (lang === "esen") return "es";
    return lang;
  }

  function hydrateStaticI18n(lang) {
    var L = window.__KANGA_LOCALES__;
    if (!L || !L.pt || !L.en || !L.es) return;

    document.querySelectorAll("[data-i18n]").forEach(function (host) {
      var key = host.getAttribute("data-i18n");
      var vPt = localePick(L.pt, key);
      var vEn = localePick(L.en, key);
      var vEs = localePick(L.es, key);
      var sPt = host.querySelector(".l-pt");
      var sEn = host.querySelector(".l-en");
      var sEs = host.querySelector(".l-es");
      if (sPt) sPt.textContent = typeof vPt === "string" ? vPt : "";
      if (sEn) sEn.textContent = typeof vEn === "string" ? vEn : "";
      if (sEs) sEs.textContent = typeof vEs === "string" ? vEs : "";
    });

    var pk = L[packLang(lang)] || L.en;

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      var val = localePick(pk, key);
      if (typeof val === "string") el.setAttribute("placeholder", val);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      var val = localePick(pk, key);
      if (typeof val === "string") el.setAttribute("aria-label", val);
    });

    document.querySelectorAll(".ld-option[data-lang]").forEach(function (btn) {
      var code = btn.getAttribute("data-lang");
      var LO = pk.ldOptions && pk.ldOptions[code];
      if (!LO) return;
      var nm = btn.querySelector(".ld-oname");
      var sb = btn.querySelector(".ld-osub");
      if (nm) nm.textContent = LO.name || "";
      if (sb) sb.textContent = LO.sub || "";
    });
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
    const saved = (KS && KS.getState()) || localStorage.getItem("kl-state") || "WA";

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
    window.KangaStorage?.migrateFromLegacy?.();

    patchDWLangHydrate();

    const initialLang =
      (window.KangaStorage && window.KangaStorage.getLang && window.KangaStorage.getLang()) ||
      (function () {
        try {
          return localStorage.getItem("kl-lang");
        } catch (e) {
          return null;
        }
      })() ||
      "en";

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
    initSubscribe();
  });
})();
