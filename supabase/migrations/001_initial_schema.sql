-- KangaLearner initial schema (run via Supabase CLI or SQL editor)
-- question_attempts: one row per answered question event; dedupe via (user_id, attempt_id)

create table if not exists question_attempts (
  id uuid default gen_random_uuid() primary key,
  attempt_id text not null,
  user_id uuid not null references auth.users on delete cascade,
  question_id text not null,
  state text not null,
  category text,
  is_correct bool not null,
  chosen text,
  source text default 'web',
  created_at timestamptz default now(),
  unique (user_id, attempt_id)
);

create table if not exists mock_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users on delete cascade,
  state text not null,
  score int not null,
  total int not null,
  source text default 'web',
  created_at timestamptz default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  preferred_language text,
  preferred_state text,
  created_at timestamptz default now()
);

alter table question_attempts enable row level security;
alter table mock_sessions enable row level security;
alter table profiles enable row level security;

create policy "own attempts read" on question_attempts for select using (auth.uid() = user_id);
create policy "own attempts write" on question_attempts for insert with check (auth.uid() = user_id);

create policy "own sessions read" on mock_sessions for select using (auth.uid() = user_id);
create policy "own sessions write" on mock_sessions for insert with check (auth.uid() = user_id);

create policy "own profile read" on profiles for select using (auth.uid() = id);
create policy "own profile insert" on profiles for insert with check (auth.uid() = id);
create policy "own profile update" on profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "own profile delete" on profiles for delete using (auth.uid() = id);
