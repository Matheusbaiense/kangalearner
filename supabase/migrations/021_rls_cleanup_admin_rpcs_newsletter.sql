-- Migration 021: RLS cleanup, admin RPCs, newsletter hardening

-- ══════════════════════════════════════════════════════════════
-- 1. Fix soft-delete bypass
--    Migration 013 created "profiles_select_own" (underscore).
--    Migration 014 dropped "profiles: select own" (colon) and
--    created a new one with deleted_at IS NULL. The 013 policy
--    was never dropped, allowing bypassing soft-delete via the
--    old policy name.
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;

-- ══════════════════════════════════════════════════════════════
-- 2. Admin RPCs (SECURITY DEFINER, callable only by service_role)
--    Called from /api/admin/stats via supabaseAdmin client.
-- ══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION get_role_breakdown()
RETURNS TABLE(role text, cnt bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role::text, COUNT(*)::bigint AS cnt
  FROM profiles
  WHERE deleted_at IS NULL
  GROUP BY role
  ORDER BY cnt DESC;
$$;

REVOKE EXECUTE ON FUNCTION get_role_breakdown() FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION get_role_breakdown() TO service_role;

-- ──────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION get_country_breakdown(limit_n int DEFAULT 10)
RETURNS TABLE(country text, cnt bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT country::text, COUNT(*)::bigint AS cnt
  FROM mock_sessions
  GROUP BY country
  ORDER BY cnt DESC
  LIMIT limit_n;
$$;

REVOKE EXECUTE ON FUNCTION get_country_breakdown(int) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION get_country_breakdown(int) TO service_role;

-- ──────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION get_top_categories(since_ts timestamptz, limit_n int DEFAULT 6)
RETURNS TABLE(category text, cnt bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT category, COUNT(*)::bigint AS cnt
  FROM question_attempts
  WHERE answered_at >= since_ts
    AND category IS NOT NULL
  GROUP BY category
  ORDER BY cnt DESC
  LIMIT limit_n;
$$;

REVOKE EXECUTE ON FUNCTION get_top_categories(timestamptz, int) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION get_top_categories(timestamptz, int) TO service_role;

-- ──────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION get_active_users_count(since_ts timestamptz)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(DISTINCT user_id)::bigint
  FROM question_attempts
  WHERE answered_at >= since_ts;
$$;

REVOKE EXECUTE ON FUNCTION get_active_users_count(timestamptz) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION get_active_users_count(timestamptz) TO service_role;

-- ──────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION get_pass_rate(since_ts timestamptz)
RETURNS numeric
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT ROUND(
    100.0 * COUNT(*) FILTER (WHERE passed = true)
    / NULLIF(COUNT(*), 0),
    1
  )
  FROM mock_sessions
  WHERE completed_at >= since_ts;
$$;

REVOKE EXECUTE ON FUNCTION get_pass_rate(timestamptz) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION get_pass_rate(timestamptz) TO service_role;

-- ──────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION get_signups_per_day(since_ts timestamptz)
RETURNS TABLE(day text, cnt bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DATE_TRUNC('day', created_at)::date::text AS day,
         COUNT(*)::bigint AS cnt
  FROM profiles
  WHERE created_at >= since_ts
    AND deleted_at IS NULL
  GROUP BY 1
  ORDER BY 1;
$$;

REVOKE EXECUTE ON FUNCTION get_signups_per_day(timestamptz) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION get_signups_per_day(timestamptz) TO service_role;

-- ══════════════════════════════════════════════════════════════
-- 3. Newsletter hardening
--    Drop the anon/authenticated INSERT policy from migration 013.
--    Inserts now go through supabaseAdmin (service_role), which
--    bypasses RLS automatically — no replacement policy needed.
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "newsletter_insert_public" ON newsletter_subscribers;
