-- Migration 015: fix search_path on SECURITY DEFINER function
-- Prevents search_path injection attacks on prevent_profile_role_escalation.
-- Supabase best practice: always set search_path on SECURITY DEFINER functions.
-- See: https://supabase.com/docs/guides/database/database-advisors?queryGroups=lint&lint=0012

create or replace function public.prevent_profile_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if new.role is distinct from old.role then
    if coalesce(auth.role(), '') <> 'service_role' then
      raise exception 'role_change_not_allowed';
    end if;
  end if;
  return new;
end;
$$;
