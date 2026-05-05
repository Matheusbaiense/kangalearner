/**
 * Google Analytics 4 (event bridge).
 *
 * TODO: Criar propriedade GA4, obter Measurement ID (G-XXXXXXXX), e no <head> de index.html
 * colar o snippet oficial do Google (gtag.js) com esse ID. Sem isso, apenas `console.debug` abaixo corre.
 */
(function () {
  function track(name, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params || {});
    } else if (typeof console !== "undefined" && console.debug) {
      console.debug("[kanga-analytics]", name, params || {});
    }
  }

  window.kangaAnalytics = {
    track: track,
    pageView: function (route) {
      track("page_view", { route: route || "" });
    }
  };
})();
