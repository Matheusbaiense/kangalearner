# Backlog — KangaLearner

Este backlog é um “mapa de execução” do projeto.  
Ele é atualizado continuamente durante a migração (web → auth → sync → dashboard → mobile → produção).

## Agora (curto prazo)

- [ ] **Portar Simulado (React/Next)**: fila de 30 perguntas, progresso, resultado e persistência.
- [ ] **Salvar simulados no Supabase**: `POST /api/mock-sessions` a partir do simulado React.
- [ ] **Sincronização de progresso**:
  - [ ] importar histórico do `localStorage` ao logar (migração guest → logged-in)
  - [ ] deduplicação básica de tentativas (evitar spam)
- [ ] **Dashboard do cliente**:
  - [ ] progresso por categoria/estado
  - [ ] histórico de simulados
  - [ ] streak/meta diária
- [ ] **Perfil**:
  - [ ] idioma preferido / estado preferido (persistir em `profiles`)

## Em seguida (médio prazo)

- [ ] **Portar UI principal do site** (hero, cards, footer) para Next mantendo design.
- [ ] **i18n completo no Next** (todas as labels fixas).
- [ ] **Expansão real por estado**:
  - [ ] separar dataset por estado
  - [ ] carregamento lazy por estado
- [ ] **Observabilidade**: Sentry (web) + métricas de performance.

## Mobile (quando web estiver estável)

- [ ] **Expo app funcional** usando `packages/core`.
- [ ] **Auth Google no mobile** (Supabase + Expo Auth Session).
- [ ] **Offline first**: AsyncStorage + sync posterior.

## Produção

- [ ] **Deploy web** (Vercel) + domínios/redirects.
- [ ] **CI/CD**: manter build e checks.
- [ ] **Hardening**: rate limits, segurança e políticas.

