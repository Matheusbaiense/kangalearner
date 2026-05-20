"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLang } from "@/contexts/LangContext";
import type { Lang } from "@/lib/i18n";

/* ── Constants ── */
const AU_STATES = [
  { code: "WA",  name: "Western Australia" },
  { code: "NSW", name: "New South Wales" },
  { code: "VIC", name: "Victoria" },
  { code: "QLD", name: "Queensland" },
  { code: "SA",  name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NT",  name: "Northern Territory" },
];

const AU_TIMEZONES = [
  { value: "Australia/Perth",     label: "Perth",     offset: "GMT +8" },
  { value: "Australia/Adelaide",  label: "Adelaide",  offset: "GMT +9:30" },
  { value: "Australia/Darwin",    label: "Darwin",    offset: "GMT +9:30" },
  { value: "Australia/Brisbane",  label: "Brisbane",  offset: "GMT +10" },
  { value: "Australia/Sydney",    label: "Sydney",    offset: "GMT +10" },
  { value: "Australia/Melbourne", label: "Melbourne", offset: "GMT +10" },
  { value: "Australia/Hobart",    label: "Hobart",    offset: "GMT +10" },
];

const LANGUAGES = [
  { code: "en",    label: "English" },
  { code: "pt",    label: "Português" },
  { code: "pt-en", label: "Bilingue PT·EN" },
  { code: "es",    label: "Español" },
  { code: "es-en", label: "Bilingüe ES·EN" },
] as const;

const THEMES = [
  { value: "light",  label: "Light" },
  { value: "dark",   label: "Dark" },
  { value: "system", label: "System" },
] as const;

type Theme = "light" | "dark" | "system";
type Section = "profile" | "preferences" | "security" | "danger";

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
  try { localStorage.setItem("kanga-theme", theme); } catch { /* noop */ }
}

/* ── Message component ── */
function Msg({ text, ok }: { text: string; ok: boolean }) {
  return (
    <p className={`settings-msg ${ok ? "ok" : "err"}`} role="alert">
      {ok ? "✓ " : "⚠ "}{text}
    </p>
  );
}

/* ══════════════════════════════════════════
   SETTINGS PAGE
══════════════════════════════════════════ */
export default function AccountPage() {
  const router = useRouter();
  const { lang, setLang } = useLang();
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
  const [timezone, setTimezone] = useState("Australia/Perth");
  const [theme, setTheme] = useState<Theme>("system");
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [prefsMsg, setPrefsMsg] = useState<{ text: string; ok: boolean } | null>(null);

  /* ── Security ── */
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [savingPwd, setSavingPwd] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<{ text: string; ok: boolean } | null>(null);

  /* ── Danger zone ── */
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  /* ── Load user ── */
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace("/auth/login?redirect=/account");
        return;
      }
      const meta = user.user_metadata ?? {};
      setEmail(user.email ?? "");
      setDisplayName((meta.full_name as string | undefined) || (meta.name as string | undefined) || "");
      setPhone((meta.phone as string | undefined) || "");
      setStateVal((meta.state as string | undefined) || "WA");
      // Load avatar from profiles table
      const supabase2 = createClient();
      supabase2.from("profiles").select("avatar_url").eq("id", user.id).single()
        .then(({ data }) => { if (data?.avatar_url) setAvatarUrl(data.avatar_url); });
      setTimezone((meta.timezone as string | undefined) || "Australia/Perth");
      const savedTheme = (meta.theme as Theme | undefined) || (localStorage.getItem("kanga-theme") as Theme | null) || "system";
      setTheme(savedTheme);
      applyTheme(savedTheme);
      setLoading(false);
    });
  }, [router]);

  /* ── Handlers ── */
  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { full_name: displayName.trim(), phone: phone.trim() },
    });
    setSavingProfile(false);
    setProfileMsg(error ? { text: error.message, ok: false } : { text: "Profile saved.", ok: true });
  }

  async function handleSavePrefs(e: React.FormEvent) {
    e.preventDefault();
    setSavingPrefs(true);
    setPrefsMsg(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { state, timezone, theme },
    });
    applyTheme(theme);
    setSavingPrefs(false);
    setPrefsMsg(error ? { text: error.message, ok: false } : { text: "Preferences saved.", ok: true });
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwdMsg(null);
    if (!newPwd || newPwd.length < 8) {
      setPwdMsg({ text: "New password must be at least 8 characters.", ok: false });
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdMsg({ text: "Passwords don't match.", ok: false });
      return;
    }
    setSavingPwd(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPwd });
    setSavingPwd(false);
    if (error) {
      setPwdMsg({ text: error.message, ok: false });
    } else {
      setPwdMsg({ text: "Password changed successfully.", ok: true });
      setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
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
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setAvatarUrl(json.url);
      setAvatarMsg({ text: "Avatar updated!", ok: true });
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
      await fetch("/api/profile/avatar", { method: "DELETE" });
      setAvatarUrl(null);
      setAvatarMsg({ text: "Avatar removed.", ok: true });
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
    if (!deleteConfirm) { setDeleteConfirm(true); return; }
    if (!confirm("Tem certeza? Esta ação é irreversível e apaga todos os seus dados.")) return;

    const res = await fetch("/api/account/delete", { method: "DELETE" });
    if (!res.ok) {
      setProfileMsg({ text: "Erro ao apagar conta. Tente novamente.", ok: false });
      setDeleteConfirm(false);
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
          <div className="dash-empty">Loading…</div>
        </div>
      </div>
    );
  }

  const initials = getInitials(displayName, email);

  const NAV_ITEMS: { key: Section; label: string }[] = [
    { key: "profile",     label: "Profile" },
    { key: "preferences", label: "Preferences" },
    { key: "security",    label: "Security" },
    { key: "danger",      label: "Danger Zone" },
  ];

  return (
    <div className="app-page">
      <div className="app-container app-section">

        {/* ── Page header ── */}
        <div className="page-header">
          <h1 className="page-title">Settings</h1>
          <p className="page-sub">Manage your profile, preferences and security.</p>
        </div>

        <div className="settings-layout">

          {/* ── Sidebar nav ── */}
          <aside className="settings-sidebar">
            {/* Avatar summary */}
            <div className="settings-avatar-wrap">
              <div className="settings-avatar" aria-hidden="true">{initials}</div>
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
              Sign out
            </button>
          </aside>

          {/* ── Main content ── */}
          <div className="settings-main">

            {/* ── PROFILE ── */}
            {activeSection === "profile" && (
              <section className="settings-section">
                <h2 className="settings-section-title">Profile</h2>
                <p className="settings-section-sub">Your public name and contact info.</p>

                {/* Avatar upload */}
                <div className="settings-avatar-large-wrap">
                  <div className="settings-avatar-large-container">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="settings-avatar-img"
                        width={72} height={72}
                      />
                    ) : (
                      <div className="settings-avatar-large" aria-hidden="true">{initials}</div>
                    )}
                    {uploadingAvatar && <div className="settings-avatar-overlay"><div className="admin-spinner" /></div>}
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
                      {uploadingAvatar ? "Uploading…" : "Upload photo"}
                    </button>
                    {avatarUrl && (
                      <button
                        type="button"
                        className="btn btn-ghost"
                        style={{ fontSize: "0.82rem", padding: "6px 14px", color: "var(--red)" }}
                        onClick={handleAvatarRemove}
                        disabled={uploadingAvatar}
                      >
                        Remove
                      </button>
                    )}
                    <p className="settings-hint" style={{ margin: 0 }}>JPG, PNG, WebP or GIF · max 2 MB</p>
                    {avatarMsg && <Msg text={avatarMsg.text} ok={avatarMsg.ok} />}
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="settings-form">
                  <div className="settings-field-row">
                    <div className="settings-field">
                      <label className="settings-label" htmlFor="s-name">Full name</label>
                      <input
                        id="s-name"
                        className="settings-input"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your full name"
                        maxLength={80}
                      />
                    </div>
                    <div className="settings-field">
                      <label className="settings-label" htmlFor="s-email">Email</label>
                      <input
                        id="s-email"
                        className="settings-input"
                        type="email"
                        value={email}
                        disabled
                        readOnly
                      />
                      <p className="settings-hint">Email cannot be changed here.</p>
                    </div>
                  </div>

                  <div className="settings-field">
                    <label className="settings-label" htmlFor="s-phone">
                      Phone <span className="settings-optional">(optional)</span>
                    </label>
                    <input
                      id="s-phone"
                      className="settings-input"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+61 4xx xxx xxx"
                      maxLength={20}
                    />
                  </div>

                  {profileMsg && <Msg {...profileMsg} />}
                  <button className="btn btn-primary" type="submit" disabled={savingProfile}>
                    {savingProfile ? "Saving…" : "Save profile"}
                  </button>
                </form>
              </section>
            )}

            {/* ── PREFERENCES ── */}
            {activeSection === "preferences" && (
              <section className="settings-section">
                <h2 className="settings-section-title">Preferences</h2>
                <p className="settings-section-sub">State, language, timezone and display settings.</p>

                <form onSubmit={handleSavePrefs} className="settings-form">
                  {/* State */}
                  <div className="settings-field">
                    <label className="settings-label" htmlFor="s-state">State</label>
                    <select
                      id="s-state"
                      className="settings-input settings-select"
                      value={state}
                      onChange={(e) => setStateVal(e.target.value)}
                    >
                      {AU_STATES.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.name} ({s.code})
                        </option>
                      ))}
                    </select>
                    <p className="settings-hint">Used to load the correct question set. Only WA is available now.</p>
                  </div>

                  {/* Language */}
                  <div className="settings-field">
                    <label className="settings-label" htmlFor="s-lang">Language</label>
                    <select
                      id="s-lang"
                      className="settings-input settings-select"
                      value={lang}
                      onChange={(e) => setLang(e.target.value as Lang)}
                    >
                      {LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code}>{l.label}</option>
                      ))}
                    </select>
                    <p className="settings-hint">Sets the display language for questions and the interface.</p>
                  </div>

                  {/* Timezone */}
                  <div className="settings-field">
                    <label className="settings-label" htmlFor="s-tz">Timezone</label>
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
                    <p className="settings-hint">Used for scheduling practice reminders (coming soon).</p>
                  </div>

                  {/* Theme */}
                  <div className="settings-field">
                    <label className="settings-label">Theme</label>
                    <div className="settings-theme-row">
                      {THEMES.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          className={`settings-theme-btn${theme === t.value ? " active" : ""}`}
                          onClick={() => setTheme(t.value)}
                          aria-pressed={theme === t.value}
                        >
                          {t.value === "light" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                            </svg>
                          )}
                          {t.value === "dark" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                            </svg>
                          )}
                          {t.value === "system" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                            </svg>
                          )}
                          {t.label}
                        </button>
                      ))}
                    </div>
                    <p className="settings-hint">Light mode is the default. Dark mode coming soon.</p>
                  </div>

                  {prefsMsg && <Msg {...prefsMsg} />}
                  <button className="btn btn-primary" type="submit" disabled={savingPrefs}>
                    {savingPrefs ? "Saving…" : "Save preferences"}
                  </button>
                </form>
              </section>
            )}

            {/* ── SECURITY ── */}
            {activeSection === "security" && (
              <section className="settings-section">
                <h2 className="settings-section-title">Security</h2>
                <p className="settings-section-sub">Update your password.</p>

                <form onSubmit={handleChangePassword} className="settings-form">
                  <div className="settings-field">
                    <label className="settings-label" htmlFor="s-cpwd">Current password</label>
                    <input
                      id="s-cpwd"
                      className="settings-input"
                      type="password"
                      value={currentPwd}
                      onChange={(e) => setCurrentPwd(e.target.value)}
                      placeholder="Your current password"
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="settings-field-row">
                    <div className="settings-field">
                      <label className="settings-label" htmlFor="s-npwd">New password</label>
                      <input
                        id="s-npwd"
                        className="settings-input"
                        type="password"
                        value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)}
                        placeholder="Min. 8 characters"
                        autoComplete="new-password"
                        minLength={8}
                      />
                    </div>
                    <div className="settings-field">
                      <label className="settings-label" htmlFor="s-cpwd2">Confirm new password</label>
                      <input
                        id="s-cpwd2"
                        className="settings-input"
                        type="password"
                        value={confirmPwd}
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        placeholder="Repeat new password"
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  {pwdMsg && <Msg {...pwdMsg} />}
                  <button className="btn btn-primary" type="submit" disabled={savingPwd}>
                    {savingPwd ? "Changing…" : "Change password"}
                  </button>
                </form>
              </section>
            )}

            {/* ── DANGER ZONE ── */}
            {activeSection === "danger" && (
              <section className="settings-section">
                <h2 className="settings-section-title" style={{ color: "var(--red)" }}>Danger Zone</h2>
                <p className="settings-section-sub">Irreversible actions — proceed with caution.</p>

                <div className="settings-danger-card">
                  <div>
                    <p className="settings-danger-title">Delete account</p>
                    <p className="settings-hint">
                      This will permanently delete your account and all progress data. This action cannot be undone.
                    </p>
                  </div>
                  {deleteConfirm ? (
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
                      <button className="btn btn-danger" type="button" onClick={handleDeleteAccount}>
                        Yes, delete my account
                      </button>
                      <button
                        className="btn btn-outline-dark"
                        type="button"
                        onClick={() => setDeleteConfirm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={handleDeleteAccount}
                      style={{ marginTop: 16 }}
                    >
                      Delete account
                    </button>
                  )}
                </div>
              </section>
            )}

          </div>{/* end settings-main */}
        </div>{/* end settings-layout */}
      </div>
    </div>
  );
}
