-- Migration 007: gamification (user_xp, xp_events, user_badges)

create table if not exists user_xp (
  id                uuid        primary key default gen_random_uuid(),
  user_id           uuid        unique not null references auth.users(id) on delete cascade,
  total_xp          int         not null default 0,
  level             varchar(30) not null default 'Learner Driver',
  streak_days       int         not null default 0,
  last_activity_date date,
  updated_at        timestamptz not null default now()
);

drop trigger if exists user_xp_updated_at on user_xp;
create trigger user_xp_updated_at
  before update on user_xp
  for each row execute function update_updated_at();

create table if not exists xp_events (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users(id) on delete cascade,
  event_type  varchar(50) not null,
  xp_earned   int         not null,
  metadata    jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists idx_xp_events_user
  on xp_events(user_id, created_at desc);

create table if not exists user_badges (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references auth.users(id) on delete cascade,
  badge_key  varchar(50) not null,
  earned_at  timestamptz not null default now(),
  unique(user_id, badge_key)
);

alter table user_xp     enable row level security;
alter table xp_events   enable row level security;
alter table user_badges enable row level security;

drop policy if exists "xp: own" on user_xp;
drop policy if exists "events: own" on xp_events;
drop policy if exists "badges: own" on user_badges;

create policy "xp: own" on user_xp for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "events: own" on xp_events for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "badges: own" on user_badges for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function handle_new_profile_xp()
returns trigger as $$
begin
  insert into user_xp (user_id) values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql security definer
set search_path = public;

drop trigger if exists on_profile_created_xp on profiles;
create trigger on_profile_created_xp
  after insert on profiles
  for each row execute function handle_new_profile_xp();

create or replace function xp_to_level(p_xp int)
returns varchar as $$
begin
  return case
    when p_xp >= 1001 then 'Road Scholar'
    when p_xp >= 601  then 'Test Ready'
    when p_xp >= 301  then 'Road Rules Pro'
    when p_xp >= 101  then 'Road Explorer'
    else 'Learner Driver'
  end;
end;
$$ language plpgsql immutable
set search_path = public;
