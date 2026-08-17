-- Migration 034: RLS hygiene after 031–033
--
-- 1) Drop leftover duplicate profiles policies (colon names from 002/014)
--    that OR with the underscore policies from 013/022.
-- 2) One SELECT on profiles: own non-deleted OR is_admin().
-- 3) (SELECT auth.uid()) on remaining hot policies (saved_questions,
--    gamification reads, avatars list).
-- 4) handle_new_profile_xp: search_path + REVOKE client EXECUTE.
-- 5) Analytics RPCs: search_path = public, pg_temp (grants already 027).
--
-- Apply staging first. Do not DISABLE ROW LEVEL SECURITY.

-- ══════════════════════════════════════════════════════════════
-- 1. Profiles: drop duplicates, one SELECT
-- ══════════════════════════════════════════════════════════════
drop policy if exists "profiles: insert own" on public.profiles;
drop policy if exists "profiles: select own" on public.profiles;
drop policy if exists "profiles: admin read all" on public.profiles;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (
    ((select auth.uid()) = id and deleted_at is null)
    or public.is_admin()
  );

-- ══════════════════════════════════════════════════════════════
-- 2. saved_questions: SELECT/INSERT/DELETE (no client UPDATE)
-- ══════════════════════════════════════════════════════════════
drop policy if exists "saved: own" on public.saved_questions;

create policy "saved: select own"
  on public.saved_questions
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "saved: insert own"
  on public.saved_questions
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "saved: delete own"
  on public.saved_questions
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- ══════════════════════════════════════════════════════════════
-- 3. Gamification reads: initplan auth.uid()
-- ══════════════════════════════════════════════════════════════
do $$
begin
  if to_regclass('public.user_xp') is not null then
    drop policy if exists "xp: read own" on public.user_xp;
    create policy "xp: read own"
      on public.user_xp for select to authenticated
      using ((select auth.uid()) = user_id);
  end if;

  if to_regclass('public.xp_events') is not null then
    drop policy if exists "events: read own" on public.xp_events;
    create policy "events: read own"
      on public.xp_events for select to authenticated
      using ((select auth.uid()) = user_id);
  end if;

  if to_regclass('public.user_badges') is not null then
    drop policy if exists "badges: read own" on public.user_badges;
    create policy "badges: read own"
      on public.user_badges for select to authenticated
      using ((select auth.uid()) = user_id);
  end if;
end $$;

-- ══════════════════════════════════════════════════════════════
-- 4. Storage avatars list (027) — initplan
-- ══════════════════════════════════════════════════════════════
drop policy if exists "avatars: owner list" on storage.objects;
create policy "avatars: owner list"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

-- ══════════════════════════════════════════════════════════════
-- 5. handle_new_profile_xp — trigger only
-- ══════════════════════════════════════════════════════════════
create or replace function public.handle_new_profile_xp()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.user_xp (user_id) values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

revoke execute on function public.handle_new_profile_xp() from public, anon, authenticated;

-- ══════════════════════════════════════════════════════════════
-- 6. Analytics RPCs — pin search_path (EXECUTE already service_role)
-- ══════════════════════════════════════════════════════════════
alter function public.get_role_breakdown()                     set search_path = public, pg_temp;
alter function public.get_country_breakdown(int)               set search_path = public, pg_temp;
alter function public.get_top_categories(timestamptz, int)     set search_path = public, pg_temp;
alter function public.get_active_users_count(timestamptz)      set search_path = public, pg_temp;
alter function public.get_pass_rate(timestamptz)               set search_path = public, pg_temp;
alter function public.get_signups_per_day(timestamptz)         set search_path = public, pg_temp;
alter function public.is_admin()                               set search_path = public, pg_temp;
