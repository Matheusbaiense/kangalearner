-- Migration 031: relock user_category_stats after 025 reopened FOR ALL
--
-- 024 locked this table to SELECT-only. 025 recreated "category_stats: own"
-- FOR ALL (using auth.uid() = user_id), so an authenticated client can PATCH
-- its own rows via PostgREST and inflate correct_attempts.
--
-- App behaviour: dashboard/progress only SELECT. Writes go through the
-- AFTER INSERT trigger on question_attempts (028) → upsert_category_stat.

drop policy if exists "category_stats: own" on public.user_category_stats;
drop policy if exists "category_stats: read own" on public.user_category_stats;

create policy "category_stats: read own"
  on public.user_category_stats
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.upsert_category_stat(
  p_user_id    uuid,
  p_country    varchar,
  p_state      varchar,
  p_category   varchar,
  p_is_correct boolean
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if coalesce(auth.role(), '') <> 'service_role'
     and p_user_id is distinct from auth.uid() then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  insert into public.user_category_stats
    (user_id, country, state, category, total_attempts, correct_attempts, last_attempt_at)
  values
    (p_user_id, p_country, p_state, p_category, 1,
     case when p_is_correct then 1 else 0 end, now())
  on conflict (user_id, country, state, category)
  do update set
    total_attempts   = user_category_stats.total_attempts + 1,
    correct_attempts = user_category_stats.correct_attempts + (case when p_is_correct then 1 else 0 end),
    last_attempt_at  = now(),
    updated_at       = now();
end;
$$;

revoke execute on function public.upsert_category_stat(uuid, varchar, varchar, varchar, boolean) from public;
revoke execute on function public.upsert_category_stat(uuid, varchar, varchar, varchar, boolean) from anon;
revoke execute on function public.upsert_category_stat(uuid, varchar, varchar, varchar, boolean) from authenticated;
grant execute on function public.upsert_category_stat(uuid, varchar, varchar, varchar, boolean) to service_role;
