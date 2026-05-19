alter table public.mock_sessions
  add column if not exists completed_at timestamptz;

alter table public.mock_sessions
  add column if not exists percent integer;

do $$
declare
  percent_is_generated boolean;
begin
  select is_generated <> 'NEVER'
  into percent_is_generated
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'mock_sessions'
    and column_name = 'percent';

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'mock_sessions'
      and column_name = 'created_at'
  ) then
    update public.mock_sessions
    set completed_at = coalesce(completed_at, created_at, now())
    where completed_at is null;
  else
    update public.mock_sessions
    set completed_at = coalesce(completed_at, now())
    where completed_at is null;
  end if;

  if not coalesce(percent_is_generated, false) then
    if exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'mock_sessions'
        and column_name = 'pct'
    ) then
      update public.mock_sessions
      set percent = coalesce(percent, pct, ((score * 100) / nullif(total, 0)))
      where percent is null;
    else
      update public.mock_sessions
      set percent = coalesce(percent, ((score * 100) / nullif(total, 0)))
      where percent is null;
    end if;
  end if;
end $$;

alter table public.mock_sessions
  alter column completed_at set default now();

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'mock_sessions'
      and column_name = 'mode'
  ) then
    alter table public.mock_sessions alter column mode drop not null;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'mock_sessions'
      and column_name = 'passed'
  ) then
    alter table public.mock_sessions alter column passed drop not null;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'mock_sessions'
      and column_name = 'answers'
  ) then
    alter table public.mock_sessions alter column answers drop not null;
  end if;
end $$;

create index if not exists idx_mock_sessions_user_completed_at
  on public.mock_sessions(user_id, completed_at desc);
