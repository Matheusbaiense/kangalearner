-- Migration 001: utility function
-- Run in Supabase Dashboard → SQL Editor. Confirm success before next migration.

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;
