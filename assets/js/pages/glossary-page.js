// KangaLearner — Glossary page renderer
(function () {
  "use strict";

  var TERMS = [
    {
      term: "BAC",
      en: "Blood Alcohol Concentration — the percentage of alcohol in your blood. Learner drivers must have 0.00 BAC.",
      pt: "Concentração de Álcool no Sangue — porcentagem de álcool no sangue. Motoristas aprendizes devem ter 0,00 BAC.",
      es: "Concentración de Alcohol en Sangre — porcentaje de alcohol en la sangre. Los conductores aprendices deben tener 0,00 BAC.",
    },
    {
      term: "Give Way",
      en: "You must slow down and let other vehicles or pedestrians pass before you proceed.",
      pt: "Você deve reduzir a velocidade e deixar outros veículos ou pedestres passarem antes de prosseguir.",
      es: "Debe reducir la velocidad y dejar pasar a otros vehículos o peatones antes de continuar.",
    },
  ];

  function getLang() {
    try {
      return (window.DW && window.DW.lang) || "en";
    } catch (e) {
      return "en";
    }
  }

  function termDef(term, lang) {
    var key = lang === "pt" ? "pt" : lang === "es" ? "es" : "en";
    return term[key] || term["en"];
  }

  window.KL_PAGES = window.KL_PAGES || {};

  window.KL_PAGES.glossary = function () {
    var lang = getLang();
    var items = TERMS.map(function (term) {
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
    }).join("");

    return (
      '<section class="page-section glossary-page"><div class="container">' +
      '<div class="page-header"><p class="page-kicker">Road rules vocabulary</p>' +
      '<h1 class="page-title">Glossary</h1>' +
      '<p class="page-sub">Key terms you\'ll encounter in the Australian learner driver test.</p></div>' +
      '<dl class="glossary-list">' +
      items +
      "</dl>" +
      '<div class="page-footer-actions"><a href="#practice" class="btn btn-primary">Practise questions</a>' +
      '<a href="#learn" class="btn btn-secondary">Browse study guides</a></div>' +
      "</div></section>"
    );
  };
})();

