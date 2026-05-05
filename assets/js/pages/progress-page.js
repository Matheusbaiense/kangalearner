// KangaLearner — Progress page renderer
(function () {
  "use strict";

  function getAnswered() {
    var byState = {};
    try {
      var raw =
        window.KangaStorage && window.KangaStorage.getAnsweredByStateRaw
          ? window.KangaStorage.getAnsweredByStateRaw()
          : localStorage.getItem("kl-answered-by-state-v2");
      if (raw) byState = JSON.parse(raw);
    } catch (e) {}
    if (window.DW && window.DW.answered && Object.keys(window.DW.answered).length > 0) {
      var state = (window.KangaStorage && window.KangaStorage.getState()) || "WA";
      byState[state] = byState[state] || {};
      Object.assign(byState[state], window.DW.answered);
    }
    return byState;
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

    var emptyState =
      total === 0
        ? '<div class="progress-empty"><p>No practice data yet for ' +
          currentState +
          '.</p><a href="#practice" class="btn btn-primary">Start practising</a></div>'
        : "";

    return (
      '<section class="page-section progress-page"><div class="container">' +
      '<div class="page-header"><p class="page-kicker">' +
      currentState +
      ' — Your progress</p><h1 class="page-title">Progress Tracker</h1></div>' +
      emptyState +
      (total > 0
        ? '<div class="progress-summary">' +
          '<div class="progress-stat"><span class="stat-value">' +
          total +
          '</span><span class="stat-label">Answered</span></div>' +
          '<div class="progress-stat progress-stat--correct"><span class="stat-value">' +
          correct +
          '</span><span class="stat-label">Correct</span></div>' +
          '<div class="progress-stat progress-stat--wrong"><span class="stat-value">' +
          wrong +
          '</span><span class="stat-label">Incorrect</span></div>' +
          '<div class="progress-stat progress-stat--pct"><span class="stat-value">' +
          pct +
          '%</span><span class="stat-label">Accuracy</span></div>' +
          "</div>"
        : "") +
      "</div></section>"
    );
  };
})();
