-- Migration 029: revoke client EXECUTE on SECURITY DEFINER trigger functions
--
-- Supabase advisor (2026-08-05) flags these as executable by anon/authenticated
-- via /rest/v1/rpc/*. They are trigger functions — only ever invoked by their
-- triggers (EXECUTE is checked at trigger creation, not at firing time), so
-- revoking client grants is safe and silences the warning.
--
-- is_admin() is intentionally NOT revoked: the "profiles: admin read all"
-- policy (migration 026) is TO public, so anon/authenticated need EXECUTE on
-- it for profiles SELECTs to evaluate. It leaks nothing (boolean about the
-- caller only).

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.enforce_profile_defaults_on_insert() from public, anon, authenticated;
revoke execute on function public.prevent_profile_role_escalation() from public, anon, authenticated;
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
