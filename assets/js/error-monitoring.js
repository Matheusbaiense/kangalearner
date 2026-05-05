/**
 * Captura mínima de erros no cliente. Para produção, ligar Sentry (ou similar).
 *
 * TODO: Instalar `@sentry/browser`, chamar `Sentry.init({ dsn: "…", environment: "production" })`
 * e definir `release` (ex.: versão do package.json ou SHA do deploy). Configurar alertas no painel Sentry.
 */
(function () {
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
