-- ══════════════════════════════════════════════════════════════
-- 024: Lock gamification tables to read-only for end users
-- ══════════════════════════════════════════════════════════════
-- Migrations 006 and 007 created permissive `FOR ALL` RLS policies on
-- user_category_stats, user_xp, xp_events and user_badges, gated only by
-- `auth.uid() = user_id`. That lets an authenticated client write its OWN
-- rows directly — e.g. inflate correct_attempts, total_xp, or self-award
-- badges — bypassing the SECURITY DEFINER RPCs that are supposed to be the
-- only write path (upsert_category_stat had its EXECUTE locked to
-- service_role in migration 022, but the table policy still allowed direct
-- writes around it).
--
-- Replace the `FOR ALL` policies with SELECT-only policies. All legitimate
-- writes go through SECURITY DEFINER functions (handle_new_profile_xp,
-- upsert_category_stat) or the service_role client, both of which bypass RLS,
-- so no application behaviour changes.

-- user_category_stats -------------------------------------------------
DROP POLICY IF EXISTS "category_stats: own" ON user_category_stats;

CREATE POLICY "category_stats: read own"
  ON user_category_stats FOR SELECT
  USING (auth.uid() = user_id);

-- user_xp -------------------------------------------------------------
DROP POLICY IF EXISTS "xp: own" ON user_xp;

CREATE POLICY "xp: read own"
  ON user_xp FOR SELECT
  USING (auth.uid() = user_id);

-- xp_events -----------------------------------------------------------
DROP POLICY IF EXISTS "events: own" ON xp_events;

CREATE POLICY "events: read own"
  ON xp_events FOR SELECT
  USING (auth.uid() = user_id);

-- user_badges ---------------------------------------------------------
DROP POLICY IF EXISTS "badges: own" ON user_badges;

CREATE POLICY "badges: read own"
  ON user_badges FOR SELECT
  USING (auth.uid() = user_id);
