-- Migration 011: expand roles to free | premium | admin | super_admin
-- Replaces the legacy student/instructor/admin set.

-- 1. Drop the existing check constraint (name may vary; we try both common names)
alter table profiles drop constraint if exists profiles_role_check;
alter table profiles drop constraint if exists "profiles_role_check";

-- 2. Rename existing values before adding constraint
update profiles set role = 'free'  where role = 'student';
update profiles set role = 'admin' where role = 'instructor';

-- 3. Re-add constraint with new set
alter table profiles
  add constraint profiles_role_check
  check (role in ('free', 'premium', 'admin', 'super_admin'));

-- 4. To promote a user to super_admin, run manually in Supabase SQL Editor:
-- UPDATE profiles SET role = 'super_admin' WHERE id = '<USER_UUID>';
-- Do not hardcode emails in migrations.

-- 5. Update prevent_role_escalation trigger to allow service_role changes
--    (already handles any role; re-create to be explicit)
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

-- 6. RLS policy so admins/super_admins can read all profiles
drop policy if exists "profiles: admin read all" on profiles;
create policy "profiles: admin read all"
  on profiles for select
  using (
    auth.uid() = id
    or exists (
      select 1 from profiles p
      where p.id = auth.uid()
        and p.role in ('admin', 'super_admin')
    )
  );
