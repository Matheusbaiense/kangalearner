// KangaLearner — Mock Test setup + results page renderer
(function () {
  "use strict";

  window.KL_PAGES = window.KL_PAGES || {};

  window.KL_PAGES.mock = function () {
    var lastResults = null;
    try {
      lastResults = JSON.parse(localStorage.getItem("kl-last-mock-results") || "null");
    } catch (e) {}

    var lastBadge = lastResults
      ? '<div class="mock-last-result">' +
        '<span class="mock-last-score">' +
        lastResults.pct +
        "%</span>" +
        '<span class="mock-last-label" data-i18n="mock.lastAttempt"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span> — ' +
        lastResults.correct +
        "/" +
        lastResults.total +
        "</span>" +
        '<a href="#mock-results" class="mock-last-link" data-i18n="mock.viewResults"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span> →</a>' +
        "</div>"
      : "";

    return (
      '<section class="page-section mock-setup"><div class="container">' +
      '<div class="page-header"><p class="page-kicker" data-i18n="mock.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p><h1 class="page-title" data-i18n="mock.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="mock.sub"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>' +
      lastBadge +
      '<div class="mock-mode-grid">' +
      '<div class="mock-mode-card">' +
      '<div class="mock-mode-icon">📚</div><h2 class="mock-mode-title" data-i18n="mock.practiceTitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="mock-mode-desc" data-i18n="mock.practiceDesc"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<ul class="mock-mode-features">' +
      '<li data-i18n="mock.practiceFeat1"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></li>' +
      '<li data-i18n="mock.practiceFeat2"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></li>' +
      '<li data-i18n="mock.practiceFeat3"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></li>' +
      "</ul>" +
      '<button class="btn btn-secondary mock-mode-btn" data-action="start-mock" data-mode="practice" data-i18n="mock.practiceBtn"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      "</div>" +
      '<div class="mock-mode-card mock-mode-card--featured">' +
      '<div class="mock-mode-badge" data-i18n="mock.examBadge"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="mock-mode-icon">⏱</div><h2 class="mock-mode-title" data-i18n="mock.examTitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="mock-mode-desc" data-i18n="mock.examDesc"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<ul class="mock-mode-features">' +
      '<li data-i18n="mock.examFeat1"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></li>' +
      '<li data-i18n="mock.examFeat2"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></li>' +
      '<li data-i18n="mock.examFeat3"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></li>' +
      "</ul>" +
      '<button class="btn btn-primary mock-mode-btn" data-action="start-mock" data-mode="exam" data-i18n="mock.examBtn"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      "</div>" +
      "</div>" +
      '<div class="mock-info"><p data-i18n="mock.info"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>' +
      "</div></section>"
    );
  };

  window.KL_PAGES.mockResults = function () {
    var results = null;
    try {
      results = JSON.parse(localStorage.getItem("kl-last-mock-results") || "null");
    } catch (e) {}

    if (!results) {
      return (
        '<section class="page-section mock-results"><div class="container">' +
        '<h1 class="page-title">Mock Test Results</h1>' +
        '<p>No results yet. <a href="#mock">Take a mock test</a> to see your results here.</p>' +
        "</div></section>"
      );
    }

    var pct = results.pct || 0;
    var passed = pct >= 80;
    var statusClass = passed ? "result-pass" : pct >= 60 ? "result-warn" : "result-fail";
    var statusLabel = passed ? "Pass" : "Needs improvement";
    var statusMsg = passed
      ? "Excellent — you're on track for the real test!"
      : pct >= 60
        ? "Good progress. Keep practising to build confidence."
        : "Keep studying — focused practice on your weak areas will help.";

    return (
      '<section class="page-section mock-results"><div class="container">' +
      '<div class="page-header"><h1 class="page-title">Mock Test Results</h1></div>' +
      '<div class="result-summary ' +
      statusClass +
      '">' +
      '<div class="result-score">' +
      pct +
      '<span class="result-pct-sign">%</span></div>' +
      '<div class="result-status">' +
      statusLabel +
      "</div>" +
      '<div class="result-counts">' +
      results.correct +
      " correct — " +
      results.wrong +
      " incorrect — " +
      results.total +
      " total</div>" +
      '<p class="result-msg">' +
      statusMsg +
      "</p>" +
      "</div>" +
      '<div class="result-actions"><a href="#mock" class="btn btn-primary">Take another test</a>' +
      '<a href="#practice" class="btn btn-secondary">Practise questions</a></div>' +
      "</div></section>"
    );
  };
})();

