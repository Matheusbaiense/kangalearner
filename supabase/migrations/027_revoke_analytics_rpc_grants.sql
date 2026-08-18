-- Migration 025: fechar vazamento de métricas de negócio + hardening de funções
--
-- CONTEXTO: a migration 021 revogou EXECUTE das RPCs de analytics apenas de
-- PUBLIC. No Supabase, os papéis `anon` e `authenticated` recebem EXECUTE em
-- funções do schema public via DEFAULT PRIVILEGES, então o REVOKE FROM PUBLIC
-- não removeu o grant explícito desses papéis — `anon` continuava podendo
-- chamar as RPCs via /rest/v1/rpc/* e extrair métricas do negócio.
--
-- Estas funções são SECURITY DEFINER e chamadas apenas pelo dashboard admin
-- via supabaseAdmin (service_role), que NÃO depende destes grants.
-- Portanto revogar de anon/authenticated é seguro e não quebra o admin.

REVOKE EXECUTE ON FUNCTION public.get_role_breakdown()                     FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_country_breakdown(int)               FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_top_categories(timestamptz, int)     FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_active_users_count(timestamptz)      FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_pass_rate(timestamptz)               FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_signups_per_day(timestamptz)         FROM anon, authenticated;

-- Garantir o caminho legítimo (idempotente):
GRANT EXECUTE ON FUNCTION public.get_role_breakdown()                      TO service_role;
GRANT EXECUTE ON FUNCTION public.get_country_breakdown(int)                TO service_role;
GRANT EXECUTE ON FUNCTION public.get_top_categories(timestamptz, int)      TO service_role;
GRANT EXECUTE ON FUNCTION public.get_active_users_count(timestamptz)       TO service_role;
GRANT EXECUTE ON FUNCTION public.get_pass_rate(timestamptz)                TO service_role;
GRANT EXECUTE ON FUNCTION public.get_signups_per_day(timestamptz)          TO service_role;

-- ──────────────────────────────────────────────────────────────
-- Advisor 0011: search_path mutável nas funções de trigger de updated_at.
-- Fixar search_path evita hijack via objetos em schemas no caminho de busca.
-- `set_updated_at` never existed in repo migrations (typo); only `update_updated_at` from 001.
ALTER FUNCTION public.update_updated_at() SET search_path = public, pg_temp;

-- ──────────────────────────────────────────────────────────────
-- Advisor 0025: bucket público `avatars` com SELECT amplo permite LISTAR todos
-- os arquivos (enumeração de user_id). Buckets públicos servem objetos por URL
-- pública SEM depender deste SELECT (o caminho /object/public/* ignora RLS),
-- então a exibição de avatares continua funcionando. Trocamos o SELECT amplo
-- por um SELECT restrito ao dono, preservando o storage.list(user.id) usado
-- pela rota /api/profile/avatar e bloqueando a listagem por anônimos.
DROP POLICY IF EXISTS "avatars: public read" ON storage.objects;
CREATE POLICY "avatars: owner list"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
