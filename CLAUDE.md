# Cinefile Blog — Claude Instructions

## Project Overview

A newspaper-themed movie review blog built with React Router v7 (SSR), TypeScript, and Tailwind CSS v4. All content — including review body text (stored as `body_blog` in Strapi) — is dynamically fetched from a **Strapi** headless CMS. Post content is automatically backed up to the `cinefile-content` GitHub repo as Markdown files via a lifecycle hook on the Strapi backend (`src/api/movie/content-types/movie/lifecycles.ts`), which triggers `scripts/backup-posts.mjs` after every create or update. Strapi is the source of truth.

## Backend (cinefile-be)

The backend is a **Strapi v5** instance located in the sibling `cinefile-be/` directory. It exposes two content types — `movies` and `genres` — each following the standard Strapi structure (`content-types/`, `controllers/`, `routes/`, `services/`). A lifecycle hook on the `movie` content type (`src/api/movie/content-types/movie/lifecycles.ts`) triggers `scripts/backup-posts.mjs` after every create or update, which backs up all posts to the `cinefile-content` GitHub repo.

In production, the backend runs on **Railway** with a **Neon Postgres** database (connected via `DATABASE_URL`). Locally it falls back to SQLite. The `GITHUB_TOKEN` env var must be set in Railway for the backup script to function.

## Tech Stack

- **Framework:** React Router v7 with SSR (`ssr: true`)
- **Build tool:** Vite 7
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with custom theme in `app/app.css`
- **CMS:** Strapi (local: `http://localhost:1337/api`)
- **Package manager:** npm
- **Deployment target:** Netlify (via `@netlify/vite-plugin-react-router`)

## Running the Project

```bash
npm run dev          # development server
npm run build        # production build
npm run typecheck    # generate RR types + tsc check
npm run start        # serve production build
```

## Key File Locations

| Purpose | Path |
|---|---|
| Route config | `app/routes.ts` |
| Global styles + Tailwind theme | `app/app.css` |
| Shared types | `app/types.ts` |
| Utility/helper functions | `app/helpers.tsx` |
| Constants | `app/constants.ts` |
| Reusable components | `app/components/` |
| Route components | `app/routes/` |
| Layout wrappers | `app/routes/layouts/` |
| Vite config | `vite.config.ts` |
| React Router config | `react-router.config.ts` |

## Path Aliases

Use `~/` for all internal imports — it maps to `./app/`:

```ts
import { BlogCard } from "~/components/BlogCard";
import type { Post } from "~/types";
```

## Coding Conventions

- **Component files:** PascalCase `.tsx` (e.g., `BlogCard.tsx`)
- **Route files:** kebab-case directories with `index.tsx`
- **Functional components only** — no class components
- **No ESLint config** is set up; rely on TypeScript strict mode for correctness
- Data mapping helpers (`mapDetailData`, `mapStrapiToPosts`) live in `helpers.tsx` — extend these rather than inline mapping in components

## Styling Rules

- Use **Tailwind utility classes** for all layout and spacing
- The design system is defined in `app/app.css` under `@theme` — reference existing CSS variables (`--color-dark`, `--color-crimson`, `--font-source`, etc.) rather than hardcoding values
- Grayscale + crimson accent is the core aesthetic — don't introduce new colors without good reason
- Typography: serif-heavy (Brawler, Source Serif 4, Old Standard TT) — match existing headings/body patterns
- For markdown content, use the `prose` class from `@tailwindcss/typography`

## Data Fetching Pattern

Components fetch data client-side via `useEffect` + `useState` after the loader passes the API URL and any required IDs. Follow the established pattern:

1. Loader provides `apiUrl` and ID from route params
2. Component fetches in `useEffect`, maps response via helper in `helpers.tsx`
3. Render loading skeleton → data or error state

Strapi populate pattern: `?populate=*` for full relations.

## Strapi API Notes

- Local: `http://localhost:1337/api` (set in `.env`)
- Production URL: set via `VITE_API_URL` in `.env.production`
- Main content types: `movies`, `genres`
- Images are served from Strapi (`VITE_STRAPI_URL`) with multiple format sizes

## What to Avoid

- Don't add new dependencies without checking if the need can be met by existing libraries (react-icons, react-markdown, reading-time are already available)
- Don't inline Tailwind theme values — use the CSS variables defined in `app.css`
- Don't use class components or legacy React patterns
- Don't bypass TypeScript with `any` — use proper types from `app/types.ts`
- Don't modify `.react-router/` — these are auto-generated files
