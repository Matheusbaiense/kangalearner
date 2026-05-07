// KangaLearner — Mock Test setup + results page renderer
(function () {
  "use strict";

  function displayLang() {
    try {
      var raw =
        (window.KL_I18N && window.KL_I18N.getLang && window.KL_I18N.getLang()) ||
        (window.DW && window.DW.lang) ||
        "en";
      if (window.KL_I18N && window.KL_I18N.getDisplayLang) {
        return window.KL_I18N.getDisplayLang(raw);
      }
      return raw;
    } catch (e) {
      return "en";
    }
  }

  function catLabel(cat) {
    var lang = displayLang();
    if (window.KANGA_CATEGORIES && typeof window.KANGA_CATEGORIES.getCategoryLabel === "function") {
      return window.KANGA_CATEGORIES.getCategoryLabel(cat, lang);
    }
    return cat;
  }

  window.KL_PAGES = window.KL_PAGES || {};

  window.KL_PAGES.mock = function () {
    var lastResults = null;
    try {
      if (window.KL_STORAGE && typeof window.KL_STORAGE.getLastMockResults === "function") {
        lastResults = window.KL_STORAGE.getLastMockResults();
      } else {
        lastResults = JSON.parse(localStorage.getItem("kl-last-mock-results") || "null");
      }
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
      '<div class="mock-exam-timer-option">' +
      '<label class="mock-timer-label"><input type="checkbox" id="kl-exam-real-timer" /> <span data-i18n="mock.examTimerToggle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></label>' +
      '<p class="mock-timer-hint" data-i18n="mock.examTimerHint"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="mock-mode-grid">' +
      '<div class="mock-mode-card">' +
      '<div class="mock-mode-icon">📚</div><h2 class="mock-mode-title" data-i18n="mock.practiceTitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="mock-mode-desc" data-i18n="mock.practiceDesc"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<ul class="mock-mode-features">' +
      '<li data-i18n="mock.practiceFeat1"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></li>' +
      '<li data-i18n="mock.practiceFeat2"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></li>' +
      '<li data-i18n="mock.practiceFeat3"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></li>' +
      "</ul>" +
      '<button class="btn btn-primary mock-mode-btn" data-action="start-mock" data-mode="practice" data-i18n="mock.practiceBtn"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
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
      '<button class="btn btn-secondary mock-mode-btn" data-action="start-mock" data-mode="exam" data-i18n="mock.examBtn"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      '<p id="kl-mock-exam-hint" class="mock-exam-hint" hidden data-i18n="mock.examNeedsQuestions"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      "</div>" +
      '<div class="mock-info"><p data-i18n="mock.info"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>' +
      "</div></section>"
    );
  };

  window.KL_PAGES.mockResults = function () {
    var results = null;
    try {
      if (window.KL_STORAGE && typeof window.KL_STORAGE.getLastMockResults === "function") {
        results = window.KL_STORAGE.getLastMockResults();
      } else {
        results = JSON.parse(localStorage.getItem("kl-last-mock-results") || "null");
      }
    } catch (e) {}

    if (!results) {
      return (
        '<section class="page-section mock-results"><div class="container">' +
        '<div class="page-header"><h1 class="page-title" data-i18n="mock.resultsTitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1></div>' +
        '<p data-i18n="mock.resultsEmpty"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span> <a href="#mock" data-i18n="mock.resultsEmptyCta"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></p>' +
        "</div></section>"
      );
    }

    var pct = results.pct || 0;
    var passed = pct >= 80;
    var statusClass = passed ? "result-pass" : pct >= 60 ? "result-warn" : "result-fail";
    var statusKey = passed
      ? "mock.resultsStatusPass"
      : pct >= 60
        ? "mock.resultsStatusMid"
        : "mock.resultsStatusLow";
    var msgKey = passed
      ? "mock.resultsMsgPass"
      : pct >= 60
        ? "mock.resultsMsgMid"
        : "mock.resultsMsgLow";

    var timeRow = "";
    if (results.timeSpentSec != null && results.timeSpentSec >= 0) {
      var m = Math.floor(results.timeSpentSec / 60);
      var s = results.timeSpentSec % 60;
      var ts = m + ":" + (s < 10 ? "0" : "") + s;
      timeRow =
        '<p class="result-time"><span data-i18n="mock.resultsElapsed"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span> <strong>' +
        ts +
        "</strong></p>";
    }

    var catRows = "";
    var bc = results.byCategory || {};
    var cats = Object.keys(bc).sort();
    if (cats.length > 0) {
      catRows =
        '<div class="mock-results-cat"><h2 data-i18n="mock.resultsCatBreakdown"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2><table class="progress-cat-table"><thead><tr><th data-i18n="progress.colCat"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></th><th data-i18n="mock.resultsCatPct"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></th></tr></thead><tbody>';
      cats.forEach(function (c) {
        var row = bc[c];
        var t = row.total || 0;
        var cr = row.correct || 0;
        var cp = t > 0 ? Math.round((cr / t) * 100) : 0;
        catRows += "<tr><td>" + catLabel(c) + "</td><td>" + cp + "%</td></tr>";
      });
      catRows += "</tbody></table></div>";
    }

    var weakCat = "";
    var worst = null;
    var worstPct = 101;
    cats.forEach(function (c) {
      var row = bc[c];
      var t = row.total || 0;
      var cr = row.correct || 0;
      var cp = t > 0 ? Math.round((cr / t) * 100) : 0;
      if (t > 0 && cp < worstPct) {
        worstPct = cp;
        worst = c;
      }
    });
    if (worst != null && worstPct < 100) {
      weakCat =
        '<a href="#practice" class="btn btn-secondary mock-redo-cat" data-cat="' +
        String(worst).replace(/"/g, "&quot;") +
        '" data-i18n="mock.resultsRedoMistakes"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>';
    }

    return (
      '<section class="page-section mock-results"><div class="container">' +
      '<div class="page-header"><h1 class="page-title" data-i18n="mock.resultsTitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1></div>' +
      '<div class="result-summary ' +
      statusClass +
      '">' +
      '<div class="result-score">' +
      pct +
      '<span class="result-pct-sign">%</span></div>' +
      '<div class="result-status" data-i18n="' +
      statusKey +
      '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="result-counts">' +
      "<span><strong>" +
      results.correct +
      '</strong> <span data-i18n="progress.correct"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></span> · ' +
      "<span><strong>" +
      results.wrong +
      '</strong> <span data-i18n="progress.incorrect"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></span> · ' +
      "<span><strong>" +
      results.total +
      '</strong> <span data-i18n="mock.resultsTotalQs"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></span></div>' +
      timeRow +
      '<p class="result-msg" data-i18n="' +
      msgKey +
      '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      catRows +
      '<div class="result-actions"><a href="#mock" class="btn btn-primary" data-i18n="mock.resultsAgain"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      '<a href="#practice" class="btn btn-secondary" data-i18n="mock.resultsPractice"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      weakCat +
      "</div>" +
      "</div></section>"
    );
  };
})();
