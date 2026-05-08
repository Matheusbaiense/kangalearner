/**
 * KangaLearner — Auth operations (Supabase when configured; safe fallback otherwise).
 */
(function () {
  "use strict";

  var NOT_CONFIGURED = "Authentication is not configured yet.";

  function sb() {
    return window.KL_SUPABASE || null;
  }

  function friendlyAuthError(err) {
    if (!err) return "Something went wrong. Please try again.";
    var msg = err.message ? String(err.message) : String(err);
    if (/Invalid login credentials/i.test(msg)) {
      return "Invalid email or password.";
    }
    if (/Email not confirmed/i.test(msg) || /email.*confirm/i.test(msg)) {
      return "Please verify your email before signing in.";
    }
    if (/User already registered/i.test(msg)) {
      return "An account with this email already exists.";
    }
    if (/Password should be at least/i.test(msg)) {
      return "Password does not meet requirements.";
    }
    if (/rate limit|too many requests/i.test(msg)) {
      return "Too many attempts. Please wait and try again.";
    }
    return "Something went wrong. Please try again.";
  }

  function oauthRedirectUrl() {
    try {
      var b = document.querySelector("base");
      if (b && b.href) {
        var u = new URL(b.href, window.location.href);
        return u.origin + u.pathname.replace(/\/?$/, "/") + "#auth-callback";
      }
    } catch (e) {}
    return (
      window.location.origin + window.location.pathname.replace(/\/?$/, "/") + "#auth-callback"
    );
  }

  function dispatchSession(session) {
    try {
      window.dispatchEvent(
        new CustomEvent("kl:supabaseSessionUpdated", { detail: { session: session || null } })
      );
    } catch (e) {}
  }

  async function refreshAuthState() {
    var api = sb();
    if (!api || !api.isSupabaseConfigured()) {
      dispatchSession(null);
      return { session: null };
    }
    var client = await api.ensureClientReady();
    if (!client) {
      dispatchSession(null);
      return { session: null };
    }
    try {
      var res = await client.auth.getSession();
      var session = res && res.data ? res.data.session : null;
      dispatchSession(session);
      return { session: session };
    } catch (e) {
      dispatchSession(null);
      return { session: null };
    }
  }

  async function getCurrentSession() {
    var api = sb();
    if (!api || !api.isSupabaseConfigured()) return null;
    var client = await api.ensureClientReady();
    if (!client) return null;
    try {
      var res = await client.auth.getSession();
      return res && res.data ? res.data.session : null;
    } catch (e) {
      return null;
    }
  }

  async function getCurrentUser() {
    var s = await getCurrentSession();
    return s && s.user ? s.user : null;
  }

  async function signInWithEmail(email, password) {
    var api = sb();
    if (!api || !api.isSupabaseConfigured()) {
      return { ok: false, error: NOT_CONFIGURED };
    }
    var client = await api.ensureClientReady();
    if (!client) {
      return { ok: false, error: NOT_CONFIGURED };
    }
    try {
      var res = await client.auth.signInWithPassword({ email: email, password: password });
      if (res.error) {
        return { ok: false, error: friendlyAuthError(res.error) };
      }
      dispatchSession(res.data && res.data.session ? res.data.session : null);
      return { ok: true, session: res.data.session };
    } catch (e) {
      return { ok: false, error: friendlyAuthError(e) };
    }
  }

  async function signUpWithEmail(email, password, metadata) {
    var api = sb();
    if (!api || !api.isSupabaseConfigured()) {
      return { ok: false, error: NOT_CONFIGURED };
    }
    var client = await api.ensureClientReady();
    if (!client) {
      return { ok: false, error: NOT_CONFIGURED };
    }
    var meta = metadata && typeof metadata === "object" ? metadata : {};
    try {
      var res = await client.auth.signUp({
        email: email,
        password: password,
        options: { data: meta, emailRedirectTo: oauthRedirectUrl() }
      });
      if (res.error) {
        return { ok: false, error: friendlyAuthError(res.error) };
      }
      dispatchSession(res.data && res.data.session ? res.data.session : null);
      return { ok: true, session: res.data.session };
    } catch (e) {
      return { ok: false, error: friendlyAuthError(e) };
    }
  }

  async function signInWithGoogle() {
    var api = sb();
    if (!api || !api.isSupabaseConfigured()) {
      return { ok: false, error: NOT_CONFIGURED };
    }
    var client = await api.ensureClientReady();
    if (!client) {
      return { ok: false, error: NOT_CONFIGURED };
    }
    try {
      var res = await client.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: oauthRedirectUrl() }
      });
      if (res.error) {
        return { ok: false, error: friendlyAuthError(res.error) };
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, error: friendlyAuthError(e) };
    }
  }

  async function signOut() {
    var api = sb();
    try {
      if (window.KL_AUTH_MOCK && window.KL_AUTH_MOCK.setRole) {
        window.KL_AUTH_MOCK.setRole("guest");
      }
    } catch (e) {}
    if (!api || !api.isSupabaseConfigured()) {
      dispatchSession(null);
      return { ok: true };
    }
    var client = await api.ensureClientReady();
    if (!client) {
      dispatchSession(null);
      return { ok: true };
    }
    try {
      await client.auth.signOut();
    } catch (e) {}
    dispatchSession(null);
    return { ok: true };
  }

  function passwordRecoveryRedirectUrl() {
    try {
      var b = document.querySelector("base");
      if (b && b.href) {
        var u = new URL(b.href, window.location.href);
        return u.origin + u.pathname.replace(/\/?$/, "/") + "#reset-password";
      }
    } catch (e) {}
    return (
      window.location.origin + window.location.pathname.replace(/\/?$/, "/") + "#reset-password"
    );
  }

  async function resetPassword(email) {
    var api = sb();
    if (!api || !api.isSupabaseConfigured()) {
      return { ok: false, error: NOT_CONFIGURED };
    }
    var client = await api.ensureClientReady();
    if (!client) {
      return { ok: false, error: NOT_CONFIGURED };
    }
    try {
      var res = await client.auth.resetPasswordForEmail(email, {
        redirectTo: passwordRecoveryRedirectUrl()
      });
      if (res.error) {
        return { ok: false, error: friendlyAuthError(res.error) };
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, error: friendlyAuthError(e) };
    }
  }

  async function updatePassword(newPassword) {
    var api = sb();
    if (!api || !api.isSupabaseConfigured()) {
      return { ok: false, error: NOT_CONFIGURED };
    }
    var client = await api.ensureClientReady();
    if (!client) {
      return { ok: false, error: NOT_CONFIGURED };
    }
    try {
      var res = await client.auth.updateUser({ password: newPassword });
      if (res.error) {
        return { ok: false, error: friendlyAuthError(res.error) };
      }
      dispatchSession(res.data && res.data.session ? res.data.session : null);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: friendlyAuthError(e) };
    }
  }

  async function exchangeUrlForSession() {
    var api = sb();
    if (!api || !api.isSupabaseConfigured()) return { ok: false, error: NOT_CONFIGURED };
    var client = await api.ensureClientReady();
    if (!client) return { ok: false, error: NOT_CONFIGURED };
    try {
      var url = new URL(window.location.href);
      var errParam = url.searchParams.get("error");
      if (errParam) {
        var desc = url.searchParams.get("error_description") || errParam;
        return { ok: false, error: friendlyAuthError({ message: desc }) };
      }
      var code = url.searchParams.get("code");
      if (code && client.auth && typeof client.auth.exchangeCodeForSession === "function") {
        var ex = await client.auth.exchangeCodeForSession(code);
        if (ex.error) {
          return { ok: false, error: friendlyAuthError(ex.error) };
        }
        var session1 = ex.data && ex.data.session ? ex.data.session : null;
        dispatchSession(session1);
        return { ok: true, session: session1 };
      }
      var res = await client.auth.getSession();
      var session = res && res.data ? res.data.session : null;
      dispatchSession(session);
      return { ok: true, session: session };
    } catch (e) {
      return { ok: false, error: friendlyAuthError(e) };
    }
  }

  window.KL_AUTH_SERVICE = {
    NOT_CONFIGURED_MSG: NOT_CONFIGURED,
    refreshAuthState: refreshAuthState,
    getCurrentSession: getCurrentSession,
    getCurrentUser: getCurrentUser,
    signInWithEmail: signInWithEmail,
    signUpWithEmail: signUpWithEmail,
    signInWithGoogle: signInWithGoogle,
    signOut: signOut,
    resetPassword: resetPassword,
    updatePassword: updatePassword,
    exchangeUrlForSession: exchangeUrlForSession
  };
})();
