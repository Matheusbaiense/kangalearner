-- Migration 004: question_attempts (+ country; matches apps/web: attempt_id, nullable category)

create table if not exists question_attempts (
  id            uuid        primary key default gen_random_uuid(),
  attempt_id    text        not null,
  user_id       uuid        not null references auth.users(id) on delete cascade,
  question_id   varchar(50) not null,
  country       varchar(2)  not null default 'AU',
  state         varchar(10) not null,
  category      varchar(50),
  is_correct    boolean     not null,
  chosen        varchar(20),
  source        varchar(20) default 'web',
  created_at    timestamptz not null default now(),
  unique (user_id, attempt_id)
);

alter table question_attempts add column if not exists country varchar(2) not null default 'AU';
alter table question_attempts add column if not exists attempt_id text;
alter table question_attempts add column if not exists category varchar(50);
alter table question_attempts add column if not exists chosen varchar(20);
alter table question_attempts add column if not exists source varchar(20) default 'web';

update question_attempts
set attempt_id = gen_random_uuid()::text
where attempt_id is null or trim(attempt_id) = '';

alter table question_attempts alter column attempt_id set not null;

create index if not exists idx_attempts_user_country_state
  on question_attempts(user_id, country, state);

create index if not exists idx_attempts_user_category
  on question_attempts(user_id, country, state, category);

alter table question_attempts enable row level security;

drop policy if exists "attempts: own" on question_attempts;
drop policy if exists "own attempts read" on question_attempts;
drop policy if exists "own attempts write" on question_attempts;

create policy "attempts: own"
  on question_attempts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
