# Dashboard (`apps/dashboard`)

Admin dashboard for managing portfolio content.

## Tech stack

- Vite + React + TypeScript
- TanStack Router
- TanStack Query
- Tailwind CSS + Radix UI components

## Setup

1) Install dependencies from the repo root:

```bash
pnpm install
```

2) Configure env:

Copy `apps/dashboard/.env.example` to `apps/dashboard/.env` if needed.

- `VITE_API_URL` (default `http://localhost:3000`)

## Run

From repo root:

```bash
pnpm --filter dashboard dev
```

Vite will print the local URL (typically `http://localhost:5173`).

## Authentication model

- After login, the API JWT is stored in `localStorage` as `accessToken`.
- Requests automatically include the header `Authorization: Bearer <token>`.
- If the API returns 401, the token is cleared and the app redirects to `/login`.

The dashboard expects these API endpoints:

- `POST /auth/login`
- `GET /auth/me`

Note: there is UI code for registration (`/signup`) calling `POST /auth/register`, but the API currently does **not** implement `/auth/register`.

## Feature areas

The dashboard uses the following API resources:

- Settings: `/settings`
- Skills: `/skill-category`, `/skills`
- Projects: `/projects`
- Experience: `/experiences`
- Education: `/educations`
- Blogs: `/blogs`
- Blog tags: `/blog-tags`
