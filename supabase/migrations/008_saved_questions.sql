-- Migration 008: saved_questions (bookmarks)

create table if not exists saved_questions (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users(id) on delete cascade,
  question_id varchar(50) not null,
  country     varchar(2)  not null default 'AU',
  created_at  timestamptz not null default now(),
  unique(user_id, question_id)
);

create index if not exists idx_saved_user
  on saved_questions(user_id, country);

alter table saved_questions enable row level security;

drop policy if exists "saved: own" on saved_questions;

create policy "saved: own"
  on saved_questions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
