// KangaLearner — Account pages (UI skeleton; no backend)
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

  function roleLabel() {
    try {
      var P = window.KL_AUTH_PROVIDER;
      if (P && typeof P.getDisplayName === "function") return P.getDisplayName();
      var A = window.KL_AUTH_MOCK;
      if (A && typeof A.getDisplayName === "function") return A.getDisplayName();
      return "Guest";
    } catch (e) {
      return "Guest";
    }
  }

  function renderNotice(message, kind) {
    if (!message) return "";
    var cls = kind === "error" ? "auth-error" : "auth-notice";
    return (
      '<div class="' + cls + '" role="status" aria-live="polite">' + escapeHtml(message) + "</div>"
    );
  }

  function accountDashboard() {
    return (
      '<section class="page-section account-shell">' +
      '<div class="container">' +
      '<div class="page-header">' +
      '<div class="page-kicker" data-i18n="account.dashboard.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="page-title" data-i18n="account.dashboard.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="account.dashboard.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="account-grid">' +
      '<div class="account-card">' +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="account.dashboard.cards.role"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><span class="settings-row-value">' +
      escapeHtml(roleLabel()) +
      "</span></div>" +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="account.dashboard.cards.localProgress"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><span class="settings-row-value" data-i18n="account.dashboard.values.localOnly"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="account.dashboard.cards.accountSync"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><span class="settings-row-value" data-i18n="account.dashboard.values.notConnected"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
      "</div>" +
      '<div class="account-card">' +
      '<h2 class="settings-section" data-i18n="account.dashboard.quickActions"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<div class="settings-row"><a class="btn btn-secondary" href="#practice" data-i18n="account.dashboard.cta.practice"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      '<div class="settings-row"><a class="btn btn-secondary" href="#profile" data-i18n="account.dashboard.cta.profile"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      '<div class="settings-row"><a class="btn btn-secondary" href="#privacy-settings" data-i18n="account.dashboard.cta.privacy"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      '<div class="settings-row"><a class="btn btn-secondary" href="#data-controls" data-i18n="account.dashboard.cta.dataControls"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      "</div>" +
      '<div class="account-card danger-zone">' +
      '<h2 class="settings-section" data-i18n="account.dashboard.devMock"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="page-sub" data-i18n="account.dashboard.devMockHelp"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<div class="auth-actions">' +
      '<button class="btn btn-secondary" type="button" data-role="guest" id="kl-role-guest">Guest</button>' +
      '<button class="btn btn-secondary" type="button" data-role="user" id="kl-role-user">User</button>' +
      '<button class="btn btn-secondary" type="button" data-role="premium" id="kl-role-premium">Premium</button>' +
      '<button class="btn btn-secondary" type="button" data-role="admin" id="kl-role-admin">Admin</button>' +
      "</div>" +
      '<div class="auth-notice" id="kl-role-notice" hidden role="status" aria-live="polite"></div>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function profilePage() {
    return (
      '<section class="page-section account-shell">' +
      '<div class="container">' +
      '<div class="page-header">' +
      '<div class="page-kicker" data-i18n="account.profile.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="page-title" data-i18n="account.profile.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="account.profile.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="account-card">' +
      '<form class="auth-form" id="kl-profile-form" novalidate>' +
      '<div class="auth-field"><label class="auth-label" for="kl-profile-name" data-i18n="account.profile.fields.displayName"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label><input class="auth-input" id="kl-profile-name" type="text" autocomplete="nickname" /></div>' +
      '<div class="auth-field"><label class="auth-label" for="kl-profile-email" data-i18n="auth.fields.email"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label><input class="auth-input" id="kl-profile-email" type="email" autocomplete="email" inputmode="email" /></div>' +
      '<div class="auth-field"><label class="auth-label" for="kl-profile-lang" data-i18n="account.profile.fields.language"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label><select class="auth-input" id="kl-profile-lang"><option value="en">English</option><option value="pt">Português</option><option value="es">Español</option></select></div>' +
      '<div class="auth-field"><label class="auth-label" for="kl-profile-state" data-i18n="account.profile.fields.state"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label><select class="auth-input" id="kl-profile-state"><option value="WA">WA</option><option value="NSW">NSW</option><option value="VIC">VIC</option><option value="QLD">QLD</option><option value="SA">SA</option><option value="TAS">TAS</option><option value="ACT">ACT</option><option value="NT">NT</option></select></div>' +
      '<div class="auth-actions"><button class="btn btn-primary" type="submit" data-i18n="account.profile.save"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button></div>' +
      '<div class="auth-notice" id="kl-profile-notice" hidden role="status" aria-live="polite"></div>' +
      "</form>" +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function settingsPage() {
    return (
      '<section class="page-section account-shell">' +
      '<div class="container">' +
      '<div class="page-header">' +
      '<div class="page-kicker" data-i18n="account.settings.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="page-title" data-i18n="account.settings.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="account.settings.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="account-card">' +
      '<h2 class="settings-section" data-i18n="account.settings.sections.study"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="account.settings.actions.changeLanguage"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><button class="btn btn-secondary" type="button" id="kl-settings-lang" data-i18n="account.settings.open"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button></div>' +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="account.settings.actions.changeState"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><button class="btn btn-secondary" type="button" id="kl-settings-state" data-i18n="account.settings.open"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button></div>' +
      "</div>" +
      '<div class="account-card">' +
      '<h2 class="settings-section" data-i18n="account.settings.sections.account"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<div class="settings-row"><a class="btn btn-secondary" href="#security" data-i18n="account.settings.actions.goSecurity"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      '<div class="settings-row"><a class="btn btn-secondary" href="#privacy-settings" data-i18n="account.settings.actions.goPrivacy"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      '<div class="settings-row"><a class="btn btn-secondary" href="#data-controls" data-i18n="account.settings.actions.goData"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function securityPage() {
    return (
      '<section class="page-section account-shell">' +
      '<div class="container">' +
      '<div class="page-header">' +
      '<div class="page-kicker" data-i18n="account.security.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="page-title" data-i18n="account.security.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="account.security.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="account-card">' +
      '<p class="page-sub" data-i18n="account.security.placeholder"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<div class="auth-notice" id="kl-security-status" role="status"></div>' +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function privacySettingsPage() {
    return (
      '<section class="page-section account-shell">' +
      '<div class="container">' +
      '<div class="page-header">' +
      '<div class="page-kicker" data-i18n="account.privacy.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="page-title" data-i18n="account.privacy.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="account.privacy.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="account-card">' +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="account.privacy.toggles.analytics"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><label class="auth-checkbox"><input type="checkbox" id="kl-privacy-analytics" /> <span data-i18n="account.common.offByDefault"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></label></div>' +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="account.privacy.toggles.marketing"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><label class="auth-checkbox"><input type="checkbox" id="kl-privacy-marketing" /> <span data-i18n="account.common.offByDefault"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></label></div>' +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="account.privacy.toggles.personalisation"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><label class="auth-checkbox"><input type="checkbox" id="kl-privacy-personal" checked /> <span data-i18n="account.privacy.localOnly"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></label></div>' +
      '<div class="auth-notice" id="kl-privacy-notice" hidden role="status" aria-live="polite"></div>' +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function dataControlsPage() {
    return (
      '<section class="page-section account-shell">' +
      '<div class="container">' +
      '<div class="page-header">' +
      '<div class="page-kicker" data-i18n="account.dataControls.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="page-title" data-i18n="account.dataControls.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="account.dataControls.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="account-card">' +
      '<div class="settings-row"><button class="btn btn-secondary" type="button" id="kl-export-data" data-i18n="account.dataControls.export"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button></div>' +
      '<div class="settings-row"><button class="btn btn-secondary" type="button" id="kl-delete-local" data-i18n="account.dataControls.deleteLocal"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button></div>' +
      '<div class="settings-row"><a class="btn btn-secondary" href="#data-deletion" data-i18n="account.dataControls.requestDeletion"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      '<div class="settings-row"><a class="btn btn-secondary" href="#contact-support" data-i18n="account.dataControls.contact"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      '<div class="auth-notice" id="kl-data-controls-notice" hidden role="status" aria-live="polite"></div>' +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function notificationsPage() {
    return (
      '<section class="page-section account-shell">' +
      '<div class="container">' +
      '<div class="page-header">' +
      '<div class="page-kicker" data-i18n="account.notifications.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="page-title" data-i18n="account.notifications.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="account.notifications.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="account-card">' +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="account.notifications.studyReminders"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><label class="auth-checkbox"><input type="checkbox" /> <span data-i18n="account.notifications.notConnected"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></label></div>' +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="account.notifications.productUpdates"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><label class="auth-checkbox"><input type="checkbox" /> <span data-i18n="account.notifications.notConnected"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></label></div>' +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="account.notifications.marketingEmails"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><label class="auth-checkbox"><input type="checkbox" /> <span data-i18n="account.notifications.notConnected"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></label></div>' +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="account.notifications.securityAlerts"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><label class="auth-checkbox"><input type="checkbox" /> <span data-i18n="account.notifications.notConnected"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></label></div>' +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  window.KL_PAGES.account = accountDashboard;
  window.KL_PAGES.profile = profilePage;
  window.KL_PAGES.settings = settingsPage;
  window.KL_PAGES.security = securityPage;
  window.KL_PAGES["privacy-settings"] = privacySettingsPage;
  window.KL_PAGES["data-controls"] = dataControlsPage;
  window.KL_PAGES.notifications = notificationsPage;
})();
