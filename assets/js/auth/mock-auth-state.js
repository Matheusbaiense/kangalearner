/**
 * KangaLearner — Mock auth/account state (NO real auth).
 *
 * Roles:
 * - guest (default)
 * - user
 * - premium
 * - admin
 *
 * This module only stores local mock state for UI skeleton development.
 */
(function () {
  "use strict";

  var ROLE_GUEST = "guest";
  var ROLE_USER = "user";
  var ROLE_PREMIUM = "premium";
  var ROLE_ADMIN = "admin";

  var STORAGE_KEY = "kl-mock-role";

  function safeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  function normaliseRole(raw) {
    if (raw === ROLE_USER || raw === ROLE_PREMIUM || raw === ROLE_ADMIN) return raw;
    return ROLE_GUEST;
  }

  function getRole() {
    return normaliseRole(safeGet(STORAGE_KEY));
  }

  function setRole(role) {
    var next = normaliseRole(role);
    safeSet(STORAGE_KEY, next);
    // Broadcast for UI listeners (header chips, guards, etc).
    try {
      window.dispatchEvent(new CustomEvent("kl:authRoleChanged", { detail: { role: next } }));
    } catch (e) {}
    return next;
  }

  function isSignedIn() {
    return getRole() !== ROLE_GUEST;
  }

  function isPremium() {
    var r = getRole();
    return r === ROLE_PREMIUM || r === ROLE_ADMIN;
  }

  function isAdmin() {
    return getRole() === ROLE_ADMIN;
  }

  function getDisplayName() {
    var r = getRole();
    if (r === ROLE_ADMIN) return "Admin";
    if (r === ROLE_PREMIUM) return "Premium";
    if (r === ROLE_USER) return "User";
    return "Guest";
  }

  // Public surface (explicitly mock-only).
  window.KL_AUTH_MOCK = {
    roles: {
      guest: ROLE_GUEST,
      user: ROLE_USER,
      premium: ROLE_PREMIUM,
      admin: ROLE_ADMIN
    },
    getRole: getRole,
    setRole: setRole,
    isSignedIn: isSignedIn,
    isPremium: isPremium,
    isAdmin: isAdmin,
    getDisplayName: getDisplayName
  };
})();
