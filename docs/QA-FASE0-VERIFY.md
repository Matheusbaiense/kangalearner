# Verificação Fase 0 — trampo do Claude (Chrome / dashboards)

> Este ficheiro é o **protocolo de conferência**. Não marca aceite.
> O Claude (Chrome MCP) faz a Fase 0 nos dashboards. **Este agente** confere depois, com evidência.
> Não duplicar o plano: as subtarefas canónicas estão em [PRODUCTION-REMEDIATION-PLAN.md](PRODUCTION-REMEDIATION-PLAN.md) § Fase 0.
> Pedido enviado ao Claude: 2026-08-17 (prompt na conversa de remediação).
> Código do lote: branch `feat/remediation-rls-product-bugs`, commit inicial `2492d7d` (031–033 no repo, **não aplicadas**).
> Este agente acrescentou `034_rls_policy_hygiene.sql` e o keepalive passou a `${{ secrets.SUPABASE_ANON_KEY }}`. Secret 0.7 **já existe** (Claude, 2026-08-18).
> Staging: projeto `kangalearner-staging` (ref `zlsaerfsrfyxpbpxorwo`, ap-southeast-2). **001–034 aplicadas.** Smoke SQL-S/SQL-S2 **7/7 PASS** (Claude, 2026-08-18). Fixtures `smoke-a@` / `smoke-b@` (B = admin) ficam no staging. Preview Vercel: `NEXT_PUBLIC_SUPABASE_*` de staging (Claude, 2026-08-19); `SUPABASE_SERVICE_ROLE_KEY` de Preview **ainda falta** (dono cola). Backup `workflow_dispatch` em `main` **verde** após PR #198. Restore drill **não** feito. **Não** aplicar 031–034 em prod até 0.1e.

**Regra:** `[x]` só com evidência. Screenshot, URL de run, `gh secret list` (só nomes), `vercel env ls`. Nunca colar valores de secrets neste ficheiro.

---

## Como conferir (comandos, sem credenciais no chat)

```bash
# Nomes de secrets (não valores)
gh secret list -R Matheusbaiense/kangalearner

# Runs de backup
gh run list -R Matheusbaiense/kangalearner --workflow backup.yml --limit 5

# Keepalive já não pode ter JWT no YAML
rg "eyJhbGciOiJIUzI1Ni" .github/workflows/keepalive.yml   # deve falhar (zero matches)

# Vercel Production env (nomes)
vercel env ls --environment production
```

Supabase: projeto prod `olgogtaeifyxwzencilo`. Staging = projeto **novo** (ref diferente). Migrations 031–033: `supabase migration list` / SQL editor, nunca “disse que aplicou”.

---

## Ledger

| ID | O que o Claude devia fazer | Como eu verifico | Feito? | Evidência (URL / nota) | Notas |
|----|----------------------------|------------------|--------|------------------------|-------|
| 0.1a | Bucket R2/S3 privado, prefixo `supabase/` | Screenshot bucket + lifecycle 7d/4w/3m | [~] | Claude 2026-08-19: bucket + prefix `supabase/` + lifecycle delete após 90 dias | Não é 7d/4w/3m em camadas (isso seria lógica no YAML) |
| 0.1b | Secrets GitHub: `SUPABASE_DB_URL`, `BACKUP_ENCRYPTION_KEY`, `BACKUP_BUCKET`, `BACKUP_S3_ENDPOINT`, `BACKUP_AWS_KEY`, `BACKUP_AWS_SECRET` | `gh secret list` contém os 6 nomes | [x] | `gh secret list` 2026-08-19: os 6 nomes presentes (sem valores) | |
| 0.1c | `workflow_dispatch` de `backup.yml` verde | `gh run list` + run URL success | [x] | [run 32182233334](https://github.com/Matheusbaiense/kangalearner/actions/runs/32182233334) success em `main` após squash PR #198 | Schedule em `main` falhava (`apt` sem `awscli`); YAML agora instala AWS CLI v2 + `pg_dump` 17 |
| 0.1d | Objeto `*.dump.gpg` no bucket | Screenshot listagem `s3://…/supabase/` | [x] | Claude: `kangalearner-supabase-20260817T130835Z.dump.gpg` (67KB). Run 32182233334 verificou o objeto listado | Sem colar endpoint/keys |
| 0.1e | Restore drill em **staging** (`gpg -d` → `pg_restore`) | Staging tem `profiles` + `question_attempts` | [ ] | | **Nunca** restore em prod nem no projeto staging `zlsaerfsrfyxpbpxorwo`. Throwaway DB. |
| 0.2a | Upgrade Pro no projeto `olgogtaeifyxwzencilo` | Screenshot billing Pro | [ ] | | |
| 0.2b | PITR ligado | Screenshot PITR on | [ ] | | |
| 0.2c | Região = `ap-southeast-2` (Sydney) | Screenshot settings | [ ] | | |
| 0.3a | Projeto Supabase **staging** criado | Ref ≠ `olgogtaeifyxwzencilo` | [x] | Claude 2026-08-18: `kangalearner-staging`, ref `zlsaerfsrfyxpbpxorwo`, ap-southeast-2, $0/mês | |
| 0.3b | Migrations 001–034 aplicadas **só em staging** primeiro | Lista de migrations no staging | [x] | Claude 2026-08-18: `list_migrations` 34 linhas 001→034, sem falhas/duplicados. 16 tabelas, RLS on, 0 rows. Advisors: 8, todos intencionais (default-deny 030/033 + `is_admin()` na 029). | Não recriar staging. Prod **não** tocada. |
| 0.3c | Preview Vercel com env de staging | `vercel env ls` preview | [~] | Claude 2026-08-19: Preview only, Sensitive ON, `NEXT_PUBLIC_SUPABASE_URL` + `ANON_KEY` → ref `zlsaerfsrfyxpbpxorwo` | `SUPABASE_SERVICE_ROLE_KEY` de Preview **falta** — dono cola (não no chat) |
| 0.4 | Auth: HIBP + min length ≥ 8 + Captcha | Screenshots Auth settings | [~] | Captcha ON + Turnstile + secret (Claude, 2026-08-18). Site URL/allowlist/TTL 1h. HIBP **não** — Pro-only no Free. | Signup é GoTrue no browser |
| 0.4b | Redirect URLs: `kangalearner.com.au` + previews Vercel | Screenshot allowlist | [x] | Claude 2026-08-18: 3 URLs, sem GitHub Pages / `#auth-callback` | |
| 0.5 | Sentry DSN em Vercel Production | `SENTRY_DSN` + `NEXT_PUBLIC_SENTRY_DSN` no `vercel env ls` | [~] | Claude 2026-08-19: `NEXT_PUBLIC_SENTRY_DSN` em Production tem **29 chars** (DSN real ~95). Client não posta `/monitoring`. | Apagar as duas linhas Production e recriar com DSN completo. Sem colar DSN. Túnel `GET /monitoring` 200 não prova ingestão. |
| 0.7 | Secret `SUPABASE_ANON_KEY` + YAML sem JWT literal | `gh secret list` + `rg` no keepalive | [x] | Claude: secret já existia (2026-08-18) | YAML já aponta ao secret |
| SQL-S | Smoke staging 031–033 (a–f no prompt) | Notas do Claude + repetir 1 check | [x] | Claude 2026-08-18, 2 users sintéticos. a–f PASS. (a) PATCH stats → 200 `[]` (zero rows; PostgREST sem policy de escrita). (c) INSERT attempts 201 + `total_attempts=1`. (e) stripe_customer_id permanece null (032). (f) anon waitlist 401. | Fixtures `smoke-a@` / `smoke-b@` mantidos |
| SQL-S2 | 034 no staging: admin lê todos os profiles; user só o próprio não-deleted | SELECT com JWT user vs admin | [x] | A vê 1 profile; B (admin, role via disable-trigger — `role_change_not_allowed` na 010) vê 2 | UPDATE role directa falhou como esperado |
| SQL-P | 031–033 em **prod** só após backup verde + smoke staging | Migration list prod | [ ] | | Smoke staging feito. 0.1c verde. Bloqueado até **0.1e** restore drill. 034 em prod só depois |
| NO-GO | Não desligou RLS; não aplicou DDL cego em prod; não commitou `.env` | Diff + advisors | [ ] | | Falha grave se violar |

### Smoke SQL (staging) — copiar do prompt

- [x] a) JWT user A: `PATCH /rest/v1/user_category_stats` → falha
- [x] b) SELECT stats próprias → ok
- [x] c) Practice / `/api/attempts` → trigger 028 atualiza stats
- [x] d) User A não lê stats de B
- [x] e) Client `UPDATE profiles.stripe_customer_id` → inalterado
- [x] f) Anon POST `marketplace_waitlist` → falha

---

## Red flags (rejeitar o relatório do Claude)

- Marcou `[x]` sem URL de run / screenshot.
- Disse “031 em prod” sem staging + backup no mesmo dia.
- Colou connection string, service_role, ou DSN no chat (rodar credenciais).
- `DISABLE ROW LEVEL SECURITY`.
- Keepalive ainda com JWT `eyJ…` no YAML **e** sem secret.
- Staging usa o mesmo project ref que prod.

## Quando o Claude entregar o relatório

1. Preencher a coluna Evidência nesta tabela (não apagar linhas).
2. Atualizar [BACKLOG.md](BACKLOG.md) só os itens com evidência.
3. Linha em [QA-EXECUTION-LOG.md](QA-EXECUTION-LOG.md) com data + comando de conferência.
4. Só então marcar aceite na Fase 0 do plano.
