-- ============================================================
-- MIGRATION 030: blog_reactions
-- Adds anonymous "was this helpful?" reactions on blog posts.
--
-- No public RLS policies: the only access path is the server API route
-- (app/api/blog-reactions), which uses the service-role client and
-- enforces one reaction per (slug, visitor) itself. RLS stays enabled
-- with default-deny so a leaked anon key can't read or write this table.
-- ============================================================

CREATE TABLE IF NOT EXISTS blog_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  reaction text NOT NULL CHECK (reaction IN ('helpful', 'not_helpful')),
  -- sha256 of ip + slug, never the raw IP — one reaction per visitor per post.
  visitor_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (slug, visitor_hash)
);

CREATE INDEX IF NOT EXISTS blog_reactions_slug_idx ON blog_reactions (slug);

ALTER TABLE blog_reactions ENABLE ROW LEVEL SECURITY;
