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
        '<span class="mock-last-label">Last attempt — ' +
        lastResults.correct +
        "/" +
        lastResults.total +
        "</span>" +
        '<a href="#mock-results" class="mock-last-link">View full results →</a>' +
        "</div>"
      : "";

    return (
      '<section class="page-section mock-setup"><div class="container">' +
      '<div class="page-header"><p class="page-kicker">Simulated exam</p><h1 class="page-title">Mock Test</h1>' +
      '<p class="page-sub">Choose how you want to practise. Both modes use real test questions in random order.</p></div>' +
      lastBadge +
      '<div class="mock-mode-grid">' +
      '<div class="mock-mode-card">' +
      '<div class="mock-mode-icon">📚</div><h2 class="mock-mode-title">Practice Mock</h2>' +
      '<p class="mock-mode-desc">See the correct answer and explanation after each question. Great for learning as you go.</p>' +
      '<ul class="mock-mode-features"><li>Immediate feedback per question</li><li>Explanations shown</li><li>No time pressure</li></ul>' +
      '<button class="btn btn-secondary mock-mode-btn" data-action="start-mock" data-mode="practice">Start Practice Mock</button>' +
      "</div>" +
      '<div class="mock-mode-card mock-mode-card--featured">' +
      '<div class="mock-mode-badge">Exam Simulation</div>' +
      '<div class="mock-mode-icon">⏱</div><h2 class="mock-mode-title">Exam Mode</h2>' +
      '<p class="mock-mode-desc">No feedback until the end — just like the real test. See your result and weak areas when you finish.</p>' +
      '<ul class="mock-mode-features"><li>No hints during the test</li><li>Full results at the end</li><li>Category breakdown</li></ul>' +
      '<button class="btn btn-primary mock-mode-btn" data-action="start-mock" data-mode="exam">Start Exam Mode</button>' +
      "</div>" +
      "</div>" +
      '<div class="mock-info"><p>ℹ️ The mock test uses 30 questions drawn from the official question bank for your selected state.</p></div>' +
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

