# API (`apps/api`)

NestJS API for the portfolio project.

## Tech stack

- NestJS
- TypeORM
- MySQL (`mysql2`)
- JWT auth (`@nestjs/jwt`, `passport-jwt`)

## Setup

1. Install dependencies from the repo root:

```bash
pnpm install
```

2. Create your API env file:

```bash
cp .env.example .env
```

3. Ensure MySQL is running and the database exists (defaults in `.env.example` use `portfolio`).

## Run

From repo root:

```bash
pnpm --filter api dev
```

Or from `apps/api`:

```bash
pnpm dev
```

The server listens on `PORT` (default `3000`).

## Auth

- Global JWT guard is enabled via `APP_GUARD`.
- Public endpoints are marked with `@Public()`.

Endpoints:

- `POST /auth/login` (public) → returns `{ accessToken }`
- `GET /auth/me` (requires `Authorization: Bearer <token>`) → returns current user

### Seeded admin user (dev convenience)

On startup, the app runs `seedAdmin()` which ensures a default user exists:

- Email: `admin@example.com`
- Password: `password`

Change/remove this behavior for production.

## Main resources / endpoints

- `GET/POST/PATCH/DELETE /projects`
- `GET/POST/PATCH/DELETE /experiences`
- `GET/POST/PATCH/DELETE /educations`
- `GET/POST/PATCH/DELETE /skills`
- `GET/POST/PATCH/DELETE /skill-category`
- `GET/POST/PATCH/DELETE /blogs` (note: `GET /blogs` is public)
- `GET/POST/PATCH/DELETE /blog-tags`
- `GET/POST/PATCH /settings`

## Environment variables

See `.env.example` for the full list.

Required:

- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET`

Optional:

- `PORT` (defaults to `3000`)
- `DB_SYNCHRONIZE`, `DB_LOGGING`

## Tests

```bash
pnpm --filter api test
pnpm --filter api test:e2e
```
