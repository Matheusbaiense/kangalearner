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

    return (
      '<section class="hero" id="home-hero">' +
      '<div class="hero-inner"><div class="hero-copy">' +
      '<div class="eyebrow" data-i18n="hero.eyebrow"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 data-i18n="hero.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="hero-desc" data-i18n="hero.description"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<div class="hero-actions">' +
      '<a class="btn btn-primary" href="#practice" data-i18n="hero.ctaPractice"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span><span aria-hidden="true">→</span></a>' +
      '<a class="btn btn-secondary" href="#mock" data-i18n="hero.ctaMock"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span><span aria-hidden="true">→</span></a>' +
      "</div>" +
      '<div class="hero-proof"><span class="proof-icon">✓</span><span data-i18n="hero.proof"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
      "</div></div></section>" +
      '<section class="state-section" id="states"><div class="container"><div class="state-row">' +
      '<div class="state-copy" data-i18n="state.banner"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      stateCardsHTML(currentState) +
      "</div></div></section>" +
      '<section class="topics-section" id="topics"><div class="container">' +
      '<div class="topics-title" data-i18n="topics.sectionTitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="topic-grid">' +
      topicCardsHTML() +
      "</div>" +
      "</div></section>"
    );
  };
})();
