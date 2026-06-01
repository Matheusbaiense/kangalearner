"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLang } from "@/contexts/LangContext";
import type { Lang, UiLang } from "@/lib/i18n";
import { SK } from "@/lib/storageKeys";
import { AU_STATE_OPTIONS } from "@kanga/core";

const AU_TIMEZONES = [
  { value: "Australia/Perth", label: "Perth", offset: "GMT +8" },
  { value: "Australia/Adelaide", label: "Adelaide", offset: "GMT +9:30" },
  { value: "Australia/Darwin", label: "Darwin", offset: "GMT +9:30" },
  { value: "Australia/Brisbane", label: "Brisbane", offset: "GMT +10" },
  { value: "Australia/Sydney", label: "Sydney", offset: "GMT +10" },
  { value: "Australia/Melbourne", label: "Melbourne", offset: "GMT +10" },
  { value: "Australia/Hobart", label: "Hobart", offset: "GMT +10" }
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" }
] as const;

const THEME_VALUES = ["light", "dark", "system"] as const;

type Theme = "light" | "dark" | "system";
type Section = "profile" | "preferences" | "security" | "danger";
type PreferredLang = UiLang;

function normalizePreferredLang(value: unknown): PreferredLang {
  return value === "pt" || value === "es" ? value : "en";
}

function normalizeState(value: unknown): string {
  if (typeof value !== "string") return "WA";
  const upper = value.toUpperCase();
  return AU_STATE_OPTIONS.some((s) => s.code === upper) ? upper : "WA";
}

/* ── Avatar initials ── */
function getInitials(name: string, email: string): string {
  const src = name.trim() || email;
  const parts = src.split(/[\s@]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return src.slice(0, 2).toUpperCase();
}

/* ── Apply theme to document ── */
function applyTheme(theme: Theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  try {
    localStorage.setItem(SK.theme, theme);
  } catch {
    /* noop */
  }
}

/* ── Message component ── */
function Msg({ text, ok }: { text: string; ok: boolean }) {
  return (
    <p className={`settings-msg ${ok ? "ok" : "err"}`} role="alert">
      {ok ? "✓ " : "⚠ "}
      {text}
    </p>
  );
}

/* ══════════════════════════════════════════
   SETTINGS PAGE
══════════════════════════════════════════ */
export default function AccountPage() {
  const router = useRouter();
  const { lang, setLang, s } = useLang();
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Auth & loading ── */
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>("profile");

  /* ── Profile fields ── */
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarMsg, setAvatarMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ text: string; ok: boolean } | null>(null);

  /* ── Preferences ── */
  const [state, setStateVal] = useState("WA");
  const [preferredLang, setPreferredLang] = useState<PreferredLang>(normalizePreferredLang(lang));
  const [timezone, setTimezone] = useState("Australia/Perth");
  const [theme, setTheme] = useState<Theme>("system");
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [prefsMsg, setPrefsMsg] = useState<{ text: string; ok: boolean } | null>(null);

  /* ── Security ── */
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [savingPwd, setSavingPwd] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<{ text: string; ok: boolean } | null>(null);

  /* ── Danger zone ── */
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    async function loadAccount() {
      try {
        const {
          data: { user: authUser },
          error: userError
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        const user = authUser;
        if (!user) {
          router.replace("/auth/login?redirect=/account");
          return;
        }

        const meta = user.user_metadata ?? {};
        const nextDisplayName =
          (meta.full_name as string | undefined) || (meta.name as string | undefined) || "";
        const nextPhone = (meta.phone as string | undefined) || "";
        let nextLang = normalizePreferredLang(meta.lang ?? lang);
        let nextState = normalizeState(meta.state);
        let nextAvatarUrl: string | null = null;

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("avatar_url, preferred_lang, preferred_state")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError && profileError.code !== "PGRST116") {
          console.error("Error loading profile:", profileError);
        }

        if (profile?.avatar_url) nextAvatarUrl = profile.avatar_url;
        nextLang = normalizePreferredLang(profile?.preferred_lang ?? nextLang);
        nextState = normalizeState(profile?.preferred_state ?? nextState);

        if (cancelled) return;
        setEmail(user.email ?? "");
        setDisplayName(nextDisplayName);
        setPhone(nextPhone);
        setAvatarUrl(nextAvatarUrl);
        setPreferredLang(nextLang);
        setStateVal(nextState);
        setTimezone((meta.timezone as string | undefined) || "Australia/Perth");
        const savedTheme =
          (meta.theme as Theme | undefined) ||
          (localStorage.getItem(SK.theme) as Theme | null) ||
          "system";
        setTheme(savedTheme);
        applyTheme(savedTheme);
      } catch (err) {
        console.error("Account load error:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAccount();
    return () => {
      cancelled = true;
    };
  }, [router, lang]);

  /* ── Handlers ── */
  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { full_name: displayName.trim(), phone: phone.trim() }
    });
    setSavingProfile(false);
    setProfileMsg(
      error ? { text: error.message, ok: false } : { text: s.accountProfileSaved, ok: true }
    );
  }

  async function handleSavePrefs(e: React.FormEvent) {
    e.preventDefault();
    setSavingPrefs(true);
    setPrefsMsg(null);
    const supabase = createClient();
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setSavingPrefs(false);
      setPrefsMsg({ text: userError?.message ?? s.accountSignInRequired, ok: false });
      return;
    }

    const normalizedLang = normalizePreferredLang(preferredLang);
    const normalizedState = normalizeState(state);
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        preferred_lang: normalizedLang,
        preferred_state: normalizedState
      })
      .eq("id", user.id);

    if (profileError) {
      setSavingPrefs(false);
      setPrefsMsg({ text: profileError.message, ok: false });
      return;
    }

    const { error: authError } = await supabase.auth.updateUser({
      data: { lang: normalizedLang, state: normalizedState, timezone, theme }
    });

    setSavingPrefs(false);
    if (authError) {
      setPrefsMsg({ text: authError.message, ok: false });
      return;
    }

    setPreferredLang(normalizedLang);
    setStateVal(normalizedState);
    setLang(normalizedLang as Lang);
    try {
      localStorage.setItem(SK.lang, normalizedLang);
      localStorage.setItem(SK.stateLegacy, normalizedState);
      localStorage.setItem(SK.stateV2, normalizedState);
    } catch {}
    applyTheme(theme);
    setPrefsMsg({ text: s.accountPreferencesSaved, ok: true });
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwdMsg(null);
    if (!newPwd || newPwd.length < 8) {
      setPwdMsg({ text: s.accountPasswordMinLength, ok: false });
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdMsg({ text: s.accountPasswordMismatch, ok: false });
      return;
    }
    setSavingPwd(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPwd });
    setSavingPwd(false);
    if (error) {
      setPwdMsg({ text: error.message, ok: false });
    } else {
      setPwdMsg({ text: s.accountPasswordChanged, ok: true });
      setNewPwd("");
      setConfirmPwd("");
    }
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    setAvatarMsg(null);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/profile/avatar", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? s.accountUploadFailed);
      setAvatarUrl(json.url);
      setAvatarMsg({ text: s.accountAvatarUpdated, ok: true });
    } catch (err) {
      setAvatarMsg({ text: (err as Error).message, ok: false });
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleAvatarRemove() {
    setUploadingAvatar(true);
    setAvatarMsg(null);
    try {
      const res = await fetch("/api/profile/avatar", { method: "DELETE" });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error ?? s.accountUploadFailed);
      }
      setAvatarUrl(null);
      setAvatarMsg({ text: s.accountAvatarRemoved, ok: true });
    } catch (err) {
      setAvatarMsg({ text: (err as Error).message, ok: false });
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  async function handleDeleteAccount() {
    if (deletingAccount) return;
    if (!confirm(s.accountDeleteConfirm)) return;

    setDeletingAccount(true);
    setDeleteMsg(null);

    let res: Response;
    try {
      res = await fetch("/api/account/delete", { method: "DELETE" });
    } catch {
      setDeletingAccount(false);
      setDeleteMsg({ text: s.accountNetworkError, ok: false });
      return;
    }

    if (!res.ok) {
      setDeletingAccount(false);
      setDeleteMsg({ text: s.accountDeleteFailed, ok: false });
      return;
    }
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="app-page">
        <div className="app-container app-section">
          <div className="dash-empty">{s.loading}</div>
        </div>
      </div>
    );
  }

  const initials = getInitials(displayName, email);

  const NAV_ITEMS: { key: Section; label: string }[] = [
    { key: "profile", label: s.accountNavProfile },
    { key: "preferences", label: s.accountNavPreferences },
    { key: "security", label: s.accountNavSecurity },
    { key: "danger", label: s.accountNavDanger }
  ];

  const themeLabels: Record<Theme, string> = {
    light: s.accountThemeLight,
    dark: s.accountThemeDark,
    system: s.accountThemeSystem
  };

  return (
    <div className="app-page">
      <div className="app-container app-section">
        {/* ── Page header ── */}
        <div className="page-header">
          <h1 className="page-title">{s.settings}</h1>
          <p className="page-sub">{s.accountPageSub}</p>
        </div>

        <div className="settings-layout">
          {/* ── Sidebar nav ── */}
          <aside className="settings-sidebar">
            {/* Avatar summary */}
            <div className="settings-avatar-wrap">
              <div className="settings-avatar" aria-hidden="true">
                {initials}
              </div>
              <div className="settings-avatar-info">
                <div className="settings-avatar-name">{displayName || email.split("@")[0]}</div>
                <div className="settings-avatar-email">{email}</div>
              </div>
            </div>

            <nav className="settings-nav" aria-label="Settings sections">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  className={`settings-nav-item${activeSection === item.key ? " active" : ""}${item.key === "danger" ? " danger" : ""}`}
                  onClick={() => setActiveSection(item.key)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button className="settings-signout-btn" type="button" onClick={handleSignOut}>
              {s.signOut}
            </button>
          </aside>

          {/* ── Main content ── */}
          <div className="settings-main">
            {/* ── PROFILE ── */}
            {activeSection === "profile" && (
              <section className="settings-section">
                <h2 className="settings-section-title">{s.accountNavProfile}</h2>
                <p className="settings-section-sub">{s.accountProfileSub}</p>

                {/* Avatar upload */}
                <div className="settings-avatar-large-wrap">
                  <div className="settings-avatar-large-container">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={s.accountAvatarAlt}
                        className="settings-avatar-img"
                        width={72}
                        height={72}
                      />
                    ) : (
                      <div className="settings-avatar-large" aria-hidden="true">
                        {initials}
                      </div>
                    )}
                    {uploadingAvatar && (
                      <div className="settings-avatar-overlay">
                        <div className="admin-spinner" />
                      </div>
                    )}
                  </div>
                  <div className="settings-avatar-actions">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      style={{ display: "none" }}
                      onChange={handleAvatarUpload}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      style={{ fontSize: "0.82rem", padding: "6px 14px" }}
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingAvatar}
                    >
                      {uploadingAvatar ? s.accountUploading : s.accountUploadPhoto}
                    </button>
                    {avatarUrl && (
                      <button
                        type="button"
                        className="btn btn-ghost"
                        style={{ fontSize: "0.82rem", padding: "6px 14px", color: "var(--red)" }}
                        onClick={handleAvatarRemove}
                        disabled={uploadingAvatar}
                      >
                        {s.accountRemove}
                      </button>
                    )}
                    <p className="settings-hint" style={{ margin: 0 }}>
                      {s.accountAvatarHint}
                    </p>
                    {avatarMsg && <Msg text={avatarMsg.text} ok={avatarMsg.ok} />}
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="settings-form">
                  <div className="settings-field-row">
                    <div className="settings-field">
                      <label className="settings-label" htmlFor="s-name">
                        {s.accountFullName}
                      </label>
                      <input
                        id="s-name"
                        className="settings-input"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder={s.accountFullNamePlaceholder}
                        maxLength={80}
                      />
                    </div>
                    <div className="settings-field">
                      <label className="settings-label" htmlFor="s-email">
                        {s.emailLabel}
                      </label>
                      <input
                        id="s-email"
                        className="settings-input"
                        type="email"
                        value={email}
                        disabled
                        readOnly
                      />
                      <p className="settings-hint">{s.accountEmailHint}</p>
                    </div>
                  </div>

                  <div className="settings-field">
                    <label className="settings-label" htmlFor="s-phone">
                      {s.accountPhone}{" "}
                      <span className="settings-optional">{s.accountOptional}</span>
                    </label>
                    <input
                      id="s-phone"
                      className="settings-input"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={s.accountPhonePlaceholder}
                      maxLength={20}
                    />
                  </div>

                  {profileMsg && <Msg {...profileMsg} />}
                  <button className="btn btn-primary" type="submit" disabled={savingProfile}>
                    {savingProfile ? s.accountSaving : s.accountSaveProfile}
                  </button>
                </form>
              </section>
            )}

            {/* ── PREFERENCES ── */}
            {activeSection === "preferences" && (
              <section className="settings-section">
                <h2 className="settings-section-title">{s.accountNavPreferences}</h2>
                <p className="settings-section-sub">{s.accountPreferencesSub}</p>

                <form onSubmit={handleSavePrefs} className="settings-form">
                  {/* State */}
                  <div className="settings-field">
                    <label className="settings-label" htmlFor="s-state">
                      {s.accountState}
                    </label>
                    <select
                      id="s-state"
                      className="settings-input settings-select"
                      value={state}
                      onChange={(e) => setStateVal(e.target.value)}
                    >
                      {AU_STATE_OPTIONS.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.name} ({s.code})
                        </option>
                      ))}
                    </select>
                    <p className="settings-hint">{s.accountStateHint}</p>
                  </div>

                  {/* Language */}
                  <div className="settings-field">
                    <label className="settings-label" htmlFor="s-lang">
                      {s.language}
                    </label>
                    <select
                      id="s-lang"
                      className="settings-input settings-select"
                      value={preferredLang}
                      onChange={(e) => setPreferredLang(normalizePreferredLang(e.target.value))}
                    >
                      {LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code}>
                          {l.label}
                        </option>
                      ))}
                    </select>
                    <p className="settings-hint">{s.accountLanguageHint}</p>
                  </div>

                  {/* Timezone */}
                  <div className="settings-field">
                    <label className="settings-label" htmlFor="s-tz">
                      {s.accountTimezone}
                    </label>
                    <select
                      id="s-tz"
                      className="settings-input settings-select"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      {AU_TIMEZONES.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label} — {tz.offset}
                        </option>
                      ))}
                    </select>
                    <p className="settings-hint">{s.accountTimezoneHint}</p>
                  </div>

                  {/* Theme */}
                  <div className="settings-field">
                    <label className="settings-label">{s.accountTheme}</label>
                    <div className="settings-theme-row">
                      {THEME_VALUES.map((value) => (
                        <button
                          key={value}
                          type="button"
                          className={`settings-theme-btn${theme === value ? " active" : ""}`}
                          onClick={() => setTheme(value)}
                          aria-pressed={theme === value}
                        >
                          {value === "light" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              aria-hidden="true"
                            >
                              <circle cx="12" cy="12" r="5" />
                              <line x1="12" y1="1" x2="12" y2="3" />
                              <line x1="12" y1="21" x2="12" y2="23" />
                              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                              <line x1="1" y1="12" x2="3" y2="12" />
                              <line x1="21" y1="12" x2="23" y2="12" />
                              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                          )}
                          {value === "dark" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              aria-hidden="true"
                            >
                              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                          )}
                          {value === "system" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              aria-hidden="true"
                            >
                              <rect x="2" y="3" width="20" height="14" rx="2" />
                              <line x1="8" y1="21" x2="16" y2="21" />
                              <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                          )}
                          {themeLabels[value]}
                        </button>
                      ))}
                    </div>
                    <p className="settings-hint">{s.accountThemeHint}</p>
                  </div>

                  {prefsMsg && <Msg {...prefsMsg} />}
                  <button className="btn btn-primary" type="submit" disabled={savingPrefs}>
                    {savingPrefs ? s.accountSaving : s.accountSavePreferences}
                  </button>
                </form>
              </section>
            )}

            {/* ── SECURITY ── */}
            {activeSection === "security" && (
              <section className="settings-section">
                <h2 className="settings-section-title">{s.accountNavSecurity}</h2>
                <p className="settings-section-sub">{s.accountSecuritySub}</p>

                <form onSubmit={handleChangePassword} className="settings-form">
                  <div className="settings-field-row">
                    <div className="settings-field">
                      <label className="settings-label" htmlFor="s-npwd">
                        {s.accountNewPassword}
                      </label>
                      <input
                        id="s-npwd"
                        className="settings-input"
                        type="password"
                        value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)}
                        placeholder={s.accountNewPasswordPlaceholder}
                        autoComplete="new-password"
                        minLength={8}
                      />
                    </div>
                    <div className="settings-field">
                      <label className="settings-label" htmlFor="s-cpwd2">
                        {s.accountConfirmPassword}
                      </label>
                      <input
                        id="s-cpwd2"
                        className="settings-input"
                        type="password"
                        value={confirmPwd}
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        placeholder={s.accountConfirmPasswordPlaceholder}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  {pwdMsg && <Msg {...pwdMsg} />}
                  <button className="btn btn-primary" type="submit" disabled={savingPwd}>
                    {savingPwd ? s.accountChanging : s.accountChangePassword}
                  </button>
                </form>
              </section>
            )}

            {/* ── DANGER ZONE ── */}
            {activeSection === "danger" && (
              <section className="settings-section">
                <h2 className="settings-section-title" style={{ color: "var(--red)" }}>
                  {s.accountNavDanger}
                </h2>
                <p className="settings-section-sub">{s.accountDangerSub}</p>

                <div className="settings-danger-card">
                  <div>
                    <p className="settings-danger-title">{s.accountDeleteTitle}</p>
                    <p className="settings-hint">{s.accountDeleteDesc}</p>
                  </div>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={handleDeleteAccount}
                    style={{ marginTop: 16 }}
                    disabled={deletingAccount}
                  >
                    {deletingAccount ? s.accountDeleting : s.accountDeleteBtn}
                  </button>
                  {deleteMsg && <Msg {...deleteMsg} />}
                </div>
              </section>
            )}
          </div>
          {/* end settings-main */}
        </div>
        {/* end settings-layout */}
      </div>
    </div>
  );
}
