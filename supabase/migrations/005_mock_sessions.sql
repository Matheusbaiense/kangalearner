-- Migration 005: mock_sessions (includes source for compatibility with apps/web POST)

create table if not exists mock_sessions (
  id              uuid        primary key default gen_random_uuid(),
  user_id         uuid        not null references auth.users(id) on delete cascade,
  country         varchar(2)  not null default 'AU',
  state           varchar(10) not null,
  mode            varchar(10) not null
                    check (mode in ('practice', 'exam')),
  score           int         not null,
  total           int         not null,
  pct             int         generated always as (round((score::numeric / nullif(total, 0)) * 100)) stored,
  passed          boolean     not null,
  time_seconds    int,
  answers         jsonb       not null default '{}',
  weak_categories jsonb,
  source          varchar(20) default 'web',
  created_at      timestamptz not null default now()
);

create index if not exists idx_mock_sessions_user_date
  on mock_sessions(user_id, created_at desc);

create index if not exists idx_mock_sessions_country_state
  on mock_sessions(country, state, created_at desc);

alter table mock_sessions enable row level security;

drop policy if exists "mock_sessions: own" on mock_sessions;
drop policy if exists "own sessions read" on mock_sessions;
drop policy if exists "own sessions write" on mock_sessions;

create policy "mock_sessions: own"
  on mock_sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
