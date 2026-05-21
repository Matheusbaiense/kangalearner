-- Draft migration (future) — Auth / Account / Product schema
-- IMPORTANT:
-- - This is a skeleton for future Supabase integration.
-- - Do NOT apply in this phase.
-- - No secrets or env variables are used here.

-- ── Extensions ─────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── Helper: admin role check (draft) ───────────────────────────────────────
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

-- ── Profiles ───────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  email text,
  preferred_language text check (preferred_language in ('en','pt','es','pten','esen')),
  state text,
  role text not null default 'user' check (role in ('user','premium','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

create policy "profiles_update_own"
on public.profiles for update
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

-- ── User settings ──────────────────────────────────────────────────────────
create table if not exists public.user_settings (
  user_id uuid primary key references auth.users (id) on delete cascade,
  analytics_consent boolean not null default false,
  marketing_emails boolean not null default false,
  personalised_recommendations boolean not null default true,
  notifications jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_settings enable row level security;

create policy "user_settings_select_own"
on public.user_settings for select
using (user_id = auth.uid() or public.is_admin());

create policy "user_settings_upsert_own"
on public.user_settings for insert
with check (user_id = auth.uid() or public.is_admin());

create policy "user_settings_update_own"
on public.user_settings for update
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

-- ── User progress (aggregate) ──────────────────────────────────────────────
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  state text not null,
  answered_count int not null default 0,
  correct_count int not null default 0,
  incorrect_count int not null default 0,
  readiness_score int,
  last_activity_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, state)
);

create index if not exists user_progress_user_id_idx on public.user_progress (user_id);
create index if not exists user_progress_state_idx on public.user_progress (state);

alter table public.user_progress enable row level security;

create policy "user_progress_select_own"
on public.user_progress for select
using (user_id = auth.uid() or public.is_admin());

create policy "user_progress_write_own"
on public.user_progress for all
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

-- ── Practice sessions ──────────────────────────────────────────────────────
create table if not exists public.practice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  state text not null,
  mode text not null check (mode in ('topic','practice-mock','exam')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  total_questions int,
  correct int,
  pct int,
  meta jsonb not null default '{}'::jsonb
);

create index if not exists practice_sessions_user_id_idx on public.practice_sessions (user_id, started_at desc);

alter table public.practice_sessions enable row level security;

create policy "practice_sessions_select_own"
on public.practice_sessions for select
using (user_id = auth.uid() or public.is_admin());

create policy "practice_sessions_write_own"
on public.practice_sessions for all
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

-- ── Session answers ────────────────────────────────────────────────────────
create table if not exists public.session_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  session_id uuid not null references public.practice_sessions (id) on delete cascade,
  question_id text not null,
  chosen text,
  correct boolean,
  answered_at timestamptz not null default now()
);

create index if not exists session_answers_user_id_idx on public.session_answers (user_id, answered_at desc);
create index if not exists session_answers_session_id_idx on public.session_answers (session_id);

alter table public.session_answers enable row level security;

create policy "session_answers_select_own"
on public.session_answers for select
using (user_id = auth.uid() or public.is_admin());

create policy "session_answers_write_own"
on public.session_answers for all
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

-- ── Mistake reviews ────────────────────────────────────────────────────────
create table if not exists public.mistake_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  state text not null,
  question_id text not null,
  last_wrong_at timestamptz,
  reviewed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, state, question_id)
);

create index if not exists mistake_reviews_user_id_idx on public.mistake_reviews (user_id);

alter table public.mistake_reviews enable row level security;

create policy "mistake_reviews_select_own"
on public.mistake_reviews for select
using (user_id = auth.uid() or public.is_admin());

create policy "mistake_reviews_write_own"
on public.mistake_reviews for all
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

-- ── Entitlements (premium) ────────────────────────────────────────────────
create table if not exists public.user_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  entitlement_key text not null,
  status text not null default 'active' check (status in ('active','inactive','revoked')),
  source text,
  starts_at timestamptz,
  ends_at timestamptz,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, entitlement_key)
);

create index if not exists user_entitlements_user_id_idx on public.user_entitlements (user_id);

alter table public.user_entitlements enable row level security;

create policy "user_entitlements_select_own"
on public.user_entitlements for select
using (user_id = auth.uid() or public.is_admin());

create policy "user_entitlements_write_admin"
on public.user_entitlements for all
using (public.is_admin())
with check (public.is_admin());

-- ── Subscriptions (draft; Stripe later) ────────────────────────────────────
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  provider text not null default 'stripe' check (provider in ('stripe')),
  provider_customer_id text,
  provider_subscription_id text,
  status text not null default 'inactive',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);

alter table public.subscriptions enable row level security;

create policy "subscriptions_select_own"
on public.subscriptions for select
using (user_id = auth.uid() or public.is_admin());

create policy "subscriptions_write_admin"
on public.subscriptions for all
using (public.is_admin())
with check (public.is_admin());

-- ── Issue reports (from users) ─────────────────────────────────────────────
create table if not exists public.issue_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  route text,
  message text not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.issue_reports enable row level security;

create policy "issue_reports_insert_any"
on public.issue_reports for insert
with check (true);

create policy "issue_reports_select_admin"
on public.issue_reports for select
using (public.is_admin());

-- ── Support tickets ────────────────────────────────────────────────────────
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  name text,
  email text,
  topic text,
  message text not null,
  status text not null default 'open' check (status in ('open','triaged','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists support_tickets_created_at_idx on public.support_tickets (created_at desc);

alter table public.support_tickets enable row level security;

create policy "support_tickets_insert_any"
on public.support_tickets for insert
with check (true);

create policy "support_tickets_select_admin"
on public.support_tickets for select
using (public.is_admin());

-- ── Data requests (privacy) ────────────────────────────────────────────────
create table if not exists public.data_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  type text not null check (type in ('export','deletion','correction','access')),
  details text,
  status text not null default 'open' check (status in ('open','in_progress','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists data_requests_user_id_idx on public.data_requests (user_id);

alter table public.data_requests enable row level security;

create policy "data_requests_insert_own"
on public.data_requests for insert
with check (user_id = auth.uid() or user_id is null);

create policy "data_requests_select_own_or_admin"
on public.data_requests for select
using (user_id = auth.uid() or public.is_admin());

create policy "data_requests_update_admin"
on public.data_requests for update
using (public.is_admin())
with check (public.is_admin());

-- ── Audit logs (admin-visible) ─────────────────────────────────────────────
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users (id) on delete set null,
  action text not null,
  target_type text,
  target_id text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_logs_created_at_idx on public.audit_logs (created_at desc);

alter table public.audit_logs enable row level security;

create policy "audit_logs_select_admin"
on public.audit_logs for select
using (public.is_admin());

create policy "audit_logs_insert_admin"
on public.audit_logs for insert
with check (public.is_admin());

-- ── App events (analytics-like; admin-only) ───────────────────────────────
create table if not exists public.app_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  event_name text not null,
  route text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists app_events_created_at_idx on public.app_events (created_at desc);

alter table public.app_events enable row level security;

create policy "app_events_insert_any"
on public.app_events for insert
with check (true);

create policy "app_events_select_admin"
on public.app_events for select
using (public.is_admin());

