# BatchBoard — Stack Reference

This document records every one-way-door technical decision made for BatchBoard, the rationale behind each choice, and the environment variable contract.

---

## One-Way-Door Decisions

These are hard to reverse. Each decision was made deliberately; changing any of them would require significant rework.

### Framework: Next.js 14 (App Router) + TypeScript

**Decision date:** September 2026  
**Rationale:**
- App Router gives us React Server Components by default, which is optimal for a data-heavy ops dashboard — we can fetch data server-side with no client-side waterfall.
- TypeScript is non-negotiable for an agent-facing codebase: agents and humans alike need explicit types to navigate the codebase correctly.
- Next.js 14 is the current stable LTS-equivalent in the Next.js release line; no major breaking changes expected before we hit v15.
- Vercel is the canonical host for Next.js with zero-config deployments.

**Alternatives considered:** Remix (less mature App Router analog), Vite + React SPA (no SSR, poor SEO/performance story for an ops dashboard).

### Language: TypeScript (strict mode)

**Decision date:** September 2026  
**Rationale:** An AI-first ops board will be worked on by both humans and AI agents. Strict types are the single most effective tool for giving agents accurate context about shapes, constraints, and contracts. `any` is banned in application code.

**Config:** `tsconfig.json` has `"strict": true`. Do not relax this.

### Styling: Tailwind CSS v3

**Decision date:** September 2026  
**Rationale:**
- Utility-first CSS removes the need for a separate CSS bundle per component.
- Tailwind's design-token system maps directly onto our CSS custom property approach.
- `clsx` + `tailwind-merge` handle conditional and merged class strings safely.

**Alternatives considered:** CSS Modules (too verbose for rapid iteration), styled-components/Emotion (runtime cost not worth it for a dashboard).

### Package Manager: npm

**Decision date:** September 2026  
**Rationale:** npm ships with Node.js and is CI-friendly with `npm ci`. No additional toolchain to install. If we hit monorepo needs, we will revisit in favour of pnpm.

**Lock file:** `package-lock.json` is committed. Always run `npm ci` in CI.

### Hosting: Vercel

**Decision date:** September 2026  
**Rationale:**
- Zero-config Next.js deployment with branch previews.
- Edge Network for static assets; Edge Runtime available for latency-sensitive routes.
- Free tier covers early-stage usage.

**Deploy model:** Vercel reads the `main` branch for production. PRs get preview deployments automatically via GitHub integration.

---

## Two-Way-Door Decisions (Current State)

These are reversible if needed, but are the current defaults.

| Concern | Current choice | Notes |
|---------|----------------|-------|
| Auth | Not implemented yet | NextAuth.js + a provider (GitHub or Google) is the intended path; env vars pre-wired in `.env.example` |
| Data store | None yet | Will evaluate when persistent data is needed: Supabase (Postgres) is the leading candidate given the Vercel pairing |
| API integration | Anthropic Claude Batch API | First integration target; SDK via `@anthropic-ai/sdk` |
| State management | React built-ins (useState, useContext) | No client state library until we have real need |
| Testing | None wired yet | Vitest + React Testing Library for unit/integration; Playwright for E2E |

---

## Environment Variable Reference

Copy `.env.example` to `.env.local` to configure a local dev environment. Never commit `.env.local`.

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Public base URL for the app | `http://localhost:3000` |

### Optional / Future

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude Batch API integration | — (not yet consumed by app code) |
| `NEXTAUTH_URL` | NextAuth callback URL (needed when auth is wired) | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Random secret for NextAuth session signing | — |

### Environment Variable Rules

- Variables prefixed `NEXT_PUBLIC_` are bundled into the client JS and **must not contain secrets**.
- All other variables are server-only.
- Validate required variables at startup in `src/lib/env.ts` (to be created when the first required server-side var is consumed).
- Never log environment variable values.

---

## Node.js / Runtime Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Node.js | 18.17 | 20 LTS |
| npm | 9 | 10 |

CI uses Node 20 (see `.github/workflows/ci.yml`). Use the same version locally to avoid subtle build differences.

Use [nvm](https://github.com/nvm-sh/nvm) or [mise](https://mise.jdx.dev/) to pin your local Node version. An `.nvmrc` will be added when the team grows.

---

## Architecture Principles

1. **Server Components by default.** Add `"use client"` only when interactivity requires it.
2. **Feature-first file organisation.** Files live near the feature they serve, not in a flat type-based hierarchy.
3. **No hardcoded secrets.** Every value from the environment goes through an `env.ts` validator.
4. **Immutability.** Prefer new objects over mutation; use spread operators for updates.
5. **Files ≤ 800 lines.** Split by feature when a file grows beyond that threshold.
