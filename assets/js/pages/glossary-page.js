// KangaLearner — Glossary page renderer
(function () {
  "use strict";

  function terms() {
    return Array.isArray(window.KL_GLOSSARY) ? window.KL_GLOSSARY : [];
  }

  function getLang() {
    try {
      return (
        (window.KL_I18N && window.KL_I18N.getLang && window.KL_I18N.getLang()) ||
        (window.DW && window.DW.lang) ||
        "en"
      );
    } catch (e) {
      return "en";
    }
  }

  function displayLang(lang) {
    if (window.KL_I18N && typeof window.KL_I18N.getDisplayLang === "function")
      return window.KL_I18N.getDisplayLang(lang);
    return String(lang).startsWith("pt") ? "pt" : String(lang).startsWith("es") ? "es" : "en";
  }

  function bilingualLine(main, tr) {
    if (tr && tr !== main) {
      return (
        String(main || "") +
        '<span class="translation-line" lang="en">' +
        String(tr || "") +
        "</span>"
      );
    }
    return String(main || "");
  }

  function termDef(term, rawLang) {
    var d = displayLang(rawLang);
    var t =
      window.KL_I18N && window.KL_I18N.getTranslationLang
        ? window.KL_I18N.getTranslationLang(rawLang)
        : null;
    var main = term && term.meaning ? term.meaning[d] || term.meaning.en || "" : "";
    var tr = t && term && term.meaning ? term.meaning[t] || "" : "";
    return bilingualLine(main, tr);
  }

  window.KL_PAGES = window.KL_PAGES || {};

  window.KL_PAGES.glossary = function () {
    var lang = getLang();
    var items = terms()
      .map(function (term) {
        return (
          '<div class="glossary-item">' +
          '<dt class="glossary-term">' +
          term.term +
          "</dt>" +
          '<dd class="glossary-def">' +
          termDef(term, lang) +
          "</dd>" +
          "</div>"
        );
      })
      .join("");

    return (
      '<section class="page-section glossary-page"><div class="container">' +
      '<div class="page-header"><p class="page-kicker" data-i18n="glossary.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<h1 class="page-title" data-i18n="glossary.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="glossary.sub"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>' +
      '<dl class="glossary-list">' +
      items +
      "</dl>" +
      '<div class="page-footer-actions"><a href="#practice-run" class="btn btn-primary" data-i18n="glossary.ctaPractice"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      '<a href="#learn" class="btn btn-secondary" data-i18n="glossary.ctaLearn"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      "</div></section>"
    );
  };
})();
