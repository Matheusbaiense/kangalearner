/**
 * Captura mínima de erros no cliente. Para produção, ligar Sentry (ou similar).
 *
 * Supports two integration paths:
 * 1) If `window.Sentry` exists (SDK already loaded), captures are forwarded.
 * 2) If `window.KANGA_SENTRY_LOADER_SRC` is set, the Sentry Loader Script is lazy-loaded.
 *
 * Loader Script docs: https://docs.sentry.io/platforms/javascript/install/cdn/
 */
(function () {
  function sentryLoaderSrc() {
    try {
      var fromWindow = window.KANGA_SENTRY_LOADER_SRC;
      if (typeof fromWindow === "string" && fromWindow.trim()) return fromWindow.trim();

      var meta = document.querySelector('meta[name="kanga-sentry-loader-src"]');
      var fromMeta = meta && meta.getAttribute("content");
      if (typeof fromMeta === "string" && fromMeta.trim()) return fromMeta.trim();
    } catch (e) {}
    return "";
  }

  function ensureSentryLoaded() {
    if (typeof window.Sentry !== "undefined") return;
    if (window.__kangaSentryLoading) return;
    var src = sentryLoaderSrc();
    if (!src) return;
    window.__kangaSentryLoading = true;

    try {
      var s = document.createElement("script");
      s.src = src;
      s.crossOrigin = "anonymous";
      s.async = true;
      s.onload = function () {
        window.__kangaSentryLoading = false;
      };
      s.onerror = function () {
        window.__kangaSentryLoading = false;
      };
      document.head.appendChild(s);
    } catch (e) {
      window.__kangaSentryLoading = false;
    }
  }

  function report(kind, payload) {
    if (
      typeof window.Sentry !== "undefined" &&
      typeof window.Sentry.captureMessage === "function"
    ) {
      window.Sentry.captureMessage(kind + ": " + JSON.stringify(payload), { level: "error" });
      return;
    }
    if (typeof console !== "undefined" && console.error) {
      console.error("[kanga-error]", kind, payload);
    }
  }

  ensureSentryLoaded();

  window.addEventListener("error", function (ev) {
    report("error", {
      message: ev.message,
      filename: ev.filename,
      lineno: ev.lineno,
      colno: ev.colno
    });
  });

  window.addEventListener("unhandledrejection", function (ev) {
    report("unhandledrejection", { reason: ev.reason != null ? String(ev.reason) : "" });
  });
})();
