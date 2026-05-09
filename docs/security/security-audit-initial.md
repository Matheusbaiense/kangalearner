# Security Audit — Initial (read-only)

- Branch: `chore/security-initial-audit`
- Base commit: `ba7adcf` (main, pós merge PRs #7/#8/#9)
- Data: 2026-05-08
- Escopo: avaliação inicial; sem alterações de código, dependências, env, Supabase, Stripe ou rotas.
- Skills aplicadas: `security-bounty-hunter`, `security-review`, `security-scan` (orientação).

## 1. Executive summary

| Eixo | Estado | Severidade global |
| --- | --- | --- |
| Secrets expostos no repo | OK | Nenhum encontrado |
| Service-role no frontend | OK | Não exposto |
| Hash próprio de senha | OK | Não existe; Supabase Auth é o único guardião |
| Vulnerabilidades runtime do site público | OK | Nenhuma identificada nas deps de produção do SPA estático |
| Vulnerabilidades dev/build (transitivas) | Aceitável | 0 critical, 13 high, 3 moderate, 1 low — todas em `apps/mobile` (Expo CLI/RN) e `apps/web` (Next.js + postcss build) que **não estão em produção hoje** |
| Rate limit em endpoints próprios | N/A hoje | SPA estático não tem backend; Supabase Auth aplica rate limit nativo |
| Supabase Auth hardening | Parcial | Cliente PKCE OK; checklist do Dashboard pendente |
| Headers HTTP de segurança em produção | Gap conhecido | `_headers` existe mas GitHub Pages ignora |
| Dependabot/GitHub Security | Gap | `vulnerability-alerts` e `dependabot_security_updates` desativados; secret scanning + push protection ativos |

Nenhum risco crítico de exploração remota foi encontrado contra a superfície pública atual (SPA estático em GitHub Pages + Supabase Auth como Auth Provider).

## 2. What applies now (KangaLearner — May/2026)

- Site público é um SPA estático (root `index.html` + Vite → `dist-vite/`) servido por GitHub Pages.
- Auth real é via Supabase JS no browser (PKCE), com chave anônima pública por design.
- Não há backend próprio em produção: `apps/web` (Next.js) e `apps/mobile` (Expo) existem no monorepo mas não estão deployados.
- Não há código Python no repositório.
- Migrações Supabase (`supabase/migrations/*.sql`) declaram `enable row level security` em todas as tabelas de utilizador.

## 3. What does not apply now

- **Rate limit por IP no frontend**: impossível em estático/CDN sem proxy próprio. Quando `apps/web` for deployado, deverá ser adicionado ao layer Next.js (middleware ou Route Handler).
- **pip-audit**: não há Python.
- **CSRF tokens próprios**: o site público não tem endpoints próprios state-changing; tokens de cookie do Supabase já carregam SameSite default. Aplicável ao deploy futuro do `apps/web`.
- **CSP/HSTS/X-Frame-Options aplicados pelo host**: `_headers` é Cloudflare/Netlify only; GitHub Pages ignora. Será relevante quando o site migrar para um host que respeite estes ficheiros, ou via Cloudflare na frente.

## 4. Dependency audit results (Node)

`pnpm audit` (workspace-wide):

```
Severity: 1 low | 3 moderate | 13 high (0 critical) — total 17 hits, 16 advisories distintas
```

### 4.1 Resumo por pacote

| Pacote | Severidade | CVE/GHSA | Workspace | Tipo | Reachability hoje |
| --- | --- | --- | --- | --- | --- |
| `tar` < 7.5.11 (6 hits) | high | GHSA-34x7-hfp2-rc4v, GHSA-8qq5-rm4j-mr97, GHSA-83g3-92jg-28cx, GHSA-qffp-2rhf-9h96, GHSA-9ppj-qmqm-q256, GHSA-r6q2-hw4h-h46w | `apps/mobile` (expo CLI > cacache) | dev tooling | Não exposto: app não deployada |
| `@xmldom/xmldom` < 0.8.13 (5 hits) | high | GHSA-2v35-w6hq-6mfw, GHSA-f6ww-3ggp-fr8h, GHSA-x6wf-f3px-wcqx, GHSA-j759-j44w-7fr8, GHSA-wh4c-j3r5-mjhp | `apps/mobile` (expo plist parser) | dev tooling | Não exposto |
| `fast-uri` < 3.1.2 (2 hits) | high | GHSA-q3j6-qgpj-74h6, GHSA-v39h-62p7-jpjc | `apps/mobile` (schema-utils > ajv) | dev tooling | Não exposto |
| `fast-xml-parser` < 5.7.0 | moderate | GHSA-gh4j-gqv2-49f6 | `apps/mobile` (RN community CLI) | dev tooling | Não exposto |
| `postcss` < 8.5.10 | moderate | GHSA-qx2v-qp2m-jg93 | `apps/web` (next), `apps/mobile` (metro) | build-time | Não exposto: apps/web não deployada |
| `send` < 0.19.0 | low | GHSA-m6fv-jmcg-4jfg | `apps/mobile` (expo CLI) | dev tooling | Não exposto |

### 4.2 Site público (root `package.json` → `index.html` + Vite)

Dependências de runtime do site público:

- `@supabase/supabase-js@^2.49.1` (cliente browser via UMD CDN — sem advisories ativos hoje)
- DevDeps: `vite`, `prettier`, `puppeteer`, `playwright`, `terser`, `sharp`, `clean-css-cli`, `html-minifier-terser`, `turbo` — todas dev/build, não embarcadas no bundle de produção.

Nenhuma das advisories listadas atinge a superfície de produção atual (GitHub Pages + Supabase Auth).

### 4.3 `pnpm outdated` (informativo, sem ação)

Atualizações disponíveis (apenas listadas, **não aplicar agora**):

- patch-level seguros: `@supabase/supabase-js`, `turbo`, `puppeteer`, `terser`, `@supabase/ssr`
- minor seguros (dentro de major): nenhum crítico
- major (precisa decisão de produto, não aplicar sem upgrade plan):
  - `next` 15 → 16, `react`/`react-dom` 18 → 19, `eslint` 9 → 10
  - `expo` 51 → 55, `expo-router` 3.5 → 55, `react-native` 0.74 → 0.85
  - `vite` 6 → 8, `typescript` 5 → 6
  - `stripe` 17 → 22, `@stripe/stripe-js` 5 → 9
  - `@types/react` 18 → 19, `@types/react-dom` 18 → 19, `@types/node` 22 → 25

### 4.4 GitHub Security posture

`gh api repos/Matheusbaiense/kangalearner`:

- `secret_scanning`: **enabled** ✅
- `secret_scanning_push_protection`: **enabled** ✅
- `dependabot_security_updates`: **disabled** ⚠️
- `vulnerability-alerts`: **disabled** ⚠️
- `.github/dependabot.yml`: **ausente** ⚠️
- `secret_scanning_validity_checks`: **disabled** (informativo)

## 5. Password hashing assessment

- Não existe nenhuma implementação de hash de password no frontend, nem em `apps/web`, nem em scripts.
- `assets/js/auth/auth-service.js` e `apps/web/app/{login,signup,reset-password}/page.tsx` apenas passam `password` para `supabase.auth.signInWithPassword`, `signUp`, `updateUser` ou `resetPasswordForEmail`. Toda a custódia de senha é da Supabase Auth.
- Nenhuma das ocorrências de `crypto`/`hash` é criptográfica de senha:
  - `crypto.randomUUID()` em `assets/js/quiz-engine.js` e `apps/web/app/api/attempts/route.ts` → IDs de tentativa.
  - `stripQueryAndHash` / `window.location.hash` em scripts e router → fragments de URL, não cripto.
- Nenhum padrão fraco encontrado em código próprio: `md5|sha1|bcrypt|argon|pbkdf2|scrypt` só aparece em `pnpm-lock.yaml` (transitivos).

**Risco**: nenhum próprio. Toda a higiene de password depende do Auth provider (Supabase) e da policy do dashboard.

## 6. Rate limit assessment

| Camada | Existe hoje? | Rate limit aplicável? | Como? |
| --- | --- | --- | --- |
| GitHub Pages SPA estático | Sim (produção) | Não | Estático/CDN não permite per-IP fora de um proxy próprio. |
| Auth flows (login/signup/reset) | Sim, via Supabase | Sim | Aplicado pelo Supabase (server-side). UI já trata mensagem `rate limit \| too many requests` em `friendlyAuthError`. |
| `apps/web` Next.js Route Handlers | Código existe, **não deployado** | Sim, quando deploy | `POST /api/attempts`, `POST /api/attempts/bulk` (sem cap de array), `POST /api/mock-sessions`, `GET /api/health`. Precisarão de rate limit + payload caps antes de produção. |
| Supabase Edge Functions | Não existem | — | N/A |

**Conclusão**: rate limit próprio **não é necessário hoje**. É **bloqueante** para qualquer deploy futuro de `apps/web`.

## 7. Secrets exposure assessment

| Verificação | Resultado |
| --- | --- |
| Service role key em código frontend | ✅ Não. Só `apps/web/src/lib/supabase/admin.ts` (server-only, lazy proxy, `process.env.SUPABASE_SERVICE_ROLE_KEY`). |
| Anon key tratada como secreta | ✅ Não — usada como variável pública (correto) e injetada via `vars.*` no GitHub Actions, não `secrets.*`. |
| `.env`/`.env.local` commitados | ✅ Não. Só `.env.example` (vazio) está versionado. `.gitignore` cobre `.env`, `.env.*`, `.env.local`, `apps/web/.env.local`, `apps/mobile/.env.local`. |
| Stripe keys hardcoded | ✅ Não — `apps/web/src/lib/stripe.ts` lê `process.env.STRIPE_SECRET_KEY`. |
| JWT-like strings em código | ⚠️ Apenas placeholder de CI em `.github/workflows/build.yml` (`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.ci-build-not-a-real-key` — header vazio + assinatura fictícia, intencionalmente falso). Sem risco. |
| Push protection bloquearia novo secret | ✅ Sim — `secret_scanning_push_protection: enabled`. |

**Conclusão**: nenhum secret real exposto.

## 8. Supabase Auth hardening checklist

Coisas verificáveis no código (estado atual):

- [x] Cliente browser usa `flowType: "pkce"`
- [x] `persistSession: true`, `autoRefreshToken: true`, `detectSessionInUrl: true`
- [x] Service-role nunca importada do client
- [x] Middleware Next.js (`apps/web/src/middleware.ts`) protege `/progress`, `/dashboard`, `/account`, `/mock-test/*` e redireciona `/login|/signup|/auth/*` quando logado
- [x] Migrações declaram `enable row level security` em todas as tabelas user-facing
- [x] OAuth Google integrado via `signInWithOAuth({provider:"google"})` com `redirectTo` derivado do host

Coisas que **só podem ser confirmadas no Supabase Dashboard** (P0/P1 para próxima fase):

- [ ] **Password policy** (min length, requisitos de complexidade) configurada
- [ ] **Leaked password protection** (HIBP) ativada
- [ ] **CAPTCHA** (Turnstile/hCaptcha) em signup, login e password reset
- [ ] **Email confirmation required** (sign-up confirm email) ativado em produção
- [ ] **Redirect URLs allowlist** com apenas o host de produção (e o domínio custom CNAME) — sem `localhost` em produção
- [ ] **Site URL** apontando para o canonical do GitHub Pages
- [ ] **Refresh token reuse detection** ativada
- [ ] **MFA** (TOTP) avaliado para roadmap futuro
- [ ] **RLS** verificada via `select_advisor`/`security_advisor` no Supabase quando ligar MCP
- [ ] **Auth logs** habilitados e revisados periodicamente

## 9. HTTP security headers (gap)

- `_headers` define X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS — mas **GitHub Pages ignora** este ficheiro.
- Nenhum CSP definido (nem em meta tag).
- Mitigantes: site é estático (sem inputs server-side), origem mesma para Supabase, sem inline-eval suspeito identificado.
- Quando o site migrar para Cloudflare Pages/Netlify ou ganhar um proxy à frente, os headers serão aplicados automaticamente. Hoje não existe vetor crítico que dependa apenas destes headers.

## 10. Recommended security backlog

### P0 — antes do próximo deploy estrutural
1. **Habilitar Dependabot alerts e security updates** (`gh api -X PUT /repos/.../vulnerability-alerts` e `automated-security-fixes`) — só ativação, sem PRs automáticos por enquanto.
2. **Adicionar `.github/dependabot.yml`** para PRs semanais opt-in (revisão manual antes de merge).
3. **Confirmar Supabase Dashboard hardening** (password policy + leaked password protection + redirect URLs allowlist + email confirm).
4. **CAPTCHA** em signup/login/reset — Turnstile ou hCaptcha via dashboard, sem mexer no código de UI.

### P1 — antes de deploy de `apps/web` ou Edge Functions
1. **Rate limit + payload caps** em `apps/web/app/api/attempts/bulk/route.ts` (limitar array a N itens, ex.: 200) e nos demais Route Handlers.
2. **CSP + HSTS efetivos** via host com suporte a headers (Cloudflare Pages, Netlify ou proxy) ou `<meta http-equiv>` quando aplicável.
3. **Logs de auditoria** para inserts em `question_attempts` / `mock_sessions` (já há RLS, mas convém log).

### P2 — backlog
1. **MFA TOTP** opcional para utilizadores.
2. **Validity checks** (`secret_scanning_validity_checks`) habilitados para reduzir falsos positivos.
3. **`stripe`/`@stripe/stripe-js` major upgrade plan** (atualmente 17/5 → 22/9; só relevante quando ativar Stripe).
4. **Expo upgrade** (51 → 55) e **Next.js 15 → 16** com QA — dependent de roadmap mobile/web.
5. **Secret scanning non-provider patterns** habilitar.

## 11. Skills consultadas

- `security-bounty-hunter`: filtragem in-scope (vulnerabilidades remotamente alcançáveis). Resultado: nenhuma rota explorável encontrada na superfície atual.
- `security-review`: checklist de input validation, auth, secrets, rate-limit. Resultado: ver seções 5–9.
- `security-scan` (orientação): repositório GitHub sob `secret_scanning` + `push_protection`; AgentShield não instalado/rodado nesta auditoria por escopo de não-execução.

## 12. Comandos executados

```text
git status --short
git log --oneline -10
git branch --show-current
gh pr list --state all --limit 10
pnpm audit --json   → audit-output.json (não commitado; ver .gitignore implícita; output local)
pnpm audit          → audit-summary.txt (output local)
pnpm outdated --recursive
gh api repos/Matheusbaiense/kangalearner/vulnerability-alerts
gh api repos/Matheusbaiense/kangalearner --jq '.security_and_analysis'
gh api repos/Matheusbaiense/kangalearner/actions/runs (5 runs verdes)
rg --globs *.{js,ts,tsx,html,json,mjs,cjs,md,yml,yaml}
```

Não foram executadas correções automáticas. Nenhuma dependência foi atualizada. Nenhum env/secret foi adicionado ou movido. Nenhum endpoint Supabase ou Stripe foi conectado.

## 13. Notas operacionais

- `pnpm run format:check` falha em `main` neste momento (`assets/js/app.js`, `vite.config.js`) — herdado do PR #9. Não corrigido nesta entrega por respeitar "não alterar código". Sugerido criar branch separada de hygiene fora do escopo de segurança.
- `pnpm run check:static-links` ✅ OK.
- Ficheiros locais não versionados deste exercício: `audit-output.json`, `audit-summary.txt`, `outdated.txt` — descartados antes do commit (não fazem parte do diff).

