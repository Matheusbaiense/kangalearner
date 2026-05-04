-- Migration 006: user_category_stats + upsert helper

create table if not exists user_category_stats (
  id               uuid        primary key default gen_random_uuid(),
  user_id          uuid        not null references auth.users(id) on delete cascade,
  country          varchar(2)  not null default 'AU',
  state            varchar(10) not null,
  category         varchar(50) not null,
  total_attempts   int         not null default 0,
  correct_attempts int         not null default 0,
  last_attempt_at  timestamptz,
  updated_at       timestamptz not null default now(),
  unique(user_id, country, state, category)
);

drop trigger if exists category_stats_updated_at on user_category_stats;
create trigger category_stats_updated_at
  before update on user_category_stats
  for each row execute function update_updated_at();

create index if not exists idx_category_stats_user
  on user_category_stats(user_id, country, state);

alter table user_category_stats enable row level security;

drop policy if exists "category_stats: own" on user_category_stats;

create policy "category_stats: own"
  on user_category_stats for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function upsert_category_stat(
  p_user_id    uuid,
  p_country    varchar,
  p_state      varchar,
  p_category   varchar,
  p_is_correct boolean
)
returns void as $$
begin
  insert into user_category_stats
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
