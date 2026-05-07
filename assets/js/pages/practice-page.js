// KangaLearner — Practice landing page (two-mode entry)
(function () {
  "use strict";

  window.KL_PAGES = window.KL_PAGES || {};

  window.KL_PAGES.practice = function () {
    return (
      '<section class="page-section practice-landing"><div class="container">' +
      '<div class="page-header">' +
      '<p class="page-kicker" data-i18n="practice.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<h1 class="page-title" data-i18n="practice.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="practice.sub"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="mock-mode-grid">' +
      '<div class="mock-mode-card">' +
      '<div class="mock-mode-icon">🧠</div>' +
      '<h2 class="mock-mode-title" data-i18n="practice.cards.questionsTitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="mock-mode-desc" data-i18n="practice.cards.questionsDesc"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<button class="btn btn-primary mock-mode-btn" type="button" data-action="start-practice" data-mode="questions" data-i18n="practice.cards.questionsBtn"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      "</div>" +
      '<div class="mock-mode-card mock-mode-card--featured">' +
      '<div class="mock-mode-badge" data-i18n="practice.cards.mockBadge"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="mock-mode-icon">📚</div>' +
      '<h2 class="mock-mode-title" data-i18n="practice.cards.mockTitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="mock-mode-desc" data-i18n="practice.cards.mockDesc"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<button class="btn btn-secondary mock-mode-btn" type="button" data-action="start-practice" data-mode="practice-mock" data-i18n="practice.cards.mockBtn"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      "</div>" +
      "</div>" +
      '<div class="mock-info"><p data-i18n="practice.note"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>' +
      "</div></section>"
    );
  };
})();
