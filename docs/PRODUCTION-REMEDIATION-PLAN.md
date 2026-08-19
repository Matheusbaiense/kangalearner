# Plano de correção — Mega auditoria 2026-08-17

> Fonte única de **o que fazer** para tornar o KangaLearner profissionalmente pronto para produção.
> Pendências abertas continuam a ser rastreadas em [BACKLOG.md](BACKLOG.md).
> Arquitetura continua em [CODEMAPS/web-next-auth-supabase.md](CODEMAPS/web-next-auth-supabase.md).
> Mobile store continua em [MOBILE-APP-ROADMAP.md](MOBILE-APP-ROADMAP.md) + [apps/mobile/STATUS.md](../apps/mobile/STATUS.md).

**Data:** 2026-08-17  
**Escopo:** web Next.js, mobile Expo, Supabase, Vercel, GitHub Actions  
**Regra:** não quebrar funcionalidades existentes. Sem rewrite. Cada PR pequeno, testável, revertível.

### Estado da execução — 2026-08-19 (este worktree)

Código das fases 1–6 e 8 está em `main` (até PR #214). Turnstile + `/monitoring` em prod; CAPTCHA **ON**. Staging `kangalearner-staging` (`zlsaerfsrfyxpbpxorwo`): **001–034 aplicadas**, smoke RLS **7/7 PASS**. SQL 031–034 **ainda não em prod**. Keepalive YAML já lê `secrets.SUPABASE_ANON_KEY`. Backup `workflow_dispatch` em `main` verde (PR #198, [run 32182233334](https://github.com/Matheusbaiense/kangalearner/actions/runs/32182233334)). MFA TOTP **Enabled** no dashboard Auth.

**Ainda não feito aqui:**
- Fase 0 restante: restore drill 0.1e (throwaway DB), Pro+PITR+HIBP (HIBP é Pro-only no Free). Sentry: DSN Production **recriado** (95 chars, redeploy Ready). Evento client disparado; falta login no dashboard + `GET /api/sentry-test` para o server. Aceite 0.5 só com os dois eventos visíveis.
- Preview Vercel: URL/anon de staging feitas; falta `SUPABASE_SERVICE_ROLE_KEY` de Preview (dono). **Não** aplicar 031–034 em prod até 0.1e.
- Fase 6.2/6.3: specs existem; correm com `E2E_STAGING_*` contra staging. CI sem credenciais faz skip. Delete de conta **não** corre nos fixtures.
- Fase 7 fat pages (ARCH-01 account, ARCH-02 PracticeClient) — depois do launch estável

---

## Como usar este plano

1. Executar **na ordem das fases**. Não começar a Fase 7 (refatoração) antes da Fase 1 (RLS).
2. Itens **Ops/Dashboard** não são PR: o dono do projeto faz no Supabase/Vercel/GitHub. Agentes marcam `[x]` só depois de evidência (screenshot, `vercel env ls`, run do workflow).
3. Cada tarefa tem: IDs da auditoria, ficheiros, subtarefas, aceite, esforço (S ≤ 4h, M 1–2d, L 3–5d).
4. Depois de cada fase de código: `pnpm test`, `pnpm --filter @kanga/web run lint`, `pnpm --filter @kanga/web run build`. Migrations: aplicar **staging primeiro**.
5. Não marcar “pronto” o que depende de conta externa ainda não criada.

### O que já está feito (não reabrir)

FlagImg extraído, `tx()` no web, `assertAdminRole`, delete de conta real, rate limit fail-closed, CSP nonce, HSTS, admin no Server Component, bulk cap 500, `WA_PASS_THRESHOLD = 0.8`, AuthCard/site estático/`@stripe/stripe-js`/puppeteer removidos, C2/`0001` draft ausente, newsletter via service_role, RPCs analytics só `service_role`, avatars list público fechado, Upstash/Resend/CRON em Vercel Production (confirmado 2026-06-01).

---

## Mapa de fases

| Fase | Nome | Bloqueia launch amplo? | Dono | Esforço total |
|------|------|------------------------|------|----------------|
| 0 | Operação P0 (dashboard/secrets) | Sim | Dono do projeto | S–M |
| 1 | Segurança de dados (RLS) | Sim | Código + apply SQL | M |
| 2 | Bugs de produto visíveis | Sim para marketing | Código | S |
| 3 | Performance de payload | Sim para mobile web | Código | M |
| 4 | Erros, sync, observabilidade | Quase | Código + Sentry | M |
| 5 | Auth UX, admin, step-up | Quase | Código + dashboard | M |
| 6 | Testes que protegem o que consertámos | Sim para billing/delete | Código | L |
| 7 | DRY / fat pages / types | Não | Código | L |
| 8 | Docs e higiene de repo | Não (evita retrabalho) | Docs | S |
| 9 | Mobile store | Sim para stores | Mobile + contas | L |
| 10 | Escala e futuro | Não | Depois do launch | L |

**Ordem de PRs de código sugerida:** 1 → 2 → 3 → 4 → 5 → 6 → 8 → 7 → 9. Fase 0 em paralelo no dia 1.

---

# Fase 0 — Operação P0 (sem código de app)

Nada disto é “vibe coding”. Sem isto, backup YAML e Sentry no repo são teatro.

**Conferência do trampo Chrome/Claude:** [QA-FASE0-VERIFY.md](QA-FASE0-VERIFY.md). Não marcar os checkboxes abaixo sem evidência nessa tabela.

## 0.1 Backups realmente a funcionar — DR-01

**IDs:** DR-01, INFRA backup  
**Esforço:** M  
**Bloqueia:** sim

### Subtarefas

1. Criar bucket privado (Cloudflare R2 preferível, ou S3/Backblaze) numa **conta diferente** da do app.
2. Criar access key só com `PutObject`/`ListBucket` nesse prefixo `supabase/`.
3. Gerar `BACKUP_ENCRYPTION_KEY` (32+ bytes aleatórios). Guardar no password manager da equipe **e** no GitHub Secret. Sem a chave, o dump é lixo.
4. Preencher GitHub Actions secrets:
   - `SUPABASE_DB_URL` (connection string **pooler session** ou direct, com SSL; nunca commitada)
   - `BACKUP_ENCRYPTION_KEY`
   - `BACKUP_BUCKET`
   - `BACKUP_S3_ENDPOINT`
   - `BACKUP_AWS_KEY`
   - `BACKUP_AWS_SECRET`
5. Correr `.github/workflows/backup.yml` via `workflow_dispatch`.
6. Confirmar objeto `*.dump.gpg` no bucket.
7. **Restore drill:** `gpg -d` → `pg_restore` num projeto Supabase **staging** (criar na 0.3 se ainda não existir).
8. Documentar o drill em `docs/QA-EXECUTION-LOG.md` (comando, duração, quem, data).
9. Ativar alerta de falha do workflow (e-mail GitHub + depois Sentry cron).
10. Política de retenção no bucket: 7 diários / 4 semanais / 3 mensais (lifecycle rule).

### Aceite

- [x] Um run verde no Actions  
- [ ] Um restore que devolve `profiles` e `question_attempts` no staging  
- [ ] RPO declarado: 24h (dump)  
- [ ] RTO declarado: 4h (alvo inicial)  
- [ ] Chave GPG fora só do GitHub  

## 0.2 Supabase fora do free — INFRA-01

**IDs:** INFRA-01, keepalive como muleta  
**Esforço:** S (billing)  
**Bloqueia:** sim

### Subtarefas

1. Upgrade do projeto `olgogtaeifyxwzencilo` para **Pro**.
2. Ativar **PITR** (Point-in-time recovery).
3. Confirmar região = mesma da Vercel (alvo `ap-southeast-2` / Sydney). Anotar em CODEMAP.
4. Depois de 14 dias estáveis no Pro: desligar ou reduzir o workflow `keepalive.yml` (já não é a defesa primária).
5. Manter `/api/ping` cron da Vercel como health check, não como anti-pause.

### Aceite

- [ ] Plano Pro ativo  
- [ ] PITR on  
- [ ] Região documentada  
- [ ] Keep-alive deixou de ser SPOF  

## 0.3 Staging — INFRA-02

**IDs:** staging BACKLOG  
**Esforço:** M  
**Bloqueia:** sim para DDL seguro

### Subtarefas

1. Criar projeto Supabase **staging** (pode ser free). **Feito:** `kangalearner-staging`, ref `zlsaerfsrfyxpbpxorwo`.
2. Aplicar migrations 001–034 **lá primeiro**. **Feito** 2026-08-18 (`list_migrations` 34/34). 013/027 foram corrigidas no repo para greenfield; **não reaplicar** essas duas em prod.
3. Preview da Vercel: env `NEXT_PUBLIC_SUPABASE_*` de staging **feitas** (Claude 2026-08-19, Preview only). `SUPABASE_SERVICE_ROLE_KEY` de Preview **ainda falta** (dono cola).
4. Nunca mais aplicar migration em prod sem passar por staging.
5. Antes de qualquer DDL em prod: backup 0.1 verde.

### Aceite

- [x] URL staging documentada em `.env.example` (nomes, não valores)  
- [ ] Login/practice/dashboard smoke no staging  

## 0.4 Auth dashboard — PWD-01, SEC-02, SEC-07, VULN-13

**Esforço:** S  
**Bloqueia:** sim (signup público)

### Subtarefas (Supabase Dashboard → Authentication)

1. Minimum password length ≥ 8.
2. Leaked password protection (HaveIBeenPwned) ON.
3. CAPTCHA (hCaptcha ou Turnstile) em signup, login, recovery.
4. Site URL = `https://kangalearner.com.au`.
5. Redirect allowlist **só**:
   - `https://kangalearner.com.au/auth/callback`
   - `https://kangalearner.com.au/**` se necessário
   - `http://localhost:3000/auth/callback` para dev
   - Remover qualquer GitHub Pages / hash `#auth-callback` legado.
6. Recovery link TTL curto (ex. 1 hora). Anotar o valor.
7. Confirmar rate limits nativos do GoTrue estão no default (não “disabled”).
8. Atualizar `docs/security/supabase-auth-hardening-checklist.md` para refletir o estado **real** (Next/Vercel, não Pages).

### Aceite

- [ ] Signup com `password123` / senha vazada falha  
- [ ] Captcha visível no hosted ou no client conforme o provider  
- [ ] Checklist reescrito  

## 0.5 Sentry — OBS-02

**Esforço:** S  
**Bloqueia:** launch amplo (ops)

### Subtarefas

1. Criar projeto Sentry (Next.js).
2. Vercel Production:
   - `SENTRY_DSN`
   - `NEXT_PUBLIC_SENTRY_DSN`
   - opcional: `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` (source maps)
3. Alertas: error rate, spike, cron `backup.yml` / `/api/ping` falhou.
4. `beforeSend` a scrubir cookies, Authorization, email se aparecer.
5. Verificar um erro de teste no dashboard Sentry via `/monitoring` tunnel (CSP).

### Aceite

- [ ] Um evento de browser e um de server visíveis  
- [ ] Alerta configurado  

**Estado 2026-08-19:** DSN Production recriado (95 chars). Client `captureException` + `flush() true` no site live. Falta: (1) dono login no Sentry para ver o evento; (2) `GET /api/sentry-test` uma vez (rota temporária, 3/h/IP) para o evento server; depois apagar a rota.  

## 0.6 Stripe — só se billing for ligado — SEC-13

**Nota:** “Pro upgrade” do produto está excluído pelo dono. Enquanto billing estiver off:

1. Documentar em BACKLOG: **billing off; não configurar webhook até decisão**.
2. Se um dia ligar: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, publishable; endpoint `https://kangalearner.com.au/api/webhook/stripe`; teste de assinatura inválida → 400.

Não bloquear o launch de estudo por Stripe.

## 0.7 Anon key do keepalive — SEC-01

**Esforço:** S  
**Bloqueia:** não

1. GitHub Secret `SUPABASE_ANON_KEY`.
2. Remover o JWT literal de `.github/workflows/keepalive.yml`.
3. Probe: preferir endpoint que não dependa de SELECT em `profiles` (health ou `HEAD`).

---

# Fase 1 — Segurança de dados (RLS)

Aplicar em **staging**, smoke, depois prod. Nunca `DISABLE ROW LEVEL SECURITY`.

## 1.1 Migration 031 — relock `user_category_stats` — RLS-01 + RLS-02

**Esforço:** S  
**Bloqueia:** sim  
**Ficheiro novo:** `supabase/migrations/031_relock_category_stats.sql`

### Subtarefas

1. `DROP POLICY "category_stats: own"` (FOR ALL da 025).
2. Recriar **só** `FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id)`.
3. Restaurar no corpo de `upsert_category_stat` o guard da 022:
   - se não for `service_role` e `p_user_id IS DISTINCT FROM auth.uid()` → `RAISE forbidden`.
4. `SET search_path = public, pg_temp`.
5. `REVOKE` anon/authenticated; `GRANT` só `service_role` (idempotente).
6. Teste manual staging:
   - JWT user A: `PATCH /rest/v1/user_category_stats` → falha.
   - JWT user A: `SELECT` próprias rows → ok.
   - Insert attempt via `/api/attempts` → trigger 028 atualiza stats.
   - User A não lê stats de B.

### Aceite

- [ ] Dashboard continua a mostrar categorias  
- [ ] PostgREST write direto falha  
- [ ] Practice + mock + bulk attempts ainda sobem stats  

**Risco:** zero para a app — o dashboard só faz SELECT; writes já vão pelo trigger.

## 1.2 Migration 032 — colunas sensíveis de `profiles` — RLS-07

**Esforço:** S  
**Bloqueia:** quase (billing/webhook)

### Subtarefas

1. Trigger `BEFORE UPDATE`: se não `service_role`, restaurar `stripe_customer_id`, `welcome_sent_at`, `deleted_at`, `email` a partir de `OLD`.
2. `role` já está no trigger 019 — não duplicar lógica, só colunas em falta.
3. Teste: client `UPDATE profiles SET stripe_customer_id = 'cus_x'` → valor inalterado; `preferred_lang` continua a gravar (account page).

## 1.3 Migration 033 — marketplace / waitlist — RLS-03..06, VULN-01..03

**Esforço:** M  
**Bloqueia:** sim como superfície PostgREST (mesmo sem UI)

### Subtarefas

1. Confirmar que **não há UI** a usar estas tabelas (grep `instructors`, `marketplace_waitlist`, `bookings`).
2. Se feature morta (recomendado agora):
   - `REVOKE ALL ON instructors, bookings, instructor_reviews, marketplace_waitlist FROM anon, authenticated;`
   - Manter RLS ON.
   - Admin/service_role continua a poder limpar spam.
3. Se for para manter waitlist pública: **não** policy INSERT aberta; só API + `supabaseAdmin` + rate limit (padrão newsletter).
4. Não construir marketplace nesta fase.

### Aceite

- [ ] Anon POST waitlist via REST falha  
- [ ] App web/mobile inalterada (smoke)  

## 1.4 Migration 034 — hygiene policies — RLS-08, RLS-09, RLS-13, RLS-15

**Esforço:** M  
**Bloqueia:** não (fazer depois de 031–033)

### Subtarefas

1. Inventário de nomes duplicados em `profiles` (`profiles: insert own` vs `profiles_insert_own`). DROP dos legados; um SELECT unificado.
2. Trocar `auth.uid()` solto por `(SELECT auth.uid())` nas policies que restarem (saved_questions, gamification, storage).
3. `REVOKE EXECUTE` em `handle_new_profile_xp` de anon/authenticated; `search_path` fixo.
4. `SET search_path = public, pg_temp` nas RPCs `get_*` da 021.

### Aceite

- [ ] `supabase db lint` / advisors sem recursion  
- [ ] Admin ainda lê todos os profiles  
- [ ] User normal só o próprio, não deleted  

## 1.5 `saved_questions` granular — RLS-11

**Esforço:** S  
**Bloqueia:** não  
Opcional: partir `FOR ALL` em SELECT/INSERT/DELETE. Só se tocar no ficheiro por outro motivo.

---

# Fase 2 — Bugs de produto visíveis

PRs pequenos, um por bug se possível.

## 2.1 Mock test não saltar a explicação — HOOK-01

**Esforço:** S  
**Bloqueia:** marketing / QA do exame  
**Ficheiro:** `apps/web/app/(main)/mock-test/session/page.tsx`

### Problema

`useEffect([session])` redefine `activeIndex` para o primeiro unanswered **a cada resposta**. No modo practice a explicação nunca aparece.

### Subtarefas

1. Seek “first unanswered” **só na hidratação inicial** (`useRef` `didSeek`).
2. `choose()` avança de índice **explicitamente** depois do reveal (comportamento desejado), não via effect colateral.
3. Teste unitário da função pura de “próximo índice” se extrair; senão teste manual: responder 1 questão, ver explanation, clicar next.
4. Não abortar o POST de results no `finally` (ver 4.2).

### Aceite

- [ ] Practice mock: resposta → explanation visível → next  
- [ ] Exam mock: timer e skip continuam a funcionar  
- [ ] Refresh a meio retoma o primeiro unanswered (só no mount)  

## 2.2 Honrar `?cat=` / `?category=` — PERF-02, STATE-01 (parcial)

**Esforço:** S  
**Ficheiros:** `practice/page.tsx`, `PracticeClient.tsx`; links em `DashboardClient`, `LandingClient`, `progress`, `TopicPageClient`

### Subtarefas

1. `practice/page.tsx` lê `cat` e `category` (alias), valida contra `CATEGORIES`, passa `initialCat`.
2. `PracticeClient` usa `initialCat` em vez de hardcoded `"all"`.
3. Ao mudar filtro na UI: `router.replace` com query (não perder `mode`).
4. Unificar o nome do param: `cat` canónico; aceitar `category` na entrada.
5. Teste Playwright smoke: `/practice?cat=Speed%20Limits` mostra o filtro ativo (ou vitest do parser).

### Aceite

- [ ] Clique no dashboard “praticar categoria X” abre só X  
- [ ] `?mode=wrong` continua a funcionar  
- [ ] `?mode=sim` ainda redireciona para `/mock-test`  

## 2.3 Unificar chave de tema — STATE-02

**Esforço:** S  
**Ficheiros:** `storageKeys.ts`, `ThemeToggle.tsx`, `app/layout.tsx` FOUC script, `account/page.tsx`

### Subtarefas

1. Canónico: `kl-theme` (já no FOUC e toggle).
2. `SK.theme = "kl-theme"`.
3. Leitura: se `kl-theme` vazio, migrar de `kanga-theme` e apagar a chave velha.
4. Account e toggle passam a escrever a mesma chave.

### Aceite

- [ ] Toggle e Account não divergem  
- [ ] Sem flash errado no reload  

## 2.4 Progress autenticado vs guest — STATE-03

**Esforço:** M  
**Bloqueia:** não, mas gera tickets de suporte

### Subtarefas

1. Se `getUser()` existe, `/progress` usa os mesmos dados do dashboard (ou redirect 301 `/dashboard`).
2. localStorage `kl-answered` só para guest.
3. Preferência de produto: **redirect** é mais seguro e menor (recomendado).

### Aceite

- [ ] User logado não vê progress vazio com dashboard cheio  

---

# Fase 3 — Performance de payload

## 3.1 Separar `CATEGORIES` de `QUESTIONS` — DRY-01/PERF barrel, PERF-01 (parcial)

**Esforço:** S–M  
**Bloqueia:** mobile web  
**Ficheiros:** `packages/core/src/data/questions.ts`, novo `categories.ts`, `packages/core/src/index.ts`, `packages/core/package.json`

### Subtarefas

1. Mover `export const CATEGORIES` para `packages/core/src/data/categories.ts`.
2. `questions.ts` pode reexportar CATEGORIES para não quebrar geradores, **ou** só `categories.ts` (preferível).
3. Barrel `@kanga/core` exporta `CATEGORIES` a partir do ficheiro pequeno.
4. `"sideEffects": false` no `package.json` do core.
5. Web **não** deve importar `QUESTIONS` do core (já não exporta no barrel — manter assim).
6. Medir: bundle analyzer / `@next/bundle-analyzer` na rota `/practice`. **Aceite = `questions.ts` ausente do client bundle.**
7. CI: se alguém importar `QUESTIONS` em `apps/web`, o PR deve falhar (eslint `no-restricted-imports`) — opcional mas barato.

### Aceite

- [ ] Client web de practice não inclui o array de 4.6 MB  
- [ ] Mobile continua a importar `QUESTIONS` (offline)  
- [ ] `pnpm test` core verde  

## 3.2 `questions.json` sob demanda — PERF-01

**Esforço:** L  
**Depende de:** 3.1  
**Bloqueia:** não o deploy; bloqueia UX 3G

### Subtarefas (fazer depois de 3.1)

1. Gerar fatias `questions-{STATE}.json` (ou STATE+licence) no script `gen-questions-json`.
2. `useQuestions(state)` fetch só a fatia; IndexedDB key por versão+estado.
3. Prefetch da fatia do estado atual no SiteNav após onboarding.
4. Validar cache com `validateQuestionsDataset` (TS-01).
5. Adicionar script npm (Fase 8): `"gen:questions-json": "tsx scripts/gen-questions-json.ts"`.

Não fazer sharding no mesmo PR que 3.1.

## 3.3 Blog RSC — PERF-05

**Esforço:** M  
**Bloqueia:** não

1. `BlogPageClient` deixa de importar `blogPosts.ts` completo.
2. Server Component passa lista leve `{ slug, title, excerpt, state, publishedAt }`.
3. Página `[slug]` já é server — manter.

## 3.4 Landing híbrida — PERF-06, ARCH-06

**Esforço:** M  
**Bloqueia:** não

1. Hero + copy SEO em Server Component.
2. Carrosséis `dynamic(..., { ssr: false })` ou ilhas client.
3. `optimizePackageImports: ["lucide-react"]` em `next.config.ts` (PERF-07) — PR de 5 linhas, fazer cedo.

## 3.5 Sinais WebP — PERF-04

**Esforço:** L  
**Bloqueia:** não  
Converter `public/icons/signs` para WebP/AVIF numa pipeline; `loading="lazy"` já existe. Fazer só depois do launch se bandwidth do CDN doer.

## 3.6 Virtualização practice — PERF-03

**Esforço:** M  
**Bloqueia:** não  
Só se “Load more” chegar a 120+ cards no profiling. Não cargo-cult agora.

## 3.7 Dashboard 5000 rows — PERF-08, BACKLOG query reduction

**Esforço:** M  
**Bloqueia:** não

1. RPC `get_dashboard_temporal(user_id, since)` com buckets diários/semanais e streak no SQL.
2. Manter `user_category_stats` para totais (já bom).
3. Validar números vs produção (BACKLOG: muda semântica se truncar).

## 3.8 Dupla migração pós-login — PERF-11

**Esforço:** M  
**Bloqueia:** não

1. Um orquestrador `syncGuestProgress` (nav **ou** dashboard, não os dois a puxar `questions.json`).
2. Flag `sessionStorage` de “migration in flight”.
3. Categoria no payload local para não re-fetch o banco só para mapear ids.

## 3.9 Admin search debounce — PERF-09

**Esforço:** S  
300 ms debounce em `admin/page.tsx` `search`.

---

# Fase 4 — Erros, sync, observabilidade

## 4.1 Error / loading / not-found de segmento — ERR-01

**Esforço:** S  
**Ficheiros:** `apps/web/app/error.tsx`, `app/(main)/error.tsx`, `app/not-found.tsx`, `loading.tsx` nas rotas pesadas (`dashboard`, `practice`, `mock-test`)

### Subtarefas

1. UI amigável + botão retry (`reset()`).
2. `Sentry.captureException` no boundary de segmento (não só global).
3. i18n via `useLang` no client boundary; not-found pode ser estático EN+PT curto.
4. Mobile: ErrorBoundary na raiz (ERR-10) — Fase 9 se mobile não for o launch.

### Aceite

- [ ] Forçar throw numa page de teste (dev) mostra retry, não só `statusCode={0}`  

## 4.2 Sync nunca silencioso — ERR-03

**Esforço:** M  
**Ficheiros:** `PracticeClient.tsx`, `mock-test/results/page.tsx`, `MigrateLocalProgress.tsx`, `syncGuestProgress.ts`, `ReactionButtons.tsx`, `progress/page.tsx`

### Subtarefas

1. Proibir `.catch(() => {})` nestes fluxos.
2. Banner persistente “Não foi possível guardar. Tentar de novo.” com retry.
3. Distinguir 401 (guest: ok, não mostrar erro de sync) vs 429 vs 5xx.
4. Mock results: abortar no **cleanup** do effect, **não** no `finally` do fetch.
5. `MigrateLocalProgress`: `try/catch` na rede; só limpar localStorage **depois** de `ok: true`.

### Aceite

- [ ] DevTools offline: prática mostra erro, não sucesso falso  
- [ ] Mock results idem  

## 4.3 Envelope de API único — ERR-02, ERR-05

**Esforço:** M  
**Ficheiro novo:** `apps/web/src/lib/api/envelope.ts`

### Contrato

```ts
{ ok: true, data?: T }
{ ok: false, error: { code: string } }  // nunca error.message interno
```

### Subtarefas

1. Helper `apiError(code, status)` / `apiOk(data)`.
2. Migrar as 13 rotas **sem** mudar códigos existentes no primeiro PR (mapear `unauthorized` → mesmo code).
3. Client `parseApiError(res)` → ação: reauth / retry / toast i18n.
4. Não mostrar `json.error` string crua no account avatar (ERR-04).

Fazer em dois PRs: helper + 3 rotas críticas (`attempts`, `account/delete`, `admin/users`); resto depois.

## 4.4 Mensagens Auth genéricas — ERR-04, SEC-06, PWD-02

**Esforço:** S  
**Ficheiros:** `auth/login`, `signup`, `forgot-password`, `reset-password`, mobile `ProfileScreen`

### Subtarefas

1. Login falhou → sempre “Email or password is incorrect” (i18n).
2. Signup: não vazar “User already registered”; copy genérico + e-mail de confirmação se o projeto estiver assim configurado.
3. Forgot: já é opaco no sucesso — manter; erro também genérico.
4. Logar `signError.code` no server/Sentry, nunca na UI.
5. OAuth `error` query: allowlist de códigos (`oauthcancelled`), resto → genérico.

## 4.5 Admin stats e dashboard fail-loud — ERR-06, ERR-07, ERR-08

**Esforço:** S–M

1. `api/admin/stats`: se qualquer `.error`, `log("error", ...)` + HTTP 500 **ou** `{ ok: true, degraded: true, failed: ["rpc_x"] }`. Nunca zeros silenciosos.
2. Dashboard: se `temporalAttemptsError` / counts falham, `DashboardClient` recebe `loadError` e mostra banner, não “0 attempts”.
3. Account load: `profileError` → banner + retry, não form vazio.

## 4.6 Logger estruturado em todas as rotas — OBS-01, OBS-03

**Esforço:** M

1. Middleware gera `x-request-id` (uuid) e propaga.
2. `log(level, event, { requestId, userId?: mask, action })`.
3. Substituir `console.error("[attempts]"...)` nas 13 rotas.
4. Níveis: info / warn / error. Sem `fatal` até haver processo de paging.
5. Nunca logar password, token, `Authorization`, raw body de webhook (já ok no Stripe).

## 4.7 `/api/health` vs ping — OBS-05

**Esforço:** S  
Documentar: health = liveness; ping = readiness DB + secret. Sem mudança obrigatória.

---

# Fase 5 — AuthZ extra, step-up, MFA

## 5.1 PATCH admin não demota premium — SEC-09, VULN-05

**Esforço:** S  
**Ficheiro:** `apps/web/app/api/admin/users/route.ts`

### Subtarefas

1. Se `targetProfile.role === "premium"` e `role !== "premium"`, só `super_admin` **ou** recusar sempre (Stripe-only). Recomendado: **recusar sempre** no PATCH; Stripe webhook é o único caminho free↔premium.
2. Teste vitest/handler: admin comum PATCH premium→free → 403.
3. UI admin: esconder ação.

## 5.2 Step-up delete e password — SEC-04, VULN-06

**Esforço:** M  
**Bloqueia:** não estritamente; fazer antes de tráfego grande

### Subtarefas

1. Delete: exigir password atual no body **ou** `reauthenticate()` / e-mail de confirmação com token de uso único (TTL 15 min).
2. Change password: `currentPwd` deixa de ser teatro — `signInWithPassword` recente ou `updateUser` só após reauth.
3. Rate limit já existe em delete (5/min) — manter.
4. Testes: delete sem reauth → 403; com reauth → 200 + user some.

## 5.3 MFA admin — SEC-03, AUTH-01

**Esforço:** M  
**Dono:** dashboard + código

1. Ativar MFA no projeto Auth. **Feito** (Claude 2026-08-19): TOTP Enabled em prod; já vinha ligado.
2. `assertAdminRole` / `requireAdminPage`: se `aal !== "aal2"` e role é admin/super_admin → redirect para enroll MFA. **Código em `main`.**
3. Não exigir MFA de `free`/`premium` no P0.

## 5.4 Cookies / XSS — SEC-05, VULN-08, SEC-08

**Esforço:** L  
**Bloqueia:** não

1. Documentar trade-off do cookie adapter (necessário para sync middleware).
2. Confirmar `Secure` + `SameSite=Lax` nos cookies setados pelo server.
3. CSP `style-src` nonce: deferido (Sprint 12). Backlog, não esta fase.

## 5.5 Scoring client-side — SEC-10, RLS-12

**Esforço:** L  
**Bloqueia:** não para study app  

Decisão de produto: aceitar trapacear o próprio dashboard. Rever **só** se houver ranking público, certificado ou pagamento. Não implementar scoring server nesta fase.

## 5.6 `getClientIp` — SEC-14

**Esforço:** S  
Documentar que em Vercel `x-forwarded-for` é do edge. Sem mudança se permanecer só na Vercel.

---

# Fase 6 — Testes

Ferramentas atuais: Vitest + Playwright. Não adicionar Cypress.

## 6.1 Vitest de route handlers — TEST-02

**Esforço:** L  
**Prioridade de cobertura (nesta ordem):**

1. `POST /api/webhook/stripe` — assinatura inválida; idempotência 23505; skip admin/super_admin; ledger cleanup em falha de update.
2. `DELETE /api/account/delete` — 401; sucesso; rollback se `deleteUser` falha.
3. `POST /api/attempts` — 401; state inválido; `user_id` no insert é o da sessão (IDOR).
4. `POST /api/attempts/bulk` — cap 501 → 400; timestamps futuros clamp.
5. `PATCH /api/admin/users` — 403 non-admin; 403 demote premium (5.1).
6. `GET /api/ping` — sem secret 401.

Mocks: Supabase client + Stripe `constructEvent`.

## 6.2 Playwright auth real — TEST-01

**Esforço:** M  
**Onde:** staging, users de teste, **nunca** prod.

1. Login fixture `smoke-a@` → cookie → `/dashboard`. Skip no CI se `E2E_STAGING_*` ausente. **Nunca** `kangalearner.com.au` nem ref `olgogtaeifyxwzencilo`.
2. Logout → `/dashboard` redirect login.
3. Admin API 403 com user free (`smoke-a@`). Não usar `smoke-b@` neste teste.
4. Account delete: só user descartável extra. **Não** apagar `smoke-a` / `smoke-b`.

## 6.3 RLS tests — opcional mas alto valor

**Esforço:** M  
Dois JWTs no staging: A não SELECT attempts de B; A não PATCH stats (pós-031). Script `pnpm rls:staging` (`tsx` + fetch REST). Skip sem `E2E_STAGING_EMAIL`/`PASSWORD`. Peer: `E2E_STAGING_PEER_*` (smoke-b@). Recusa prod e URL CI placeholder. Vitest cobre interpretadores + fetch mock. **Não** apagar fixtures.

### Aceite (código)

- [x] Helpers + vitest (2026-08-18)
- [ ] Run live contra staging com smoke-a@ + smoke-b@ (credenciais locais)

## 6.4 CI extras

1. `pnpm audit --prod` no `build.yml` (allowlist se preciso) — DEP-01.
2. Script `gen:questions-json` no package.json (8.2) + opcional check de stale JSON.
3. Não falhar o merge por cobertura 80% global neste momento — o repo não está aí; os testes **novos** das rotas críticas sim.

## 6.5 Mobile E2E (Maestro) — TEST-03

Fase 9. Não bloqueia web.

---

# Fase 7 — Arquitetura, DRY, TypeScript (depois do launch estável)

Não misturar com P0. Um PR por fatia.

| ID | Trabalho | Esforço |
|----|----------|---------|
| ARCH-01 | Fatiar `account/page.tsx` → hooks + secções | M |
| ARCH-02 | `usePracticeSession` + `QuizCard` fora de PracticeClient | M |
| ARCH-03 | `useAdminStats` / `useAdminUsers` | S |
| ARCH-04 | `scoreMockSession` puro no core + `useMockSession` | M |
| ARCH-05 | NavDesktop / NavDrawer / `useNavAuth` | M |
| DRY-01 | `tx` / `UiLang` no `@kanga/core`; strings UI por app | M |
| DRY-02 | `preferredState.ts` read/write/subscribe | S |
| DRY-03 | results usa `safeParseJson` canónico | S |
| DRY-04 | `pct()` no core | S |
| DRY-05 | `questionsForState`, `correctLetter`, `scoreAnswers` no core; **usar** `filterByState` ou apagar | M |
| DRY-06 | `signSrc.ts` | S |
| DRY-07 | `QuestionPrompt` + `OptionList` web | M |
| DRY-08 | `useGoogleOAuth` | S |
| DRY-09 | mock-sessions usa `isValidAttemptState` | S |
| DRY-10 | tipos `Opt`/`Cap` do core | S |
| DRY-11 | MockConfig no core | S |
| DRY-12 | RESULT_MSG no i18n | S |
| TS-01 | IndexedDB `Question[]` + validate | S |
| TS-02 | Regenerar `database.types.ts`; tipar RPCs; apagar comentário de drift | S |
| TS-03 | Unificar `SupportedLanguage` vs `pt-en` | S |
| TS-04 | `instanceof Error` nos catch | S |
| HOOK-02 | Account effect sem refetch em mudança de lang | S |
| HOOK-03 | Remover `useSearchParams` morto no SiteNav | S |
| HOOK-04 | `useMemo` LangContext value | S |
| HOOK-05 | Interval estável do slideshow | S |
| STATE-05 | TanStack Query só se admin/account doer — **não obrigatório** | — |
| avatar admin.ts overuse | Opcional: update `avatar_url` com user client (RLS) | S |

**Regra:** extrair lógica **antes** de mudar comportamento. Teste da função pura primeiro (TDD) quando a regra for pass/fail (DRY-05, ARCH-04).

---

# Fase 8 — Docs e higiene de repo

**Esforço:** S–M  
**Bloqueia:** não, mas evita a próxima mega-auditoria repetir itens mortos.

## 8.1 Docs canónicos

1. Reescrever `docs/security/supabase-auth-hardening-checklist.md` (DEAD-01, SEC-12): Next, Vercel, Expo, redirects atuais, Upstash já existe, MFA ainda pendente.
2. Atualizar `docs/CODEMAPS/web-next-auth-supabase.md`: 13 rotas API reais; redirects `/login`; mock-test real; Sentry; rate limit; account/admin/blog.
3. `docs/AUDIT-2026-05-20.md`: banner no topo “histórico; ver PRODUCTION-REMEDIATION-PLAN”.
4. `docs/SPRINT-12-INSPECTION-FIXES.md`: marcar Upstash Production `[x]` (já no BACKLOG).
5. `supabase/README.md`: listar migrations 023–030 e 031+ quando existirem.
6. `docs/QA-EXECUTION-LOG.md`: uma linha por fase executada.
7. `docs/HISTORY-INFRA-WEB.md`: linha 2026-08-17 mega auditoria.

## 8.2 README / scripts — DEAD gen:questions-json

1. Adicionar no **root** ou `@kanga/web`:
   `"gen:questions-json": "tsx scripts/gen-questions-json.ts"`
2. README deixa de mentir.

## 8.3 Copy i18n “static site” — DEAD-03

Remover referência ao site estático em `i18n.ts`.

## 8.4 Onboarding paths — DEAD-04

Incluir `/auth/login` na lista de suppress; manter `/login` por causa do 308.

## 8.5 OpenWolf neste worktree

Se `.wolf/` continuar ausente neste worktree: ou copiar do repo principal ou ajustar CLAUDE.md para não bloquear agentes. Não inventar cerebrum.

## 8.6 Dependabot / audit

Já há Dependabot. Adicionar `pnpm audit --prod` no CI (6.4). PRs de bump **um a um**.

## 8.7 Código morto restante

- `filterByState` — usar ou documentar API pública (DEAD-01).
- `createSupabaseBrowserClient` deprecated — apagar se grep = 0 callers.
- Prompts `docs/CURSOR-PROMPT-SPRINT*` — apagar depois de consolidar (BACKLOG).

---

# Fase 9 — Mobile (não bloqueia web)

Fonte de verdade: [MOBILE-APP-ROADMAP.md](MOBILE-APP-ROADMAP.md) + [STATUS.md](../apps/mobile/STATUS.md).

| Item | Trabalho |
|------|----------|
| DEAD-08 / ads | Trocar iOS AdMob sample `ca-app-pub-3940256099942544` por ID real |
| ATT / UMP | Verificar em device/TestFlight |
| OAuth mobile | Redirect/deep link Supabase; reconfirmar RLS antes de sync prod |
| ErrorBoundary RN | ERR-10 |
| i18n DRY-01 | Partilhar `tx` com core quando Fase 7 existir |
| Maestro smoke | open → practice → sync |
| Store | Play + App Store só depois dos IDs reais e privacy |

---

# Fase 10 — Futuro (não agora)

- MFA para todos os users  
- Scoring server-side / anti-cheat  
- PITR drills mensais  
- Export LGPD `GET /api/account/export`  
- CSP style nonce  
- VPS **não** (ficar em Vercel + Supabase Pro)  
- Marketplace de instrutores: só depois de 1.3 e de um spec de produto  
- `pnpm` core lint real (hoje é `echo`)  
- Split `learnTopics.ts` / `i18n.ts` por tamanho de ficheiro  

---

# Sequência de execução recomendada (calendário)

### Semana 1 — “parar de sangrar”

| Dia | Quem | O quê |
|-----|------|--------|
| 1 | Dono | 0.1 secrets backup + run manual; 0.4 Auth dashboard; 0.5 Sentry DSN |
| 1–2 | Dono | 0.2 Pro + região; 0.3 projeto staging |
| 2 | Código | **031** relock stats + restore RPC guard (Fase 1.1) |
| 2 | Código | 2.1 mock seek + 2.2 `?cat=` + 2.3 tema (um PR ou três minis) |
| 3 | Código | 1.3 revoke marketplace; 1.2 trigger profiles sensíveis |
| 3 | Código | 3.1 extrair CATEGORIES + sideEffects + medir bundle |
| 4 | Código | 4.1 error.tsx; 4.2 sync visível; 4.4 mensagens auth |
| 5 | Código | 5.1 admin premium lock; 3.7 lucide optimizePackageImports; 8.2 script npm |
| 5 | QA | Smoke staging: login, practice cat, mock explanation, dashboard, delete **não** ainda |

### Semana 2 — “ver e provar”

- 0.1 restore drill documentado  
- 4.3 envelope (rotas críticas)  
- 4.5 dashboard/admin fail-loud  
- 4.6 log() + requestId  
- 6.1 testes webhook + attempts IDOR + admin PATCH  
- 8.1 docs  

### Semana 3+ — dívida estrutural

- 3.2 JSON por estado  
- 3.3/3.4 blog/landing  
- Fase 7 fat pages  
- 5.2 step-up  
- 5.3 MFA admin  
- Fase 9 se for para store  

---

# Checklist de merge por PR

- [ ] Escopo = um tema (não misturar RLS com i18n)  
- [ ] Testes novos ou manuais descritos  
- [ ] Sem secrets  
- [ ] `pnpm test` + lint web  
- [ ] Migration: aplicada em staging; rollback mental documentado (DROP POLICY inverso)  
- [ ] CODEMAP/BACKLOG/QA-log se infra/auth/schema  
- [ ] Não marcar pronto o que falta credencial  

---

# Matriz completa de achados → fase

| ID | Fase | Bloqueia launch amplo? |
|----|------|------------------------|
| DR-01 backup secrets | 0.1 | Sim |
| INFRA-01 free pause | 0.2 | Sim |
| Staging | 0.3 | Sim (DDL) |
| PWD-01 HIBP | 0.4 | Sim |
| OBS-02 Sentry DSN | 0.5 | Ops sim |
| SEC-13 Stripe env | 0.6 | Só se billing |
| SEC-01 anon no YAML | 0.7 | Não |
| RLS-01 stats FOR ALL | 1.1 | Sim |
| RLS-02 RPC guard | 1.1 | Defesa |
| RLS-07 profiles billing cols | 1.2 | Quase |
| RLS-03..06 marketplace | 1.3 | Superfície sim |
| RLS-08/09/13/15 hygiene | 1.4 | Não |
| RLS-11 saved FOR ALL | 1.5 | Não |
| HOOK-01 mock skip | 2.1 | Produto sim |
| PERF-02 `?cat=` | 2.2 | Produto sim |
| STATE-02 theme keys | 2.3 | Não |
| STATE-03 progress | 2.4 | Não |
| PERF barrel CATEGORIES | 3.1 | Mobile web sim |
| PERF-01 JSON split | 3.2 | UX |
| PERF-05/06/07 blog landing lucide | 3.3–3.4 | Não |
| PERF-03/04/08/09/11 | 3.5–3.9 | Não |
| ERR-01 boundaries | 4.1 | UX |
| ERR-03 silent sync | 4.2 | Dados sim |
| ERR-02/04/05 envelope | 4.3–4.4 | Não |
| ERR-06/07/08 zeros | 4.5 | Ops |
| OBS-01/03 logger | 4.6 | Ops |
| SEC-09 premium demote | 5.1 | Billing futuro |
| SEC-04 step-up | 5.2 | Não |
| SEC-03 MFA admin | 5.3 | Admin |
| SEC-05/08 cookies CSP | 5.4 | Não |
| SEC-10 cheat | 5.5 | Não |
| TEST-01/02 | 6 | Billing/delete |
| DRY/ARCH/TS/HOOKs restantes | 7 | Não |
| DEAD docs/README | 8 | Processo |
| Mobile store/ads | 9 | Stores |
| LGPD export, VPS, marketplace UI | 10 | Não |

---

# Fora de âmbito (não fazer)

- Reescrever o app em outro framework  
- Meter banco e Next na mesma VPS  
- Desligar RLS “para testar”  
- `npm audit fix` cego  
- Refatorar account+practice+nav no mesmo PR  
- Ligar Stripe Checkout sem 6.1 e sem env  
- Tratar a auditoria de 2026-05-20 como lista de TODO atual (muitos itens já feitos)  
- Expandir marketplace  

Quando uma fase terminar, marcar checkboxes neste ficheiro **e** o item correspondente em [BACKLOG.md](BACKLOG.md), com data em [QA-EXECUTION-LOG.md](QA-EXECUTION-LOG.md).
