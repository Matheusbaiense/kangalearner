-- Migration 025: reconcile PRODUCTION schema with migrations 004/006
--
-- Production was created from a different baseline and never applied 004/006.
-- Effect in prod (verified 2026-06-01):
--   * question_attempts had NO `attempt_id` column and NO unique(user_id, attempt_id)
--     constraint -> POST /api/attempts insert and /api/attempts/bulk upsert
--     (onConflict: user_id,attempt_id) failed silently. 0 rows ever persisted.
--   * user_category_stats table (006) did not exist -> dashboard category stats
--     broke and upsert_category_stat RPC wrote to a non-existent table.
--
-- This migration is ADDITIVE and IDEMPOTENT. It does not alter the existing
-- prod baseline columns (id bigint identity, answered_at, source default 'web').

-- 1) question_attempts: add attempt_id used by the app's idempotency key.
alter table public.question_attempts
  add column if not exists attempt_id text;

-- Backfill any pre-existing rows (prod has 0, but stay safe / re-runnable).
update public.question_attempts
set attempt_id = gen_random_uuid()::text
where attempt_id is null or trim(attempt_id) = '';

alter table public.question_attempts
  alter column attempt_id set not null;

-- Unique constraint is REQUIRED for the bulk upsert onConflict (user_id, attempt_id).
do $$
begin
  if not exists (
    select 1
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    where t.relname = 'question_attempts'
      and t.relnamespace = 'public'::regnamespace
      and c.conname = 'question_attempts_user_attempt_unique'
  ) then
    alter table public.question_attempts
      add constraint question_attempts_user_attempt_unique unique (user_id, attempt_id);
  end if;
end $$;

-- 2) user_category_stats (migration 006), idempotent.
create table if not exists public.user_category_stats (
  id               uuid        primary key default gen_random_uuid(),
  user_id          uuid        not null references auth.users(id) on delete cascade,
  country          varchar(2)  not null default 'AU',
  state            varchar(10) not null,
  category         varchar(50) not null,
  total_attempts   int         not null default 0,
  correct_attempts int         not null default 0,
  last_attempt_at  timestamptz,
  updated_at       timestamptz not null default now(),
  unique (user_id, country, state, category)
);

drop trigger if exists category_stats_updated_at on public.user_category_stats;
create trigger category_stats_updated_at
  before update on public.user_category_stats
  for each row execute function update_updated_at();

create index if not exists idx_category_stats_user
  on public.user_category_stats (user_id, country, state);

alter table public.user_category_stats enable row level security;

drop policy if exists "category_stats: own" on public.user_category_stats;
create policy "category_stats: own"
  on public.user_category_stats for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Recreate the RPC aligned with the file (idempotent; SECURITY DEFINER bypasses RLS).
create or replace function public.upsert_category_stat(
  p_user_id    uuid,
  p_country    varchar,
  p_state      varchar,
  p_category   varchar,
  p_is_correct boolean
)
returns void as $$
begin
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
$$ language plpgsql security definer
set search_path = public;

revoke execute on function public.upsert_category_stat(uuid, varchar, varchar, varchar, boolean) from public;
revoke execute on function public.upsert_category_stat(uuid, varchar, varchar, varchar, boolean) from anon;
revoke execute on function public.upsert_category_stat(uuid, varchar, varchar, varchar, boolean) from authenticated;
grant execute on function public.upsert_category_stat(uuid, varchar, varchar, varchar, boolean) to service_role;
