/**
 * KangaLearner — Route guards for static-site hash routes.
 *
 * Client-side only. Uses KL_AUTH_PROVIDER (Supabase session + mock fallback).
 */
(function () {
  "use strict";

  var GUARD_NOTICE_KEY = "kl-guard-notice";

  function safeSetSession(key, value) {
    try {
      sessionStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  function safeGetSession(key) {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeRemoveSession(key) {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  function setNotice(messageKey) {
    if (!messageKey) return;
    safeSetSession(GUARD_NOTICE_KEY, String(messageKey));
  }

  function consumeNoticeKey() {
    var raw = safeGetSession(GUARD_NOTICE_KEY);
    if (!raw) return null;
    safeRemoveSession(GUARD_NOTICE_KEY);
    return raw;
  }

  function roleApi() {
    return window.KL_AUTH_PROVIDER || window.KL_AUTH_MOCK;
  }

  function requireSignedIn() {
    var A = roleApi();
    if (!A || !A.isSignedIn || !A.isSignedIn()) {
      setNotice("guards.requireSignIn");
      return "#login";
    }
    return null;
  }

  function requirePremium() {
    var A = roleApi();
    if (!A || !A.isPremium || !A.isPremium()) {
      setNotice("guards.requirePremium");
      return "#pricing";
    }
    return null;
  }

  function requireAdmin() {
    var A = roleApi();
    if (!A || !A.isAdmin || !A.isAdmin()) {
      setNotice("guards.requireAdmin");
      // If you're not signed in, send to login. If you are, send to account.
      if (!A || !A.isSignedIn || !A.isSignedIn()) return "#login";
      return "#account";
    }
    return null;
  }

  /**
   * Decide if a route should be allowed.
   * @param {string} page - normalized route (no leading '#')
   * @returns {string|null} redirect hash (e.g. "#login") or null to allow
   */
  function guardRoute(page) {
    if (!page) return null;

    // Account (signed-in required)
    if (
      page === "account" ||
      page === "profile" ||
      page === "settings" ||
      page === "security" ||
      page === "privacy-settings" ||
      page === "data-controls" ||
      page === "notifications"
    ) {
      return requireSignedIn();
    }

    // Premium routes (premium required; admin allowed)
    if (
      page === "premium" ||
      page === "pricing" ||
      page === "billing" ||
      page === "upgrade-success" ||
      page === "upgrade-cancelled"
    ) {
      // Pricing can be public, but billing and success/cancelled should be gated.
      if (page === "pricing") return null;
      return requirePremium();
    }

    // Admin routes (admin required)
    if (
      page === "admin" ||
      page === "admin-users" ||
      page === "admin-reports" ||
      page === "admin-content" ||
      page === "admin-support" ||
      page === "admin-data-requests" ||
      page === "admin-audit-log"
    ) {
      return requireAdmin();
    }

    return null;
  }

  window.KL_ROUTE_GUARDS = {
    guardRoute: guardRoute,
    consumeNoticeKey: consumeNoticeKey
  };
})();
