const KL_LEARN = {
  openSlug: null,

  lang() {
    const current = window.DW?.lang || "en";
    if (String(current).includes("pt")) return "pt";
    if (String(current).includes("es")) return "es";
    return "en";
  },

  icon(type) {
    const icons = {
      speed: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3"><path d="M8 31a16 16 0 1 1 32 0"/><path d="M24 31l9-14"/><path d="M12 31h24"/></svg>`,
      giveway: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3"><path d="M24 6l18 32H6L24 6Z"/><path d="M24 17v10"/><path d="M24 34h.01"/></svg>`,
      sign: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3"><rect x="9" y="9" width="30" height="30" rx="5"/><path d="M24 16v16"/><path d="M16 24h16"/></svg>`,
      lights: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3"><rect x="16" y="4" width="16" height="40" rx="8"/><circle cx="24" cy="14" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="24" cy="34" r="3"/></svg>`,
      lane: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3"><path d="M14 42l5-36"/><path d="M34 42L29 6"/><path d="M24 8v7M24 22v7M24 36v6"/></svg>`,
      parking: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3"><rect x="10" y="6" width="28" height="36" rx="4"/><path d="M19 33V15h8a6 6 0 0 1 0 12h-8"/></svg>`,
      alcohol: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3"><path d="M19 5h10l-2 12v6l6 16H15l6-16v-6L19 5Z"/><path d="M18 32h12"/></svg>`,
      emergency: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3"><path d="M24 5l18 34H6L24 5Z"/><path d="M24 17v10"/><path d="M24 34h.01"/></svg>`,
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
      summary: { pt: "O essencial em 30 segundos", en: "The essentials in 30 seconds", es: "Lo esencial en 30 segundos" },
      keyRules: { pt: "Regras principais", en: "Key rules", es: "Reglas principales" },
      mistakes: { pt: "Erros comuns", en: "Common mistakes", es: "Errores comunes" },
      example: { pt: "Exemplo prático", en: "Practical example", es: "Ejemplo práctico" },
      quickCheck: { pt: "Teste rápido", en: "Quick check", es: "Revisión rápida" },
      practice: { pt: "Praticar este tema", en: "Practice this topic", es: "Practicar este tema" },
      source: { pt: "Fonte", en: "Source", es: "Fuente" },
    };

    return labels[key]?.[lang] || labels[key]?.en || key;
  },

  renderBody(topic) {
    const lang = this.lang();
    const list = (items, tag) =>
      items
        .map((item) => `<${tag}>${item[lang] || item.en}</${tag}>`)
        .join("");

    const keyRules = list(topic.keyRules || [], "li");
    const mistakes = list(topic.mistakes || [], "li");
    const quick = list(topic.quickCheck || [], "li");

    return `
      <div class="learn-guide">
        <div class="learn-block learn-highlight">
          <div class="learn-label">${this.label("summary")}</div>
          <p>${topic.summary?.[lang] || topic.summary?.en || ""}</p>
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
          <p>${topic.example?.[lang] || topic.example?.en || ""}</p>
        </div>

        <div class="learn-block">
          <div class="learn-label">${this.label("quickCheck")}</div>
          <ol>${quick}</ol>
        </div>

        <div class="learn-footer">
          <button class="btn btn-primary btn-sm" type="button" data-action="learn-practice" data-category="${topic.category}">
            ${this.label("practice")}
          </button>
          <small><span class="learn-source">${this.label("source")}:</span> ${topic.source?.[lang] || topic.source?.en || ""}</small>
        </div>
      </div>
    `;
  },

  render() {
    const root = document.getElementById("learn-root");
    if (!root || !Array.isArray(window.LEARN_TOPICS)) return;

    root.innerHTML = window.LEARN_TOPICS
      .map((topic) => {
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
      })
      .join("");
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
  },
};

window.KL_LEARN = KL_LEARN;

window.addEventListener("DOMContentLoaded", () => {
  KL_LEARN.init();
});

