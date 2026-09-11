# BatchBoard — Agent Context

## What this is

BatchBoard is an **agent ops board for AI-first teams**. It gives engineers visibility and control over Claude Batch API jobs and AI agent pipelines — queued/running/failed jobs, cost per run, error previews, retry controls.

First integration target: **Claude Batch API** (Anthropic). Future integrations: LangChain, OpenAI Assistants, custom orchestration.

Work is tracked in [Paperclip](https://paperclip.ing) under the `BAT` prefix.

---

## Quick Start (agent boot sequence)

```bash
make setup          # install + copy .env.example → .env.local
npm run dev         # starts at http://localhost:3000
```

Or step by step:

```bash
npm install
cp .env.example .env.local   # fill in values (see docs/STACK.md)
npm run dev
```

Full setup guide: [`docs/DEV_SETUP.md`](docs/DEV_SETUP.md)

---

## Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14 App Router + TypeScript | Server Components, zero-config Vercel deploy |
| Styling | Tailwind CSS v3 + clsx + tailwind-merge | Utility-first, no runtime CSS-in-JS cost |
| Hosting | Vercel | Branch previews, zero-config Next.js |
| Package manager | npm | Ships with Node; `npm ci` for reproducible CI |

Full decision log with alternatives considered: [`docs/STACK.md`](docs/STACK.md)

---

## Key Commands

```bash
npm run dev          # dev server (hot-reload)
npm run build        # production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
make check           # lint + typecheck + build (mirrors CI)
```

---

## Architecture

- All routes live under `src/app/` (App Router).
- Server Components by default — add `"use client"` only when the component needs interactivity.
- Shared UI primitives go in `src/components/ui/`.
- Data-fetching logic and API clients go in `src/lib/`.
- Custom React hooks go in `src/hooks/`.
- Global styles and CSS design tokens go in `src/styles/`.

### Adding a new feature

1. Create a directory in `src/app/` (for pages/routes) or `src/components/` (for reusable UI).
2. Keep files under 800 lines; split by concern.
3. Data fetching stays in Server Components or `src/lib/`; avoid client-side data waterfalls.
4. Add tests for any non-trivial logic in `src/lib/` or `src/hooks/`.

---

## Environment Variables

Copy `.env.example` to `.env.local`. Never commit `.env.local`.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Yes | App base URL (default: `http://localhost:3000`) |
| `ANTHROPIC_API_KEY` | When using Batch API | Anthropic API key |
| `NEXTAUTH_URL` | When auth is wired | NextAuth callback URL |
| `NEXTAUTH_SECRET` | When auth is wired | NextAuth session secret |

Full env var reference: [`docs/STACK.md#environment-variable-reference`](docs/STACK.md#environment-variable-reference)

---

## Coding Standards

Follow `~/.claude/rules/common/` and `~/.claude/rules/web/` and `~/.claude/rules/typescript/`.

Highlights:
- **Immutability.** Never mutate objects in place; return new copies.
- **No `any`.** Use `unknown` and narrow safely.
- **No hardcoded secrets.** Use env vars; validate at startup.
- **No `console.log`.** Use a proper logger when logging is needed.
- **Files ≤ 800 lines.** Split by feature when a file grows.
- **80%+ test coverage** on new logic in `src/lib/` and `src/hooks/`.
- **Conventional commit messages.** Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`.
- **Every commit must include:** `Co-Authored-By: Paperclip <noreply@paperclip.ing>`

---

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on every push to `main` and on PRs:

1. **Lint** — `npm run lint`
2. **Typecheck** — `npm run typecheck`
3. **Build** — `npm run build`

Run `make check` locally before pushing to catch failures early.

---

## One-Way-Door Decisions

These are hard to reverse — do not change without CTO sign-off and a rationale update in `docs/STACK.md`:

- **Next.js App Router** (not Pages Router)
- **TypeScript strict mode** (do not relax `tsconfig.json`)
- **Vercel** as hosting provider
- **npm** as package manager (lock file committed)
