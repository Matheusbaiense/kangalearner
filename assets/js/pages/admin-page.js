// KangaLearner — Admin pages (UI skeleton; mock-only)
(function () {
  "use strict";

  window.KL_PAGES = window.KL_PAGES || {};

  function section(titleKey, bodyKey) {
    return (
      '<div class="admin-card">' +
      '<h2 class="settings-section" data-i18n="' +
      titleKey +
      '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="page-sub" data-i18n="' +
      bodyKey +
      '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>"
    );
  }

  function adminShell(titleKey, subtitleKey, cardsHtml) {
    return (
      '<section class="page-section admin-shell">' +
      '<div class="container">' +
      '<div class="page-header">' +
      '<div class="page-kicker" data-i18n="admin.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="page-title" data-i18n="' +
      titleKey +
      '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="' +
      subtitleKey +
      '"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="admin-grid">' +
      cardsHtml +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function adminHome() {
    return adminShell(
      "admin.dashboard.title",
      "admin.dashboard.subtitle",
      section("admin.links.users", "admin.links.usersHelp") +
        section("admin.links.reports", "admin.links.reportsHelp") +
        section("admin.links.content", "admin.links.contentHelp") +
        section("admin.links.support", "admin.links.supportHelp") +
        section("admin.links.dataRequests", "admin.links.dataRequestsHelp") +
        section("admin.links.auditLog", "admin.links.auditLogHelp")
    );
  }

  function adminUsers() {
    return adminShell(
      "admin.users.title",
      "admin.users.subtitle",
      section("admin.users.placeholderTitle", "admin.users.placeholderBody")
    );
  }

  function adminReports() {
    return adminShell(
      "admin.reports.title",
      "admin.reports.subtitle",
      section("admin.reports.placeholderTitle", "admin.reports.placeholderBody")
    );
  }

  function adminContent() {
    return adminShell(
      "admin.content.title",
      "admin.content.subtitle",
      section("admin.content.placeholderTitle", "admin.content.placeholderBody")
    );
  }

  function adminSupport() {
    return adminShell(
      "admin.support.title",
      "admin.support.subtitle",
      section("admin.support.placeholderTitle", "admin.support.placeholderBody")
    );
  }

  function adminDataRequests() {
    return adminShell(
      "admin.dataRequests.title",
      "admin.dataRequests.subtitle",
      section("admin.dataRequests.placeholderTitle", "admin.dataRequests.placeholderBody")
    );
  }

  function adminAuditLog() {
    return adminShell(
      "admin.auditLog.title",
      "admin.auditLog.subtitle",
      section("admin.auditLog.placeholderTitle", "admin.auditLog.placeholderBody")
    );
  }

  window.KL_PAGES.admin = adminHome;
  window.KL_PAGES["admin-users"] = adminUsers;
  window.KL_PAGES["admin-reports"] = adminReports;
  window.KL_PAGES["admin-content"] = adminContent;
  window.KL_PAGES["admin-support"] = adminSupport;
  window.KL_PAGES["admin-data-requests"] = adminDataRequests;
  window.KL_PAGES["admin-audit-log"] = adminAuditLog;
})();
