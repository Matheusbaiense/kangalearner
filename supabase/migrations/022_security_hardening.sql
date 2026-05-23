-- Migration 022: security hardening (post-audit 2026-05-23)
-- Fixes: profile role INSERT escalation, legacy attempts FOR ALL policy,
-- upsert_category_stat IDOR, mock_sessions score integrity, soft-delete UPDATE bypass,
-- Stripe webhook idempotency ledger, unique stripe_customer_id.

-- ══════════════════════════════════════════════════════════════
-- 1. Drop legacy question_attempts FOR ALL policy (004)
--    Migration 013 added insert/select only; 004 "attempts: own" still grants UPDATE/DELETE.
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "attempts: own" ON question_attempts;

-- ══════════════════════════════════════════════════════════════
-- 2. profiles: force role=free on INSERT for non-service_role
-- ══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.enforce_profile_defaults_on_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF coalesce(auth.role(), '') <> 'service_role' THEN
    NEW.role := 'free';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_enforce_defaults_on_insert ON public.profiles;
CREATE TRIGGER profiles_enforce_defaults_on_insert
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_profile_defaults_on_insert();

-- ══════════════════════════════════════════════════════════════
-- 3. profiles UPDATE: block soft-deleted accounts
-- ══════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = id AND deleted_at IS NULL)
  WITH CHECK ((SELECT auth.uid()) = id AND deleted_at IS NULL);

-- ══════════════════════════════════════════════════════════════
-- 4. upsert_category_stat: caller check + REVOKE PUBLIC
-- ══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.upsert_category_stat(
  p_user_id    uuid,
  p_country    varchar,
  p_state      varchar,
  p_category   varchar,
  p_is_correct boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF coalesce(auth.role(), '') <> 'service_role'
     AND p_user_id IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'forbidden' USING ERRCODE = '42501';
  END IF;

  INSERT INTO user_category_stats
    (user_id, country, state, category, total_attempts, correct_attempts, last_attempt_at)
  VALUES
    (p_user_id, p_country, p_state, p_category, 1,
     CASE WHEN p_is_correct THEN 1 ELSE 0 END, now())
  ON CONFLICT (user_id, country, state, category)
  DO UPDATE SET
    total_attempts   = user_category_stats.total_attempts + 1,
    correct_attempts = user_category_stats.correct_attempts + (CASE WHEN p_is_correct THEN 1 ELSE 0 END),
    last_attempt_at  = now(),
    updated_at       = now();
END;
$$;

REVOKE EXECUTE ON FUNCTION public.upsert_category_stat(uuid, varchar, varchar, varchar, boolean) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.upsert_category_stat(uuid, varchar, varchar, varchar, boolean) FROM anon;
REVOKE EXECUTE ON FUNCTION public.upsert_category_stat(uuid, varchar, varchar, varchar, boolean) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_category_stat(uuid, varchar, varchar, varchar, boolean) TO service_role;

-- ══════════════════════════════════════════════════════════════
-- 5. mock_sessions: derive passed from score/total (80% WA threshold)
-- ══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.enforce_mock_session_integrity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NEW.total IS NULL OR NEW.total <= 0 THEN
    RAISE EXCEPTION 'invalid_total' USING ERRCODE = '22023';
  END IF;

  IF NEW.score IS NULL OR NEW.score < 0 OR NEW.score > NEW.total THEN
    RAISE EXCEPTION 'invalid_score' USING ERRCODE = '22023';
  END IF;

  NEW.passed := (NEW.score::numeric / NEW.total::numeric) >= 0.8;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS mock_sessions_enforce_integrity ON mock_sessions;
CREATE TRIGGER mock_sessions_enforce_integrity
  BEFORE INSERT OR UPDATE OF score, total, passed ON mock_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_mock_session_integrity();

-- ══════════════════════════════════════════════════════════════
-- 6. Stripe webhook idempotency ledger (service_role only)
-- ══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  event_id     text        PRIMARY KEY,
  event_type   text        NOT NULL,
  processed_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE stripe_webhook_events ENABLE ROW LEVEL SECURITY;

-- No policies: only service_role bypasses RLS.

-- ══════════════════════════════════════════════════════════════
-- 7. Prevent duplicate Stripe customers per profile
-- ══════════════════════════════════════════════════════════════
CREATE UNIQUE INDEX IF NOT EXISTS profiles_stripe_customer_id_unique
  ON profiles (stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL;
