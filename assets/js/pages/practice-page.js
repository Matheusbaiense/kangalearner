// KangaLearner — Practice landing page (three-mode entry)
(function () {
  "use strict";

  window.KL_PAGES = window.KL_PAGES || {};

  function clamp01(n) {
    if (typeof n !== "number" || !isFinite(n)) return 0;
    if (n < 0) return 0;
    if (n > 1) return 1;
    return n;
  }

  function clamp0to100(n) {
    if (typeof n !== "number" || !isFinite(n)) return 0;
    if (n < 0) return 0;
    if (n > 100) return 100;
    return Math.round(n);
  }

  function getCategoryMetaByKey(key) {
    try {
      var cats =
        window.DW && typeof window.DW.getCategories === "function" ? window.DW.getCategories() : [];
      for (var i = 0; i < cats.length; i++) if (cats[i] && cats[i].key === key) return cats[i];
    } catch (e) {}
    return null;
  }

  function getUiLang() {
    try {
      if (window.KL_STORAGE && typeof window.KL_STORAGE.getLang === "function") {
        var l = window.KL_STORAGE.getLang();
        if (l) return String(l);
      }
    } catch (e) {}
    var cls = "";
    try {
      cls = String(document.body && document.body.className ? document.body.className : "");
    } catch (e2) {
      cls = "";
    }
    if (cls.indexOf("mode-pt") !== -1) return "pt";
    if (cls.indexOf("mode-es") !== -1) return "es";
    return "en";
  }

  function getLocalizedCatLabel(meta, uiLang) {
    if (!meta) return null;
    var d = uiLang === "pt" || uiLang === "es" || uiLang === "en" ? uiLang : "en";
    try {
      if (meta.label && (meta.label[d] || meta.label.en)) return meta.label[d] || meta.label.en;
    } catch (e) {}
    return meta.key || null;
  }

  function computeExamReadiness(stats, bestMockPct, lastExamPct) {
    var answeredUnique =
      stats && typeof stats.answeredUnique === "number" ? stats.answeredUnique : 0;
    var overallAccuracy = stats && typeof stats.accuracy === "number" ? stats.accuracy : 0;

    var coverage = clamp01(answeredUnique / 60) * 100;
    var bestMockScore = typeof bestMockPct === "number" ? bestMockPct : 0;
    var effectiveExamScore = typeof lastExamPct === "number" ? lastExamPct : bestMockScore;

    var weakestAcc =
      stats && typeof stats.weakestTopicAccuracy === "number" ? stats.weakestTopicAccuracy : null;
    var strongestAcc =
      stats && typeof stats.strongestTopicAccuracy === "number"
        ? stats.strongestTopicAccuracy
        : null;
    var spread =
      typeof weakestAcc === "number" && typeof strongestAcc === "number"
        ? Math.max(0, strongestAcc - weakestAcc)
        : 0;
    var consistencyScore = 100 - Math.min(spread, 40);

    var readiness =
      0.3 * overallAccuracy +
      0.25 * bestMockScore +
      0.25 * effectiveExamScore +
      0.1 * coverage +
      0.1 * consistencyScore;

    return clamp0to100(readiness);
  }

  function getReadinessBandKey(score) {
    if (score >= 85) return "practice.readiness.band.ready";
    if (score >= 70) return "practice.readiness.band.nearly";
    if (score >= 50) return "practice.readiness.band.keep";
    return "practice.readiness.band.foundation";
  }

  function getRecommendedNextStep(stats, bestMockPct, lastExamPct) {
    var answered = stats && typeof stats.answered === "number" ? stats.answered : 0;
    var accuracy = stats && typeof stats.accuracy === "number" ? stats.accuracy : 0;
    var weakKey = stats && typeof stats.weakestTopicKey === "string" ? stats.weakestTopicKey : null;
    var weakAcc =
      stats && typeof stats.weakestTopicAccuracy === "number" ? stats.weakestTopicAccuracy : null;
    var readiness = computeExamReadiness(stats, bestMockPct, lastExamPct);

    if (answered <= 0)
      return { key: "practice.nextstep.startTopic", target: "#practice", focus: "topic" };
    if (accuracy < 60)
      return { key: "practice.nextstep.focusTopic", target: "#practice", focus: "topic" };
    if (weakKey && typeof weakAcc === "number" && weakAcc < 55)
      return {
        key: "practice.nextstep.weakTopic",
        target: "#practice",
        focus: "topic",
        weakKey: weakKey
      };
    if (typeof bestMockPct === "number" && bestMockPct >= 80 && readiness >= 80)
      return { key: "practice.nextstep.tryExam", target: "#practice", focus: "exam" };
    if (typeof lastExamPct === "number" && lastExamPct < 80)
      return { key: "practice.nextstep.retryMock", target: "#practice", focus: "practice-mock" };

    return { key: "practice.nextstep.tryMock", target: "#practice", focus: "practice-mock" };
  }

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

    var lastExam = null;
    try {
      if (window.KL_STORAGE && typeof window.KL_STORAGE.getLastExamResults === "function") {
        lastExam = window.KL_STORAGE.getLastExamResults();
      } else {
        lastExam = JSON.parse(localStorage.getItem("kl-last-exam-results") || "null");
      }
    } catch (e3) {
      lastExam = null;
    }
    var lastExamPct = lastExam && typeof lastExam.pct === "number" ? lastExam.pct : null;
    var lastExamLabel = lastExamPct != null ? String(lastExamPct) + "%" : null;

    var weakestTopicKey =
      stats && typeof stats.weakestTopicKey === "string" && stats.weakestTopicKey
        ? stats.weakestTopicKey
        : null;
    var weakestTopicLabel = null;
    if (weakestTopicKey) {
      var uiLang = getUiLang();
      var meta = getCategoryMetaByKey(weakestTopicKey);
      weakestTopicLabel = getLocalizedCatLabel(meta, uiLang) || weakestTopicKey;
    }

    var readinessScore = computeExamReadiness(stats, bestMockPct, lastExamPct);
    var readinessBandKey = getReadinessBandKey(readinessScore);
    var next = getRecommendedNextStep(stats, bestMockPct, lastExamPct);

    var nextKey = "practice.progress.notAvailable";
    if (answered <= 0) nextKey = "practice.progress.empty";
    else if (accuracy >= 80) nextKey = "practice.progress.recommendedNextStep";
    else if (incorrect > 0) nextKey = "practice.progress.recommendedNextStep";

    return {
      stats: stats,
      answered: answered,
      correct: correct,
      incorrect: incorrect,
      accuracy: accuracy,
      bestMockLabel: bestMockLabel,
      bestMockPct: bestMockPct,
      lastExamLabel: lastExamLabel,
      lastExamPct: lastExamPct,
      weakestTopicKey: weakestTopicKey,
      weakestTopicLabel: weakestTopicLabel,
      readinessScore: readinessScore,
      readinessBandKey: readinessBandKey,
      nextStep: next,
      nextKey: nextKey
    };
  }

  function iconSvg(name) {
    if (name === "topic") {
      return (
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
        '<path d="M4 6.5c0-1.4 1.1-2.5 2.5-2.5H20v14H6.5C5.1 18 4 16.9 4 15.5V6.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M20 16H6.5C5.1 16 4 14.9 4 13.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
        "</svg>"
      );
    }
    if (name === "mock") {
      return (
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
        '<path d="M7 7h14v14H7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M3 3h14v14H3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' +
        "</svg>"
      );
    }
    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" fill="none" stroke="currentColor" stroke-width="2"/>' +
      "</svg>"
    );
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
      '<div class="practice-mode-card" data-focus="topic">' +
      '<div class="practice-card-badge" data-i18n="practice.cards.topic.badge"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="practice-card-icon" aria-hidden="true">' +
      iconSvg("topic") +
      "</div>" +
      '<div class="practice-card-micro" data-i18n="practice.cards.topic.micro"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h2 class="practice-card-title" data-i18n="practice.cards.topic.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="practice-card-desc" data-i18n="practice.cards.topic.description"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<button class="btn btn-primary practice-card-cta" type="button" data-action="start-practice" data-mode="topic" data-i18n="practice.cards.topic.cta"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      "</div>" +
      '<div class="practice-mode-card" data-focus="practice-mock">' +
      '<div class="practice-card-badge" data-i18n="practice.cards.mock.badge"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="practice-card-icon" aria-hidden="true">' +
      iconSvg("mock") +
      "</div>" +
      '<div class="practice-card-micro" data-i18n="practice.cards.mock.micro"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h2 class="practice-card-title" data-i18n="practice.cards.mock.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="practice-card-desc" data-i18n="practice.cards.mock.description"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<button class="btn btn-primary practice-card-cta" type="button" data-action="start-practice" data-mode="practice-mock" data-i18n="practice.cards.mock.cta" aria-describedby="kl-practice-mock-hint"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      '<p id="kl-practice-mock-hint" class="mock-exam-hint" hidden data-i18n="practice.cards.mockNeedsQuestions"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="practice-mode-card" data-focus="exam" id="kl-exam-card">' +
      '<div class="practice-card-badge" data-i18n="practice.cards.exam.badge"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="practice-card-icon" aria-hidden="true">' +
      iconSvg("exam") +
      "</div>" +
      '<div class="practice-card-micro" data-i18n="practice.cards.exam.micro"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h2 class="practice-card-title" data-i18n="practice.cards.exam.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="practice-card-desc" data-i18n="practice.cards.exam.description"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<button class="btn btn-primary practice-card-cta" type="button" data-action="start-practice" data-mode="exam" data-i18n="practice.cards.exam.cta" aria-describedby="kl-practice-exam-hint"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      '<p id="kl-practice-exam-hint" class="mock-exam-hint" hidden data-i18n="practice.cards.examNeedsQuestions"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      "</div>" +
      '<div class="practice-tip" role="note"><div class="practice-tip-icon" aria-hidden="true">i</div><p class="practice-tip-text" data-i18n="practice.tip"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>' +
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
          summary.accuracy +
          '%</div><div class="pps-label" data-i18n="practice.progress.accuracy"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div></div>' +
          '<div class="practice-progress-stat"><div class="pps-value">' +
          (summary.bestMockLabel ||
            '<span data-i18n="practice.progress.notAvailable"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span>') +
          '</div><div class="pps-label" data-i18n="practice.progress.bestMock"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div></div>' +
          '<div class="practice-progress-stat"><div class="pps-value">' +
          String(summary.readinessScore) +
          '</div><div class="pps-label" data-i18n="practice.progress.examReadiness"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div></div>' +
          '<div class="practice-progress-stat"><div class="pps-value">' +
          (summary.weakestTopicLabel ||
            '<span data-i18n="practice.progress.notAvailable"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span>') +
          '</div><div class="pps-label" data-i18n="practice.progress.weakestTopic"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div></div>' +
          '<div class="practice-progress-stat"><div class="pps-value"><span data-i18n="' +
          summary.nextStep.key +
          '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div><div class="pps-label" data-i18n="practice.progress.nextStep"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div></div>' +
          "</div>"
        : '<div class="practice-progress-empty"><p data-i18n="practice.progress.empty"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>') +
      '<div class="practice-progress-actions">' +
      '<a class="btn btn-secondary btn-sm" href="#progress" data-i18n="practice.progress.viewFull"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      "</div>" +
      "</section>" +
      '<section class="practice-readiness-panel" aria-labelledby="practice-readiness-title">' +
      '<div class="practice-readiness-header">' +
      '<h2 id="practice-readiness-title" class="practice-readiness-title" data-i18n="practice.readiness.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="practice-readiness-desc" data-i18n="practice.readiness.description"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      (hasProgress
        ? '<div class="practice-readiness-body">' +
          '<div class="readiness-score"><div class="rs-value">' +
          String(summary.readinessScore) +
          '</div><div class="rs-label" data-i18n="practice.readiness.scoreLabel"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div></div>' +
          '<div class="readiness-band"><div class="rb-label" data-i18n="' +
          summary.readinessBandKey +
          '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div></div>' +
          '<div class="readiness-next"><div class="rn-label" data-i18n="practice.readiness.nextLabel"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
          '<div class="rn-value"><span data-i18n="' +
          summary.nextStep.key +
          '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
          "</div>" +
          "</div>"
        : '<div class="practice-progress-empty"><p data-i18n="practice.progress.empty"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>') +
      "</section>" +
      "</div></section>"
    );
  };
})();
