// KangaLearner — Auth pages (UI skeleton; no real auth)
(function () {
  "use strict";

  window.KL_PAGES = window.KL_PAGES || {};

  function t(key, fallback) {
    try {
      if (typeof window.tSafe === "function") return window.tSafe(key, fallback);
    } catch (e) {}
    return fallback || "";
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function noticeFromGuards() {
    try {
      var G = window.KL_ROUTE_GUARDS;
      var key = G && typeof G.consumeNoticeKey === "function" ? G.consumeNoticeKey() : null;
      if (key) return t(key, "");
    } catch (e) {}
    return "";
  }

  function renderNotice(message, kind) {
    if (!message) return "";
    var cls = kind === "error" ? "auth-error" : "auth-notice";
    return (
      '<div class="' + cls + '" role="status" aria-live="polite">' + escapeHtml(message) + "</div>"
    );
  }

  function loginPage() {
    return (
      '<section class="page-section auth-shell">' +
      '<div class="container auth-shell-inner">' +
      '<div class="auth-card">' +
      '<div class="auth-eyebrow" data-i18n="auth.login.eyebrow"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="auth-title" data-i18n="auth.login.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="auth-subtitle" data-i18n="auth.login.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      renderNotice(noticeFromGuards(), "notice") +
      '<form class="auth-form" id="kl-login-form" novalidate>' +
      '<div class="auth-field">' +
      '<label class="auth-label" for="kl-login-email" data-i18n="auth.fields.email"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label>' +
      '<input class="auth-input" id="kl-login-email" name="email" type="email" autocomplete="email" inputmode="email" />' +
      '<div class="auth-help" id="kl-login-email-help" data-i18n="auth.validation.emailHint"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="auth-error" id="kl-login-email-err" hidden role="alert"></div>' +
      "</div>" +
      '<div class="auth-field">' +
      '<label class="auth-label" for="kl-login-password" data-i18n="auth.fields.password"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label>' +
      '<input class="auth-input" id="kl-login-password" name="password" type="password" autocomplete="current-password" />' +
      '<div class="auth-error" id="kl-login-password-err" hidden role="alert"></div>' +
      "</div>" +
      '<div class="auth-checkbox-row">' +
      '<label class="auth-checkbox"><input type="checkbox" id="kl-login-remember" /> <span data-i18n="auth.login.remember"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></label>' +
      "</div>" +
      '<div class="auth-actions">' +
      '<button class="btn btn-primary auth-submit" type="submit" data-i18n="auth.login.submit"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      '<button class="btn btn-secondary auth-social-button" type="button" id="kl-login-google" data-i18n="auth.login.google"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      "</div>" +
      '<div class="auth-divider"><span data-i18n="auth.common.or"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
      '<div class="auth-footer-links">' +
      '<a href="#forgot-password" data-i18n="auth.login.forgot"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      '<a href="#signup" data-i18n="auth.login.create"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      '<a href="#practice" data-i18n="auth.login.guest"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      "</div>" +
      '<div class="auth-notice" id="kl-login-notice" hidden role="status" aria-live="polite"></div>' +
      "</form>" +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function signupPage() {
    return (
      '<section class="page-section auth-shell">' +
      '<div class="container auth-shell-inner">' +
      '<div class="auth-card">' +
      '<div class="auth-eyebrow" data-i18n="auth.signup.eyebrow"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="auth-title" data-i18n="auth.signup.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="auth-subtitle" data-i18n="auth.signup.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<form class="auth-form" id="kl-signup-form" novalidate>' +
      '<div class="auth-field">' +
      '<label class="auth-label" for="kl-signup-first" data-i18n="auth.fields.firstName"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label>' +
      '<input class="auth-input" id="kl-signup-first" name="firstName" type="text" autocomplete="given-name" />' +
      '<div class="auth-error" id="kl-signup-first-err" hidden role="alert"></div>' +
      "</div>" +
      '<div class="auth-field">' +
      '<label class="auth-label" for="kl-signup-email" data-i18n="auth.fields.email"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label>' +
      '<input class="auth-input" id="kl-signup-email" name="email" type="email" autocomplete="email" inputmode="email" />' +
      '<div class="auth-error" id="kl-signup-email-err" hidden role="alert"></div>' +
      "</div>" +
      '<div class="auth-field">' +
      '<label class="auth-label" for="kl-signup-password" data-i18n="auth.fields.password"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label>' +
      '<input class="auth-input" id="kl-signup-password" name="password" type="password" autocomplete="new-password" />' +
      '<div class="auth-password-rules" data-i18n="auth.signup.passwordRules"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="auth-error" id="kl-signup-password-err" hidden role="alert"></div>' +
      "</div>" +
      '<div class="auth-field">' +
      '<label class="auth-label" for="kl-signup-confirm" data-i18n="auth.fields.confirmPassword"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label>' +
      '<input class="auth-input" id="kl-signup-confirm" name="confirmPassword" type="password" autocomplete="new-password" />' +
      '<div class="auth-error" id="kl-signup-confirm-err" hidden role="alert"></div>' +
      "</div>" +
      '<div class="auth-checkbox-row">' +
      '<label class="auth-checkbox"><input type="checkbox" id="kl-signup-terms" /> <span data-i18n="auth.signup.agree"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></label>' +
      '<div class="auth-error" id="kl-signup-terms-err" hidden role="alert"></div>' +
      "</div>" +
      '<div class="auth-checkbox-row">' +
      '<label class="auth-checkbox"><input type="checkbox" id="kl-signup-marketing" /> <span data-i18n="auth.signup.marketing"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></label>' +
      "</div>" +
      '<div class="auth-actions">' +
      '<button class="btn btn-primary auth-submit" type="submit" data-i18n="auth.signup.submit"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      '<button class="btn btn-secondary auth-social-button" type="button" id="kl-signup-google" data-i18n="auth.signup.google"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      "</div>" +
      '<div class="auth-footer-links">' +
      '<a href="#login" data-i18n="auth.signup.haveAccount"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      '<a href="#practice" data-i18n="auth.signup.guest"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      "</div>" +
      '<div class="auth-notice" id="kl-signup-notice" hidden role="status" aria-live="polite"></div>' +
      "</form>" +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function forgotPasswordPage() {
    return (
      '<section class="page-section auth-shell">' +
      '<div class="container auth-shell-inner">' +
      '<div class="auth-card">' +
      '<div class="auth-eyebrow" data-i18n="auth.forgot.eyebrow"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="auth-title" data-i18n="auth.forgot.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="auth-subtitle" data-i18n="auth.forgot.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<form class="auth-form" id="kl-forgot-form" novalidate>' +
      '<div class="auth-field">' +
      '<label class="auth-label" for="kl-forgot-email" data-i18n="auth.fields.email"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label>' +
      '<input class="auth-input" id="kl-forgot-email" name="email" type="email" autocomplete="email" inputmode="email" />' +
      '<div class="auth-error" id="kl-forgot-email-err" hidden role="alert"></div>' +
      "</div>" +
      '<div class="auth-actions">' +
      '<button class="btn btn-primary auth-submit" type="submit" data-i18n="auth.forgot.submit"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      "</div>" +
      '<div class="auth-footer-links">' +
      '<a href="#login" data-i18n="auth.common.backToLogin"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      "</div>" +
      '<div class="auth-notice" id="kl-forgot-notice" hidden role="status" aria-live="polite"></div>' +
      "</form>" +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function resetPasswordPage() {
    return (
      '<section class="page-section auth-shell">' +
      '<div class="container auth-shell-inner">' +
      '<div class="auth-card">' +
      '<div class="auth-eyebrow" data-i18n="auth.reset.eyebrow"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="auth-title" data-i18n="auth.reset.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="auth-subtitle" data-i18n="auth.reset.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<form class="auth-form" id="kl-reset-form" novalidate>' +
      '<div class="auth-field">' +
      '<label class="auth-label" for="kl-reset-password" data-i18n="auth.fields.newPassword"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label>' +
      '<input class="auth-input" id="kl-reset-password" name="password" type="password" autocomplete="new-password" />' +
      '<div class="auth-password-rules" data-i18n="auth.signup.passwordRules"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<div class="auth-error" id="kl-reset-password-err" hidden role="alert"></div>' +
      "</div>" +
      '<div class="auth-field">' +
      '<label class="auth-label" for="kl-reset-confirm" data-i18n="auth.fields.confirmNewPassword"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label>' +
      '<input class="auth-input" id="kl-reset-confirm" name="confirmPassword" type="password" autocomplete="new-password" />' +
      '<div class="auth-error" id="kl-reset-confirm-err" hidden role="alert"></div>' +
      "</div>" +
      '<div class="auth-actions">' +
      '<button class="btn btn-primary auth-submit" type="submit" data-i18n="auth.reset.submit"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      "</div>" +
      '<div class="auth-footer-links">' +
      '<a href="#login" data-i18n="auth.common.backToLogin"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      "</div>" +
      '<div class="auth-notice" id="kl-reset-notice" hidden role="status" aria-live="polite"></div>' +
      "</form>" +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function verifyEmailPage() {
    return (
      '<section class="page-section auth-shell">' +
      '<div class="container auth-shell-inner">' +
      '<div class="auth-card">' +
      '<div class="auth-eyebrow" data-i18n="auth.verify.eyebrow"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="auth-title" data-i18n="auth.verify.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="auth-subtitle" data-i18n="auth.verify.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<div class="auth-actions">' +
      '<button class="btn btn-secondary auth-submit" type="button" id="kl-verify-resend" data-i18n="auth.verify.resend"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      '<button class="btn btn-secondary auth-submit" type="button" id="kl-verify-change" data-i18n="auth.verify.changeEmail"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      "</div>" +
      '<div class="auth-footer-links">' +
      '<a href="#login" data-i18n="auth.common.backToLogin"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      "</div>" +
      '<div class="auth-notice" id="kl-verify-notice" hidden role="status" aria-live="polite"></div>' +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function authCallbackPage() {
    return (
      '<section class="page-section auth-shell">' +
      '<div class="container auth-shell-inner">' +
      '<div class="auth-card">' +
      '<h1 class="auth-title" data-i18n="auth.callback.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="auth-subtitle" data-i18n="auth.callback.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<div class="auth-footer-links"><a href="#login" data-i18n="auth.common.backToLogin"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function logoutPage() {
    return (
      '<section class="page-section auth-shell">' +
      '<div class="container auth-shell-inner">' +
      '<div class="auth-card">' +
      '<h1 class="auth-title" data-i18n="auth.logout.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="auth-subtitle" data-i18n="auth.logout.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<div class="auth-footer-links"><a href="#home" data-i18n="auth.logout.backHome"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function sessionExpiredPage() {
    return (
      '<section class="page-section auth-shell">' +
      '<div class="container auth-shell-inner">' +
      '<div class="auth-card">' +
      '<h1 class="auth-title" data-i18n="auth.sessionExpired.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="auth-subtitle" data-i18n="auth.sessionExpired.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<div class="auth-actions">' +
      '<a class="btn btn-primary" href="#login" data-i18n="auth.sessionExpired.signInAgain"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      '<a class="btn btn-secondary" href="#practice" data-i18n="auth.sessionExpired.guest"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  // Register route renderers (router maps hashes to these functions)
  window.KL_PAGES.login = loginPage;
  window.KL_PAGES.signup = signupPage;
  window.KL_PAGES["forgot-password"] = forgotPasswordPage;
  window.KL_PAGES["reset-password"] = resetPasswordPage;
  window.KL_PAGES["verify-email"] = verifyEmailPage;
  window.KL_PAGES["auth-callback"] = authCallbackPage;
  window.KL_PAGES.logout = logoutPage;
  window.KL_PAGES["session-expired"] = sessionExpiredPage;
})();
