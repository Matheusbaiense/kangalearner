# Branch `feat/newcomer-steal-batch-1` — Engineering Handoff

> Documento de handoff para revisão por outros agentes/humanos. Descreve **o que foi feito**,
> **como** (convenções/padrão), **como verificar**, e **o que falta** com critérios de aceite.
> Origem: espionagem dos concorrentes (ver `.claude/plan/espionage/` — artefatos locais) e a tese
> "newcomer wedge". Disciplina de código: Karpathy guidelines (simplicidade, mudanças cirúrgicas,
> critérios verificáveis).

## 1. Objetivo da branch

Implementar a **jornada do recém-chegado em WA**, grátis e em EN/PT/ES, ocupando o espaço que nenhum
concorrente ocupa (WA + multilíngue real + jornada do newcomer + grátis o que a Zutobi tranca + trust).
**Sem tocar produção** (sem migrations aplicadas, sem mudança de auth/Stripe). Tudo guest-first.

## 2. Convenções seguidas (o "padrão" desta branch)

1. **i18n inline por superfície.** Strings novas vivem como `Record<UiLang, string>` no próprio módulo
   (ex.: `COPY[lang]`), consumidas via `lang = useLang().uiLang`. Motivo: evita editar o `i18n.ts`
   de 1122 linhas (risco/conflito) e mantém a tradução junto do componente. Padrão já usado no repo
   (ex.: `SimView` em `PracticeClient.tsx`). EN/PT/ES sempre completos.
2. **Guest-first, sem migration.** Nada do que foi entregue exige Supabase/auth. Persistência client-side
   via `localStorage` (ex.: persona, supervisor checklist). Hooks para `user_settings`/`007`/`009` ficam
   para quando prod for alinhado.
3. **Trust layer obrigatório em conteúdo de regra.** Todo hub/tópico mostra `<VerifiedBadge>`
   (`src/components/ui/VerifiedBadge.tsx`) com data de verificação + link oficial do DoT +
   "report outdated" (mailto). Conteúdo de regra é **conservador** e marcado como pendente de revisão SME.
4. **Design system existente.** Sem novo design system. Reuso de tokens (`globals.css`: `--green`,
   `--paper`, `--border`, `--muted`, `--radius-*`, `--shadow-soft`) e classes utilitárias
   (`app-page`, `container`, `section-pad`, `page-header`, `btn btn-primary/secondary`). Estilos novos
   usam fallback de token (`var(--x, fallback)`) para robustez em dark/light.
5. **Type-safety.** Sem `any`. Props tipadas. `tsc --noEmit` limpo (exceção pré-existente: `rateLimit.test.ts`).
6. **Mudanças cirúrgicas.** Não refatorei código adjacente. Cada linha rastreia a um item do plano.

## 3. O que foi entregue (por commit)

| Commit    | Entrega                                                                     | Arquivos-chave                                                                                                                                                      | Roubado de                                                                       |
| --------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `9a7adc3` | Persona onboarding · Trust badge · Quick quiz · Eyesight                    | `src/lib/persona.ts`, `src/components/ui/VerifiedBadge.tsx`, `app/(main)/quick-quiz/page.tsx`, `app/(main)/eyesight-test/page.tsx`, `src/components/Onboarding.tsx` | Zutobi (persona), DrivingTestWA (trust), DKT (tourist quiz), EzLicence (Snellen) |
| `ea8735d` | Hub de licença estrangeira WA + páginas por país (br/co/es)                 | `src/lib/overseasLicence.ts`, `app/(main)/overseas-licence/{page,[country]/page}.tsx`                                                                               | DKT/EzLicence (foreign licence)                                                  |
| `2e5d1bb` | Jornada por fase · HPT · PDA · Supervisor companion                         | `src/lib/licenceJourney.ts`, `src/components/journey/PrepHubView.tsx`, `app/(main)/{journey,hpt,pda,supervisor}/page.tsx`                                           | DrivingTestWA (estágios/HPT/PDA), DVSA UK (video-clip)                           |
| `4c09ad8` | Descoberta + SEO                                                            | `app/sitemap.ts`, `app/(main)/resources/page.tsx`                                                                                                                   | —                                                                                |
| `ecf01b5` | Fix: overflow horizontal do nav (641–1100px) — **bug pré-existente global** | `app/globals.css` (1 media query)                                                                                                                                   | —                                                                                |
| `ae7ba61` | Gamificação guest-first (streak/XP/meta diária) + **11 testes**             | `src/lib/gamification/progress.ts(.test)`, `src/hooks/useGameProgress.ts`, `src/components/gamification/DailyProgress.tsx`, wiring quick-quiz/practice              | Duolingo, Zutobi                                                                 |

### Mapa de superfícies → persona (roteamento do onboarding)

`first-learner → /practice` · `overseas-licence → /overseas-licence` · `hpt → /hpt` ·
`pda → /pda` · `supervisor → /supervisor` · `tourist → /quick-quiz`. **Nenhuma 404.**

## 4. Como verificar (reprodutível)

Pré-req: `pnpm install --filter "@kanga/web..." --filter "@kanga/core"` (o install completo do monorepo
falha no Windows por lock de symlink do Expo/metro — instale só o grafo do web).

```
# Type-check (deve sair limpo, exceto rateLimit.test.ts pré-existente)
cd apps/web && ./node_modules/.bin/tsc --noEmit -p tsconfig.json

# Dev server
pnpm --filter @kanga/web run dev   # http://localhost:3000
```

Checklist manual por rota (EN/PT/ES + dark/light):

- `/` → onboarding mostra **chips de persona** + estado + idioma; "Let's go" persiste.
- `/quick-quiz` → start → 10 questões com explicação → resultado com CTA. Sem conta.
- `/eyesight-test` → chart Snellen (6 linhas), seleção dá resultado + disclaimer.
- `/overseas-licence` → 3 países; `/overseas-licence/br|co|es` renderizam; país inválido → 404.
- `/journey` → timeline 4 fases + cards HPT/PDA.
- `/hpt`, `/pda` → 3 seções + badge + CTAs.
- `/supervisor` → checklist 10 itens (persiste em localStorage) + dicas.
- `/resources` → seção "Sua jornada em WA" com 7 cards.
- `/sitemap.xml` → inclui as rotas novas + br/co/es.

**Verificação feita:** DOM/interações confirmadas no dev (persona chips, quick-quiz fluxo completo,
eyesight, trust badge no Learn, journey 4 fases, hpt/pda seções, supervisor checklist com progresso),
e revisão visual em **dark mode** (texto claro legível, timeline e badges OK).

## 5. Issues conhecidos (não-bloqueantes)

- **Hydration nonce mismatch** (Next.js "1 Issue" no dev): pré-existente do repo — os scripts inline do
  `app/layout.tsx` recebem `nonce` no SSR e `nonce=""` no cliente. Aparece em **todas** as rotas
  (incl. home/`/learn`), **não** vem desta branch. Rastreado no histórico (#418).
- **Conteúdo de regra WA pendente de revisão SME** (overseas/HPT/PDA/jornada): conservador e com
  `VerifiedBadge` "confirme no DoT". Não publicar como autoritativo sem revisão de especialista.

## 6. O que falta (roadmap) e portões de decisão

Ordem recomendada; itens marcados precisam de decisão do dono.

| #   | Item                                                                                | Bloqueio                                                                                | Critério de aceite                                                                                 |
| --- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| A   | **Command-centre dashboard** (next-best-action, readiness, accuracy por categoria)  | Deriva de dados existentes; versão guest = localStorage                                 | Dashboard mostra ação recomendada determinística; readiness recalcula ao concluir mock             |
| B   | **Gamificação** — v1 guest-first **FEITA** (`ae7ba61`); falta **persistência prod** | **PROD**: reverter "sem gamificação em prod" + migration `007` (persistir cross-device) | ✅ XP/streak/meta no localStorage (feito); pendente: persistir em `user_xp` + badges + RLS own-row |
| C   | **Lead-gen "quando vai fazer a prova" + email**                                     | **PROD**: migration `023` (`newsletter_subscribers.test_horizon`)                       | Submissão cria/atualiza subscriber c/ horizonte; dispara email (Resend)                            |
| D   | **Marketplace lead-first** (filtro por idioma)                                      | **PROD**: ativar `009` + migration `029` (ver `marketplace-architecture-2026-06-01.md`) | Lista instrutores bilíngues por suburb; "request lesson" gera lead; sem pagamento                  |
| E   | **Confidence/Anxiety track**                                                        | `user_settings.confidence jsonb` (migration `027`) ou client-side v1                    | Trilha por situação sugere prática alvo; separada do score factual                                 |
| F   | **Blog SEO data-driven · questões ilustradas · modo "Hardest questions"**           | Conteúdo/assets + métricas de qualidade de questão (admin)                              | Artigos indexáveis; placas com `alt`; modo "hardest" por taxa de erro                              |

> Migrations novas planejadas: `021` persona, `022` content_reports, `023` test_horizon, `024` reading_mode,
> `026` supervisor_logs, `027` confidence, `029` marketplace_v2. Detalhe no plano por fases
> (`.claude/plan/competitor-steal-plan-2026-06-01.md`) e no blueprint do marketplace.

## 7. Checklist de revisão (para o agente revisor)

- [ ] `tsc --noEmit` limpo (exceto `rateLimit.test.ts`).
- [ ] `pnpm --filter @kanga/web run build` verde.
- [ ] Toda string nova em EN/PT/ES (sem texto fixo solto). Trocar idioma na nav e conferir cada rota.
- [ ] Dark **e** light mode legíveis em cada rota nova.
- [ ] Responsivo (320/375/768/1024): cards e timeline sem overflow.
- [ ] `<VerifiedBadge>` presente em todo conteúdo de regra; links oficiais abrem.
- [ ] Nenhuma rota nova exige auth/Supabase (guest-first).
- [ ] Conteúdo de regra marcado como pendente de revisão SME — **não** tratar como autoritativo.
- [ ] `sitemap.xml` lista as rotas novas; nenhuma órfã.
- [ ] Persona → destino correto (sem 404).
