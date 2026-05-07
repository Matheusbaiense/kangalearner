// KangaLearner — Progress page renderer
(function () {
  "use strict";

  function getAnswered() {
    var byState = {};
    try {
      if (window.KL_STORAGE && typeof window.KL_STORAGE.getAnswers === "function") {
        byState = window.KL_STORAGE.getAnswers() || {};
      } else {
        var raw =
          window.KangaStorage && window.KangaStorage.getAnsweredByStateRaw
            ? window.KangaStorage.getAnsweredByStateRaw()
            : null;
        if (typeof raw === "string") {
          byState = JSON.parse(raw);
        } else if (raw && typeof raw === "object") {
          byState = raw;
        }
      }
    } catch (e) {}
    if (window.DW && window.DW.answered && Object.keys(window.DW.answered).length > 0) {
      var state =
        (window.KL_STORAGE && window.KL_STORAGE.getState && window.KL_STORAGE.getState()) ||
        (window.KangaStorage && window.KangaStorage.getState && window.KangaStorage.getState()) ||
        "WA";
      byState[state] = byState[state] || {};
      Object.assign(byState[state], window.DW.answered);
    }
    return byState;
  }

  function questionIndex() {
    var qs = window.QUESTIONS || [];
    var byId = {};
    qs.forEach(function (q) {
      if (q && q.id) byId[q.id] = q;
    });
    return byId;
  }

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

  window.KL_PAGES.progress = function () {
    var currentState =
      (window.KL_STORAGE && window.KL_STORAGE.getState && window.KL_STORAGE.getState()) ||
      (window.KangaStorage && window.KangaStorage.getState && window.KangaStorage.getState()) ||
      "WA";

    var stats = null;
    if (window.KL_STORAGE && typeof window.KL_STORAGE.getStats === "function") {
      stats = window.KL_STORAGE.getStats(window.QUESTIONS || []);
    }
    if (!stats) {
      // Fallback to legacy computation.
      var byState = getAnswered();
      var answered = byState[currentState] || {};
      var qids = Object.keys(answered);
      var total = qids.length;
      var correct = 0;
      qids.forEach(function (qid) {
        var a = answered[qid];
        if (a && a.correct) correct++;
      });
      stats = {
        state: currentState,
        totalQuestions: (window.QUESTIONS || []).length,
        answered: total,
        correct: correct,
        incorrect: total - correct,
        unanswered: 0,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
        byCategory: {}
      };
    }

    var answeredCount = stats.answered || 0;
    var correctCount = stats.correct || 0;
    var wrong = stats.incorrect || 0;
    var pct = stats.accuracy || 0;

    var byCat = stats.byCategory || {};
    var catRows = Object.keys(byCat)
      .sort()
      .map(function (cat) {
        var row = byCat[cat] || { answered: 0, correct: 0, total: 0 };
        var p = row.answered > 0 ? Math.round((row.correct / row.answered) * 100) : 0;
        return { cat: cat, answered: row.answered || 0, correct: row.correct || 0, pct: p };
      })
      .filter(function (r) {
        return r.answered > 0;
      });

    var weakCats = catRows.filter(function (r) {
      return r.pct < 70;
    });

    var recommended = "";
    if (stats.unanswered && stats.unanswered > 0) {
      recommended = "progress.nextUnanswered";
    } else if (wrong > 0) {
      recommended = "progress.nextReviewWrong";
    } else if (pct >= 80 && answeredCount > 0) {
      recommended = "progress.nextMock";
    } else if (answeredCount > 0) {
      recommended = "progress.nextKeepGoing";
    }

    var weakBlock =
      weakCats.length > 0
        ? '<div class="progress-weak-callout" role="status"><p><strong data-i18n="progress.weakHead"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></strong></p><p>' +
          weakCats
            .map(function (r) {
              return (
                '<a href="#practice-run" class="progress-weak-link" data-cat="' +
                String(r.cat).replace(/"/g, "&quot;") +
                '">' +
                catLabel(r.cat) +
                " (" +
                r.pct +
                "%)</a>"
              );
            })
            .join(", ") +
          "</p></div>"
        : "";

    var tableBlock = "";
    if (answeredCount > 0 && catRows.length > 0) {
      var thead =
        '<thead><tr><th data-i18n="progress.colCat"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></th>' +
        '<th data-i18n="progress.colAnswered"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></th>' +
        '<th data-i18n="progress.colCorrect"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></th>' +
        '<th data-i18n="progress.colPct"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></th></tr></thead>';
      var tbody =
        "<tbody>" +
        catRows
          .map(function (r) {
            return (
              "<tr><td>" +
              catLabel(r.cat) +
              "</td><td>" +
              r.answered +
              "</td><td>" +
              r.correct +
              "</td><td>" +
              r.pct +
              "%</td></tr>"
            );
          })
          .join("") +
        "</tbody>";
      tableBlock =
        '<div class="progress-cat-wrap"><h2 class="progress-cat-title" data-i18n="progress.catPerf"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
        '<table class="progress-cat-table">' +
        thead +
        tbody +
        "</table></div>";
    }

    var emptyState =
      answeredCount === 0
        ? '<div class="progress-empty"><p data-i18n="progress.emptyHint"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p><a href="#practice-run" class="btn btn-primary" data-i18n="progress.startPractice"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>'
        : "";

    return (
      '<section class="page-section progress-page"><div class="container">' +
      '<div class="page-header"><a class="breadcrumb" href="#practice" data-i18n="practice.progress.backToPractice"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a><p class="page-kicker">' +
      currentState +
      '<span data-i18n="progress.pageKickerSuffix"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></p><h1 class="page-title" data-i18n="progress.pageTitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1></div>' +
      emptyState +
      (answeredCount > 0
        ? '<div class="progress-summary">' +
          '<div class="progress-stat"><span class="stat-value">' +
          answeredCount +
          '</span><span class="stat-label" data-i18n="progress.colAnswered"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
          '<div class="progress-stat progress-stat--correct"><span class="stat-value">' +
          correctCount +
          '</span><span class="stat-label" data-i18n="progress.correct"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
          '<div class="progress-stat progress-stat--wrong"><span class="stat-value">' +
          wrong +
          '</span><span class="stat-label" data-i18n="progress.incorrect"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
          '<div class="progress-stat progress-stat--pct"><span class="stat-value">' +
          pct +
          '%</span><span class="stat-label" data-i18n="progress.accuracy"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
          "</div>" +
          (recommended
            ? '<div class="progress-next" role="status"><strong data-i18n="progress.nextHead"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></strong> <span data-i18n="' +
              recommended +
              '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>'
            : "") +
          tableBlock +
          weakBlock
        : "") +
      "</div></section>"
    );
  };
})();
