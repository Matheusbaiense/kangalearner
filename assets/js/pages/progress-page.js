// KangaLearner — Progress page renderer
(function () {
  "use strict";

  function getAnswered() {
    var byState = {};
    try {
      var raw =
        window.KangaStorage && window.KangaStorage.getAnsweredByStateRaw
          ? window.KangaStorage.getAnsweredByStateRaw()
          : null;
      if (typeof raw === "string") {
        byState = JSON.parse(raw);
      } else if (raw && typeof raw === "object") {
        byState = raw;
      }
    } catch (e) {}
    if (window.DW && window.DW.answered && Object.keys(window.DW.answered).length > 0) {
      var state = (window.KangaStorage && window.KangaStorage.getState()) || "WA";
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

  window.KL_PAGES = window.KL_PAGES || {};

  window.KL_PAGES.progress = function () {
    var byState = getAnswered();
    var currentState = (window.KangaStorage && window.KangaStorage.getState()) || "WA";
    var answered = byState[currentState] || {};
    var qids = Object.keys(answered);
    var total = qids.length;
    var correct = 0;

    qids.forEach(function (qid) {
      var a = answered[qid];
      if (a && a.correct) correct++;
    });

    var wrong = total - correct;
    var pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    var qById = questionIndex();
    var byCat = {};
    qids.forEach(function (qid) {
      var q = qById[qid];
      var cat = q && q.cat ? q.cat : "Other";
      if (!byCat[cat]) byCat[cat] = { answered: 0, correct: 0 };
      byCat[cat].answered++;
      if (answered[qid] && answered[qid].correct) byCat[cat].correct++;
    });

    var catRows = Object.keys(byCat)
      .sort()
      .map(function (cat) {
        var row = byCat[cat];
        var p = row.answered > 0 ? Math.round((row.correct / row.answered) * 100) : 0;
        return { cat: cat, answered: row.answered, correct: row.correct, pct: p };
      });

    var weakCats = catRows.filter(function (r) {
      return r.answered > 0 && r.pct < 70;
    });

    var weakBlock =
      weakCats.length > 0
        ? '<div class="progress-weak-callout" role="status"><p><strong data-i18n="progress.weakHead"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></strong></p><p>' +
          weakCats
            .map(function (r) {
              return (
                '<a href="#practice" class="progress-weak-link" data-cat="' +
                String(r.cat).replace(/"/g, "&quot;") +
                '">' +
                r.cat +
                " (" +
                r.pct +
                "%)</a>"
              );
            })
            .join(", ") +
          "</p></div>"
        : "";

    var tableBlock = "";
    if (total > 0 && catRows.length > 0) {
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
              r.cat +
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
      total === 0
        ? '<div class="progress-empty"><p data-i18n="progress.emptyHint"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p><a href="#practice" class="btn btn-primary" data-i18n="progress.startPractice"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>'
        : "";

    return (
      '<section class="page-section progress-page"><div class="container">' +
      '<div class="page-header"><p class="page-kicker">' +
      currentState +
      '<span data-i18n="progress.pageKickerSuffix"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></p><h1 class="page-title" data-i18n="progress.pageTitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1></div>' +
      emptyState +
      (total > 0
        ? '<div class="progress-summary">' +
          '<div class="progress-stat"><span class="stat-value">' +
          total +
          '</span><span class="stat-label" data-i18n="progress.colAnswered"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
          '<div class="progress-stat progress-stat--correct"><span class="stat-value">' +
          correct +
          '</span><span class="stat-label" data-i18n="progress.correct"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
          '<div class="progress-stat progress-stat--wrong"><span class="stat-value">' +
          wrong +
          '</span><span class="stat-label" data-i18n="progress.incorrect"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
          '<div class="progress-stat progress-stat--pct"><span class="stat-value">' +
          pct +
          '%</span><span class="stat-label" data-i18n="progress.accuracy"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
          "</div>" +
          tableBlock +
          weakBlock
        : "") +
      "</div></section>"
    );
  };
})();
