create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

alter table public.question_attempts
  add column if not exists answered_at timestamptz default now();

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'question_attempts'
      and column_name = 'created_at'
  ) then
    update public.question_attempts
    set answered_at = coalesce(answered_at, created_at, now())
    where answered_at is null;
  else
    update public.question_attempts
    set answered_at = coalesce(answered_at, now())
    where answered_at is null;
  end if;
end $$;

alter table public.question_attempts
  alter column answered_at set not null;

create index if not exists idx_question_attempts_user_answered_at
  on public.question_attempts(user_id, answered_at desc);

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users (id) on delete cascade,
  notifications_enabled boolean not null default false,
  daily_goal integer not null default 10,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_settings
  add column if not exists notifications_enabled boolean not null default false;

alter table public.user_settings
  add column if not exists daily_goal integer not null default 10;

alter table public.user_settings
  add column if not exists created_at timestamptz not null default now();

alter table public.user_settings
  add column if not exists updated_at timestamptz not null default now();

alter table public.user_settings enable row level security;

drop policy if exists "user_settings_select_own" on public.user_settings;
drop policy if exists "user_settings_upsert_own" on public.user_settings;
drop policy if exists "user_settings_update_own" on public.user_settings;

create policy "user_settings_select_own"
on public.user_settings for select
using (
  user_id = auth.uid()
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
  )
);

create policy "user_settings_upsert_own"
on public.user_settings for insert
with check (
  user_id = auth.uid()
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
  )
);

create policy "user_settings_update_own"
on public.user_settings for update
using (
  user_id = auth.uid()
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
  )
)
with check (
  user_id = auth.uid()
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
  )
);

drop trigger if exists user_settings_updated_at on public.user_settings;
create trigger user_settings_updated_at
  before update on public.user_settings
  for each row execute function update_updated_at();
