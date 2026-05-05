-- Migration 010: prevent self role escalation on profiles
--
-- Rationale: RLS UPDATE policy cannot restrict specific columns. Without a guard,
-- users can update their own `profiles.role` to 'admin'. This trigger blocks
-- role changes unless the request JWT role is `service_role`.

create or replace function public.prevent_profile_role_escalation()
returns trigger
language plpgsql
security definer
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

drop trigger if exists profiles_prevent_role_escalation on public.profiles;
create trigger profiles_prevent_role_escalation
  before update on public.profiles
  for each row execute function public.prevent_profile_role_escalation();

