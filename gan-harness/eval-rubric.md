# Evaluation Rubric — KangaLearner Roadmap

> For use by the Evaluator agent to assess each delivery against spec.

## Per-Delivery Evaluation Criteria

Each delivery (PR) is evaluated on 4 axes. Score 1–5 per axis.

### 1. Completeness (weight: 0.35)

| Score | Criteria |
|---|---|
| 5 | All acceptance criteria met, edge cases handled |
| 4 | All acceptance criteria met, minor edge cases missing |
| 3 | Most criteria met, 1 gap |
| 2 | Several criteria unmet |
| 1 | Delivery is incomplete / does not match spec |

**Check method**: Walk through each `[ ]` criterion in `spec.md` for this delivery. Verify with the listed `pnpm` command.

### 2. CI Health (weight: 0.25)

| Score | Criteria |
|---|---|
| 5 | All CI checks pass, no new warnings |
| 4 | All CI checks pass, ≤ 2 pre-existing warnings |
| 3 | CI passes but new warnings introduced |
| 2 | CI fails on non-critical step |
| 1 | CI build broken |

**Check method**: Run in order:
1. `pnpm run build`
2. `pnpm run lint`
3. `pnpm run format:check`
4. `pnpm run validate:questions` (if data changed)

### 3. Code Quality (weight: 0.25)

| Score | Criteria |
|---|---|
| 5 | Clean, well-typed, no duplication, follows coding-style rules (immutability, small files, error handling) |
| 4 | Minor style issues, overall solid |
| 3 | Some duplication or mutation patterns |
| 2 | Significant style violations |
| 1 | Unmaintainable code |

**Check method**: Review diff for:
- Immutable patterns (no mutation of existing objects)
- File size < 400 lines (800 max)
- Functions < 50 lines
- Proper error handling at boundaries
- No hardcoded secrets or values

### 4. Documentation Alignment (weight: 0.15)

| Score | Criteria |
|---|---|
| 5 | All required docs updated per `AGENTS.md` policy |
| 4 | Most docs updated, minor omission |
| 3 | Key doc missing but others updated |
| 2 | Docs not updated |
| 1 | Docs contradicted by code |

**Check method**: Per `MAINTENANCE-POLICY-IA.md`, verify:
- `docs/HISTORY-INFRA-WEB.md` — new entry if infra/auth/API changed
- `docs/CODEMAPS/` — updated if architecture changed
- `docs/BACKLOG.md` — items resolved marked, new items added
- `docs/PLANNER-WEB-INFRA.md` — phases updated if applicable
- `docs/QA-EXECUTION-LOG.md` — verification commands and results logged

---

## Phase-Level Evaluation

After all deliveries in a phase are complete:

### Phase Gate Checklist

- [ ] All deliveries in the phase pass with average score ≥ 3.5
- [ ] No delivery has score 1 on any axis
- [ ] `pnpm run build` (full monorepo) green
- [ ] `pnpm run lint` (full monorepo) green
- [ ] Cross-workspace imports compile (`@kanga/core` consumed by web and mobile)
- [ ] Backlog updated: resolved items checked, new items added

### Phase-Specific Gates

| Phase | Extra Gate |
|---|---|
| 0 | CI rejects bad format, bad lint, bad questions schema |
| 1 | `@kanga/core` exports types + quiz + mock-test + i18n; tsc green |
| 2 | Web pages render with real data; auth flow works end-to-end |
| 3 | Mobile app starts in Expo Go; practice + mock test functional |
| 4 | E2E tests pass; core coverage ≥ 80%; a11y ≥ 90 |
| 5 | Mobile sync works; gamification visible; static site has deprecation notice |

---

## Verification Commands Summary

```bash
# Full monorepo health
pnpm run build
pnpm run lint
pnpm run format:check

# Data integrity
pnpm run validate:questions
pnpm run gen:core-questions
git diff --exit-code packages/core/src/data/questions.ts

# Per-workspace
pnpm --filter @kanga/core build
pnpm --filter @kanga/core test          # after 4.2
pnpm --filter @kanga/core test:coverage # after 4.2
pnpm --filter @kanga/web build
pnpm --filter @kanga/web lint
pnpm --filter @kanga/web test:e2e       # after 4.1
pnpm --filter @kanga/mobile lint
```
