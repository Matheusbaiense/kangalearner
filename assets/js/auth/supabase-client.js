/**
 * KangaLearner — Supabase browser client (optional).
 *
 * Safe when URL/key are missing: no network, no thrown errors.
 * Loads the official UMD build from jsDelivr only if configured.
 */
(function () {
  "use strict";

  var UMD_SRC = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.105.1/dist/umd/supabase.js";

  var _client = null;
  var _loadPromise = null;

  function readMeta(name) {
    try {
      var m = document.querySelector('meta[name="' + name + '"]');
      return m && m.getAttribute("content") ? String(m.getAttribute("content")).trim() : "";
    } catch (e) {
      return "";
    }
  }

  function getPublicEnv() {
    var url = "";
    var key = "";
    try {
      var w = window.__KANGA_ENV__ || {};
      url = String(w.VITE_SUPABASE_URL || "").trim();
      key = String(w.VITE_SUPABASE_ANON_KEY || "").trim();
    } catch (e) {}
    if (!url) url = readMeta("kl-supabase-url");
    if (!key) key = readMeta("kl-supabase-anon-key");
    return { url: url, anonKey: key };
  }

  function isSupabaseConfigured() {
    var e = getPublicEnv();
    return !!(e.url && e.anonKey);
  }

  function loadUmdOnce() {
    if (typeof window.supabase !== "undefined" && window.supabase.createClient) {
      return Promise.resolve();
    }
    if (_loadPromise) return _loadPromise;
    _loadPromise = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = UMD_SRC;
      s.async = true;
      s.onload = function () {
        resolve();
      };
      s.onerror = function () {
        reject(new Error("Failed to load Supabase library."));
      };
      document.head.appendChild(s);
    });
    return _loadPromise;
  }

  function createWhenReady() {
    if (_client) return _client;
    if (!isSupabaseConfigured()) return null;
    try {
      if (!window.supabase || typeof window.supabase.createClient !== "function") return null;
      var e = getPublicEnv();
      _client = window.supabase.createClient(e.url, e.anonKey, {
        auth: {
          detectSessionInUrl: true,
          persistSession: true,
          autoRefreshToken: true,
          flowType: "pkce"
        }
      });
      return _client;
    } catch (err) {
      return null;
    }
  }

  function ensureClientReady() {
    if (!isSupabaseConfigured()) return Promise.resolve(null);
    return loadUmdOnce()
      .then(function () {
        return createWhenReady();
      })
      .catch(function () {
        return null;
      });
  }

  function getSupabaseClient() {
    if (!isSupabaseConfigured()) return null;
    if (_client) return _client;
    if (typeof window.supabase !== "undefined" && window.supabase.createClient) {
      return createWhenReady();
    }
    return null;
  }

  function getSupabaseSession() {
    return ensureClientReady().then(function (c) {
      if (!c) return { data: { session: null }, error: null };
      return c.auth.getSession();
    });
  }

  function onSupabaseAuthStateChange(callback) {
    if (typeof callback !== "function") return function () {};
    ensureClientReady().then(function (c) {
      if (!c || !c.auth || typeof c.auth.onAuthStateChange !== "function") return;
      c.auth.onAuthStateChange(function (event, session) {
        try {
          callback(event, session);
        } catch (e) {}
      });
    });
    return function () {};
  }

  window.KL_SUPABASE = {
    getPublicEnv: getPublicEnv,
    isSupabaseConfigured: isSupabaseConfigured,
    ensureClientReady: ensureClientReady,
    getSupabaseClient: getSupabaseClient,
    getSupabaseSession: getSupabaseSession,
    onSupabaseAuthStateChange: onSupabaseAuthStateChange
  };
})();
