# Portfolio Monorepo

A Turborepo-based monorepo for a portfolio website, admin dashboard, and backend API.

## Apps

- `apps/api`: NestJS + TypeORM (MySQL) API (JWT auth)
- `apps/dashboard`: Vite + React + TanStack Router/Query admin dashboard
- `apps/web`: Next.js website (currently starter content)

## Prerequisites

- Node.js >= 18
- pnpm (repo uses `pnpm@9`)
- MySQL server (or compatible)

## Getting started

1) Install dependencies:

```bash
pnpm install
```

2) Configure environment variables:

- API: copy `apps/api/.env.example` to `apps/api/.env` and update values.
- Dashboard: copy `apps/dashboard/.env.example` to `apps/dashboard/.env` if you need to change the API base URL.

3) Run everything in dev mode (recommended):

```bash
pnpm dev
```

Or run individual apps:

```bash
pnpm --filter api dev
pnpm --filter dashboard dev
pnpm --filter web dev
```

## Default ports

- API: http://localhost:3000
- Dashboard (Vite): http://localhost:5173
- Web (Next.js): http://localhost:3002

## API overview

The API is a NestJS service using TypeORM (MySQL). It seeds a default admin user at startup (see `apps/api/src/database/seeder/admin.seed.ts`).

Key endpoints (high-level):

- `POST /auth/login` (public)
- `GET /auth/me` (JWT)
- CRUD endpoints for portfolio content:
  - `/settings`
  - `/skill-category`, `/skills`
  - `/projects`, `/experiences`, `/educations`
  - `/blogs`, `/blog-tags`

## Dashboard overview

The dashboard is a React app using TanStack Router and React Query.

- Stores JWT access token in `localStorage` under `accessToken`
- Automatically adds `Authorization: Bearer <token>` for API requests
- Redirects to `/login` when receiving 401 responses

## Useful scripts

- `pnpm dev` - run all apps in dev mode
- `pnpm build` - build all apps/packages
- `pnpm lint` - lint all apps/packages
- `pnpm check-types` - typecheck all apps/packages

## Repository structure

```text
apps/
  api/         # NestJS API
  dashboard/   # React admin dashboard
  web/         # Next.js website
packages/
  ui/          # Shared UI components
  eslint-config/
  typescript-config/
```
