// KangaLearner — Legal / Trust pages (UI skeleton)
(function () {
  "use strict";

  window.KL_PAGES = window.KL_PAGES || {};

  function legalShell(kickerKey, titleKey, bodyHtml) {
    return (
      '<section class="page-section legal-shell">' +
      '<div class="container">' +
      '<div class="page-header">' +
      '<div class="page-kicker" data-i18n="' +
      kickerKey +
      '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="page-title" data-i18n="' +
      titleKey +
      '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      "</div>" +
      '<div class="legal-card">' +
      bodyHtml +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function p(key) {
    return (
      '<p class="legal-p" data-i18n="' +
      key +
      '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>'
    );
  }

  function h(key) {
    return (
      '<h2 class="legal-section" data-i18n="' +
      key +
      '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>'
    );
  }

  function privacyPolicy() {
    return legalShell(
      "legal.kicker",
      "legal.privacy.title",
      h("legal.privacy.sections.overview") +
        p("legal.privacy.body.overview") +
        h("legal.privacy.sections.collect") +
        p("legal.privacy.body.collect") +
        h("legal.privacy.sections.localProgress") +
        p("legal.privacy.body.localProgress") +
        h("legal.privacy.sections.accountFuture") +
        p("legal.privacy.body.accountFuture") +
        h("legal.privacy.sections.analytics") +
        p("legal.privacy.body.analytics") +
        h("legal.privacy.sections.use") +
        p("legal.privacy.body.use") +
        h("legal.privacy.sections.security") +
        p("legal.privacy.body.security") +
        h("legal.privacy.sections.access") +
        p("legal.privacy.body.access") +
        h("legal.privacy.sections.deletion") +
        p("legal.privacy.body.deletion") +
        h("legal.privacy.sections.contact") +
        p("legal.privacy.body.contact")
    );
  }

  function terms() {
    return legalShell(
      "legal.kicker",
      "legal.terms.title",
      h("legal.terms.sections.independent") +
        p("legal.terms.body.independent") +
        h("legal.terms.sections.notOfficial") +
        p("legal.terms.body.notOfficial") +
        h("legal.terms.sections.noGuarantee") +
        p("legal.terms.body.noGuarantee") +
        h("legal.terms.sections.acceptableUse") +
        p("legal.terms.body.acceptableUse") +
        h("legal.terms.sections.limitations") +
        p("legal.terms.body.limitations") +
        h("legal.terms.sections.changes") +
        p("legal.terms.body.changes")
    );
  }

  function securityPolicy() {
    return legalShell(
      "legal.kicker",
      "legal.security.title",
      h("legal.security.sections.account") +
        p("legal.security.body.account") +
        h("legal.security.sections.passwords") +
        p("legal.security.body.passwords") +
        h("legal.security.sections.disclosure") +
        p("legal.security.body.disclosure") +
        h("legal.security.sections.breach") +
        p("legal.security.body.breach")
    );
  }

  function dataDeletion() {
    return legalShell(
      "legal.kicker",
      "legal.dataDeletion.title",
      h("legal.dataDeletion.sections.local") +
        p("legal.dataDeletion.body.local") +
        h("legal.dataDeletion.sections.future") +
        p("legal.dataDeletion.body.future") +
        h("legal.dataDeletion.sections.contact") +
        p("legal.dataDeletion.body.contact")
    );
  }

  function notOfficial() {
    return legalShell("legal.kicker", "legal.notOfficial.title", p("legal.notOfficial.body"));
  }

  function contactSupport() {
    return legalShell(
      "support.kicker",
      "support.title",
      '<form class="auth-form" id="kl-support-form" novalidate>' +
        '<div class="auth-field"><label class="auth-label" for="kl-support-name" data-i18n="support.fields.name"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label><input class="auth-input" id="kl-support-name" type="text" autocomplete="name" /></div>' +
        '<div class="auth-field"><label class="auth-label" for="kl-support-email" data-i18n="support.fields.email"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label><input class="auth-input" id="kl-support-email" type="email" autocomplete="email" inputmode="email" /></div>' +
        '<div class="auth-field"><label class="auth-label" for="kl-support-topic" data-i18n="support.fields.topic"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label><select class="auth-input" id="kl-support-topic"><option value="general">General</option><option value="content">Content</option><option value="billing">Billing</option><option value="privacy">Privacy</option></select></div>' +
        '<div class="auth-field"><label class="auth-label" for="kl-support-msg" data-i18n="support.fields.message"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label><textarea class="auth-input" id="kl-support-msg" rows="5"></textarea></div>' +
        '<div class="auth-actions"><button class="btn btn-primary" type="submit" data-i18n="support.submit"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button></div>' +
        '<div class="auth-notice" id="kl-support-notice" hidden role="status" aria-live="polite"></div>' +
        "</form>"
    );
  }

  window.KL_PAGES["privacy-policy"] = privacyPolicy;
  window.KL_PAGES.terms = terms;
  window.KL_PAGES["security-policy"] = securityPolicy;
  window.KL_PAGES["data-deletion"] = dataDeletion;
  window.KL_PAGES["not-official"] = notOfficial;
  window.KL_PAGES["contact-support"] = contactSupport;
})();
