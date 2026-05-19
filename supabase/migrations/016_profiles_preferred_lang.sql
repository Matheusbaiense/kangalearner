alter table public.profiles
  add column if not exists preferred_lang text;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'lang'
  ) then
    update public.profiles
    set preferred_lang = coalesce(
      preferred_lang,
      case
        when lang in ('en', 'pt', 'es') then lang
        when lang like 'pt%' then 'pt'
        when lang like 'es%' then 'es'
        else 'en'
      end
    )
    where preferred_lang is null;
  else
    update public.profiles
    set preferred_lang = coalesce(preferred_lang, 'en')
    where preferred_lang is null;
  end if;
end $$;

alter table public.profiles
  alter column preferred_lang set default 'en';
