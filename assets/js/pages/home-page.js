// KangaLearner — Home page renderer
(function () {
  "use strict";

  function getState() {
    try {
      return (
        (window.KangaStorage && window.KangaStorage.getState()) ||
        localStorage.getItem("kl-state") ||
        "WA"
      );
    } catch (e) {
      return "WA";
    }
  }

  var STATES = [
    { code: "WA", name: "Western Australia", active: true },
    { code: "NSW", name: "New South Wales", active: false },
    { code: "VIC", name: "Victoria", active: false },
    { code: "QLD", name: "Queensland", active: false },
    { code: "SA", name: "South Australia", active: false },
    { code: "TAS", name: "Tasmania", active: false },
    { code: "ACT", name: "Australian Capital Territory", active: false },
    { code: "NT", name: "Northern Territory", active: false }
  ];

  var TOPICS = [
    {
      cat: "Speed Limits",
      icon: "speed",
      titleKey: "topics.speedTitle",
      descKey: "topics.speedDesc",
      svg: '<path d="M8 31a16 16 0 1 1 32 0"/><path d="M24 31l9-14"/><path d="M12 31h24"/>'
    },
    {
      cat: "Road Signs",
      icon: "signs",
      titleKey: "topics.signsTitle",
      descKey: "topics.signsDesc",
      svg: '<path d="M24 6l20 36H4L24 6Z"/><path d="M24 18v10"/><path d="M24 35h.01"/>'
    },
    {
      cat: "Parking Rules",
      icon: "parking",
      titleKey: "topics.parkingTitle",
      descKey: "topics.parkingDesc",
      svg: '<rect x="10" y="6" width="28" height="36" rx="4"/><path d="M19 33V15h8a6 6 0 0 1 0 12h-8"/>'
    },
    {
      cat: "Alcohol & BAC",
      icon: "alcohol",
      titleKey: "topics.alcoholTitle",
      descKey: "topics.alcoholDesc",
      svg: '<path d="M19 5h10l-2 12v6l6 16H15l6-16v-6L19 5Z"/><path d="M18 32h12"/>'
    },
    {
      cat: "Road Markings",
      icon: "markings",
      titleKey: "topics.lanesTitle",
      descKey: "topics.lanesDesc",
      svg: '<path d="M14 42l4-36"/><path d="M34 42L30 6"/><path d="M24 10v7M24 24v7M24 38v4"/>'
    },
    {
      cat: "Road Safety",
      icon: "safety",
      titleKey: "topics.safetyTitle",
      descKey: "topics.safetyDesc",
      svg: '<path d="M24 4l16 6v12c0 10-6 17-16 22C14 39 8 32 8 22V10l16-6Z"/><path d="M17 24l5 5 10-12"/>'
    }
  ];

  function stateCardsHTML(currentState) {
    return STATES.map(function (s) {
      var isActive = s.code === currentState;
      var comingSoon = !s.active;
      return (
        '<button class="state-card' +
        (isActive ? " active" : "") +
        (comingSoon ? " coming-soon" : "") +
        '" data-state="' +
        s.code +
        '" aria-pressed="' +
        (isActive ? "true" : "false") +
        '">' +
        '<div class="state-icon"><img src="assets/icons/ui/map.svg" alt="" width="18" height="18" aria-hidden="true"/></div>' +
        '<div class="state-code">' +
        s.code +
        "</div>" +
        '<div class="state-name">' +
        s.name +
        "</div>" +
        (comingSoon
          ? '<div class="state-badge" data-i18n="state.comingSoon"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>'
          : "") +
        "</button>"
      );
    }).join("");
  }

  function topicCardsHTML() {
    return TOPICS.map(function (t) {
      return (
        '<a class="topic-card" href="#practice" data-cat="' +
        t.cat +
        '">' +
        '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3">' +
        t.svg +
        "</svg>" +
        "<div>" +
        '<h4 data-i18n="' +
        t.titleKey +
        '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h4>' +
        '<p data-i18n="' +
        t.descKey +
        '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
        "</div></a>"
      );
    }).join("");
  }

  window.KL_PAGES = window.KL_PAGES || {};

  window.KL_PAGES.home = function () {
    var currentState = getState();
    var learnBlock = typeof window.KL_PAGES.learn === "function" ? window.KL_PAGES.learn() : "";

    return (
      '<section class="hero" id="home-hero">' +
      '<div class="hero-inner">' +
      '<div class="hero-copy">' +
      '<div class="eyebrow" data-i18n="hero.eyebrow"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 data-i18n="hero.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="hero-desc" data-i18n="hero.description"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<div class="hero-actions">' +
      '<a class="btn btn-primary" href="#practice" data-i18n="hero.ctaPractice"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span><span aria-hidden="true">→</span></a>' +
      '<a class="btn btn-secondary" href="#mock" data-i18n="hero.ctaMock"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span><span aria-hidden="true">→</span></a>' +
      "</div>" +
      '<div class="hero-proof"><span class="proof-icon">✓</span><span data-i18n="hero.proof"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
      "</div>" +
      '<div class="hero-preview" data-i18n-aria="aria.previewPractice" aria-label="" aria-hidden="true">' +
      '<div class="preview-head">' +
      '<div class="preview-title" data-i18n="preview.practiceTitle"><img loading="lazy" src="assets/icons/ui/practice.svg" alt="" width="16" height="16" aria-hidden="true"/><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="preview-pill"><img loading="lazy" src="assets/icons/ui/map.svg" alt="" width="14" height="14" aria-hidden="true"/>WA</div>' +
      "</div>" +
      '<div class="preview-grid">' +
      '<div class="practice-card">' +
      '<div class="preview-small" data-i18n="preview.questionProgress"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="preview-progress"><div class="preview-track"><div class="preview-fill"></div></div><strong>40%</strong></div>' +
      '<div class="preview-question" data-i18n="preview.questionDemo"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="preview-options">' +
      '<div class="preview-option correct"><span class="letter">A</span><span data-i18n="preview.optTrue"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><span style="margin-left: auto" aria-hidden="true">✓</span></div>' +
      '<div class="preview-option"><span class="letter">B</span><span data-i18n="preview.optFalse"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
      '<div class="preview-option"><span class="letter">C</span><span data-i18n="preview.optOnlySign"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
      '<div class="preview-option"><span class="letter">D</span><span data-i18n="preview.optRoundabout"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
      "</div>" +
      "</div>" +
      "<div>" +
      '<div class="progress-card"><div class="preview-small" data-i18n="preview.progressTitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div><div class="ring"></div><div class="legend">' +
      '<span class="legend-row"><span class="legend-label"><span class="dot green"></span><span data-i18n="preview.legendCorrect"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></span><strong class="legend-val">21</strong></span>' +
      '<span class="legend-row"><span class="legend-label"><span class="dot red"></span><span data-i18n="preview.legendIncorrect"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></span><strong class="legend-val">8</strong></span>' +
      '<span class="legend-row"><span class="legend-label"><span class="dot gray"></span><span data-i18n="preview.legendUnanswered"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></span><strong class="legend-val">1</strong></span>' +
      "</div></div>" +
      '<div class="score-card"><div class="preview-small" data-i18n="preview.scoreTitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div><div class="score-big">85%</div><small data-i18n="preview.scoreAwesome"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></small></div>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div></section>" +
      '<section class="state-section" id="states"><div class="container"><div class="state-row">' +
      '<div class="state-copy" data-i18n="state.banner"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      stateCardsHTML(currentState) +
      "</div></div></section>" +
      '<section class="topics-section" id="topics"><div class="container">' +
      '<div class="topics-title" data-i18n="topics.sectionTitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="topic-grid">' +
      topicCardsHTML() +
      "</div>" +
      "</div></section>" +
      learnBlock
    );
  };
})();
