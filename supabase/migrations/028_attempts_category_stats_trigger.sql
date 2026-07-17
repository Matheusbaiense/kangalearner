-- Migration 028: maintain user_category_stats via AFTER INSERT trigger
--
-- Root cause (multi-agent review 2026-07-17): stats were only updated by an
-- explicit fire-and-forget RPC call in apps/web /api/attempts — mobile sync
-- and /api/attempts/bulk never fed them, and Vercel could freeze the function
-- before the RPC completed (migration 025 was the manual reconciliation of
-- exactly this drift). A DB trigger makes EVERY insert path consistent.
--
-- DEPLOY ORDER: apply this migration together with (or after) the web deploy
-- that removes the explicit upsert_category_stat call from
-- apps/web/app/api/attempts/route.ts — applying it while the old code is
-- live would double-count attempts from that route.

create or replace function trg_attempts_upsert_category_stat()
returns trigger as $$
begin
  if new.category is not null then
    perform upsert_category_stat(
      new.user_id,
      coalesce(new.country, 'AU'),
      new.state,
      new.category,
      new.is_correct
    );
  end if;
  return new;
end;
$$ language plpgsql security definer
set search_path = public;

-- Hygiene: trigger functions are invoked by the trigger, never via RPC.
revoke execute on function trg_attempts_upsert_category_stat() from public, anon, authenticated;

drop trigger if exists attempts_category_stats on question_attempts;
create trigger attempts_category_stats
  after insert on question_attempts
  for each row execute function trg_attempts_upsert_category_stat();
