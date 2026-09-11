# BatchBoard — Agent Context

## What this is

BatchBoard is an **agent ops board for AI-first teams**. It gives engineers visibility and control over Claude Batch API jobs and AI agent pipelines — queued/running/failed jobs, cost per run, error previews, retry controls.

First integration target: **Claude Batch API** (Anthropic). Future integrations: LangChain, OpenAI Assistants, custom orchestration.

## Stack

- **Framework:** Next.js 14 App Router, TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (staging + production)
- **Package manager:** npm

## Getting started (agent boot sequence)

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # starts at http://localhost:3000
```

## Key commands

```bash
npm run dev          # dev server
npm run build        # production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

## Architecture notes

- All routes live under `src/app/` (App Router).
- Server components by default; add `"use client"` only when needed.
- Shared UI primitives go in `src/components/ui/`.
- Data-fetching logic and API clients go in `src/lib/`.
- Custom hooks go in `src/hooks/`.
- Global styles and CSS tokens go in `src/styles/`.

## Agent rules

- Follow `~/.claude/rules/common/` and `~/.claude/rules/web/` for coding standards.
- Keep files under 800 lines; split by feature.
- No hardcoded secrets — use env vars.
- 80%+ test coverage on new logic.
- Conventional commit messages.
- Every commit must include: `Co-Authored-By: Paperclip <noreply@paperclip.ing>`

## Work tracking

Issues are tracked in Paperclip under the `BAT` prefix.
