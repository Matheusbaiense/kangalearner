-- Migration 018: reconcile live DB columns missing from tracked migrations
-- Safe for fresh provision (IF NOT EXISTS) and production drift repair.

-- ── profiles: columns present in live DB / database.types.ts ─────────────────
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS preferred_state varchar(10),
  ADD COLUMN IF NOT EXISTS preferred_lang varchar(10),
  ADD COLUMN IF NOT EXISTS email varchar(320),
  ADD COLUMN IF NOT EXISTS name varchar(200),
  ADD COLUMN IF NOT EXISTS last_sign_in_at timestamptz;

-- Backfill email/name from auth.users where possible (service role / migration context)
UPDATE public.profiles p
SET
  email = COALESCE(p.email, u.email),
  name = COALESCE(
    p.name,
    u.raw_user_meta_data->>'full_name',
    u.raw_user_meta_data->>'name',
    split_part(u.email, '@', 1)
  ),
  preferred_state = COALESCE(p.preferred_state, 'WA'),
  preferred_lang = COALESCE(p.preferred_lang, p.lang, 'en')
FROM auth.users u
WHERE u.id = p.id;

-- ── user_settings (created in 013 for fresh DBs; IF NOT EXISTS is a no-op) ─
CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_goal int NOT NULL DEFAULT 10 CHECK (daily_goal >= 1 AND daily_goal <= 500),
  notifications_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS user_settings_updated_at ON public.user_settings;
CREATE TRIGGER user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- ── mock_sessions: completed_at drift ────────────────────────────────────────
ALTER TABLE public.mock_sessions
  ADD COLUMN IF NOT EXISTS completed_at timestamptz;

UPDATE public.mock_sessions
SET completed_at = COALESCE(completed_at, now())
WHERE completed_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_mock_sessions_user_completed
  ON public.mock_sessions(user_id, completed_at DESC);

-- ── question_attempts: answered_at + index (routes use answered_at) ───────────
ALTER TABLE public.question_attempts
  ADD COLUMN IF NOT EXISTS answered_at timestamptz;

UPDATE public.question_attempts
SET answered_at = COALESCE(answered_at, now())
WHERE answered_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_attempts_user_answered_at
  ON public.question_attempts(user_id, answered_at DESC);

-- ── marketplace_waitlist: admin read via is_admin() (if table exists) ───────
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'marketplace_waitlist'
  ) THEN
    DROP POLICY IF EXISTS "waitlist_admin_select" ON public.marketplace_waitlist;
    CREATE POLICY "waitlist_admin_select" ON public.marketplace_waitlist
      FOR SELECT TO authenticated
      USING (is_admin());
  END IF;
END $$;

-- ── bookings: cascade delete when student removed (if table exists) ───────────
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'bookings'
  ) THEN
    ALTER TABLE public.bookings
      DROP CONSTRAINT IF EXISTS bookings_student_id_fkey;

    ALTER TABLE public.bookings
      ADD CONSTRAINT bookings_student_id_fkey
      FOREIGN KEY (student_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;
