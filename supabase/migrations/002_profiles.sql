-- Migration 002: profiles
-- Prefer a fresh project, or drop legacy `profiles` / policies if upgrading from older KangaLearner schema.

create table if not exists profiles (
  id             uuid primary key references auth.users(id) on delete cascade,
  role           varchar(20)  not null default 'student'
                   check (role in ('student', 'instructor', 'admin')),
  display_name   varchar(100),
  avatar_url     varchar(500),
  country        varchar(2)   not null default 'AU',
  state          varchar(10),
  lang           varchar(10)  not null default 'en',
  stripe_customer_id varchar(100),
  onboarding_done    boolean  not null default false,
  created_at     timestamptz  not null default now(),
  updated_at     timestamptz  not null default now()
);

drop trigger if exists profiles_updated_at on profiles;
create trigger profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

alter table profiles enable row level security;

drop policy if exists "profiles: select own" on profiles;
drop policy if exists "profiles: update own" on profiles;
drop policy if exists "profiles: insert own" on profiles;

create policy "profiles: select own"
  on profiles for select
  using (auth.uid() = id);

-- Role changes should use service role / admin path; users may update their own row otherwise.
create policy "profiles: update own"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles: insert own"
  on profiles for insert
  with check (auth.uid() = id);
