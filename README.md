# KangaLearner

Australian **learner driver theory** practice: road-rule topics, bilingual study UI, WA question bank, mock tests, and a short **Learn Road Rules** hub (not a full handbook).

## Tech stack (static site)

- Plain **HTML / CSS / JavaScript** (no framework required to run the landing + quiz)
- Design tokens in `assets/css/tokens.css`
- Quiz + learn logic in `assets/js/quiz-engine.js` and `assets/js/learn-engine.js`
- Data: `assets/js/data/questions.js`, `assets/js/data/learn-topics.js`

The repo may also contain a **pnpm monorepo** (`apps/*`, `packages/*`) for future web/mobile work; the static experience is the source of truth at the repo root.

## Run locally

Open the site:

```bash
# From repo root — any static server works, e.g.:
npx --yes serve .
# or
python -m http.server 8080
```

Then open `http://localhost:3000` (or the port shown) and navigate to `index.html` if needed.

## Folder structure (static)

| Path | Purpose |
|------|---------|
| `index.html` | Main page: hero, states, learn hub, quiz shell, footer |
| `assets/css/` | `tokens.css`, `base.css`, `components.css`, `quiz.css` |
| `assets/js/` | App bootstrap, quiz engine, learn engine |
| `assets/js/data/` | `questions.js`, `learn-topics.js` |
| `assets/img/brand/` | Logo mark/full, favicon, apple touch icon |
| `assets/img/social/` | `og-image.svg` (use absolute URL in production for OG) |
| `assets/icons/` | UI and sign SVGs |

## Add or edit questions

1. Open `assets/js/data/questions.js`.
2. Each question needs: `id`, `cat` (must match a `CATEGORIES` key), `q` {en,pt,es}, `opts` with exactly one `ok: true`, `exp` {en,pt,es}, and `states` (e.g. `["WA"]`).
3. Run validation:

```bash
pnpm run validate:questions
# or
node scripts/validate-questions.cjs
```

## Add learn topics

1. Edit `assets/js/data/learn-topics.js` — follow the existing objects (`slug`, `category` matching a quiz category, `title`/`summary`/lists, `source`).
2. The learn UI renders from `assets/js/learn-engine.js` and styles in `assets/css/components.css` (`.learn-*`).

## States (expansion)

- **AU** in the header selector shows all questions currently in the bank (every published question).
- **WA** filters to questions whose `states` array includes `WA`.
- Other states show an **empty / coming soon** message until you add questions with e.g. `states: ["NSW"]`.

Sync `DW.state` with `localStorage` key `kl-state` via the header dropdown and state cards.

## Disclaimer

Content is **educational study support** based on general road-safety concepts and WA-oriented materials (e.g. Drive Safe Handbook as a conceptual reference). It does **not** replace official legislation or your state transport authority. Always confirm rules, signs, and test requirements with the relevant authority.

## Roadmap

- WA question bank complete (current focus)
- NSW, VIC, QLD, SA, TAS, ACT, NT question sets
- Account / cross-device progress sync
- PWA or mobile app packaging
- Production hosting with absolute Open Graph image URL
