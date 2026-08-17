# Verificação Fase 0 — trampo do Claude (Chrome / dashboards)

> Este ficheiro é o **protocolo de conferência**. Não marca aceite.
> O Claude (Chrome MCP) faz a Fase 0 nos dashboards. **Este agente** confere depois, com evidência.
> Não duplicar o plano: as subtarefas canónicas estão em [PRODUCTION-REMEDIATION-PLAN.md](PRODUCTION-REMEDIATION-PLAN.md) § Fase 0.
> Pedido enviado ao Claude: 2026-08-17 (prompt na conversa de remediação).
> Código do lote: branch `feat/remediation-rls-product-bugs`, commit inicial `2492d7d` (031–033 no repo, **não aplicadas**).
> Este agente acrescentou `034_rls_policy_hygiene.sql` e o keepalive passou a `${{ secrets.SUPABASE_ANON_KEY }}` — o cron **falha** até o Claude criar o secret (0.7).
> Staging: se o Claude já aplicou 001–033, aplicar **034 a seguir** só em staging. Não aplicar 034 em prod nesta fase.

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
| 0.1a | Bucket R2/S3 privado, prefixo `supabase/` | Screenshot bucket + lifecycle 7d/4w/3m | [ ] | | Conta **diferente** da do app |
| 0.1b | Secrets GitHub: `SUPABASE_DB_URL`, `BACKUP_ENCRYPTION_KEY`, `BACKUP_BUCKET`, `BACKUP_S3_ENDPOINT`, `BACKUP_AWS_KEY`, `BACKUP_AWS_SECRET` | `gh secret list` contém os 6 nomes | [ ] | | Sem valores no chat |
| 0.1c | `workflow_dispatch` de `backup.yml` verde | `gh run list` + run URL success | [ ] | | |
| 0.1d | Objeto `*.dump.gpg` no bucket | Screenshot listagem `s3://…/supabase/` | [ ] | | |
| 0.1e | Restore drill em **staging** (`gpg -d` → `pg_restore`) | Staging tem `profiles` + `question_attempts` | [ ] | | Só depois de 0.3 existir |
| 0.2a | Upgrade Pro no projeto `olgogtaeifyxwzencilo` | Screenshot billing Pro | [ ] | | |
| 0.2b | PITR ligado | Screenshot PITR on | [ ] | | |
| 0.2c | Região = `ap-southeast-2` (Sydney) | Screenshot settings | [ ] | | |
| 0.3a | Projeto Supabase **staging** criado | Ref ≠ `olgogtaeifyxwzencilo` | [ ] | | |
| 0.3b | Migrations 001–033 aplicadas **só em staging** primeiro | Lista de migrations no staging | [ ] | | Depois: 034 no staging (código novo deste lote). Prod ainda sem 031–034 até smoke |
| 0.3c | Preview Vercel com env de staging | `vercel env ls` preview | [ ] | | |
| 0.4 | Auth: HIBP + min length ≥ 8 + Captcha | Screenshots Auth settings | [ ] | | Signup é GoTrue no browser |
| 0.4b | Redirect URLs: `kangalearner.com.au` + previews Vercel | Screenshot allowlist | [ ] | | |
| 0.5 | Sentry DSN em Vercel Production | `SENTRY_DSN` + `NEXT_PUBLIC_SENTRY_DSN` no `vercel env ls` | [ ] | | Sem colar DSN |
| 0.7 | Secret `SUPABASE_ANON_KEY` + YAML sem JWT literal | `gh secret list` + `rg` no keepalive | [ ] | | YAML já aponta ao secret; cron vermelho = secret em falta |
| SQL-S | Smoke staging 031–033 (a–f no prompt) | Notas do Claude + repetir 1 check | [ ] | | a PATCH stats falha; c attempts sobem stats |
| SQL-S2 | 034 no staging: admin lê todos os profiles; user só o próprio não-deleted | SELECT com JWT user vs admin | [ ] | | Depois de SQL-S |
| SQL-P | 031–033 em **prod** só após backup verde + smoke staging | Migration list prod | [ ] | | Bloqueado até 0.1c + SQL-S. 034 em prod só depois de SQL-S2 |
| NO-GO | Não desligou RLS; não aplicou DDL cego em prod; não commitou `.env` | Diff + advisors | [ ] | | Falha grave se violar |

### Smoke SQL (staging) — copiar do prompt

- [ ] a) JWT user A: `PATCH /rest/v1/user_category_stats` → falha
- [ ] b) SELECT stats próprias → ok
- [ ] c) Practice / `/api/attempts` → trigger 028 atualiza stats
- [ ] d) User A não lê stats de B
- [ ] e) Client `UPDATE profiles.stripe_customer_id` → inalterado
- [ ] f) Anon POST `marketplace_waitlist` → falha

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
