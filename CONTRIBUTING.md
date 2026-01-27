# Contributing

Thanks for your interest in contributing to this repository.

## Prerequisites

- Node.js >= 18
- pnpm (repo is pinned to `pnpm@9`)
- MySQL (for `apps/api`)

## Repository structure

- `apps/api` - NestJS + TypeORM API (MySQL)
- `apps/dashboard` - Vite + React admin dashboard
- `apps/web` - Next.js website
- `packages/*` - shared configs and UI components

## Getting started

1. Install dependencies (from the repo root):

```bash
pnpm install
```

2. Environment variables

- API: copy `apps/api/.env.example` to `apps/api/.env`

```bash
cp apps/api/.env.example apps/api/.env
```

- Dashboard: copy `apps/dashboard/.env.example` to `apps/dashboard/.env` if you need to change the API base URL.

```bash
cp apps/dashboard/.env.example apps/dashboard/.env
```

### Secrets policy

- Never commit `.env` files.
- Use `.env.example` files for documenting required variables.
- If a secret is accidentally committed, rotate it immediately and remove it from git history if necessary.

3. Run the stack

Run everything:

```bash
pnpm dev
```

Or run individual apps:

```bash
pnpm --filter api dev
pnpm --filter dashboard dev
pnpm --filter web dev
```

## Development workflow

### Branching

- Create a feature branch from `main` (or your default branch): `feature/<short-description>`.

### Code style

- Prefer small, focused commits.
- Keep code formatted (see Formatting below).

### Formatting

```bash
pnpm format
```

### Lint / typecheck

```bash
pnpm lint
pnpm check-types
```

Note: If these commands fail, please fix issues related to your changes (and ideally any touched code paths).

### Tests

API tests:

```bash
pnpm --filter api test
pnpm --filter api test:e2e
```

## Pull requests

When opening a PR, please include:

- What changed and why
- How to test (commands + expected results)
- Any screenshots (for UI changes)
- Any migration notes (DB/entity changes)

## Reporting issues

If you report a bug, please include:

- Steps to reproduce
- Expected vs actual behavior
- Environment (Node version, OS)
- Relevant logs / screenshots
