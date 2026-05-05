// KangaLearner — Learn Hub page renderer
(function () {
  "use strict";

  function getLang() {
    try {
      return (window.DW && window.DW.lang) || "en";
    } catch (e) {
      return "en";
    }
  }

  function t(obj, lang) {
    if (!obj) return "";
    return obj[lang] || obj["en"] || "";
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  window.KL_PAGES = window.KL_PAGES || {};

  function iconEmoji(icon) {
    var map = {
      speed: "🚦",
      giveway: "🛑",
      signs: "🚧",
      lights: "🚦",
      markings: "🛣️",
      lane: "🛣️",
      parking: "🅿️",
      alcohol: "🍺",
      emergency: "🚨",
      safety: "🛡️",
    };
    return map[icon] || "📘";
  }

  window.KL_PAGES.learn = function () {
    var topics = window.LEARN_TOPICS || [];
    var lang = getLang();

    if (!topics.length) {
      return '<section class="page-section"><div class="container"><h1>Learn</h1><p>Topics loading…</p></div></section>';
    }

    var cards = topics
      .map(function (topic) {
        var title = escapeHtml(t(topic.title, lang));
        var summary = escapeHtml(t(topic.summary, lang));
        return (
          '<a class="learn-card" href="#learn/' +
          topic.slug +
          '">' +
          '<div class="learn-card-icon">' +
          '<span class="learn-emoji" aria-hidden="true">' +
          iconEmoji(topic.icon) +
          "</span>" +
          "</div>" +
          '<div class="learn-card-body">' +
          '<h3 class="learn-card-title">' +
          title +
          "</h3>" +
          '<p class="learn-card-summary">' +
          summary +
          "</p>" +
          '<span class="learn-card-cta" data-i18n="learn.cardCta"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span>' +
          "</div></a>"
        );
      })
      .join("");

    return (
      '<section class="page-section learn-hub"><div class="container">' +
      '<div class="page-header">' +
      '<p class="page-kicker" data-i18n="learn.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<h1 class="page-title" data-i18n="learn.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="learn.sub"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="learn-grid">' +
      cards +
      "</div>" +
      "</div></section>"
    );
  };

  window.KL_PAGES.topic = function (slug) {
    var topics = window.LEARN_TOPICS || [];
    var lang = getLang();
    var topic = null;
    for (var i = 0; i < topics.length; i++) {
      if (topics[i].slug === slug) {
        topic = topics[i];
        break;
      }
    }

    if (!topic) {
      return '<section class="page-section"><div class="container"><p>Topic not found. <a href="#learn">Back to Learn</a></p></div></section>';
    }

    var keyRules = (topic.keyRules || [])
      .map(function (r) {
        return "<li>" + escapeHtml(t(r, lang)) + "</li>";
      })
      .join("");
    var mistakes = (topic.mistakes || [])
      .map(function (m) {
        return "<li>" + escapeHtml(t(m, lang)) + "</li>";
      })
      .join("");
    var quickChecks = (topic.quickCheck || [])
      .map(function (q) {
        return "<li>" + escapeHtml(t(q, lang)) + "</li>";
      })
      .join("");
    var exampleText = topic.example ? escapeHtml(t(topic.example, lang)) : "";
    var sourceText = topic.source ? escapeHtml(t(topic.source, lang)) : "";

    return (
      '<section class="page-section topic-detail"><div class="container">' +
      '<nav class="breadcrumb" aria-label="Breadcrumb">' +
      '<a href="#learn" data-i18n="learn.breadcrumb"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a> <span aria-hidden="true">/</span> <span>' +
      t(topic.title, lang) +
      "</span>" +
      "</nav>" +
      '<div class="topic-header">' +
      '<h1 class="page-title">' +
      escapeHtml(t(topic.title, lang)) +
      "</h1>" +
      '<p class="topic-summary">' +
      escapeHtml(t(topic.summary, lang)) +
      "</p>" +
      "</div>" +
      '<div class="topic-body">' +
      '<div class="topic-card-block"><h2 class="topic-block-title" data-i18n="learn.keyRules"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2><ul class="topic-rules-list">' +
      keyRules +
      "</ul></div>" +
      (mistakes
        ? '<div class="topic-card-block topic-mistakes"><h2 class="topic-block-title" data-i18n="learn.mistakes"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2><ul class="topic-rules-list">' +
          mistakes +
          "</ul></div>"
        : "") +
      (exampleText
        ? '<div class="topic-card-block topic-example"><h2 class="topic-block-title" data-i18n="learn.example"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2><p>' +
          exampleText +
          "</p></div>"
        : "") +
      (quickChecks
        ? '<div class="topic-card-block topic-quiz"><h2 class="topic-block-title" data-i18n="learn.quickCheck"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2><ul class="topic-rules-list">' +
          quickChecks +
          "</ul></div>"
        : "") +
      "</div>" +
      '<div class="topic-actions">' +
      '<a class="btn btn-primary" href="#practice" data-cat="' +
      (topic.category || "") +
      '"><span data-i18n="learn.ctaPracticePrefix"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span> ' +
      escapeHtml(t(topic.title, lang)) +
      ' <span data-i18n="learn.ctaPracticeSuffix"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span> &rarr;</a>' +
      '<a class="btn btn-secondary" href="#learn" data-i18n="learn.ctaAllTopics"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      "</div>" +
      (sourceText ? '<p class="topic-source">' + sourceText + "</p>" : "") +
      "</div></section>"
    );
  };
})();

