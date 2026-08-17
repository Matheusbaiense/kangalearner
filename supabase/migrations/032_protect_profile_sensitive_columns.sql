-- Migration 032: stop authenticated clients from writing billing/PII columns
--
-- profiles UPDATE RLS allows the owner to update their own row. Column-level
-- grants are not enough against PostgREST. Role changes are already blocked
-- by prevent_profile_role_escalation (010/011). This trigger restores
-- stripe_customer_id, welcome_sent_at, deleted_at, and email unless the
-- caller is service_role (webhooks, admin API, account-delete).

create or replace function public.protect_profile_sensitive_columns()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if coalesce(auth.role(), '') = 'service_role' then
    return new;
  end if;

  new.stripe_customer_id := old.stripe_customer_id;
  new.welcome_sent_at := old.welcome_sent_at;
  new.deleted_at := old.deleted_at;
  new.email := old.email;
  return new;
end;
$$;

drop trigger if exists profiles_protect_sensitive_columns on public.profiles;
create trigger profiles_protect_sensitive_columns
  before update on public.profiles
  for each row execute function public.protect_profile_sensitive_columns();

revoke execute on function public.protect_profile_sensitive_columns() from public, anon, authenticated;
