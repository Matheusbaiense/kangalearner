-- Migration 033: close unused marketplace PostgREST surface
--
-- 009 scaffolded instructors/bookings/reviews/waitlist with open policies
-- (waitlist INSERT for anyone with a plausible email; reviews SELECT using
-- true; instructors FOR ALL on own row including license_verified).
-- No web/mobile UI reads these tables. Keep RLS on; revoke client grants
-- and drop the open policies so a later GRANT does not revive them.
-- service_role (admin) still bypasses RLS for cleanup.

do $$
begin
  if to_regclass('public.instructors') is not null then
    drop policy if exists "instructors: read active" on public.instructors;
    drop policy if exists "instructors: own write" on public.instructors;
    revoke all on table public.instructors from anon, authenticated;
  end if;

  if to_regclass('public.bookings') is not null then
    drop policy if exists "bookings: student own" on public.bookings;
    drop policy if exists "bookings: instructor own" on public.bookings;
    revoke all on table public.bookings from anon, authenticated;
  end if;

  if to_regclass('public.instructor_reviews') is not null then
    drop policy if exists "reviews: read all" on public.instructor_reviews;
    drop policy if exists "reviews: student insert" on public.instructor_reviews;
    revoke all on table public.instructor_reviews from anon, authenticated;
  end if;

  if to_regclass('public.marketplace_waitlist') is not null then
    drop policy if exists "waitlist: insert" on public.marketplace_waitlist;
    drop policy if exists "waitlist_admin_select" on public.marketplace_waitlist;
    revoke all on table public.marketplace_waitlist from anon, authenticated;
  end if;
end $$;
