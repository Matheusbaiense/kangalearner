-- ============================================================
-- MIGRATION 013: security_hardening_rls_newsletter
-- Applied: 2026-05-20
-- Fixes:
--   1. Create is_admin() helper (includes super_admin, was missing)
--   2. INSERT policies missing WITH CHECK — users could insert rows for other users
--   3. auth.uid() → (SELECT auth.uid()) for RLS performance (cached per query)
--   4. Duplicate user_settings policies removed
--   5. newsletter_subscribers table created with RLS
-- ============================================================

-- ── is_admin() helper ─────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = (SELECT auth.uid())
      AND role = ANY(ARRAY['admin'::text, 'super_admin'::text])
  );
$$;

GRANT EXECUTE ON FUNCTION is_admin() TO authenticated, anon;

-- ── mock_sessions ──────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "mocks_insert_own" ON mock_sessions;
CREATE POLICY "mocks_insert_own" ON mock_sessions
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "mocks_select_own" ON mock_sessions;
CREATE POLICY "mocks_select_own" ON mock_sessions
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- ── question_attempts ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "attempts_insert_own" ON question_attempts;
CREATE POLICY "attempts_insert_own" ON question_attempts
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "attempts_select_own" ON question_attempts;
CREATE POLICY "attempts_select_own" ON question_attempts
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- ── profiles ───────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles: admin read all" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = id OR is_admin());

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = id);

-- ── user_settings: remove duplicate policies ──────────────────────────────────
DROP POLICY IF EXISTS "settings_select_own" ON user_settings;
DROP POLICY IF EXISTS "settings_update_own" ON user_settings;
DROP POLICY IF EXISTS "settings_upsert_own" ON user_settings;
DROP POLICY IF EXISTS "user_settings_select_own" ON user_settings;
DROP POLICY IF EXISTS "user_settings_update_own" ON user_settings;
DROP POLICY IF EXISTS "user_settings_upsert_own" ON user_settings;

CREATE POLICY "user_settings_select" ON user_settings
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id OR is_admin());

CREATE POLICY "user_settings_insert" ON user_settings
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "user_settings_update" ON user_settings
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id OR is_admin())
  WITH CHECK ((SELECT auth.uid()) = user_id OR is_admin());

-- ── newsletter_subscribers ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  subscribed_at timestamptz NOT NULL DEFAULT now(),
  source text DEFAULT 'web',
  unsubscribed_at timestamptz
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "newsletter_insert_public" ON newsletter_subscribers
  FOR INSERT TO public
  WITH CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$');

CREATE POLICY "newsletter_admin_select" ON newsletter_subscribers
  FOR SELECT TO authenticated
  USING (is_admin());
