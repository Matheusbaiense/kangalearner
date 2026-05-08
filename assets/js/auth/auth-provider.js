/**
 * KangaLearner — Unified auth view for guards + header (Supabase session + mock fallback).
 */
(function () {
  "use strict";

  var _session = null;
  var _ready = null;

  function mock() {
    return window.KL_AUTH_MOCK;
  }

  function sbConfigured() {
    try {
      return window.KL_SUPABASE && window.KL_SUPABASE.isSupabaseConfigured();
    } catch (e) {
      return false;
    }
  }

  function hasRealSession() {
    return !!(_session && _session.user);
  }

  function whenReady() {
    if (!_ready) {
      var svc = window.KL_AUTH_SERVICE;
      _ready =
        svc && typeof svc.refreshAuthState === "function"
          ? svc.refreshAuthState()
          : Promise.resolve();
      _ready = _ready.catch(function () {});
    }
    return _ready;
  }

  function setSessionFromEvent(ev) {
    try {
      var d = ev && ev.detail ? ev.detail : {};
      _session = d.session || null;
      window.dispatchEvent(new CustomEvent("kl:authRoleChanged", { detail: { role: getRole() } }));
    } catch (e) {}
  }

  function getRole() {
    var M = mock();
    if (!M || !M.getRole) return "guest";
    if (hasRealSession()) {
      var r = M.getRole();
      if (r === "premium" || r === "admin") return r;
      return "user";
    }
    return M.getRole();
  }

  function setRole(role) {
    var M = mock();
    if (M && M.setRole) return M.setRole(role);
    return "guest";
  }

  function isSignedIn() {
    if (hasRealSession()) return true;
    var M = mock();
    if (!M || !M.isSignedIn) return false;
    if (sbConfigured()) return false;
    return M.isSignedIn();
  }

  function isPremium() {
    var M = mock();
    if (!M || !M.isPremium) return false;
    return M.isPremium();
  }

  function isAdmin() {
    var M = mock();
    if (!M || !M.isAdmin) return false;
    return M.isAdmin();
  }

  function getDisplayName() {
    if (hasRealSession() && _session.user) {
      var meta = _session.user.user_metadata || {};
      if (meta.full_name) return String(meta.full_name);
      if (meta.name) return String(meta.name);
      if (_session.user.email) return String(_session.user.email);
    }
    var M = mock();
    if (M && M.getDisplayName) return M.getDisplayName();
    return "Guest";
  }

  window.addEventListener("kl:supabaseSessionUpdated", setSessionFromEvent);

  if (window.KL_SUPABASE && typeof window.KL_SUPABASE.onSupabaseAuthStateChange === "function") {
    window.KL_SUPABASE.onSupabaseAuthStateChange(function (_evt, session) {
      try {
        window.dispatchEvent(
          new CustomEvent("kl:supabaseSessionUpdated", { detail: { session: session || null } })
        );
      } catch (e) {}
    });
  }

  window.KL_AUTH_PROVIDER = {
    whenReady: whenReady,
    getSessionSnapshot: function () {
      return _session;
    },
    roles: (mock() && mock().roles) || {
      guest: "guest",
      user: "user",
      premium: "premium",
      admin: "admin"
    },
    getRole: getRole,
    setRole: setRole,
    isSignedIn: isSignedIn,
    isPremium: isPremium,
    isAdmin: isAdmin,
    getDisplayName: getDisplayName
  };
})();
