// ═══════════════════════════════════════════════
//  KangaLearner — Quiz & mock test
// ═══════════════════════════════════════════════
//
// Backend sync (attempts / mock-sessions) is off by default on static hosting.
// When your API is mounted at /api on the same origin, set:
//   window.KANGA_ENABLE_BACKEND_SYNC = true
// before quiz-engine loads (e.g. inline script in index.html).

/** Unbiased partial shuffle — pick first `k` elements uniformly without sorting. */
function fisherYatesSlice(arr, k) {
  const a = arr.slice();
  const n = a.length;
  const take = Math.min(k, n);
  for (let i = 0; i < take; i++) {
    const j = i + Math.floor(Math.random() * (n - i));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.slice(0, take);
}

const DW = {
  lang: "en",
  mode: "all",
  cat: "all",
  state: "WA",
  correct: 0,
  total: 0,
  answered: {},
  answeredByState: {},
  simQueue: [],
  simMode: false,
  simAnswered: {},
  simRenderedCount: 1,
  simCompleted: false,
  simReviewMode: "all",
  visibleQuestionCount: 10,
  _questionById: null,

  rebuildQuestionMap() {
    this._questionById = new Map(QUESTIONS.map((q) => [String(q.id), q]));
  },

  questionById(qid) {
    const key = String(qid);
    return this._questionById?.get(key) ?? QUESTIONS.find((x) => String(x.id) === key);
  },

  syncLdTriggerAria() {
    const t = document.getElementById("ld-trigger");
    const p = document.getElementById("ld-panel");
    if (t && p) t.setAttribute("aria-expanded", p.classList.contains("open") ? "true" : "false");
  },

  syncLdTriggerLabel() {
    const el = document.getElementById("ld-name");
    if (el) el.textContent = ldTriggerLabel(this.lang);
  },

  t(key) {
    const d = this.getDisplayLang();
    return I18N[key]?.[d] || I18N[key]?.[this.lang] || I18N[key]?.en || key;
  },

  storageStateKey() {
    return this.state === "AU" ? "WA" : this.state;
  },

  filterLabelLang(lang) {
    if (lang === "pten" || lang === "esen") return "en";
    const l = String(lang).slice(0, 2);
    return ["pt", "en", "es"].includes(l) ? l : "en";
  },

  /** UI + nav: single language (no duplicate l-pt + l-en in header). */
  getDisplayLang() {
    if (this.lang === "pten") return "pt";
    if (this.lang === "esen") return "es";
    if (String(this.lang).startsWith("pt")) return "pt";
    if (String(this.lang).startsWith("es")) return "es";
    return "en";
  },

  /** Study aid: English line under PT/ES in questions & explanations. */
  getTranslationLang() {
    if (this.lang === "pten" || this.lang === "esen") return "en";
    return null;
  },

  /** Legacy alias for question copy primary language (= display). */
  questionLang() {
    return this.getDisplayLang();
  },

  hydrateAnsweredForCurrentState() {
    const key = this.storageStateKey();
    if (!this.answeredByState[key]) this.answeredByState[key] = {};
    this.answered = this.answeredByState[key];
  },

  save() {
    try {
      const json = JSON.stringify(this.answeredByState);
      if (window.KangaStorage) {
        window.KangaStorage.setLang(this.lang);
        window.KangaStorage.setAnsweredByStateJson(json);
      } else {
        localStorage.setItem("kl-lang", this.lang);
        localStorage.setItem("kl-answered-by-state", json);
      }
    } catch (e) {}
  },
  load() {
    try {
      const KS = window.KangaStorage;
      const l = KS ? KS.getLang() : localStorage.getItem("kl-lang");
      if (l) this.lang = l;
      const s = KS ? KS.getState() : localStorage.getItem("kl-state");
      if (s) this.state = s;
      let byState = {};
      const v2 = KS ? KS.getAnsweredByStateRaw() : localStorage.getItem("kl-answered-by-state");
      const v1 = localStorage.getItem("kl-answered");
      if (v2) {
        byState = JSON.parse(v2);
      } else if (v1) {
        const old = JSON.parse(v1);
        byState = { WA: old };
        const migrated = JSON.stringify(byState);
        if (KS) KS.setAnsweredByStateJson(migrated);
        else localStorage.setItem("kl-answered-by-state", migrated);
      }
      this.answeredByState = byState && typeof byState === "object" ? byState : {};
      this.hydrateAnsweredForCurrentState();
    } catch (e) {
      this.answeredByState = {};
      this.hydrateAnsweredForCurrentState();
    }
  },

  getQuestionsForState() {
    if (this.state === "AU") return QUESTIONS.slice();
    return QUESTIONS.filter((q) => Array.isArray(q.states) && q.states.includes(this.state));
  },
  clearProgress() {
    const key = this.storageStateKey();
    this.answeredByState[key] = {};
    this.answered = this.answeredByState[key];
    this.correct = 0;
    this.total = 0;
    this.save();
    this.renderQuiz();
    this.updateScore();
  },

  setLang(lang, el) {
    this.lang = lang;
    const d = this.getDisplayLang();
    document.body.className = "mode-" + d;
    document.documentElement.lang = d === "pt" ? "pt-BR" : d === "es" ? "es" : "en";
    document.getElementById("ld-flag").textContent = FLAGS[lang] || "🌐";
    document.getElementById("ld-name").textContent = ldTriggerLabel(lang);
    document.querySelectorAll(".ld-option").forEach((o) => o.classList.remove("active"));
    if (el) el.classList.add("active");
    document
      .querySelectorAll(".ld-option")
      .forEach((o) =>
        o.setAttribute("aria-selected", o.classList.contains("active") ? "true" : "false")
      );
    document.getElementById("ld-panel").classList.remove("open");
    document.getElementById("ld-trigger").classList.remove("open");
    this.syncLdTriggerAria();
    this.visibleQuestionCount = 10;
    this.save();
    this.renderFilters();
    this.renderQuiz();
    if (this.simMode) this.renderSimStack();
    if (window.KL_LEARN && typeof window.KL_LEARN.refreshLanguage === "function") {
      window.KL_LEARN.refreshLanguage();
    }
  },

  ldToggle() {
    const t = document.getElementById("ld-trigger");
    const p = document.getElementById("ld-panel");
    const rect = t.getBoundingClientRect();
    const isOpen = p.classList.contains("open");
    if (!isOpen) {
      p.style.top = rect.bottom + 6 + "px";
      p.style.left = Math.min(rect.left, window.innerWidth - 250) + "px";
      p.style.width = Math.max(rect.width, 200) + "px";
    }
    p.classList.toggle("open", !isOpen);
    t.classList.toggle("open", !isOpen);
    this.syncLdTriggerAria();
  },

  setState(state) {
    this.state = state;
    try {
      if (window.KangaStorage) window.KangaStorage.setState(state);
      else localStorage.setItem("kl-state", state);
    } catch (e) {}
    this.hydrateAnsweredForCurrentState();
    this.visibleQuestionCount = 10;
    if (this.simMode) {
      this.startSim();
    } else {
      this.renderQuiz();
    }
    this.updateScore();
  },

  renderFilters() {
    const bar = document.getElementById("filter-bar");
    const safeL = this.filterLabelLang(this.lang);
    const allLabel = { pt: "Todas", en: "All", es: "Todas" }[safeL] || "All";
    let html = `<button class="fcat ${this.cat === "all" ? "active" : ""}" data-cat="all" type="button">${allLabel}</button>`;
    CATEGORIES.forEach((c) => {
      const label = c.label[safeL] || c.label.en;
      html += `<button class="fcat ${this.cat === c.key ? "active" : ""}" data-cat="${c.key}" type="button">${c.icon} ${label}</button>`;
    });
    bar.innerHTML = html;
    bar.querySelectorAll(".fcat").forEach((btn) => {
      btn.setAttribute("aria-pressed", btn.dataset.cat === this.cat ? "true" : "false");
      btn.addEventListener("click", () => this.setCat(btn.dataset.cat || "all"));
    });
  },

  setCat(cat) {
    this.cat = cat;
    this.visibleQuestionCount = 10;
    document.querySelectorAll(".fcat").forEach((b) => {
      const on = b.dataset.cat === cat;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    this.renderQuiz();
  },

  setMode(mode) {
    this.mode = mode;
    document.querySelectorAll(".fmode").forEach((b) => {
      const on = b.dataset.mode === mode;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (mode === "sim") {
      this.visibleQuestionCount = 10;
      this.startSim();
    } else {
      this.simMode = false;
      document.getElementById("sim-wrapper").style.display = "none";
      document.getElementById("study-wrapper").style.display = "block";
      this.renderQuiz();
    }
  },

  getFilteredQ() {
    let qs = this.getQuestionsForState();
    if (this.cat !== "all") qs = qs.filter((q) => q.cat === this.cat);
    if (this.mode === "wrong")
      qs = qs.filter((q) => this.answered[q.id] && !this.answered[q.id].correct);
    if (this.mode === "unanswered") qs = qs.filter((q) => !this.answered[q.id]);
    return qs;
  },

  /** Bilingual helper: primary + optional EN line. */
  formatBilingualBlock(mainText, transText) {
    const tLang = this.getTranslationLang();
    if (!tLang || !transText || transText === mainText) {
      return mainText;
    }
    return `${mainText}<span class="translation-line" lang="en">${transText}</span>`;
  },

  buildPracticeContextBanner(qs) {
    const dLang = this.getDisplayLang();
    const count = qs.length;
    const unit = this.t("practice_questions_unit");
    let topicLabel = this.t("practice_topic_all");
    if (this.cat !== "all") {
      const catData = CATEGORIES.find((c) => c.key === this.cat);
      topicLabel = catData?.label?.[dLang] || this.cat;
    }
    let middle = topicLabel;
    if (this.mode === "wrong") {
      middle = `${this.t("practice_mode_wrong")} · ${topicLabel}`;
    } else if (this.mode === "unanswered") {
      middle = `${this.t("practice_mode_unanswered")} · ${topicLabel}`;
    }
    const line = `${this.t("practice_context_prefix")} ${middle} · ${count} ${unit}`;
    return `<p class="quiz-context-banner" aria-live="polite">${line}</p>`;
  },

  renderQuiz() {
    const container = document.getElementById("quiz-cards");
    const dLang = this.getDisplayLang();
    const tLang = this.getTranslationLang();
    const pool = this.getQuestionsForState();

    if (pool.length === 0) {
      container.innerHTML = `<div class="empty-state" role="status">
        <div class="empty-icon" aria-hidden="true">📍</div>
        <div class="empty-title">${this.t("empty_state_title")}</div>
        <div class="empty-sub">${this.t("empty_state_sub")}</div>
        <div class="empty-actions">
          <button type="button" class="btn btn-primary btn-sm" data-action="empty-wa">${this.t("empty_btn_wa")}</button>
          <button type="button" class="btn btn-secondary btn-sm" data-action="empty-learn">${this.t("empty_btn_learn")}</button>
        </div>
      </div>`;
      this.updateScore();
      return;
    }

    const qs = this.getFilteredQ();

    if (qs.length === 0) {
      container.innerHTML = `<div class="empty-state" role="status">
        <div class="empty-icon" aria-hidden="true">🎉</div>
        <div class="empty-title">${this.t("empty_title")}</div>
        <div class="empty-sub">${this.t("empty_sub")}</div>
      </div>`;
      this.updateScore();
      return;
    }

    const cap = Math.min(this.visibleQuestionCount, qs.length);
    const qsVisible = qs.slice(0, cap);

    const groups = {};
    qsVisible.forEach((q) => {
      if (!groups[q.cat]) groups[q.cat] = [];
      groups[q.cat].push(q);
    });

    let html = this.buildPracticeContextBanner(qs);
    Object.entries(groups).forEach(([cat, catQs]) => {
      const catData = CATEGORIES.find((c) => c.key === cat);
      const icon = catData?.icon || "📚";
      const label = catData?.label?.[dLang] || cat;
      html += `<div class="sec-head"><span class="sec-icon">${icon}</span><span>${label}</span></div>`;
      catQs.forEach((q) => {
        html += this.renderCard(q, dLang, tLang, { omitAnswer: false });
      });
    });

    if (qs.length > cap) {
      html += `<div class="load-more-wrap"><button type="button" class="btn-load-more-quiz" data-action="load-more-quiz">${this.t("load_more")}</button></div>`;
    }

    container.innerHTML = html;

    Object.entries(this.answered).forEach(([qid, state]) => {
      const card = document.getElementById(qid);
      if (!card) return;
      card.classList.add(state.correct ? "qcard--answered-correct" : "qcard--answered-incorrect");
      const opts = card.querySelectorAll(".opt");
      opts.forEach((o) => {
        o.setAttribute("data-done", "1");
        o.style.cursor = "default";
        const isCorrect = o.dataset.correct === "true";
        const isChosen = o.dataset.letter === state.chosen;
        if (isCorrect) o.classList.add(state.correct ? "correct" : "missed");
        else if (isChosen && !state.correct) o.classList.add("wrong");
      });
      const ans = document.getElementById("ans-" + qid);
      if (ans) ans.classList.add("show");
    });

    this.updateScore();
  },

  renderCard(q, dLang, tLang, opts) {
    opts = opts || {};
    const omitAnswer = opts.omitAnswer;
    const qMain = q.q[dLang] || q.q.en || "";
    const qTrans = tLang ? q.q[tLang] || "" : "";
    const qtextHtml = this.formatBilingualBlock(qMain, qTrans);

    let signHtml = "";
    if (q.sign) {
      const cap = q.cap ? q.cap[dLang] || q.cap.en || "" : "";
      const capTrans = tLang && q.cap ? q.cap[tLang] || "" : "";
      const capHtml = this.formatBilingualBlock(cap, capTrans);
      const signMarkup = q.sign.trim().startsWith("<svg")
        ? q.sign
        : `<img src="${q.sign}" alt="${cap || "Road sign"}" width="170" height="170" loading="lazy">`;
      signHtml = `<div class="sign-box">${signMarkup}${cap ? `<div class="img-cap">${capHtml}</div>` : ""}</div>`;
    }

    let optsHtml = "";
    q.opts.forEach((o) => {
      const oMain = o.t[dLang] || o.t.en || "";
      const oTrans = tLang ? o.t[tLang] || "" : "";
      const oHtml = this.formatBilingualBlock(oMain, oTrans);
      optsHtml += `<div class="opt" data-correct="${o.ok}" data-letter="${o.l}" role="button" tabindex="0">
        <span class="oletter">${o.l}</span>
        <span class="otext">${oHtml}</span>
      </div>`;
    });

    const expMain = q.exp[dLang] || q.exp.en || "";
    const expTrans = tLang ? q.exp[tLang] || "" : "";
    const expHtml = this.formatBilingualBlock(expMain, expTrans);
    const tip = q.tip ? q.tip[dLang] || q.tip.en || "" : "";
    const tipTrans = tLang && q.tip ? q.tip[tLang] || "" : "";
    const tipHtml = tip
      ? `<div class="atip">💡 ${this.formatBilingualBlock(tip, tipTrans || "")}</div>`
      : "";

    const answerBlock = omitAnswer
      ? ""
      : `<div class="answer answer-panel" id="ans-${q.id}">
    <div class="answer-exp-heading">${this.t("sim_explanation")}</div>
    <div class="atext explanation-text">${expHtml}</div>
    ${tipHtml}
  </div>`;

    return `<div class="qcard" id="${q.id}">
  <div class="qmeta"><span class="qnum">${q.id}</span><span class="qcat-badge">${CATEGORIES.find((c) => c.key === q.cat)?.icon || ""} ${CATEGORIES.find((c) => c.key === q.cat)?.label?.[dLang] || q.cat}</span></div>
  <div class="qtext">${qtextHtml}</div>
  ${signHtml}
  <div class="opts">${optsHtml}</div>
  ${answerBlock}
</div>`;
  },

  pick(el, qid) {
    if (el.getAttribute("data-done")) return;
    const q = this.questionById(qid);
    if (!q) return;

    if (this.simMode) {
      const wrap = el.closest(".sim-card-wrap");
      if (!wrap) return;
      const active = this.simQueue[this.simRenderedCount - 1];
      if (!active || active.id !== qid || this.simAnswered[qid]) return;
    }

    const isCorrect = el.dataset.correct === "true";
    if (this.simMode) {
      this.simAnswered = {
        ...this.simAnswered,
        [qid]: { correct: isCorrect, chosen: el.dataset.letter }
      };
    }

    if (!this.simMode) {
      const card = document.getElementById(qid);
      if (card) {
        card.classList.add(isCorrect ? "qcard--answered-correct" : "qcard--answered-incorrect");
        const opts = card.querySelectorAll(".opt");
        opts.forEach((o) => {
          o.setAttribute("data-done", "1");
          o.style.cursor = "default";
          if (o.dataset.correct === "true") o.classList.add(isCorrect ? "correct" : "missed");
          else if (o === el && !isCorrect) o.classList.add("wrong");
        });
        document.getElementById("ans-" + qid)?.classList.add("show");
      }
    }

    if (!this.answered[qid]) {
      this.total++;
      if (isCorrect) this.correct++;
      this.answered[qid] = { correct: isCorrect, chosen: el.dataset.letter };
      this.save();
      this.updateScore();
      if (isCorrect && !this.simMode) this.spawnConfetti(el);
      this.syncAttempt(q, isCorrect, el.dataset.letter);
    }

    if (this.simMode) {
      setTimeout(() => this.advanceSimAfterAnswer(), 280);
    }
  },

  advanceSimAfterAnswer() {
    const total = this.simQueue.length;
    if (this.simRenderedCount < total) {
      this.simRenderedCount++;
      this._simScrollTarget = `sim-q-${this.simQueue[this.simRenderedCount - 1].id}`;
    } else {
      this.simCompleted = true;
      let score = 0;
      this.simQueue.forEach((q) => {
        if (this.simAnswered[q.id]?.correct) score++;
      });
      this.syncMockSession({ state: this.state || "WA", score, total });
      this._simScrollTarget = "sim-final-panel";
    }
    this.renderSimStack();
  },

  updateScore() {
    const total = Object.keys(this.answered).length;
    const correct = Object.values(this.answered).filter((a) => a.correct).length;
    const wrong = Object.values(this.answered).filter((a) => !a.correct).length;
    const pool = this.getQuestionsForState();
    const poolIds = new Set(pool.map((q) => q.id));
    let unanswered = 0;
    pool.forEach((q) => {
      if (!this.answered[q.id]) unanswered++;
    });

    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const el = document.getElementById("score-val");
    if (el) {
      el.textContent = `${correct} / ${total}`;
      el.style.color =
        pct >= 80 ? "var(--green)" : pct >= 60 ? "var(--gold)" : total > 0 ? "var(--red)" : "#fff";
    }
    const pbar = document.getElementById("score-pbar");
    if (pbar) {
      pbar.style.width = pct + "%";
      pbar.setAttribute("aria-valuenow", String(pct));
    }
    const pct_el = document.getElementById("score-pct");
    if (pct_el) pct_el.textContent = total > 0 ? `${this.t("prog_accuracy")}: ${pct}%` : "";

    const accEl = document.getElementById("prog-accuracy");
    if (accEl) accEl.textContent = total > 0 ? `${pct}%` : "—";

    const cEl = document.getElementById("prog-correct");
    const iEl = document.getElementById("prog-incorrect");
    const uEl = document.getElementById("prog-unanswered");
    if (cEl) cEl.textContent = String(correct);
    if (iEl) iEl.textContent = String(wrong);
    if (uEl) uEl.textContent = String(unanswered);

    const mob = document.getElementById("quiz-mobile-progress");
    if (mob)
      mob.textContent = `${this.t("prog_score")}: ${correct}/${total} · ${this.t("prog_accuracy")}: ${total ? pct + "%" : "—"}`;
  },

  spawnConfetti(el) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ["#F4A900", "#30D158", "#FFBE33", "#fff", "#FFD700"];
    for (let i = 0; i < 18; i++) {
      const d = document.createElement("div");
      d.className = "confetti-dot";
      d.style.cssText = `left:${cx}px;top:${cy}px;background:${colors[i % colors.length]};
        --dx:${(Math.random() - 0.5) * 160}px;--dy:${-(Math.random() * 120 + 60)}px;
        width:${5 + Math.random() * 5}px;height:${5 + Math.random() * 5}px;
        border-radius:${Math.random() > 0.5 ? "50%" : "2px"};`;
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 900);
    }
  },

  startSim() {
    const pool = this.getQuestionsForState();
    if (pool.length === 0) {
      this.simMode = false;
      document.getElementById("sim-wrapper").style.display = "none";
      document.getElementById("study-wrapper").style.display = "block";
      this.renderQuiz();
      return;
    }
    const n = Math.min(30, pool.length);
    this.simMode = true;
    this.simAnswered = {};
    this.simRenderedCount = 1;
    this.simCompleted = false;
    this.simReviewMode = "all";
    this.simQueue = fisherYatesSlice(pool, n);
    document.getElementById("study-wrapper").style.display = "none";
    document.getElementById("sim-wrapper").style.display = "block";
    this._simScrollTarget = null;
    this.renderSimStack();
  },

  renderSimStack() {
    const container = document.getElementById("sim-card-container");
    const total = this.simQueue.length;
    const dLang = this.getDisplayLang();
    const tLang = this.getTranslationLang();

    const revealed = this.simQueue.slice(0, this.simRenderedCount);
    let html = "";

    for (const q of revealed) {
      const ans = this.simAnswered[q.id];
      if (this.simReviewMode === "mistakes" && (!ans || ans.correct)) continue;

      const answered = !!ans;
      const isCorrect = ans?.correct;
      const wrapCls = `sim-card-wrap${answered ? ` sim-card answered ${isCorrect ? "correct" : "incorrect"}` : ""}`;

      let inner = this.renderCard(q, dLang, tLang, { omitAnswer: true });
      inner = inner.replace('<div class="qcard"', `<div class="qcard sim-qcard-inner"`);

      let extra = "";
      if (answered) {
        const correctOpt = q.opts.find((o) => o.ok);
        const chosenOpt = q.opts.find((o) => o.l === ans.chosen);
        const yourTxt = chosenOpt ? chosenOpt.t[dLang] || chosenOpt.t.en : ans.chosen;
        const okTxt = correctOpt ? correctOpt.t[dLang] || correctOpt.t.en : "";
        const badge = isCorrect
          ? `<div class="sim-status-badge sim-status-correct">${this.t("sim_badge_ok")}</div>`
          : `<div class="sim-status-badge sim-status-wrong">${this.t("sim_badge_bad")}</div>`;
        let review = "";
        if (!isCorrect) {
          review = `<div class="answer-review incorrect">
            <div><strong>${this.t("sim_your_answer")}</strong> ${yourTxt}</div>
            <div><strong>${this.t("sim_correct_answer")}</strong> ${okTxt}</div>
          </div>`;
        } else {
          review = `<div class="answer-review correct"><strong>${this.t("sim_badge_ok")}</strong></div>`;
        }
        const expMain = q.exp[dLang] || q.exp.en || "";
        const expTrans = tLang ? q.exp[tLang] || "" : "";
        const expHtml = this.formatBilingualBlock(expMain, expTrans);
        const tip = q.tip ? q.tip[dLang] || q.tip.en || "" : "";
        const tipTrans = tLang && q.tip ? q.tip[tLang] || "" : "";
        const tipBlock = tip
          ? `<div class="atip">💡 ${this.formatBilingualBlock(tip, tipTrans)}</div>`
          : "";
        extra =
          badge +
          review +
          `<div class="explanation-box"><div class="alabel">${this.t("sim_explanation")}</div>${expHtml}${tipBlock}</div>`;
      }

      html += `<div class="${wrapCls}" id="sim-q-${q.id}" data-qid="${q.id}">${inner}${extra}</div>`;
    }

    if (this.simCompleted) {
      html += this.renderSimFinalPanel();
    }

    container.innerHTML = html;

    for (const q of revealed) {
      const ans = this.simAnswered[q.id];
      if (!ans) continue;
      const wrap = container.querySelector(`#sim-q-${q.id}`);
      const card = wrap?.querySelector(".qcard");
      if (!card) continue;
      const isCorrect = ans.correct;
      card.querySelectorAll(".opt").forEach((o) => {
        o.setAttribute("data-done", "1");
        o.style.cursor = "default";
        if (o.dataset.correct === "true") o.classList.add(isCorrect ? "correct" : "missed");
        else if (o.dataset.letter === ans.chosen && !isCorrect) o.classList.add("wrong");
      });
    }

    document.getElementById("sim-progress-text").textContent =
      `${this.simRenderedCount} / ${total}`;
    const barPct = this.simCompleted ? 100 : Math.round((this.simRenderedCount / total) * 100);
    document.getElementById("sim-progress-bar").style.width = barPct + "%";

    if (this._simScrollTarget) {
      const id = this._simScrollTarget;
      const el = document.getElementById(id);
      this._simScrollTarget = null;
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  },

  renderSimFinalPanel() {
    const total = this.simQueue.length;
    let score = 0;
    this.simQueue.forEach((q) => {
      if (this.simAnswered[q.id]?.correct) score++;
    });
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    let msgKey = "sim_result_low";
    if (score >= 26) msgKey = "sim_result_high";
    else if (score >= 21) msgKey = "sim_result_mid";

    const dLang = this.getDisplayLang();
    const wrongByCat = {};
    this.simQueue.forEach((q) => {
      const a = this.simAnswered[q.id];
      if (a && !a.correct) {
        wrongByCat[q.cat] = (wrongByCat[q.cat] || 0) + 1;
      }
    });
    const weakSorted = Object.entries(wrongByCat)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    let chips = "";
    weakSorted.forEach(([cat]) => {
      const catMeta = CATEGORIES.find((c) => c.key === cat);
      const chipLabel = catMeta
        ? `${catMeta.icon || ""} ${catMeta.label?.[dLang] || catMeta.label?.en || cat}`.trim()
        : cat;
      chips += `<button type="button" class="weak-chip" data-action="sim-weak-topic" data-cat="${cat}">${chipLabel}</button>`;
    });
    if (!chips) chips = `<span class="weak-none">${this.t("sim_no_weak")}</span>`;

    return `<div id="sim-final-panel" class="sim-final-panel">
      <div class="sim-final-inner">
        <h3 class="sim-final-title">${this.t("sim_final_title")}</h3>
        <div class="sim-result-score">${score} / ${total}</div>
        <div class="sim-result-pct">${pct}%</div>
        <p class="sim-result-msg">${this.t(msgKey)}</p>
        <div class="sim-final-actions">
          <button type="button" class="btn btn-secondary btn-sm" data-action="sim-review-mistakes">${this.t("sim_btn_mistakes")}</button>
          <button type="button" class="btn btn-secondary btn-sm" data-action="sim-review-all">${this.t("sim_btn_all")}</button>
          <button type="button" class="btn btn-gold btn-sm" data-action="sim-restart">${this.t("sim_btn_restart")}</button>
        </div>
        <div class="sim-weak-block">
          <div class="sim-weak-label">${this.t("sim_weak_label")}</div>
          <div class="weak-chips">${chips}</div>
        </div>
      </div>
    </div>`;
  },

  init() {
    this.load();
    this.rebuildQuestionMap();
    const langEl = document.querySelector(`.ld-option[data-lang="${this.lang}"]`);
    if (langEl) {
      langEl.classList.add("active");
    }
    const d = this.getDisplayLang();
    document.body.className = "mode-" + d;
    document.documentElement.lang = d === "pt" ? "pt-BR" : d === "es" ? "es" : "en";
    document.getElementById("ld-flag").textContent = FLAGS[this.lang] || "🇧🇷";
    document.getElementById("ld-name").textContent = ldTriggerLabel(this.lang);

    let ldResizeT;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(ldResizeT);
        ldResizeT = setTimeout(() => this.syncLdTriggerLabel(), 120);
      },
      { passive: true }
    );

    const ldTrigInit = document.getElementById("ld-trigger");
    if (ldTrigInit) {
      ldTrigInit.setAttribute("aria-haspopup", "listbox");
      ldTrigInit.setAttribute("aria-expanded", "false");
    }

    document.addEventListener("click", (e) => {
      if (!document.getElementById("ld")?.contains(e.target)) {
        document.getElementById("ld-panel")?.classList.remove("open");
        document.getElementById("ld-trigger")?.classList.remove("open");
        DW.syncLdTriggerAria();
      }
    });

    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY + 88;
        sections.forEach((s) => {
          if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
            navLinks.forEach((a) => {
              a.classList.remove("active");
              if (a.getAttribute("href") === "#" + s.id) a.classList.add("active");
            });
          }
        });
      },
      { passive: true }
    );

    const total = Object.keys(this.answered).length;
    const correct = Object.values(this.answered).filter((a) => a.correct).length;
    this.total = total;
    this.correct = correct;

    this.renderFilters();
    this.renderQuiz();
    this.updateScore();

    document.querySelectorAll(".fmode").forEach((btn) => {
      btn.setAttribute("aria-pressed", btn.classList.contains("active") ? "true" : "false");
      btn.addEventListener("click", () => {
        document.querySelectorAll(".fmode").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        DW.setMode(btn.dataset.mode);
      });
    });

    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn) resetBtn.addEventListener("click", () => DW.clearProgress());

    document.addEventListener("click", (e) => {
      const loadMore = e.target.closest?.('[data-action="load-more-quiz"]');
      if (loadMore) {
        this.visibleQuestionCount += 10;
        this.renderQuiz();
        return;
      }
      const emptyWa = e.target.closest?.('[data-action="empty-wa"]');
      if (emptyWa) {
        this.applyEmptyStateWA();
        return;
      }
      const emptyLearn = e.target.closest?.('[data-action="empty-learn"]');
      if (emptyLearn) {
        document.getElementById("learn")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const simM = e.target.closest?.('[data-action="sim-review-mistakes"]');
      if (simM) {
        this.simReviewMode = "mistakes";
        const firstWrong = this.simQueue.find(
          (q) => this.simAnswered[q.id] && !this.simAnswered[q.id].correct
        );
        this._simScrollTarget = firstWrong ? `sim-q-${firstWrong.id}` : "sim-final-panel";
        this.renderSimStack();
        return;
      }
      const simAll = e.target.closest?.('[data-action="sim-review-all"]');
      if (simAll) {
        this.simReviewMode = "all";
        this._simScrollTarget = null;
        this.renderSimStack();
        return;
      }
      const simRes = e.target.closest?.('[data-action="sim-restart"]');
      if (simRes) {
        this.startSim();
        document.getElementById("questoes")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const weak = e.target.closest?.('[data-action="sim-weak-topic"]');
      if (weak) {
        const cat = weak.getAttribute("data-cat");
        this.simMode = false;
        document.getElementById("sim-wrapper").style.display = "none";
        document.getElementById("study-wrapper").style.display = "block";
        document.querySelectorAll(".fmode").forEach((b) => {
          const on = b.dataset.mode === "all";
          b.classList.toggle("active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        this.mode = "all";
        this.setCat(cat || "all");
        document.getElementById("questoes")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const opt = e.target.closest?.(".opt");
      if (opt) {
        const card = opt.closest?.(".qcard");
        if (card) DW.pick(opt, card.id);
      }
      const actionEl = e.target.closest?.('[data-action="mode-all"]');
      if (actionEl) DW.setMode("all");
    });

    document.addEventListener("keydown", (e) => {
      const opt = e.target?.closest?.(".opt");
      if (!opt) return;
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      const card = opt.closest?.(".qcard");
      if (card) DW.pick(opt, card.id);
    });
  },

  applyEmptyStateWA() {
    this.state = "WA";
    try {
      if (window.KangaStorage) window.KangaStorage.setState("WA");
      else localStorage.setItem("kl-state", "WA");
    } catch (e) {}
    this.hydrateAnsweredForCurrentState();
    document.querySelectorAll(".state-card").forEach((c) => {
      const on = c.dataset.state === "WA";
      c.classList.toggle("active", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
    const sel = document.getElementById("state-select");
    if (sel) sel.value = "WA";
    this.visibleQuestionCount = 10;
    if (this.simMode) this.startSim();
    else this.renderQuiz();
    this.updateScore();
  }
};

DW.syncAttempt = function (q, isCorrect, chosen) {
  if (!window.KANGA_ENABLE_BACKEND_SYNC) return;
  try {
    fetch("/api/attempts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        question_id: q.id,
        state: this.state || "WA",
        category: q.cat,
        is_correct: Boolean(isCorrect),
        chosen: chosen || null,
        source: "web"
      }),
      keepalive: true
    }).catch(() => {});
  } catch (e) {}
};

DW.syncMockSession = function (session) {
  if (!window.KANGA_ENABLE_BACKEND_SYNC) return;
  try {
    fetch("/api/mock-sessions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...session, source: "web" }),
      keepalive: true
    }).catch(() => {});
  } catch (e) {}
};

const FLAGS = { pt: "🇧🇷", en: "🇦🇺", es: "🇪🇸", pten: "🇧🇷\u2009🇦🇺", esen: "🇪🇸\u2009🇦🇺" };
const LD_TRIGGER_LONG = {
  pt: "BR Português",
  en: "AU English",
  es: "ES Español",
  pten: "PT + EN",
  esen: "ES + EN"
};
const LD_TRIGGER_SHORT = { pt: "PT", en: "EN", es: "ES", pten: "PT+EN", esen: "ES+EN" };

function ldTriggerLabel(lang) {
  const short = window.matchMedia("(max-width: 640px)").matches;
  const m = short ? LD_TRIGGER_SHORT : LD_TRIGGER_LONG;
  return m[lang] || lang;
}

const I18N = {
  empty_state_title: {
    pt: "As perguntas deste estado estarão disponíveis em breve.",
    en: "Questions for this state are coming soon.",
    es: "Las preguntas de este estado estarán disponibles pronto."
  },
  empty_state_sub: {
    pt: "Pratique WA por enquanto.",
    en: "Practise WA questions for now.",
    es: "Practica WA por ahora."
  },
  empty_btn_wa: { pt: "Praticar WA", en: "Practise WA questions", es: "Practicar WA" },
  empty_btn_learn: { pt: "Voltar para Aprender", en: "Back to Learn", es: "Volver a Aprender" },
  empty_title: {
    pt: "Sem questões nesta categoria!",
    en: "No questions in this category!",
    es: "¡Sin preguntas en esta categoría!"
  },
  empty_sub: {
    pt: "Tente mudar o filtro ou o modo.",
    en: "Try changing the filter or mode.",
    es: "Prueba cambiando el filtro o el modo."
  },
  load_more: {
    pt: "Carregar mais 10 perguntas",
    en: "Load 10 more questions",
    es: "Cargar 10 preguntas más"
  },
  practice_context_prefix: {
    pt: "Você está praticando:",
    en: "You are practising:",
    es: "Estás practicando:"
  },
  practice_topic_all: { pt: "Todas as perguntas", en: "All questions", es: "Todas las preguntas" },
  practice_questions_unit: { pt: "perguntas", en: "questions", es: "preguntas" },
  practice_mode_wrong: { pt: "Erradas", en: "Wrong answers", es: "Incorrectas" },
  practice_mode_unanswered: { pt: "Não respondidas", en: "Unanswered", es: "Sin responder" },
  subscribe_ok: {
    pt: "Obrigado! Inscrição registrada.",
    en: "Thanks! You are subscribed.",
    es: "¡Gracias! Te has suscrito."
  },
  subscribe_not_live: {
    pt: "A newsletter ainda não está ativa — obrigado pelo interesse!",
    en: "Newsletter signup isn’t available yet — thanks for your interest!",
    es: "El boletín aún no está activo — ¡gracias por tu interés!"
  },
  subscribe_err: {
    pt: "Digite um e-mail válido.",
    en: "Please enter a valid email.",
    es: "Introduce un correo válido."
  },
  prog_score: { pt: "Pontuação", en: "Score", es: "Puntuación" },
  prog_accuracy: { pt: "Precisão", en: "Accuracy", es: "Precisión" },
  prog_correct: { pt: "Certas", en: "Correct", es: "Correctas" },
  prog_incorrect: { pt: "Erradas", en: "Incorrect", es: "Incorrectas" },
  prog_unanswered: { pt: "Não respondidas", en: "Unanswered", es: "Sin responder" },
  sim_badge_ok: { pt: "Correta", en: "Correct", es: "Correcta" },
  sim_badge_bad: { pt: "Errada", en: "Incorrect", es: "Incorrecta" },
  sim_your_answer: { pt: "Sua resposta:", en: "Your answer:", es: "Tu respuesta:" },
  sim_correct_answer: { pt: "Resposta correta:", en: "Correct answer:", es: "Respuesta correcta:" },
  sim_explanation: { pt: "Explicação", en: "Explanation", es: "Explicación" },
  sim_final_title: {
    pt: "Resultado do simulado",
    en: "Mock test results",
    es: "Resultado del simulacro"
  },
  sim_result_high: { pt: "Excelente trabalho!", en: "Excellent work!", es: "¡Excelente trabajo!" },
  sim_result_mid: {
    pt: "Bom progresso — continue assim.",
    en: "Good progress — keep going.",
    es: "Buen progreso — sigue así."
  },
  sim_result_low: {
    pt: "Continue praticando — você vai melhorar.",
    en: "Keep practising — you will improve.",
    es: "Sigue practicando — mejorarás."
  },
  sim_btn_mistakes: { pt: "Rever erros", en: "Review mistakes", es: "Revisar errores" },
  sim_btn_all: { pt: "Ver todas", en: "Show all", es: "Ver todas" },
  sim_btn_restart: { pt: "Reiniciar simulado", en: "Restart mock test", es: "Reiniciar simulacro" },
  sim_weak_label: {
    pt: "Praticar tópicos fracos",
    en: "Practice weak topics",
    es: "Practicar temas débiles"
  },
  sim_no_weak: {
    pt: "Nenhum tópico fraco neste simulado.",
    en: "No weak topics in this run.",
    es: "Sin temas débiles en esta sesión."
  }
};

window.DW = DW;
