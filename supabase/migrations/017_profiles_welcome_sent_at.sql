-- Migration 017: add welcome_sent_at to profiles
-- Tracks when the welcome email was sent to new users.
-- NULL = welcome email not yet sent (or user predates this column).

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS welcome_sent_at TIMESTAMPTZ DEFAULT NULL;

COMMENT ON COLUMN profiles.welcome_sent_at IS 'Timestamp when the welcome email was dispatched via Resend. NULL for users who signed up before Sprint 11 or whose email send failed.';
