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
          '<img src="assets/icons/topics/' +
          topic.icon +
          '.svg" alt="" width="32" height="32" aria-hidden="true" onerror="this.style.display=\'none\'">' +
          "</div>" +
          '<div class="learn-card-body">' +
          '<h3 class="learn-card-title">' +
          title +
          "</h3>" +
          '<p class="learn-card-summary">' +
          summary +
          "</p>" +
          '<span class="learn-card-cta">Study topic &rarr;</span>' +
          "</div></a>"
        );
      })
      .join("");

    return (
      '<section class="page-section learn-hub"><div class="container">' +
      '<div class="page-header">' +
      '<p class="page-kicker">Study guides</p>' +
      '<h1 class="page-title">Learn the road rules</h1>' +
      '<p class="page-sub">Select a topic to read the key rules, understand common mistakes, and test yourself with quick questions.</p>' +
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
      '<a href="#learn">Learn</a> <span aria-hidden="true">/</span> <span>' +
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
      '<div class="topic-card-block"><h2 class="topic-block-title">✓ Key rules</h2><ul class="topic-rules-list">' +
      keyRules +
      "</ul></div>" +
      (mistakes
        ? '<div class="topic-card-block topic-mistakes"><h2 class="topic-block-title">⚠ Common mistakes</h2><ul class="topic-rules-list">' +
          mistakes +
          "</ul></div>"
        : "") +
      (exampleText
        ? '<div class="topic-card-block topic-example"><h2 class="topic-block-title">📋 Example scenario</h2><p>' +
          exampleText +
          "</p></div>"
        : "") +
      (quickChecks
        ? '<div class="topic-card-block topic-quiz"><h2 class="topic-block-title">❓ Quick check</h2><ul class="topic-rules-list">' +
          quickChecks +
          "</ul></div>"
        : "") +
      "</div>" +
      '<div class="topic-actions">' +
      '<a class="btn btn-primary" href="#practice" data-cat="' +
      (topic.category || "") +
      '">Practise ' +
      escapeHtml(t(topic.title, lang)) +
      " questions &rarr;</a>" +
      '<a class="btn btn-secondary" href="#learn">← All topics</a>' +
      "</div>" +
      (sourceText ? '<p class="topic-source">' + sourceText + "</p>" : "") +
      "</div></section>"
    );
  };
})();

