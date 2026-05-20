-- Migration 014: soft-delete support on profiles
-- Adds deleted_at column so account deletion anonymises the row instead of
-- removing the auth.users record (preserves attempt data for analytics/GDPR recovery).

alter table profiles
  add column if not exists deleted_at timestamptz default null;

-- Prevent deleted accounts from being read by normal RLS.
-- We drop the "select own" policy and replace it with one that also excludes deleted rows.
drop policy if exists "profiles: select own" on profiles;
drop policy if exists "profiles: admin read all" on profiles;

create policy "profiles: select own"
  on profiles for select
  using (auth.uid() = id and deleted_at is null);

-- Admins and super_admins can see all rows (including soft-deleted, for recovery).
create policy "profiles: admin read all"
  on profiles for select
  using (
    (auth.uid() = id and deleted_at is null)
    or exists (
      select 1 from profiles p
      where p.id = auth.uid()
        and p.role in ('admin', 'super_admin')
    )
  );

-- Index to quickly filter active (non-deleted) profiles.
create index if not exists profiles_deleted_at_idx on profiles (deleted_at)
  where deleted_at is not null;
