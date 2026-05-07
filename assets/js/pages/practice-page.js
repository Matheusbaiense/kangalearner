// KangaLearner — Practice landing page (three-mode entry)
(function () {
  "use strict";

  window.KL_PAGES = window.KL_PAGES || {};

  function computePracticeSummary() {
    var stats = null;
    try {
      if (window.KL_STORAGE && typeof window.KL_STORAGE.getStats === "function") {
        stats = window.KL_STORAGE.getStats(window.QUESTIONS || []);
      }
    } catch (e) {
      stats = null;
    }

    var answered = stats && typeof stats.answered === "number" ? stats.answered : 0;
    var correct = stats && typeof stats.correct === "number" ? stats.correct : 0;
    var incorrect = stats && typeof stats.incorrect === "number" ? stats.incorrect : 0;
    var accuracy = stats && typeof stats.accuracy === "number" ? stats.accuracy : 0;

    var lastMock = null;
    try {
      if (window.KL_STORAGE && typeof window.KL_STORAGE.getLastMockResults === "function") {
        lastMock = window.KL_STORAGE.getLastMockResults();
      } else {
        lastMock = JSON.parse(localStorage.getItem("kl-last-mock-results") || "null");
      }
    } catch (e2) {
      lastMock = null;
    }

    var bestMockPct = lastMock && typeof lastMock.pct === "number" ? lastMock.pct : null;
    var bestMockLabel = bestMockPct != null ? String(bestMockPct) + "%" : null;

    var nextKey = "practice.progress.notAvailable";
    if (answered <= 0) nextKey = "practice.progress.empty";
    else if (accuracy >= 80) nextKey = "practice.progress.recommendedNextStep";
    else if (incorrect > 0) nextKey = "practice.progress.recommendedNextStep";

    return {
      answered: answered,
      correct: correct,
      incorrect: incorrect,
      accuracy: accuracy,
      bestMockLabel: bestMockLabel,
      nextKey: nextKey
    };
  }

  window.KL_PAGES.practice = function () {
    var summary = computePracticeSummary();
    var hasProgress = summary.answered > 0;
    return (
      '<section class="page-section practice-landing"><div class="container">' +
      '<div class="page-header">' +
      '<p class="page-kicker" data-i18n="practice.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<h1 class="page-title" data-i18n="practice.page.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="practice.page.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="practice-path" role="note">' +
      '<span class="practice-path-label" data-i18n="practice.path.label"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span> ' +
      '<span class="practice-path-steps" data-i18n="practice.path.steps"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span>' +
      "</div>" +
      '<div class="practice-mode-grid">' +
      '<div class="practice-mode-card">' +
      '<div class="practice-mode-icon">🧠</div>' +
      '<div class="mode-label" data-i18n="practice.questions.label"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h2 class="practice-mode-title" data-i18n="practice.questions.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="practice-mode-desc" data-i18n="practice.questions.description"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<button class="btn btn-primary practice-mode-btn" type="button" data-action="start-practice" data-mode="questions" data-i18n="practice.questions.cta"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      "</div>" +
      '<div class="practice-mode-card is-featured">' +
      '<div class="mode-badge" data-i18n="practice.cards.mockBadge"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="practice-mode-icon">📚</div>' +
      '<div class="mode-label" data-i18n="practice.mock.label"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h2 class="practice-mode-title" data-i18n="practice.mock.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="practice-mode-desc" data-i18n="practice.mock.description"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<button class="btn btn-secondary practice-mode-btn" type="button" data-action="start-practice" data-mode="practice-mock" data-i18n="practice.mock.cta" aria-describedby="kl-practice-mock-hint"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      '<p id="kl-practice-mock-hint" class="mock-exam-hint" hidden data-i18n="practice.cards.mockNeedsQuestions"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="practice-mode-card is-exam" id="kl-exam-card">' +
      '<div class="mode-badge" data-i18n="practice.cards.examBadge"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="practice-mode-icon">⏱</div>' +
      '<div class="mode-label" data-i18n="practice.exam.label"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h2 class="practice-mode-title" data-i18n="practice.exam.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="practice-mode-desc" data-i18n="practice.exam.description"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<button class="btn btn-primary practice-mode-btn" type="button" data-action="start-practice" data-mode="exam" data-i18n="practice.exam.cta" aria-describedby="kl-practice-exam-hint"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      '<p id="kl-practice-exam-hint" class="mock-exam-hint" hidden data-i18n="practice.cards.examNeedsQuestions"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      "</div>" +
      '<div class="practice-tip" role="note"><p data-i18n="practice.tip"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>' +
      '<section class="practice-progress-panel" aria-labelledby="practice-progress-title">' +
      '<div class="practice-progress-header">' +
      '<h2 id="practice-progress-title" class="practice-progress-title" data-i18n="practice.progress.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="practice-progress-desc" data-i18n="practice.progress.description"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      (hasProgress
        ? '<div class="practice-progress-grid">' +
          '<div class="practice-progress-stat"><div class="pps-value">' +
          summary.answered +
          '</div><div class="pps-label" data-i18n="practice.progress.answered"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div></div>' +
          '<div class="practice-progress-stat"><div class="pps-value">' +
          summary.correct +
          '</div><div class="pps-label" data-i18n="practice.progress.correct"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div></div>' +
          '<div class="practice-progress-stat"><div class="pps-value">' +
          summary.incorrect +
          '</div><div class="pps-label" data-i18n="practice.progress.incorrect"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div></div>' +
          '<div class="practice-progress-stat"><div class="pps-value">' +
          summary.accuracy +
          '%</div><div class="pps-label" data-i18n="practice.progress.accuracy"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div></div>' +
          '<div class="practice-progress-stat"><div class="pps-value">' +
          (summary.bestMockLabel ||
            '<span data-i18n="practice.progress.notAvailable"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span>') +
          '</div><div class="pps-label" data-i18n="practice.progress.bestMock"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div></div>' +
          "</div>"
        : '<div class="practice-progress-empty"><p data-i18n="practice.progress.empty"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>') +
      '<div class="practice-progress-actions">' +
      '<a class="btn btn-secondary btn-sm" href="#progress" data-i18n="practice.progress.viewFull"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      "</div>" +
      "</section>" +
      "</div></section>"
    );
  };
})();
