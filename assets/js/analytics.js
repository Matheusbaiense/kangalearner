/**
 * Google Analytics 4 (event bridge).
 *
 * Supports two integration paths:
 * 1) If `window.gtag` exists (snippet already installed), events are forwarded.
 * 2) If `window.KANGA_GA_MEASUREMENT_ID` is set (e.g. in an inline <script> in index.html),
 *    this script will lazy-load gtag.js and bootstrap GA4 automatically.
 */
(function () {
  function gaMeasurementId() {
    try {
      var fromWindow = window.KANGA_GA_MEASUREMENT_ID;
      if (typeof fromWindow === "string" && fromWindow.trim()) return fromWindow.trim();

      var meta = document.querySelector('meta[name="kanga-ga-measurement-id"]');
      var fromMeta = meta && meta.getAttribute("content");
      if (typeof fromMeta === "string" && fromMeta.trim()) return fromMeta.trim();
    } catch (e) {}
    return "";
  }

  function ensureGtagLoaded(id) {
    if (!id) return;
    if (typeof window.gtag === "function") return;
    if (window.__kangaGtagLoading) return;
    window.__kangaGtagLoading = true;

    try {
      // Minimal GA4 bootstrap (matches official snippet behavior).
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", id);

      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
      document.head.appendChild(s);
    } catch (e) {
      // Keep analytics non-blocking.
      window.__kangaGtagLoading = false;
    }
  }

  function track(name, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params || {});
    } else if (typeof console !== "undefined" && console.debug) {
      console.debug("[kanga-analytics]", name, params || {});
    }
  }

  ensureGtagLoaded(gaMeasurementId());

  window.kangaAnalytics = {
    track: track,
    pageView: function (route) {
      track("page_view", { route: route || "" });
    }
  };
})();
