const KL_LEARN = {
  openSlug: null,

  lang() {
    if (window.KL_I18N && typeof window.KL_I18N.getDisplayLang === "function") {
      return window.KL_I18N.getDisplayLang(window.KL_I18N.getLang());
    }
    if (window.DW && typeof window.DW.getDisplayLang === "function") {
      return window.DW.getDisplayLang();
    }
    const current = window.DW?.lang || "en";
    if (String(current).includes("pt")) return "pt";
    if (String(current).includes("es")) return "es";
    return "en";
  },

  translationLang() {
    if (window.KL_I18N && typeof window.KL_I18N.getTranslationLang === "function") {
      return window.KL_I18N.getTranslationLang(window.KL_I18N.getLang());
    }
    return window.DW && typeof window.DW.getTranslationLang === "function"
      ? window.DW.getTranslationLang()
      : null;
  },

  blang(obj) {
    if (!obj || typeof obj !== "object") return "";
    const d = this.lang();
    const t = this.translationLang();
    const main = obj[d] || obj.en || "";
    const tr = t ? obj[t] || "" : "";
    if (t && tr && tr !== main) {
      return `${main}<span class="translation-line" lang="en">${tr}</span>`;
    }
    return main;
  },

  normalizeIconType(type) {
    if (!type || typeof type !== "string") return "sign";
    const aliases = { signs: "sign", markings: "lane" };
    return aliases[type] || type;
  },

  icon(rawType) {
    const type = this.normalizeIconType(rawType);
    const icons = {
      speed: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 31a16 16 0 1 1 32 0"/><path d="M24 31l9-14"/><path d="M12 31h24"/></svg>`,
      giveway: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6l18 32H6L24 6Z"/><path d="M24 17v10"/><path d="M24 34h.01"/></svg>`,
      sign: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="30" height="30" rx="5"/><path d="M24 16v16"/><path d="M16 24h16"/></svg>`,
      lights: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="4" width="16" height="40" rx="8"/><circle cx="24" cy="14" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="24" cy="34" r="3"/></svg>`,
      lane: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 42l5-36"/><path d="M34 42L29 6"/><path d="M24 8v7M24 22v7M24 36v6"/></svg>`,
      parking: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="6" width="28" height="36" rx="4"/><path d="M19 33V15h8a6 6 0 0 1 0 12h-8"/></svg>`,
      alcohol: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5h10l-2 12v6l6 16H15l6-16v-6L19 5Z"/><path d="M18 32h12"/></svg>`,
      emergency: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M24 5l18 34H6L24 5Z"/><path d="M24 17v10"/><path d="M24 34h.01"/></svg>`,
      safety: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6 38 11v11c0 10-6 17-14 20-8-3-14-10-14-20V11L24 6Z"/><path d="M18 24l4 4 8-10"/></svg>`,
      roundabouts: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="11"/><path d="M24 9v5M35 15l-4 4M39 24h-5M35 33l-4-4M24 39v-5M13 33l4-4M9 24h5M13 15l4 4"/></svg>`,
      "lane-changing": `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 8v32"/><path d="M34 8v32"/><path d="M10 24h10"/><path d="M28 24h10"/><path d="M17 16l-5 8 5 8"/><path d="M31 32l5-8-5-8"/></svg>`,
      overtaking: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 26h22"/><path d="M26 18l12 8-12 8"/><path d="M18 14l9 5-9 5"/><path d="M18 34l9-5-9-5"/></svg>`,
      seatbelts: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="12" width="20" height="24" rx="3"/><path d="M18 16 30 32"/></svg>`,
      "weather-conditions": `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10 30a9 9 0 0 1 8-14 11 11 0 0 1 21 5 9 9 0 0 1-7 17H12"/><path d="M17 36v6M24 36v6M31 36v6"/></svg>`,
      "demerit-points": `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M24 8v5"/><path d="M14 15h20"/><path d="M12 17h24v7H12z"/><path d="M17 24v15"/><path d="M31 24v15"/><circle cx="19" cy="42" r="3.5"/><circle cx="29" cy="42" r="3.5"/></svg>`
    };

    return icons[type] || icons.sign;
  },

  t(topic, key) {
    const lang = this.lang();
    return topic[key]?.[lang] || topic[key]?.en || "";
  },

  label(key) {
    const lang = this.lang();
    const labels = {
      summary: {
        pt: "O essencial em 30 segundos",
        en: "The essentials in 30 seconds",
        es: "Lo esencial en 30 segundos"
      },
      keyRules: { pt: "Regras principais", en: "Key rules", es: "Reglas principales" },
      mistakes: { pt: "Erros comuns", en: "Common mistakes", es: "Errores comunes" },
      example: { pt: "Exemplo prático", en: "Practical example", es: "Ejemplo práctico" },
      quickCheck: { pt: "Teste rápido", en: "Quick check", es: "Revisión rápida" },
      practice: { pt: "Praticar este tema", en: "Practice this topic", es: "Practicar este tema" },
      source: { pt: "Fonte", en: "Source", es: "Fuente" }
    };

    return labels[key]?.[lang] || labels[key]?.en || key;
  },

  /** CTA específico: "Practice Speed Limits" / "Praticar Limites de velocidade" */
  practiceTopicLabel(topic) {
    const lang = this.lang();
    const verb = { pt: "Praticar", en: "Practice", es: "Practicar" }[lang] || "Practice";
    const title = this.t(topic, "title");
    return `${verb} ${title}`;
  },

  renderBody(topic) {
    const list = (items, tag) =>
      (items || []).map((item) => `<${tag}>${this.blang(item)}</${tag}>`).join("");

    const keyRules = list(topic.keyRules || [], "li");
    const mistakes = list(topic.mistakes || [], "li");
    const quick = list(topic.quickCheck || [], "li");

    return `
      <div class="learn-guide">
        <div class="learn-block learn-highlight">
          <div class="learn-label">${this.label("summary")}</div>
          <p>${this.blang(topic.summary || {})}</p>
        </div>

        <div class="learn-grid-2">
          <div class="learn-block">
            <div class="learn-label">${this.label("keyRules")}</div>
            <ul>${keyRules}</ul>
          </div>

          <div class="learn-block">
            <div class="learn-label">${this.label("mistakes")}</div>
            <ul>${mistakes}</ul>
          </div>
        </div>

        <div class="learn-block">
          <div class="learn-label">${this.label("example")}</div>
          <p>${this.blang(topic.example || {})}</p>
        </div>

        <div class="learn-block">
          <div class="learn-label">${this.label("quickCheck")}</div>
          <ol>${quick}</ol>
        </div>

        <div class="learn-footer">
          <button class="btn btn-primary btn-sm learn-practice-topic-btn" type="button" data-action="learn-practice" data-category="${topic.category}">
            ${this.practiceTopicLabel(topic)}
          </button>
          <small><span class="learn-source">${this.label("source")}:</span> ${this.blang(topic.source || {})}</small>
        </div>
      </div>
    `;
  },

  render() {
    const root = document.getElementById("learn-root");
    if (!root || !Array.isArray(window.LEARN_TOPICS)) return;

    root.innerHTML = window.LEARN_TOPICS.map((topic) => {
      const isOpen = this.openSlug === topic.slug;
      const body = isOpen ? this.renderBody(topic) : "";
      return `
          <article class="learn-card ${isOpen ? "open" : ""}" id="learn-${topic.slug}">
            <button class="learn-card-head" type="button" aria-expanded="${isOpen}" aria-controls="learn-body-${topic.slug}" data-action="learn-toggle" data-slug="${topic.slug}">
              <span class="learn-icon" aria-hidden="true">${this.icon(topic.icon)}</span>
              <span class="learn-head-copy">
                <span class="learn-topic-title">${this.t(topic, "title")}</span>
                <span class="learn-topic-summary">${this.t(topic, "summary")}</span>
              </span>
              <span class="learn-toggle" aria-hidden="true">${isOpen ? "−" : "+"}</span>
            </button>
            <div class="learn-body" id="learn-body-${topic.slug}">${body}</div>
          </article>
        `;
    }).join("");
  },

  toggle(slug) {
    this.openSlug = this.openSlug === slug ? null : slug;
    this.render();

    const card = document.getElementById(`learn-${slug}`);
    card?.querySelector?.(".learn-card-head")?.focus?.();

    if (this.openSlug) {
      window.setTimeout(() => {
        card?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  },

  practice(category) {
    if (window.DW && typeof window.DW.setCat === "function") {
      if (window.DW.mode !== "all") window.DW.setMode?.("all");
      window.DW.setCat(category);
    }

    document.getElementById("questoes")?.scrollIntoView({ behavior: "smooth", block: "start" });
  },

  refreshLanguage() {
    this.render();
  },

  bindEvents() {
    const root = document.getElementById("learn-root");
    if (!root) return;

    root.addEventListener("click", (e) => {
      const toggleBtn = e.target.closest?.('[data-action="learn-toggle"]');
      if (toggleBtn) {
        this.toggle(toggleBtn.getAttribute("data-slug"));
        return;
      }

      const practiceBtn = e.target.closest?.('[data-action="learn-practice"]');
      if (practiceBtn) {
        this.practice(practiceBtn.getAttribute("data-category"));
      }
    });
  },

  init() {
    this.render();
    this.bindEvents();
  }
};

window.KL_LEARN = KL_LEARN;
