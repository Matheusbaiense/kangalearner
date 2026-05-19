alter table public.profiles
  add column if not exists preferred_state text;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'state'
  ) then
    update public.profiles
    set preferred_state = coalesce(preferred_state, state, 'WA')
    where preferred_state is null;
  else
    update public.profiles
    set preferred_state = coalesce(preferred_state, 'WA')
    where preferred_state is null;
  end if;
end $$;

alter table public.profiles
  alter column preferred_state set default 'WA';
