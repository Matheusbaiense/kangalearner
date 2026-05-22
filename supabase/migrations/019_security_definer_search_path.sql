-- Migration 019: fix search_path on security definer functions (011 regression + trigger)

CREATE OR REPLACE FUNCTION public.prevent_profile_role_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF new.role IS DISTINCT FROM old.role THEN
    IF coalesce(auth.role(), '') <> 'service_role' THEN
      RAISE EXCEPTION 'role_change_not_allowed';
    END IF;
  END IF;
  RETURN new;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    display_name,
    avatar_url,
    lang,
    email,
    name,
    preferred_state,
    preferred_lang,
    country
  )
  VALUES (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      split_part(new.email, '@', 1)
    ),
    coalesce(
      new.raw_user_meta_data->>'avatar_url',
      new.raw_user_meta_data->>'picture'
    ),
    coalesce(new.raw_user_meta_data->>'lang', 'en'),
    new.email,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      split_part(new.email, '@', 1)
    ),
    coalesce(new.raw_user_meta_data->>'preferred_state', 'WA'),
    coalesce(new.raw_user_meta_data->>'preferred_lang', new.raw_user_meta_data->>'lang', 'en'),
    'AU'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;
