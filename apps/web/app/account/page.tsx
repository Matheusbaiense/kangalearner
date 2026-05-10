"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const AU_STATES = [
  { code: "WA", name: "Western Australia" },
  { code: "NSW", name: "New South Wales" },
  { code: "VIC", name: "Victoria" },
  { code: "QLD", name: "Queensland" },
  { code: "SA", name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NT", name: "Northern Territory" }
];

export default function AccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [state, setState] = useState("WA");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace("/auth/login?redirect=/account");
        return;
      }
      setEmail(user.email ?? "");
      setDisplayName(
        (user.user_metadata?.full_name as string | undefined) ||
          (user.user_metadata?.name as string | undefined) ||
          ""
      );
      setState((user.user_metadata?.state as string | undefined) ?? "WA");
      setLoading(false);
    });
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { full_name: displayName.trim(), state }
    });
    setSaving(false);
    if (error) {
      setMessage({ text: error.message, ok: false });
    } else {
      setMessage({ text: "Profile saved.", ok: true });
    }
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  async function handleDeleteAccount() {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    const supabase = createClient();
    // Sign out first — actual deletion requires a server action / admin API
    await supabase.auth.signOut();
    router.push("/?deleted=1");
  }

  if (loading) {
    return (
      <div className="app-page">
        <div className="app-container app-section">
          <div className="dash-empty">Loading…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <div className="app-container app-section">
        <div className="page-header">
          <h1 className="page-title">Account</h1>
          <p className="page-sub">Manage your profile and preferences.</p>
        </div>

        <form className="account-form" onSubmit={handleSave}>
          {/* Email — read-only */}
          <div className="account-field">
            <label className="account-label" htmlFor="acc-email">
              Email
            </label>
            <input
              id="acc-email"
              className="account-input"
              type="email"
              value={email}
              disabled
              readOnly
            />
            <p className="account-hint">Email cannot be changed here.</p>
          </div>

          {/* Display name */}
          <div className="account-field">
            <label className="account-label" htmlFor="acc-name">
              Display name
            </label>
            <input
              id="acc-name"
              className="account-input"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              maxLength={80}
            />
          </div>

          {/* State */}
          <div className="account-field">
            <label className="account-label" htmlFor="acc-state">
              State
            </label>
            <select
              id="acc-state"
              className="account-input account-select"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              {AU_STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
            <p className="account-hint">
              Used to load the correct question set for your territory.
            </p>
          </div>

          {message && (
            <p
              className="account-message"
              style={{ color: message.ok ? "var(--green)" : "var(--red)" }}
            >
              {message.text}
            </p>
          )}

          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </form>

        {/* Divider */}
        <hr className="account-divider" />

        {/* Sign out */}
        <div className="account-section">
          <p className="account-section-title">Session</p>
          <button className="btn btn-outline-dark" type="button" onClick={handleSignOut}>
            Sign out
          </button>
        </div>

        {/* Danger zone */}
        <div className="account-section account-danger-zone">
          <p className="account-section-title" style={{ color: "var(--red)" }}>
            Danger zone
          </p>
          <p className="account-hint" style={{ marginBottom: 12 }}>
            Deleting your account will remove all your progress data permanently.
          </p>
          {deleteConfirm ? (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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
            <button className="btn btn-danger" type="button" onClick={handleDeleteAccount}>
              Delete account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
