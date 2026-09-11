# BatchBoard — Local Dev Setup

Get the full local dev environment running in under 10 minutes.

---

## Prerequisites

| Tool | Minimum version | Check with |
|------|----------------|------------|
| Node.js | 20 LTS | `node --version` |
| npm | 10 | `npm --version` |
| Git | 2.x | `git --version` |

Install Node.js via [nvm](https://github.com/nvm-sh/nvm) (`nvm install 20 && nvm use 20`) or [mise](https://mise.jdx.dev/) (`mise use node@20`).

---

## One-Command Setup

```bash
make setup
```

This runs `npm install` and copies `.env.example` → `.env.local` if the file does not already exist. Then:

```bash
npm run dev
```

App is live at [http://localhost:3000](http://localhost:3000).

---

## Step-by-Step (if you prefer explicit steps)

### 1. Clone the repo

```bash
git clone https://github.com/amansharma312/batchboard.git
cd batchboard
```

### 2. Install dependencies

```bash
npm install
```

`npm ci` is equivalent and preferred in CI; locally either works.

### 3. Configure environment

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in values. The only required variable right now is `NEXT_PUBLIC_APP_URL`, which defaults to `http://localhost:3000` — no changes needed for basic local dev.

See [docs/STACK.md](./STACK.md) for a full description of every variable.

### 4. Start the dev server

```bash
npm run dev
```

Next.js starts with hot-reload at [http://localhost:3000](http://localhost:3000).

---

## Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with hot-reload |
| `npm run build` | Production build (also validates types) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript type-check (no emit) |

---

## Verifying the Setup

After `npm run dev` starts, open [http://localhost:3000](http://localhost:3000). You should see the BatchBoard landing screen — dark background, "BatchBoard" heading, "Coming soon — building in public" badge.

If the page doesn't load:
- Check that port 3000 is free: `lsof -i :3000`
- Check the terminal for build errors (missing env vars, TypeScript errors).

---

## CI Pipeline

GitHub Actions runs on every push to `main` and every PR: lint → typecheck → build. See `.github/workflows/ci.yml`. The same checks run locally via `npm run lint && npm run typecheck && npm run build`.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `Module not found` errors | Run `npm install`; you may be missing new deps added since your last pull |
| TypeScript errors on startup | Run `npm run typecheck` to see the full list; the dev server shows warnings, not all errors |
| Port 3000 in use | Kill the process (`lsof -ti :3000 \| xargs kill`) or run `npm run dev -- -p 3001` |
| `.env.local` missing | Run `cp .env.example .env.local` |
| `next build` fails in CI but not locally | Check Node version parity — CI uses Node 20; ensure `node --version` matches |

---

## Project Structure

```
batchboard/
├── docs/                  # Architecture and setup docs (you are here)
├── src/
│   ├── app/               # Next.js App Router: pages, layouts, route handlers
│   ├── components/
│   │   └── ui/            # Shared UI primitives (Button, Card, …)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities, API clients, shared logic
│   └── styles/            # Global CSS, design tokens
├── .env.example           # Environment variable template
├── .github/workflows/     # CI/CD
├── CLAUDE.md              # Agent quick-start and coding standards
└── package.json
```

Feature code goes into a dedicated directory under `src/app/` or `src/components/`. Do not put feature-specific logic in `src/lib/`.
