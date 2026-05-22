-- Migration 020: remove legacy FOR ALL policy on mock_sessions (005) — 013 uses granular policies

DROP POLICY IF EXISTS "mock_sessions: own" ON public.mock_sessions;
DROP POLICY IF EXISTS "mocks: own" ON public.mock_sessions;
