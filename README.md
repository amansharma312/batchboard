# BatchBoard

**Agent ops board for AI-first teams.** Monitor and manage Claude Batch API jobs, AI agent pipelines, and LLM workloads from one dashboard.

BatchBoard gives CTOs, engineers, and ops leads a single pane of glass for their AI agent infrastructure — queued/running/completed/failed jobs, cost per run, error previews, and retry controls. No more SSH-ing into logs.

## Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Hosting | Vercel |
| Package manager | npm |

## Local dev

**Prerequisites:** Node.js 20+, npm 10+

```bash
# 1. Clone
git clone https://github.com/amansharma312/batchboard.git
cd batchboard

# 2. Install
npm install

# 3. Configure env
cp .env.example .env.local
# Edit .env.local and fill in the required values (see comments in the file)

# 4. Start dev server
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript check (no emit) |

## Project structure

```
src/
├── app/              # Next.js App Router pages and layouts
├── components/
│   └── ui/           # Shared UI primitives
├── hooks/            # Custom React hooks
├── lib/              # Utilities, API clients, shared logic
└── styles/           # Global styles and CSS tokens
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in values. Never commit `.env.local`.

## Contributing

This is an early-stage internal project. Development is tracked in [Paperclip](https://paperclip.ing).
