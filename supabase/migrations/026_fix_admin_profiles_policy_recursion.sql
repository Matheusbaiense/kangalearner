-- Migration 026: fix recursion risk in "profiles: admin read all" (EXT-5)
--
-- The 014 policy embedded `EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid()
-- AND p.role IN ('admin','super_admin'))` directly in a SELECT policy ON profiles.
-- A policy that subqueries its own table can trigger
-- "infinite recursion detected in policy for relation profiles".
--
-- is_admin() is STABLE SECURITY DEFINER (bypasses RLS) and already encapsulates the
-- exact same admin/super_admin check, so it is recursion-safe. Semantics preserved:
-- a user may read their own non-deleted row, OR any row if they are an admin.

drop policy if exists "profiles: admin read all" on public.profiles;

create policy "profiles: admin read all"
  on public.profiles for select
  using (
    (auth.uid() = id and deleted_at is null)
    or public.is_admin()
  );
