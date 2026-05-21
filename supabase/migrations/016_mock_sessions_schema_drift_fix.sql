-- Migration 016: fix mock_sessions schema drift
-- The live table was created before migration 005 was tracked.
-- Live table is missing: country, mode, passed, time_seconds, answers, weak_categories.
-- The route inserts all these columns → every mock session save fails silently.
-- Also: revoke EXECUTE ON is_admin() from anon role (security hardening).

-- ── 1. Add missing columns to mock_sessions ───────────────────────────────────

ALTER TABLE mock_sessions
  ADD COLUMN IF NOT EXISTS country      varchar(2)  NOT NULL DEFAULT 'AU',
  ADD COLUMN IF NOT EXISTS mode         varchar(10),
  ADD COLUMN IF NOT EXISTS passed       boolean,
  ADD COLUMN IF NOT EXISTS time_seconds int,
  ADD COLUMN IF NOT EXISTS answers      jsonb,
  ADD COLUMN IF NOT EXISTS weak_categories jsonb;

-- ── 2. Backfill nullable columns for existing rows ────────────────────────────

-- mode: all existing sessions were exams
UPDATE mock_sessions SET mode = 'exam' WHERE mode IS NULL;

-- passed: derive from score/total (80% threshold used at time of insert)
UPDATE mock_sessions SET passed = (score::numeric / NULLIF(total, 0)) >= 0.8
WHERE passed IS NULL AND total > 0;

UPDATE mock_sessions SET passed = false WHERE passed IS NULL;

-- answers: default to empty object
UPDATE mock_sessions SET answers = '{}' WHERE answers IS NULL;

-- ── 3. Add NOT NULL constraints now that backfill is done ─────────────────────

ALTER TABLE mock_sessions
  ALTER COLUMN mode    SET NOT NULL,
  ALTER COLUMN passed  SET NOT NULL,
  ALTER COLUMN answers SET NOT NULL,
  ALTER COLUMN answers SET DEFAULT '{}';

-- ── 4. Add mode check constraint ──────────────────────────────────────────────

ALTER TABLE mock_sessions
  DROP CONSTRAINT IF EXISTS mock_sessions_mode_check;

ALTER TABLE mock_sessions
  ADD CONSTRAINT mock_sessions_mode_check
  CHECK (mode IN ('practice', 'exam'));

-- ── 5. Security: revoke is_admin() from anon role ─────────────────────────────
-- anon users cannot be admins; granting EXECUTE allows them to call the function
-- unnecessarily. authenticated role is sufficient.

REVOKE EXECUTE ON FUNCTION is_admin() FROM anon;
